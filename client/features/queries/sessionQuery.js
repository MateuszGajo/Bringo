import gql from "graphql-tag";

const GET_SESSION = gql`
  query GetSession($userId: String) {
    getSession(userId: $userId) {
      words {
        pl
        en
      }
      sessionInfo {
        amounts {
          procentCorrectness
          totalNumberOfWords
          discorrectWords
          correctWords
          score
        }
      }
    }
  }
`;

export default GET_SESSION;
