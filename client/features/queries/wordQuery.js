import gql from "graphql-tag";

const GET_WORD = gql`
  query GetWords($level: String, $number: [Int], $userId: String) {
    getWords(level: $level, number: $number, userId: $userId) {
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

export default GET_WORD;
