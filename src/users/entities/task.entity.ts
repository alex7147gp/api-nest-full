import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Task {
  @Prop()
  name: String;

  @Prop()
  description: String;
}

export const TaskSchema = SchemaFactory.createForClass(Task);