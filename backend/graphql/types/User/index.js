export default `
  type User {
    _id: String!
    id: String!
    name: String!
    email: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(id: String!, name: String!, email: String!, age: Int!): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(id: String!, name: String!, email: String!, age: Int!): User!
  }

  input CreateUserInput {
    _id: String!
    name: String!
    email: String!
    age: Int!
  }
  
  input UpdateUserInput {
    id: String
    name: String
    email: String
    age: Int
  } 
`;
