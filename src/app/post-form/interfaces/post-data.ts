export interface PostData {
  id: string,
  owner: {
    uid: string,
    displayName: string,
    displayNameSearch: string,
    photoURL: string,
  }
  createdDate: number,
  updateDate: number,
  uid: string,
  displayName: string,
  displayNameSearch: string,
  photoURL: string,
  text: string,
  dateTime: number,
  albumName: string,
  albumId: string,
  hasImages: boolean,
  images: string[],
  comments: string[]
}
