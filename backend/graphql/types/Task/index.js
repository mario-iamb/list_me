export default `
  type Task {
    _id: ID!
    title: String
    description: String
    status: String
    startDate: String
    completionDate: String
    owner: User!
    comments: [Comment!]!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(task: CreateTaskInput): Task!
  }

  input CreateTaskInput {
    title: String!
    description: String!
    status: String!
    startDate: String!
    completionDate: String!
    owner: ID!
  }
`;