import gql from 'graphql-tag'

export const MY_USER_ADD = gql`
  mutation createUser ($id: String!, $name: String!, $email: String!, $age: Int! ) {
    createUser (user: {id: $id, name: $name , email: $email , age: $age } ) {
      _id
      id
      name
      email
      age
    }
  }
`