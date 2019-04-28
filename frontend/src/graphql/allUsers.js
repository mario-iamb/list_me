import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query allUsersQuery {
    users {
        id
        name
        email
        age
    }
  }
`