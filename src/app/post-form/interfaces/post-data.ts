export interface PostData {
  id: string,
  uid: string,
  displayName: string,
  displayNameSearch: string,
  photoURL: string,
  text: string,
  dateTime: number,
  albumName: string,
  albumId:string,
  hasImages: boolean,
  images: string[],
  comments: string[]
}
