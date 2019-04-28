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
    age: Int!
    posts: [Post!]
    comments: [Comment!]
  }

  type Mutation {
    createUser(id: String!, name: String!, email: String!, age: Int!): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(id: String!, name: String!, email: String!, age: Int!): User!
  }

  input CreateUserInput {
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
