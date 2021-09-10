import { gql } from '@apollo/client';

export const GET_STATS_DATA = gql`
  query($slug: String!) {
    # allSanityRoster(filter: { slug: { current: { eq: "cody-shelton" } } }) {
    sanityRoster(slug: { current: { eq: $slug } }) {
      id
      name
      number
      position
      playerweight
      playerheight
      grade
      team
      slug {
        current
      }
      image {
        asset {
          fixed {
            src
          }
          fluid {
            src
          }
          source {
            url
          }
          url
        }
      }
      playerstats {
        game {
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
        }
        passatt
        passcomp
        passint
        passtd
        passyds
        pavg
        pct
        punts
        pyds
        rec
        recavg
        rectd
        recyds
        returnatt
        returnavg
        returnyds
        rushatt
        rushavg
        rushtd
        rushyds
        dasst
        dfrec
        dint
        dsck
        dsolo
        dtotal
        fgattp
      }
    }
  }
`;

export default GET_STATS_DATA;
