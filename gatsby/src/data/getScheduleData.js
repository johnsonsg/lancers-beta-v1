import { gql } from '@apollo/client';

export const GET_SCHEDULE = gql`
  query GetSchedule {
    # allSanitySchedules(sort: { fields: order, order: ASC }, limit: 10) {
    allSanitySchedules(sort: { fields: order, order: ASC }) {
      nodes {
        id
        week
        title
        slug {
          current
        }
        seasons {
          name
        }
        matchday
        datetime(formatString: "MM/DD")
        location {
          name
        }
        hometeamresults {
          homeTeam {
            name
            image {
              asset {
                fixed(width: 50) {
                  base64
                  src
                  srcSet
                }
                fluid(maxWidth: 50) {
                  base64
                  src
                  srcSet
                }
                url
                title
              }
            }
          }
          thescore {
            firstqtr
            secondqtr
            thirdqtr
            fourthqtr
            final
            outcome
          }
        }
        visitingteamresults {
          visitingTeam {
            name
            image {
              asset {
                fixed(width: 50) {
                  base64
                  src
                  srcSet
                }
                fluid(maxWidth: 50) {
                  base64
                  src
                  srcSet
                }
                url
                title
              }
            }
          }
          thescore {
            firstqtr
            secondqtr
            thirdqtr
            fourthqtr
            final
            outcome
          }
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

export default GET_SCHEDULE;
