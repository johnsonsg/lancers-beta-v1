import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import MUIDataTable from 'mui-datatables';
import RecordStyle from './record-style';
import LineElement from '../../assets/images/DiagonalElement.svg';
import MLogo from '../../assets/images/M.svg';

const TEAM_RECORD_DATA = gql`
  query {
    # allSanitySchedules(sort: { fields: _updatedAt, order: DESC }, limit: 1) {
    allSanitySchedules {
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
            mascot
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
            mascot
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
  }
`;

const columns = [
  {
    name: 'team',
    label: 'TEAM',
  },
  {
    name: 'record',
    label: 'RECORD',
  },
  {
    name: 'win%',
    label: 'WIN %',
  },
  {
    name: 'home',
    label: 'HOME',
  },
  {
    name: 'away',
    label: 'AWAY',
  },
  {
    name: 'pf',
    label: 'PF',
  },
  {
    name: 'pa',
    label: 'PA',
  },
  {
    name: 'streak',
    label: 'STREAK',
  },
];

const options = {
  filter: false,
  selectableRows: 'none',
  pagination: true,
  elevation: 0,
  search: false,
  viewColumns: false,
  rowsPerPage: 1,
  print: false,
  download: false,
};

function TeamRecord() {
  const { loading, error, data } = useQuery(TEAM_RECORD_DATA, {
    fetchPolicy: 'no-cache',
  });
  const [record, setFilters] = useState();
  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  console.log('RECAP', record);

  const currentYear = new Date().getFullYear();
  console.log('CURRENT YEAR', currentYear);

  // Get Home Wins
  const getHomeWins = () => {
    let count = 0;
    // eslint-disable-next-line array-callback-return
    (record || []).map((team) => {
      if (
        team.seasons[0].name === '2021' &&
        team.hometeamresults.homeTeam[0].name === 'Manchester' &&
        team.hometeamresults.thescore.outcome === 'W'
      ) {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    return count;
  };

  // Get Away Wins
  const getAwayWins = () => {
    let count = 0;
    // eslint-disable-next-line array-callback-return
    (record || []).map((team) => {
      if (
        team.seasons[0].name === '2021' &&
        team.visitingteamresults.visitingTeam[0].name === 'Manchester' &&
        team.visitingteamresults.thescore.outcome === 'W'
      ) {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    return count;
  };

  // Get Home Loss
  const getHomeLoss = () => {
    let count = 0;
    // eslint-disable-next-line array-callback-return
    (record || []).map((team) => {
      if (
        team.seasons[0].name === '2021' &&
        team.hometeamresults.homeTeam[0].name === 'Manchester' &&
        team.hometeamresults.thescore.outcome === 'L'
      ) {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    return count;
  };

  // Get Away Loss
  const getAwayLoss = () => {
    let count = 0;
    // eslint-disable-next-line array-callback-return
    (record || []).map((team) => {
      if (
        team.seasons[0].name === '2021' &&
        team.visitingteamresults.visitingTeam[0].name === 'Manchester' &&
        team.visitingteamresults.thescore.outcome === 'L'
      ) {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    return count;
  };

  // Calculate Win Total
  function calculateWinTotal() {
    const totalWins = getHomeWins(record) + getAwayWins(record);
    return totalWins;
  }
  const returnWinTotal = calculateWinTotal();
  console.log(`Win total is: ${returnWinTotal}`);

  // Calculate Loss Total
  function calculateLossTotal() {
    const totalLoss = getHomeLoss(record) + getAwayLoss(record);
    return totalLoss;
  }
  const returnLossTotal = calculateLossTotal();
  console.log(returnLossTotal);

  // Calculate Total Record
  function calculateTotalRecord() {
    const totalRecord = returnWinTotal + returnLossTotal;
    return totalRecord;
  }
  const returnTotalRecord = calculateTotalRecord();
  console.log(returnTotalRecord);

  // Calculate Win Percentage
  function calculateWinPercentage() {
    const totalGamesPlayed = returnWinTotal + returnLossTotal;
    // const totalWinPercentage = `${(
    //   (returnWinTotal / totalGamesPlayed) *
    //   100
    // ).toFixed(0)}%`;
    // Returns 67%
    const totalWinPercentage = `${(returnWinTotal / totalGamesPlayed).toFixed(
      3
    )}`;
    return totalWinPercentage;
  }
  const returnWinPercentage = calculateWinPercentage();
  console.log(returnWinPercentage);

  // Calculate PF (Total Points Scored)
  const pointsForHome = (record || []) // PF for Home Games
    .map(
      (filterHomePoints) =>
        filterHomePoints.seasons[0].name === '2021' &&
        filterHomePoints.hometeamresults.homeTeam[0].name === 'Manchester' &&
        filterHomePoints.hometeamresults.thescore.final
    )
    .filter((a) => a) // Builds new array and removes null, undefined or empty from array
    .map((i) => Number(i)); // Turns Strings into numbers in array
  console.log('POINTS FOR', pointsForHome);

  const pointsForAway = (record || []) // PF for Away Games
    .map(
      (filterAwayPoints) =>
        filterAwayPoints.seasons[0].name === '2021' &&
        filterAwayPoints.visitingteamresults.visitingTeam[0].name ===
          'Manchester' &&
        filterAwayPoints.visitingteamresults.thescore.final
    )
    .filter((a) => a) // Builds new array and removes null, undefined or empty from array
    .map((i) => Number(i)); // Turns Strings into numbers in array
  console.log('POINTS FOR', pointsForAway);

  const combinePF = pointsForHome // Combine both arrays from HomePF and AwayPF
    .map(function (x, i) {
      return [x, pointsForAway[i]];
    })
    .flat() // combines the two arrays into one array
    .filter((a) => a); // Builds new array and removes null, undefined or empty from array
  console.log('totalPF', combinePF);

  const totalPF = combinePF; // Calculates the total numbers in the array
  let sumPF = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < totalPF.length; i++) {
    sumPF += totalPF[i];
  }
  console.log('Points For', sumPF);
  // END :: Calculate PF (Total Points Scored)

  //
  //

  // Calculate PA (Total Points Against)
  const pointsAgainstHome = (record || []) // PF for Home Games
    .map(
      (filterHomePoints) =>
        filterHomePoints.seasons[0].name === '2021' &&
        filterHomePoints.hometeamresults.homeTeam[0].name !== 'Manchester' &&
        filterHomePoints.hometeamresults.thescore.final
    )
    .filter((a) => a) // Builds new array and removes null, undefined or empty from array
    .map((i) => Number(i)); // Turns Strings into numbers in array
  console.log('POINTS AGAINST', pointsAgainstHome);

  const pointsAgainstAway = (record || []) // PF for Away Games
    .map(
      (filterAwayPoints) =>
        filterAwayPoints.seasons[0].name === '2021' &&
        filterAwayPoints.visitingteamresults.visitingTeam[0].name !==
          'Manchester' &&
        filterAwayPoints.visitingteamresults.thescore.final
    )
    .filter((a) => a) // Builds new array and removes null, undefined or empty from array
    .map((i) => Number(i)); // Turns Strings into numbers in array
  console.log('POINTS Against', pointsAgainstAway);

  const combinePA = pointsAgainstHome // Combine both arrays from HomePF and AwayPF
    .map(function (x, i) {
      return [x, pointsAgainstAway[i]];
    })
    .flat() // combines the two arrays into one array
    .filter((a) => a); // Builds new array and removes null, undefined or empty from array
  console.log('totalPA', combinePA);

  const totalPA = combinePA; // Calculates the total numbers in the array
  let sumPA = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < totalPA.length; i++) {
    sumPA += totalPA[i];
  }
  console.log('Points Against', sumPA);
  // END :: Calculate PA (Total Points Against)

  const tab = [0, 1, 1, 1, 0];
  const streaks = tab.reduce(
    function (res, n) {
      if (n) res[res.length - 1]++;
      else res.push(0);
      return res;
    },
    [0]
  );
  console.log(streaks.join(','));
  console.log(Math.max.apply(Math, streaks));

  return (
    <>
      {loading ? null : (
        <RecordStyle>
          <Container className="px-0 py-4">
            <Card border="light">
              <Card.Header>
                <span className="mr-2">RECORD</span>
                <img src={LineElement} alt="element" />
              </Card.Header>
              <Row>
                <Col>
                  <MUIDataTable
                    data={record?.map(() => [
                      // 'Lancers',
                      <img src={MLogo} alt="Logo" />,
                      `${returnWinTotal} - ${returnLossTotal}`,
                      `${returnWinPercentage}`,
                      `${getHomeWins(record)} - ${getHomeLoss(record)} `,
                      `${getAwayWins(record)} - ${getAwayLoss(record)}`,
                      `${sumPF}`,
                      `${sumPA}`,
                      `W-3`,
                    ])}
                    columns={columns}
                    options={options}
                  />
                </Col>
              </Row>
            </Card>
          </Container>
        </RecordStyle>
      )}
    </>
  );
}
export default function TheTeamsRecord() {
  return <TeamRecord />;
}
