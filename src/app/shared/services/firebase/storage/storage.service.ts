import {Injectable} from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  StringFormat,
  uploadBytes,
  uploadBytesResumable,
  UploadMetadata,
  uploadString,
  UploadTask,
} from '@angular/fire/storage';


interface IResizeImageOptions {
  maxSize: number;
  file: File;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }


  percentage(task: UploadTask) {
    return percentage(task);

  }

  uploadBytes(path: string, file: any, metadata?: UploadMetadata) {
    const storageRef = ref(this.storage, path);
    return uploadBytes(storageRef, file, metadata);

  }

  uploadString(path: string, file: string, format: StringFormat, metadata?: UploadMetadata) {
    const storageRef = ref(this.storage, path);
    return uploadString(storageRef, file, format, metadata);
  }

  uploadBytesResumable(path: string, file: any, metadata?: UploadMetadata) {
    const storageRef = ref(this.storage, path);
    return uploadBytesResumable(storageRef, file, metadata);
  }

  getDownloadURL(path: string) {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }

  delete(path: string) {
    const storageRef = ref(this.storage, path);
    return deleteObject(storageRef);
  }

  fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async base64ToFile(base64: string, fileName: string, options?: any) {
    return fetch(base64).then(res =>
      res.blob().then(blob => new File([blob], fileName, options))
    );
  }


  blobToFile(blob: any, fileName: string, options?: FilePropertyBag) {
    return new File([blob], fileName, options);
  }

  resizeImage(settings: IResizeImageOptions) : Promise<Blob> {
    const file = settings.file;
    const maxSize = settings.maxSize;
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement('canvas');
    const dataURItoBlob = (dataURI: string) => {
      const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
        atob(dataURI.split(',')[1]) :
        unescape(dataURI.split(',')[1]);
      const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const max = bytes.length;
      const ia = new Uint8Array(max);
      for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], {type: mime});
    };
    const resize = () => {
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
      let dataUrl = canvas.toDataURL('image/jpeg');
      return dataURItoBlob(dataUrl);
    };

    return new Promise((ok, no) => {
      if (!file.type.match(/image.*/)) {
        no(new Error("Not an image"));
        return;
      }

      reader.onload = (readerEvent: any) => {
        image.onload = () => ok(resize());
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    })
  };
}
