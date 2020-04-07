import gql from 'graphql-tag'

export const MY_TASKS = gql`
  query {
    tasks {
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