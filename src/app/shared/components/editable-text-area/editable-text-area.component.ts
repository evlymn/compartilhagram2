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

@Component({
  selector: 'app-editable-text-area',
  templateUrl: './editable-text-area.component.html',
  styleUrls: ['./editable-text-area.component.scss']
})
export class EditableTextAreaComponent implements AfterViewInit, OnChanges {
  @ViewChild('postTextElement') postTextElement!: ElementRef;
  @Output() onImagePasted = new EventEmitter();
  @Output() onTextChanged = new EventEmitter();
  selection: any;
  range: any;
  @Input() postText = ''
  @Input() emoticon = ''

  constructor(
    private _storageService: StorageService,) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['emoticon']) {
      this.getText(this.emoticon);
    }
  }

  ngAfterViewInit(): void {

    //  this.postTextElement.nativeElement.addEventListener('dragenter', async (e: any) => {
    //   e.preventDefault();
    //    e.dropEffect = "move";
    // console.log(e)
    //  })
    //  this.postTextElement.nativeElement.addEventListener('drop', async (e: any) => {
    //   // console.log(e.dataTransfer)
    // //   e.preventDefault();
    //
    //  }, false)


    this.postTextElement.nativeElement.addEventListener('paste', async (e: any) => {
      e.preventDefault();
      const clipboardItems = e.clipboardData.items;
      const images = [].slice.call(clipboardItems).filter((item: any) => item.type.indexOf('image') !== -1);
      if (images.length > 0) {
        const image = images[0] as any;
        const file = image.getAsFile();
        if (file.type == 'image/svg+xml') return;
        const image64 = await this._storageService.fileToBase64(file) as string;
        this.onImagePasted.emit({image64, file});
      } else {
        let plainText = e.clipboardData.getData('text/plain');
        this.getText(plainText);
      }
    })

    this.postTextElement.nativeElement.addEventListener('keyup', (e: any) => {
      this.onTextChanged.emit(e.target.innerHTML);
      this.getRange();
    })
    this.postTextElement.nativeElement.addEventListener('mousedown', (e: any) => {
      this.getRange();
    })

    this.postTextElement.nativeElement.addEventListener('mouseup', (e: any) => {
      this.getRange();
    })
    this.postTextElement.nativeElement.addEventListener('focus', (e: any) => {
      this.onTextChanged.emit(e.target.innerHTML);
      this.getRange();
    })

    this.postTextElement.nativeElement.addEventListener('blur', (e: any) => {
      this.onTextChanged.emit(e.target.innerHTML);
      this.getRange();
    })

    this.postTextElement.nativeElement.focus();
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

      }
    }
  }

  isValidURL(url: string) {
    const res = url.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    return res !== null;
  }


  // dropcontent(e: DragEvent) {
  //   e.preventDefault();
  //   console.log(e)
  // }
}
