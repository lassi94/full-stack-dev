import { gql } from 'apollo-boost'

//Mutation

const login = gql`
    mutation loginEvent($username: String!, $password: String!){
        login(
            username: $username,
            password: $password
        ){value}
    }
`

export default { login }