const { gql } = require("apollo-server");
const resolvers = require("./resolvers");

const typeDefs = gql`
  input User {
    email: String
    password: String
    firstName: String
    lastName: String
    phoneNumber: Int
  }

  type LoginType {
    id: ID!
    email: String
    password: String
    token: String
    emailError: String
    passwordError: String
    connectionError: String
  }

  type SignUpType {
    id: ID!
    email: String
    password: String
    firstName: String
    lastName: String
    phoneNumber: Int
    token: String
    userError: String
    connectionError: String
  }

  type WordType {
    pl: String
    en: String
  }

  type Words {
    id: ID!
    level: String
    words: [WordType]
    sessionInfo: sessionType
  }

  type sessionAmountsType {
    correctWords: Int
    discorrectWords: Int
    totalNumberOfWords: Int
    procentCorrectness: Int
    score: Int
  }

  type sessionType {
    amounts: sessionAmountsType
  }

  type Session {
    words: [WordType]
    sessionInfo: sessionType
  }

  type deleteDocument {
    isDeleted: Boolean
  }

  type updateStatistics {
    isUpdated: Boolean
  }
  type rankings {
    id: String
    firstName: String
    lastName: String
    score: Int
  }

  type Query {
    login(email: String, password: String): LoginType
    getWords(level: String, number: [Int], userId: String): Words
    getSession(userId: String): Session
    getRankings: [rankings]
  }

  type Mutation {
    createUser(user: User): SignUpType
    updateSession(
      word: String
      userId: String
      correctWords: Int
      discorrectWords: Int
      totalNumberOfWords: Int
      procentCorrectness: Int
      score: Int
    ): Session
    updateSessionStatistics(
      userId: String
      correctWords: Int
      discorrectWords: Int
      totalNumberOfWords: Int
      procentCorrectness: Int
      score: Int
    ): updateStatistics
    updateUser(userId: String, score: Int): updateStatistics
    removeSession(userId: String): deleteDocument
  }
`;

module.exports = { typeDefs, resolvers };
