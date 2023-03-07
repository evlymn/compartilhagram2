import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {StorageService} from "../../services/firebase/storage/storage.service";

@Component({
  selector: 'app-editable-text-area',
  templateUrl: './editable-text-area.component.html',
  styleUrls: ['./editable-text-area.component.scss']
})
export class EditableTextAreaComponent implements AfterViewInit {
  @ViewChild('postTextElement') postTextElement!: ElementRef;
  @Output() onImagePasted = new EventEmitter();
  @Output() onTextChanged = new EventEmitter();
  @Input() postText = '';


  constructor(
    private _storageService: StorageService,) {
  }

  ngAfterViewInit(): void {
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
        const isUrl = this.isValidURL(plainText);
        const selection = window.getSelection();
        if (selection?.rangeCount) {
          selection.deleteFromDocument()
          if (isUrl) {
            const url = new URL(plainText);
            const isYoutube = url.hostname.toLowerCase().includes('youtube');
            const isWatch = url.pathname.toLowerCase().includes('watch');
            const hasVideo = url.search.length > 0;
            console.log(isYoutube, isWatch, hasVideo)
            if (isYoutube && isWatch && hasVideo) {
              const iframe = document.createElement('iframe');
              iframe.src = url.href.replace('watch?v=', 'embed/');
              iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
              iframe.allowFullscreen = true;
              iframe.setAttribute('style', 'max-width:420px; width:100%; max-height: 315px; height:315px ')
              selection.getRangeAt(0).insertNode(iframe)
            } else {
              const a = document.createElement('a');
              a.href = plainText;
              a.text = plainText;
              a.target = '_blank';
              selection.getRangeAt(0).insertNode(a)
            }
          } else {
            selection.getRangeAt(0).insertNode(document.createTextNode(plainText))
          }
        }
      }
    })

    this.postTextElement.nativeElement.addEventListener('keyup', (e: any) => {
      this.onTextChanged.emit(e.target.innerHTML);
    })
  }

  isValidURL(url: string) {
    const res = url.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    return res !== null;
  }
}
