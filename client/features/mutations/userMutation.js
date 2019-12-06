import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation CreateUser(
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $phoneNumber: Int
  ) {
    createUser(
      user: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      token
      userError
      connectionError
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: String, $score: Int) {
    updateUser(userId: $userId, score: $score) {
      isUpdated
    }
  }
`;
