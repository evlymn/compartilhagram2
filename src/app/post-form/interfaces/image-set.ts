import {UploadTaskSnapshot} from "@angular/fire/storage";
import {Observable} from "rxjs";

export interface ImageSet {
  file: File,
  image64: string,
  uploadTask?: Observable<{ progress: number, snapshot: UploadTaskSnapshot }>,
  progress?: number,
  postId?: string
}
