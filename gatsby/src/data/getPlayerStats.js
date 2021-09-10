import { gql } from '@apollo/client';

export const GET_PLAYER_STATS = gql`
  query GetPlayerData($slug: String!) {
    sanityRoster(slug: { current: { eq: $slug } }) {
      _id
      _type
      id
      name
      team
      slug {
        current
      }
    }
    allSanityRoster(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        name
        slug {
          current
        }
        team
        seasons {
          name
        }
      }
    }
    allSanitySchedules(
      filter: {
        playerstats: {
          elemMatch: {
            player: { elemMatch: { slug: { current: { eq: $slug } } } }
          }
        }
      }
    ) {
      nodes {
        id
        title
        week
        seasons {
          name
        }
        hometeamresults {
          homeTeam {
            name
          }
          thescore {
            outcome
            final
          }
        }
        visitingteamresults {
          visitingTeam {
            name
          }
          thescore {
            outcome
            final
          }
        }
        playerpassingstats {
          player {
            name
            slug {
              current
            }
          }
          passyds
          passtd
          passint
          passcomp
          passatt
        }
        playerrushingstats {
          player {
            name
            slug {
              current
            }
          }
          rushatt
          rushavg
          rushtd
          rushyds
        }
        playerreceivingstats {
          player {
            name
            slug {
              current
            }
          }
          rec
          recavg
          rectd
          recyds
        }
      }
    }
    allSanitySeasons(sort: { fields: name, order: DESC }) {
      nodes {
        id
        name
      }
    }
  }
`;

export default GET_PLAYER_STATS;
