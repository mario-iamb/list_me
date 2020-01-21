export default `
  type Post {
    _id: ID!
    title: String!
    body: String!
    published: Boolean!
    status: String!
    author: User!
    comments: [Comment!]!
  }

  type Query {
    post(_id: ID!): Post!
    posts: [Post!]!
  }

  type Mutation {
    createPost(post: CreatePostInput): Post!
    updatePost(_id: ID!, post: UpdatePostInput): Post!
    deletePost(_id: ID!): Post!
  }

  type Subscription {
    post: PostSubscriptionPayload!
  }

  type PostSubscriptionPayload {
    mutation: MutationType!
    post: Post!
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    status: String!
    author: ID!
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
    status: String
    author: ID!
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
