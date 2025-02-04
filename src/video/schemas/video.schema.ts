import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({ collection: 'video' })
export class Video {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  uploader: string;

  @Prop({ required: true })
  base64: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
