import gql from 'graphql-tag'

export const CREATE_USER_QUERY = gql`
    mutation createUser($id: String!, $name: String!, $email: String!, $age: Int!){
        createUser(id: $id, name: $name, email: $email, age: $age){
            id
            name
            email
            age
        }
    } 
`