import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query allUsersQuery {
    users {
        _id
        id
        name
        email
        age
    }
  }
`