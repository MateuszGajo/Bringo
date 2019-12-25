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

export const UPDATE_SCORE_USER = gql`
  mutation UpdateScoreUser($userId: String, $score: Int) {
    updateScoreUser(userId: $userId, score: $score) {
      isUpdated
    }
  }
`;

export const UPDATE_LEVEL_USER = gql`
  mutation UpdateLeveLUser($userId: String, $level: String) {
    updateLevelUser(userId: $userId, level: $level) {
      isUpdated
    }
  }
`;
