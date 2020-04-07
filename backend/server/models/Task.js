import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  startDate: {
    type: String
  },
  completionDate: {
      type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

export default mongoose.model("Task", TaskSchema);
