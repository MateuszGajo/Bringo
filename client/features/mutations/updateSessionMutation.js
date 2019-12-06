import gql from "graphql-tag";

export const UPDATE_SESSION = gql`
  mutation UpdateSession(
    $word: String
    $userId: String
    $correctWords: Int
    $discorrectWords: Int
    $totalNumberOfWords: Int
    $procentCorrectness: Int
    $score: Int
  ) {
    updateSession(
      word: $word
      userId: $userId
      correctWords: $correctWords
      discorrectWords: $discorrectWords
      totalNumberOfWords: $totalNumberOfWords
      procentCorrectness: $procentCorrectness
      score: $score
    ) {
      words {
        pl
        en
      }
    }
  }
`;

export const UPDATE_SESSION_STATISTICS = gql`
  mutation UpdateSessionStatistics(
    $userId: String
    $correctWords: Int
    $discorrectWords: Int
    $totalNumberOfWords: Int
    $procentCorrectness: Int
    $score: Int
  ) {
    updateSessionStatistics(
      userId: $userId
      correctWords: $correctWords
      discorrectWords: $discorrectWords
      totalNumberOfWords: $totalNumberOfWords
      procentCorrectness: $procentCorrectness
      score: $score
    ) {
      isUpdated
    }
  }
`;
