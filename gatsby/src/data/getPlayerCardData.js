import { gql } from '@apollo/client';

export const GET_PLAYER_CARD = gql`
  query GetPlayerData($slug: String!) {
    allSanityRoster(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        number
        name
        playerheight
        playerweight
        positions {
          positionvalue
        }
        playersgrade
        team
        slug {
          current
        }
        image {
          asset {
            fixed(height: 25, width: 25) {
              src
              srcSet
              base64
            }
            url
          }
        }
        seasons {
          name
          slug {
            current
          }
          id
        }
      }
    }
    allSanitySeasons(sort: { fields: name, order: DESC }) {
      nodes {
        name
      }
    }
  }
`;

export default GET_PLAYER_CARD;
