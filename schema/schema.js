const { gql } = require('apollo-server');
const UserModel = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const typeDefs = gql`
      input User{
        email: String
        password: String
        firstName: String
        lastName: String
        phoneNumber: Int
    }
      type loginType{
        id:ID!,
        email: String,
        password: String,
        token:String,
        emailError:String,
        passwordError:String,
        connectionError:String
    }
    type SignUpType{
        id: ID!
        email: String
        password: String
        firstName: String
        lastName: String
        phoneNumber: Int
        token:String,
        userError:String,
        connectionError:String
    }
    type Query {
      login(email:String, password: String):loginType,
    }
    type Mutation {
        createUser(user: User): SignUpType,
      }
  `

const resolvers = {
  Query: {
    login: (parent, args) => {
      const {email,password} = args;
      return UserModel.findOne({email}).then(user=>{
        if(user){
          if(UserModel().comparePassword(password,user.password)){
            const payload={
              email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                phoneNumber:user.phoneNumber
            }
            const token = jwt.sign(payload,secret,{ expiresIn: '12h' })
              return{
                token
              }
          }
          else{
            return{
              passwordError:"Podane hasło jest błędne"
            }
          }
        }
        else{
          return{
            emailError:"Użytkownik nie istnieje"
          }
        }
      })
      .catch(err=>{
        return{
          connectionError:"Błąd łącznia z bazą danych. Spróbuj później"
        }
      })
    }
  },
  Mutation: {
    createUser:  (parent, args) => {
      const { email, password, firstName, lastName, phoneNumber } = args.user
       return   UserModel.findOne({ email }).then(user => {
        if (!user) {
          const hashPassword = UserModel().hashPassword(password)
          return new UserModel({ email, password: hashPassword, firstName, lastName, phoneNumber })
            .save()
            .then(resp => {
              payload = {
                email:resp.email,
                firstName:resp.firstName,
                lastName:resp.lastName,
                phoneNumber:resp.phoneNumber
              }
               const token =  jwt.sign(payload,secret,{ expiresIn: '12h' })
              return{
                token
              }
            } )
            .catch(err => {
              return{
                connectionError:"Błąd łącznia z bazą danych. Spróbuj za później"
              }
            })
        }
        else {
          return{
            userError:"Użytkownik już istnieje"
          }
        }
      })
    }
  }
};

module.exports = { typeDefs, resolvers }


