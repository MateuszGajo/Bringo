import gql from "graphql-tag";

const GET_RANKINGS = gql`
   {
    getRankings {
        firstName
        lastName
        score
        id
      
    }
  }
`;

export default GET_RANKINGS;
