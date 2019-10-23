import gql from "graphql-tag";

const ADD_USER = gql`
mutation CreateUser($email:String, $password:String, $firstName:String, $lastName:String, $phoneNumber:Int){
    createUser(user:{email:$email,password:$password,firstName:$firstName,lastName:$lastName,phoneNumber:$phoneNumber}){
        token
    }
} 
`

export default ADD_USER;
