import gql from 'graphql-tag'

export const MY_USER_UPDATE = gql`
    mutation updateUser ($_id: String!, $id: String!, $name: String!, $email: String!, $age: Int! ) {
        updateUser (_id: $_id, user:{id: $id, name: $name , email: $email , age: $age}) {
            _id
            id
            name
            email
            age
        }
    }
`