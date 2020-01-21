import User from "../../../server/models/User";
import Post from "../../../server/models/Post";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    // Get user by id argument
    user: async (parent, { _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    // Get first user matching name parameter
    userName: async (parent, { name }, context, info) => {
      return await User.findOne({ name }).exec();
    },
    // Get all users named Jim
    userNames: async (parent, args, context, info) => {
      return await User.find({ name: "Jim" }).exec();
    },
    // Get all users by name argument
    allMatchingUsers: async (parent, {name}, context, info) => {
      return await User.find({ name: name }).exec();
    },
    users: async (parent, args, context, info) => {
      const users = await User.find({})
        .populate()
        .exec();

      return users.map(u => ({
        _id: u._id.toString(),
        id: u.id.toString(),
        name: u.name,
        email: u.email,
        age: u.age,
        posts: u.posts,
        comments: u.comments
      }));
    }
  },
  Mutation: {
    createUser: async (root, { user }, context, info) => {
      const newUser = await new User({
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    // createUser: async (root, { id, name, email, age }) => {
    //   const newUser = new User({ id, name, email, age });

    //   return new Promise((resolve, reject) => {
    //     newUser.save((err, res) => {
    //       err ? reject(err) : resolve(res);
    //     });
    //   });
    // },
    updateUser: async (root, { _id, user }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    // deleteUser: (root, args) => {
    //   return new Promise((resolve, reject) => {
    //     User.findOneAndRemove(args).exec((err, res) => {
    //       err ? reject(err) : resolve(res);
    //     });
    //   });
    // }
    deleteUser: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  User: {
    posts: async ({ _id }, args, context, info) => {
      return await Post.find({ author: _id });
    },
    comments: async ({ _id }, args, context, info) => {
      return await Comment.find({ author: _id });
    }
  }
};

// Implementing Search in GraphQl
// https://medium.com/open-graphql/implementing-search-in-graphql-11d5f71f179
