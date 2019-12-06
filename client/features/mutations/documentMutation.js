import gql from "graphql-tag";

const REMOVE_SESSION = gql`
  mutation RemoveSession($userId: String) {
    removeSession(userId: $userId) {
      isDeleted
    }
  }
`;

export default REMOVE_SESSION;
