/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import RushingStatsStyle from '../stats/stats-style';
// import GET_PASSING_STATS from '../../data/getScheduleData';
const GET_RUSHING_STATS = gql`
  query {
    allSanitySchedules {
      nodes {
        title
        seasons {
          name
        }
        playerrushingstats {
          player {
            id
            name
          }
          rushatt
          rushavg
          rushtd
          rushyds
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
    name: 'rushyds',
    label: 'YDS',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'rushatt',
    label: 'ATT',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'rushtd',
    label: 'TD',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'rushavg',
    label: 'AVG',
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

function RushingStats() {
  // console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_RUSHING_STATS, {
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
  const SeasonTotalRushingByPlayer = games
    ?.map((filter) => filter.playerrushingstats)
    .flat()
    .reduce((acc, person) => {
      const totalRushYds = acc[person.player[0].name]
        ? acc[person.player[0].name].rushYds
        : 0;
      const totalRushATT = acc[person.player[0].name]
        ? acc[person.player[0].name].rushAtt
        : 0;
      const totalRushTD = acc[person.player[0].name]
        ? acc[person.player[0].name].rushTD
        : 0;
      return {
        ...acc,
        [person.player[0].name]: {
          rushYds: totalRushYds + person.rushyds,
          rushAtt: totalRushATT + person.rushatt,
          rushTD: totalRushTD + person.rushtd,
        },
      };
    }, {});

  console.log('Total Rushing', SeasonTotalRushingByPlayer);
  // Note: to output in body: {/* <div className="output">
  // {JSON.stringify(SeasonTotalRushingByPlayer)}
  // </div> */}
  const playerRushing =
    SeasonTotalRushingByPlayer &&
    Object.entries(SeasonTotalRushingByPlayer).map(([key, value]) => ({
      name: key,
      ...value,
    }));

  console.log('PLAYERRUSHING', playerRushing);

  return (
    <>
      {loading ? null : (
        <RushingStatsStyle>
          <Container className="px-0 my-0">
            <Row>
              <Col>
                <MUIDataTable
                  className="px-2 py-4"
                  data={playerRushing?.map((filter) => [
                    filter?.name,
                    filter?.rushYds,
                    filter?.rushAtt,
                    filter?.rushTD,
                    `${Math.round(
                      `${`${filter.rushYds}` / `${filter.rushAtt}`}`
                    )}`,
                  ])}
                  title="Lancers Rushing Stats"
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </Container>
        </RushingStatsStyle>
      )}
    </>
  );
}
export default function Stats() {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <RushingStats />;
}
