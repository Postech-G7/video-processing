import { Types } from 'mongoose';

export class CreateImagesFromVideoDto {
  _id: Types.ObjectId;
  user_id: string;
  title: string;
  uploader: string;
  createdAt: Date;
}
