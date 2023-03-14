import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {StorageService} from "../../services/firebase/storage/storage.service";
import {EditableTextAreaService} from "./editable-text-area.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmojiPickerDialogComponent} from "./emoji-picker-dialog/emoji-picker-dialog.component";
import {WindowService} from "../../services/window/window.service";

import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageSet} from "../../interfaces/image-set";

@Component({
  selector: 'app-editable-text-area',
  templateUrl: './editable-text-area.component.html',
  styleUrls: ['./editable-text-area.component.scss']
})
export class EditableTextAreaComponent implements AfterViewInit, OnChanges {
  @ViewChild('htmlTextElement') htmlTextElement!: ElementRef;
  @ViewChild('fileUp') fileUp!: ElementRef;
  @Output() onImagePastedOrDropped = new EventEmitter();
  @Output() onTextChanged = new EventEmitter();
  @Output() onFileChanged = new EventEmitter();
  @Output() onImagesChanged = new EventEmitter();
  @Output() onImageDeleted = new EventEmitter();
  @Output() onTextOverflow = new EventEmitter<boolean>();
  @Input() acceptPasteImages = true;
  @Input() acceptDropImages = true;
  @Input() images: ImageSet[] = [];
  @Input() maxImages = 6;
  @Input() sendingPost = false;
  @Input() multipleImages = true;
  @Input() showImages = true;
  @Input() showEmojis = false

  @Input() set text(value: string) {
    this._text = value;
    this.onTextChanged.emit(value);
  }

  @Input() totalCharacters = 300;
  isMobile = this._windowService.sizes.isMobile;
  _text = ''
  range: any;
  i18n = {};
  total = 0;
  dialogRef!: MatDialogRef<EmojiPickerDialogComponent, any>

  private windowService = this._windowService;

  constructor(
    private _storageService: StorageService,
    private _service: EditableTextAreaService,
    public dialog: MatDialog,
    private _windowService: WindowService,
    private _snackBar: MatSnackBar,
  ) {
    this.i18n = this._service.emojiPickerTranslation();
    this.windowService.getSizes.subscribe(s => {
      this.isMobile = s.isMobile;
      if (this.dialogRef) this.dialogRef.close();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['emoticon']) {
    //   this.getText(this.emoticon);
    // }
  }

  ngAfterViewInit(): void {

    this.htmlTextElement.nativeElement.addEventListener('drop', async (e: any) => {
      e.preventDefault();
      if (!this.acceptDropImages) return

      this.onImagePastedOrDropped.emit(e);
      const droppedItems = e.dataTransfer.items
      const images = [].slice.call(droppedItems).filter((item: any) => item.type.indexOf('image') !== -1);

      await this.getImageWhenPastedOrdDropped(images, e);
    })

    this.htmlTextElement.nativeElement.addEventListener('paste', async (e: any) => {
      e.preventDefault();
      if (!this.acceptPasteImages) return;

      this.onImagePastedOrDropped.emit(e);
      const clipboardItems = e.clipboardData.items;
      const images = [].slice.call(clipboardItems).filter((item: any) => item.type.indexOf('image') !== -1);
      await this.getImageWhenPastedOrdDropped(images, e);
    })

    this.htmlTextElement.nativeElement.addEventListener('keyup', (e: any) => {
      this.total = this.htmlTextElement.nativeElement.innerText.trim().length;
      this.emitText(e);
      this.getRange();
    })
    this.htmlTextElement.nativeElement.addEventListener('mousedown', () => {
      this.getRange();
    })

    this.htmlTextElement.nativeElement.addEventListener('mouseup', () => {
      this.getRange();
    })
    this.htmlTextElement.nativeElement.addEventListener('focus', (e: any) => {
      this.emitText(e);

      this.getRange();
    })
    this.htmlTextElement.nativeElement.addEventListener('blur', (e: any) => {
      this.emitText(e);
      this.getRange();
    })
    this.htmlTextElement.nativeElement.focus();
  }

  verifyFileType(file: any) {
    if (file.type == 'image/svg+xml' || file.type == 'image/heic') {
      return false
    }
    return true;
  }

  private async getImageWhenPastedOrdDropped(images: any, e: any) {
    if (images.length > 0) {
      const image = images[0] as any;
      const file = image.getAsFile();
      if (!this.verifyFileType(file)) return;
      const image64 = await this._storageService.fileToBase64(file) as string;
      if (!this.verifyTotalImages()) return
      this.addImage({image64, file})
    } else {
      let plainText = e.clipboardData.getData('text/plain');
      this.getText(plainText);
    }
  }

  private emitText(e: any) {
    this.onTextChanged.emit(e.target.innerHTML);
    this.onTextOverflow.emit(e.target.innerText.trim().length > this.totalCharacters);
  }

  getRange() {
    const selection = window.getSelection();
    if (selection) {
      this.range = selection.getRangeAt(0);
    }
  }

  private getText(plainText: string) {
    const isUrl = this.isValidURL(plainText);
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      selection.deleteFromDocument()
      if (isUrl) {
        const url = new URL(plainText);
        const isYoutube = url.hostname.toLowerCase().includes('youtube');
        const isWatch = url.pathname.toLowerCase().includes('watch');
        const hasVideo = url.search.length > 0;
        if (isYoutube && isWatch && hasVideo) {
          const iframe = document.createElement('iframe');
          iframe.src = url.href.replace('watch?v=', 'embed/');
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
          iframe.allowFullscreen = true;
          iframe.setAttribute('style', 'max-width:460px; width:100%; max-height: 315px; height:315px ')
          selection.getRangeAt(0).insertNode(iframe)
        } else {
          const a = document.createElement('a');
          a.href = plainText;
          a.text = plainText;
          a.target = '_blank';
          selection.getRangeAt(0).insertNode(a)
        }
      } else {
        selection.removeAllRanges();
        selection.addRange(this.range);
        selection.getRangeAt(0).insertNode(document.createTextNode(plainText))
        this.total = this.htmlTextElement.nativeElement.innerText.trim().length;
      }
    }
  }

  isValidURL(url: string) {
    const res = url.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    return res !== null;
  }

  showEmojiEvt(e: MouseEvent) {
    let finalY = e.clientY;
    if (e.view?.outerHeight) {
      finalY = e.view?.outerHeight - e.clientY;

      if (finalY < 400) {
        finalY = e.clientY - 500;
      } else {
        finalY = e.clientY;
      }
    }

    this.dialogRef = this.dialog.open(EmojiPickerDialogComponent, {
        exitAnimationDuration: '0ms',
        enterAnimationDuration: '0ms',
        panelClass: ['no-padding', 'bg-color-transparent'],
        backdropClass: 'emojis-dialog',
        position: {
          top: finalY.toString() + 'px',
          left: e.clientX.toString() + 'px'
        }
      }
    )

    this.dialogRef.afterClosed().subscribe(value => {
      if (value) this.getText(value);
    })
  }

  fileChangeEvent(e: any) {
    this.onFileChanged.emit(e);
    this.getFileOnChange(e).catch();
    setTimeout(() => {
      this.fileUp.nativeElement.value = '';
    }, 1000)
  }

  verifyTotalImages() {
    if (this.images.length > this.maxImages - 1) {
      this.openAlert('Escolha no máximo ' + this.maxImages + ' imagem(s).');
      return false
    } else {
      return true;
    }
  }

  async getFileOnChange(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {
      if (!this.verifyTotalImages()) {
        i = this.images.length;
        return;
      }
      const image = await this._storageService.fileToBase64(e.target.files[i]) as string;
      this.addImage({image64: image, file: e.target.files[i]})
    }
  }

  addImage(image: any) {
    this.images.push(image);
    this.onImagesChanged.emit(this.images);
  }

  openAlert(text: string) {
    this._snackBar.open(text, 'ok', {
      duration: 2000,
      verticalPosition: 'top',
    })
  }

  imageDeleted(e: any) {
    this.images.slice(e.index);
    this.onImagesChanged.emit(this.images);
    this.onImageDeleted.emit(e);
  }
}
