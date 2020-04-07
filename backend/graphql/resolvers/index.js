import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Post from "./Post/";
import Comment from "./Comment/";
import Task from "./Task/";

const resolvers = [User, Post, Comment, Task];

export default mergeResolvers(resolvers);
