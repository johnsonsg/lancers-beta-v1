/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
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
          passyds
          passtd
          passint
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
    name: 'passatt',
    label: 'ATT',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'passcomp',
    label: 'COMP',
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
  {
    name: 'passtd',
    label: 'TD',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'passint',
    label: 'INT',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'pct',
    label: 'COMP%',
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
  const SeasonTotalPassingYdsByPlayer = games
    ?.map((filter) => filter.playerpassingstats)
    .flat()
    .reduce((acc, person) => {
      const totalPassAtt = acc[person.player[0].name]
        ? acc[person.player[0].name].passAtt
        : 0;
      const totalPassComp = acc[person.player[0].name]
        ? acc[person.player[0].name].passComp
        : 0;
      const totalPassYds = acc[person.player[0].name]
        ? acc[person.player[0].name].passYds
        : 0;
      const totalPassTD = acc[person.player[0].name]
        ? acc[person.player[0].name].passTD
        : 0;
      const totalPassINT = acc[person.player[0].name]
        ? acc[person.player[0].name].passINT
        : 0;
      return {
        ...acc,
        [person.player[0].name]: {
          passAtt: totalPassAtt + person.passatt,
          passComp: totalPassComp + person.passcomp,
          passYds: totalPassYds + person.passyds,
          passTD: totalPassTD + person.passtd,
          passINT: totalPassINT + person.passint,
        },
      };
    }, {});

  console.log('Total Passing Yds', SeasonTotalPassingYdsByPlayer);
  // Note: to output in body: {/* <div className="output">
  // {JSON.stringify(SeasonTotalPassingYdsByPlayer)}
  // </div> */}
  const playerPassing =
    SeasonTotalPassingYdsByPlayer &&
    Object.entries(SeasonTotalPassingYdsByPlayer).map(([key, value]) => ({
      name: key,
      ...value,
    }));

  console.log('PLAYERPASSING', playerPassing);

  return (
    <>
      {loading ? null : (
        <PassingStatsStyle>
          <Paper elevation={1} className="my-1">
            <Container className="px-0 my-5">
              <Row>
                <Col>
                  <MUIDataTable
                    className="px-2 py-4"
                    data={playerPassing?.map((filter) => [
                      filter?.name,
                      filter?.passAtt,
                      filter?.passComp,
                      filter?.passYds,
                      filter?.passTD,
                      filter?.passINT,
                      `${Math.round(
                        `${(`${filter.passComp}` / `${filter.passAtt}`) * 100}`
                      )}%`,
                    ])}
                    title="Lancers Rushing Stats"
                    columns={columns}
                    options={options}
                  />
                </Col>
              </Row>
            </Container>
          </Paper>
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
