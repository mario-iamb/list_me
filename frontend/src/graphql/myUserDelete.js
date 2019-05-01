import gql from 'graphql-tag'

export const MY_USER_DELETE = gql`
    mutation deleteUser ($_id: String!){
        deleteUser (_id: $_id) {
            _id
        }
    }
`