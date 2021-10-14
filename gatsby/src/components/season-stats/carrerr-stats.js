// This is calculating all stats from all
//
//
//
//
//
//
//
/// /
//
//
/// /
//
//
/// /
//
//
/// /
//
//
/// /
//
//
/// /
//
//
/// /
//
//
/// /
//
//
//
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PassingStatsStyle from '../stats/stats-style';

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
            image {
              asset {
                fixed(height: 35, width: 35) {
                  src
                  srcSet
                  base64
                }
              }
            }
          }
          seasons {
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
    allSanitySeasons(sort: { fields: name, order: DESC }) {
      nodes {
        id
        name
      }
    }
  }
`;

const currentYear = new Date().getFullYear();

const columns = [
  // {
  //   name: 'season',
  //   label: 'SEASON',
  //   filterList: '2021',
  // },
  {
    name: 'seasons',
    label: 'YR',
    options: {
      filter: true,
      sort: false,
      filterList: [`${currentYear}`],
    },
  },

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
  filter: true,
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

  // const seasonsArray = games?.map((filters) => filters.seasons[0].name).flat();
  // console.log('SEASONS ARRAY', seasonsArray);
  // // const seasonsArrayRMDups = [...new Set(seasonsArray)];
  // // console.log('Remove Season Dups', seasonsArrayRMDups);
  // const SeasonTotalPass = games
  //   ?.map((filters) => filters.playerpassingstats)
  //   .flat();
  // console.log('SEASONS TOTAL PASS ARRAY', SeasonTotalPass);

  // const CombineArrays = [...new Set([...seasonsArray, ...SeasonTotalPass])];
  // console.log('COMBINE ARRAYS', CombineArrays);

  // reduce player passing yards
  const SeasonTotalPassingYdsByPlayer = games
    ?.map((filter) => filter.playerpassingstats)
    .flat()
    .reduce((acc, person) => {
      const years = acc[person.seasons[0].name]
        ? acc[person.seasons[0].name].year
        : '';

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
          year: years + [person.seasons[0].name],
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

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        width: '100%',
      },
    },

    button: {
      padding: '.35rem 1rem',
      borderRadius: '5rem',
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
      marginBottom: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [passcols, setpassCols] = useState(columns);
  const [selectedFilter, setSelectedFilter] = useState(currentYear);
  const onFilter = ({ target: { value } }) => {
    setSelectedFilter(value);
    const filteredpassCols = [...passcols];
    // const filterList = [value];
    let filterList = [];
    if (value !== 'All') {
      filterList = [value];
    }
    // Target the column to filter on.
    filteredpassCols[0].options.filterList = filterList;
    setpassCols(filteredpassCols);
  };

  function ShowStats() {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <Select onChange={onFilter} value={selectedFilter}>
          <MenuItem value="All">All</MenuItem>
          {data.allSanitySchedules.nodes[0].seasons.map((filter) => (
            <MenuItem value={filter.name} key={filter.name}>
              {filter.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <>
      {loading ? null : (
        <PassingStatsStyle>
          <Container className="px-0 my-0">
            <Row>
              <ShowStats />
              <Col>
                <MUIDataTable
                  className="px-2 py-4"
                  data={playerPassing?.map((filter) => [
                    filter?.year,
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
                  title="Lancers Passing Stats"
                  columns={passcols}
                  options={options}
                />
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
