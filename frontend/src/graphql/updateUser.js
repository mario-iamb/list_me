import gql from 'graphql-tag'

export const UPDATE_USER_QUERY = gql`
    mutation updateUser (_id: String!, user: UpdateUserInput!) {
        updateUser(_id: $_id, user: &user) {
            id
            name
            email
            age
        }
    }
` 

// export const UPDATE_USER_QUERY = gql`
//     mutation updateUser (_id: String!, user: UpdateUserInput!) {
//         updateUser(_id: $_id, user:{
//             id: $id,
//             name: $name,
//             email: $email,
//             age: $age
//         }) {
//             id
//             name
//             email
//             age
//         }
//     }
// ` 
