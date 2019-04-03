import gql from 'graphql-tag'

export const DELETE_USER_QUERY = gql`
    mutation deleteUser($id: String!, $name: String!, $email: String!, $age: Int!){
        deleteUser(id: $id, name: $name, email: $email, age: $age){
            id
            name
            email
            age
        }
    } 
`