import { gql } from '@apollo/client';

export const GET_SEASONS = gql`
  query GetRoster {
    allSanitySeasons(sort: { fields: name, order: DESC }) {
      nodes {
        name
      }
    }
  }
`;

export default GET_SEASONS;
