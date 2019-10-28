import gql from "graphql-tag";

const LOGIN_QUERY = gql`
query Login($email:String,$password:String){
    login(email:$email,password:$password){
        token
        emailError
        passwordError
        connectionError
    }
}
`

export default LOGIN_QUERY;