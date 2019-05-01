export default `

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }

  type User {
    _id: ID!
    id: String
    name: String
    email: String
    age: Int
    posts: [Post!]
    comments: [Comment!]
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
  }

  input CreateUserInput {
    id: String!
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

// createUser(id: String!, name: String!, email: String!, age: Int!): User!
// deleteUser(id: String!, name: String!, email: String!, age: Int!): User!