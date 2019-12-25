import gql from "graphql-tag";

const GET_SCORE_USER = gql`
  query GetScoreUser($userId: String) {
    getScoreUser(userId: $userId) {
      score
    }
  }
`;

export default GET_SCORE_USER;
