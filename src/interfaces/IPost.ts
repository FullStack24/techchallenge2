export interface IPost {
  id?: string;
  title: string;
  content?: string;
  authorId: string;
  createdAt: Date;
  modifiedAt: Date;
}