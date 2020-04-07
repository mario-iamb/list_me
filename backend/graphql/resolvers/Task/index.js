import User from "../../../server/models/User";
// import Post from "../../../server/models/Post";
// import Comment from "../../../server/models/Comment";
import Task from "../../../server/models/Task";

export default {
  Query: {
    tasks: async (parent, args, context, info) => {
      const tasks = await Task.find({})
        .populate()
        .exec();
      
      return tasks.map(t => ({
        _id: t._id.toString(),
        title: t.title,
        description: t.description,
        status: t.status,
        startDate: t.startDate,
        completionDate: t.completionDate,
        owner: t.owner,
        comments: t.comments
      }));
    }
  },
  Mutation: {
    createTask: async (root, { task }, context, info) => {
      const newTask = await new Task({
        title: task.title,
        description: task.description,
        status: task.status,
        startDate: task.startDate,
        completionDate: task.completionDate,
        owner: task.owner
      });

      return new Promise((resolve, reject) => {
        newTask.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Task: {
    owner: async ({ owner }, args, context, info) => {
      return await User.findById(owner)
    }
  }
};