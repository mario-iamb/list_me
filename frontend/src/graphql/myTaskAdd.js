import gql from 'graphql-tag'

export const MY_TASK_ADD = gql`
  mutation createTask ($title: String!, $description: String!, $status: String!, $startDate: String!, $completionDate: String!, $owner: ID! ) {
    createTask (task: {
      title: $title,
      description: $description,
      status: $status,
      startDate: $startDate,
      completionDate: $completionDate,
      owner: $owner 
    }) {
      title
      description
      status
      startDate
      completionDate
      owner {
        name
      }
    }
  }
`