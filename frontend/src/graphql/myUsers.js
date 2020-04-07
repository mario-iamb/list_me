import gql from 'graphql-tag'

export const MY_USERS = gql`
  query {
    users {
      _id
      id
      name
      email
      age
      posts {
        title
        body
        published
      }
    }
  }
`