import { gql } from '@apollo/client';

export const GET_ROSTER = gql`
  query GetRoster {
    allSanityRoster(
      sort: { fields: number, order: ASC } # filter: { team: { eq: "Varsity" } }
    ) {
      nodes {
        number
        name
        playersgrade
        playerheight
        playerweight
        playerstatus
        positions {
          positionvalue
          position
        }
        team
        slug {
          current
        }
        image {
          asset {
            fixed(height: 35, width: 35) {
              src
              srcSet
              base64
            }
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

export default GET_ROSTER;
