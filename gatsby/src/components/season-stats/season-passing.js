/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import PassingStatsStyle from '../stats/stats-style';
// import GET_PASSING_STATS from '../../data/getScheduleData';
const GET_PASSING_STATS = gql`
  query {
    allSanitySchedules {
      nodes {
        title
        seasons {
          name
        }
        playerpassingstats {
          player {
            id
            name
          }
          passatt
          passcomp
          passint
          passtd
          passyds
        }
      }
    }
  }
`;

const columns = [
  // {
  //   name: 'season',
  //   label: 'SEASON',
  //   filterList: '2021',
  // },
  {
    name: 'name',
    label: 'PLAYER',
    options: {
      filter: false,
      sort: false,
    },
  },

  {
    name: 'passyds',
    label: 'YDS',
    options: {
      filter: false,
      sort: false,
    },
  },
];

const options = {
  filter: false,
  selectableRows: false,
  pagination: false,
  elevation: 0,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
};

function PassingStats() {
  // console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_PASSING_STATS, {
    fetchPolicy: 'no-cache',
  });

  const [games, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  console.log('TEST', games);

  // reduce player passing yards
  // const SeasonTotalPassingYdsByPlayer = games
  //   ?.map((filter) => filter.playerpassingstats)
  //   .flat()
  //   .reduce((acc, person) => {
  //     const totalPassingYds = acc[person.player[0].name] || 0;
  //     return {
  //       ...acc,
  //       [person.player[0].name]: totalPassingYds + person.passyds,
  //     };
  //   }, {});
  // // document.querySelector('.output').innerText = JSON.stringify(
  // //   SeasonTotalPassingYdsByPlayer
  // // );
  // console.log('Total Passing Yds', SeasonTotalPassingYdsByPlayer);

  return (
    <>
      {loading ? null : (
        <PassingStatsStyle>
          <Container className="px-0 my-1">
            <Row>
              <div className="output" />
              <Col className="mb-5">
                {/* <MUIDataTable
                  className="px-2"
                  data={games?.map(() => [`${SeasonTotalPassingYdsByPlayer}`])}
                  title="Lancers Passing Stats"
                  columns={columns}
                  options={options}
                /> */}
              </Col>
            </Row>
          </Container>
        </PassingStatsStyle>
      )}
    </>
  );
}
export default function Stats() {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <PassingStats />;
}

// const fetchPlayers = games
//   ?.map((filter) => filter?.playerpassingstats)
//   .flat()
//   .map((players) => [players?.player[0].name])
//   .flat();
// const removeDups = [...new Set(fetchPlayers)];

// console.log('REMOVE DUPS', removeDups);
