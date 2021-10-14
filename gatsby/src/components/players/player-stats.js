/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from 'mui-datatables';

import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import PlayerStyle from './player-style';

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
    # allSanitySchedules(
    #   filter: {
    #     playerstats: {
    #       elemMatch: {
    #         player: { elemMatch: { slug: { current: { eq: $slug } } } }
    #       }
    #     }
    #   }
    # ) {
    allSanitySchedules(
      sort: {
        fields: [playerstats___player___slug___current, order]
        order: [ASC]
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

const currentYear = new Date().getFullYear();

const passingColumns = [
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
    name: 'week',
    label: 'WK',
    options: {
      filter: false,
      sort: false,
      width: 50,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },

  {
    name: 'opp',
    label: 'OPP',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'results',
    label: 'R',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'score',
    label: 'SCORE',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'passatt',
    label: 'ATT',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'passcomp',
    label: 'COMP',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
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
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'passint',
    label: 'INT',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'pct',
    label: 'COMP%',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
];

const rushingColumns = [
  {
    name: 'seasons',
    label: 'YR',
    options: {
      // filter: true,
      // sort: false,
      filterList: [`${currentYear}`],
    },
  },
  {
    name: 'week',
    label: 'WK',
    options: {
      filter: false,
      sort: false,
      width: 50,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },

  {
    name: 'opp',
    label: 'OPP',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'results',
    label: 'R',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'score',
    label: 'SCORE',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rushyds',
    label: 'YDS',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rushatt',
    label: 'ATT',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rushtd',
    label: 'TD',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rushavg',
    label: 'AVG',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
];

const options = {
  filter: false,
  filterType: 'dropdown',
  selectableRows: 'none',
  pagination: false,
  elevation: 0,
  search: false,
  download: false,
  print: false,
  viewColumns: false,
};

function PlayerStats({ slug }) {
  console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_PLAYER_STATS, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });

  const [player, setFilters] = useState();
  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  console.log('PLAYER', player);

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

  const [passcols, setpassCols] = useState(passingColumns);
  const [rushcols, setrushCols] = useState(rushingColumns);
  const [selectedFilter, setSelectedFilter] = useState(currentYear);
  const onFilter = ({ target: { value } }) => {
    setSelectedFilter(value);
    const filteredpassCols = [...passcols];
    const filteredrushCols = [...rushcols];
    // const filterList = [value];
    let filterList = [];
    if (value !== 'All') {
      filterList = [value];
    }
    // Target the column to filter on.
    filteredpassCols[0].options.filterList = filterList;
    filteredrushCols[0].options.filterList = filterList;
    setpassCols(filteredpassCols);
    setrushCols(filteredrushCols);
  };

  // TESTING MAP

  // const outcome = player?.map(
  //   (result) => result.hometeamresults.thescore.outcome
  // );
  // console.log('OUTCOME', outcome);

  // const games = player?.map((game) => game.title);
  // console.log('GAMES', games);

  // const arr = [...new Set(games)];
  // arr.forEach((letter) => {
  //   if (letter) {
  //     console.log('Name:', letter);
  //   }
  // });

  const getSeasons = player?.map((y) => y.seasons[0].name);
  // const arr = [...new Set(getSeasons)];
  // arr.forEach((year) => {
  console.log('YEAR', getSeasons);
  // });

  const passAttCondition = player?.map((x) => x.playerpassingstats).flat();
  console.log('PASS CONDITION', passAttCondition);

  // <MUIDataTable
  //   data={passAttCondition?.map((filter) => ['2020', filter?.passatt])}
  //   title="Passing Stats"
  //   columns={passcols}
  //   options={options}
  // />;

  function ShowStats() {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <Select onChange={onFilter} value={selectedFilter}>
          <MenuItem value="All">All</MenuItem>
          {data.allSanityRoster.nodes[0].seasons.map((filter) => (
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
        <PlayerStyle>
          <ShowStats />
          {/* PASSING STATS */}
          {player
            ?.map((filtered) => [
              filtered?.playerpassingstats?.map((filters) => [
                data?.sanityRoster?.slug?.current ===
                filters?.player[0]?.slug?.current ? (
                  <Paper elevation={1} className="my-1">
                    <Container className="px-0 my-1">
                      <Row className="mt-5">
                        <Col className="mt-4">
                          <MUIDataTable
                            data={player?.map((filter) => [
                              // GET SEASONS
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? `${filter.seasons[0].name}`
                                  : ''
                              ),

                              // GET WEEK
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? `${filter.week}`
                                  : ''
                              ),

                              // Get Oppenent
                              filter?.hometeamresults?.homeTeam?.map((team) => [
                                team.name === 'Manchester'
                                  ? filter?.visitingteamresults?.visitingTeam?.map(
                                      (visitor) => [`${visitor.name}`]
                                    )
                                  : `@ ${team.name}`,
                              ]),

                              // Get Results of Game
                              filter?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name &&
                                    filter?.visitingteamresults?.visitingTeam?.map(
                                      (awayteam) => [
                                        awayteam.name === 'Manchester'
                                          ? `${filter.visitingteamresults.thescore.outcome}`
                                          : `${filter.hometeamresults.thescore.outcome}`,
                                      ]
                                    ),
                                ]
                              ),

                              // Get Score
                              `${
                                filter.visitingteamresults.thescore.final ===
                                null
                                  ? ''
                                  : filter.visitingteamresults.thescore.final
                              } - ${
                                filter.hometeamresults.thescore.final === null
                                  ? ''
                                  : filter.hometeamresults.thescore.final
                              }`,

                              // GET PASS ATT
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.passatt !== null
                                    ? `${person.passatt}`
                                    : ''
                                  : ''
                              ),

                              // GET PASS COMP
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.passcomp !== null
                                    ? `${person.passcomp}`
                                    : ''
                                  : ''
                              ),

                              // GET PASS YDS
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.passyds !== null
                                    ? `${person.passyds}`
                                    : ''
                                  : ''
                              ),

                              // GET PASS TD
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.passtd !== null
                                    ? `${person.passtd}`
                                    : ''
                                  : ''
                              ),

                              // GET PASS INT
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.passint !== null
                                    ? `${person.passint}`
                                    : ''
                                  : ''
                              ),

                              // GET COMP PERCENTAGE
                              filter?.playerpassingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.passcomp !== null
                                    ? `${Math.round(
                                        `${
                                          (`${person.passcomp}` /
                                            `${person.passatt}`) *
                                          100
                                        }`
                                      )}%`
                                    : ''
                                  : ''
                              ),
                            ])}
                            title="Passing Stats"
                            columns={passcols}
                            options={options}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Paper>
                ) : (
                  ''
                ),
              ]),
            ])
            .reduce(function (results, item) {
              return item;
            }, {})}

          {/* RUSHING STATS */}
          {player
            ?.map((filtered) => [
              filtered?.playerpassingstats?.map((filters) => [
                data?.sanityRoster?.slug?.current ===
                filters?.player[0]?.slug?.current ? (
                  <Paper elevation={1} className="my-1">
                    <Container className="px-0 my-1">
                      <Row className="mt-5">
                        <Col className="mt-4">
                          <MUIDataTable
                            data={player?.map((filter) => [
                              // GET SEASONS
                              filter?.playerrushingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? `${filter.seasons[0].name}`
                                  : ''
                              ),

                              // GET WEEK
                              filter?.playerrushingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? `${filter.week}`
                                  : ''
                              ),

                              // GET OPPONENT
                              filter?.hometeamresults?.homeTeam?.map((team) => [
                                team.name === 'Manchester'
                                  ? filter?.visitingteamresults?.visitingTeam?.map(
                                      (visitor) => [`${visitor.name}`]
                                    )
                                  : `@ ${team.name}`,
                              ]),

                              // GET RESULTS OF GAME
                              filter?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name &&
                                    filter?.visitingteamresults?.visitingTeam?.map(
                                      (awayteam) => [
                                        awayteam.name === 'Manchester'
                                          ? `${filter.visitingteamresults.thescore.outcome}`
                                          : `${filter.hometeamresults.thescore.outcome}`,
                                      ]
                                    ),
                                ]
                              ),

                              // GET SCORE
                              `${
                                filter.visitingteamresults.thescore.final ===
                                null
                                  ? ''
                                  : filter.visitingteamresults.thescore.final
                              } - ${
                                filter.hometeamresults.thescore.final === null
                                  ? ''
                                  : filter.hometeamresults.thescore.final
                              }`,

                              // GET RUSH YDS
                              filter?.playerrushingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.rushyds !== null
                                    ? `${person.rushyds}`
                                    : ''
                                  : ''
                              ),

                              // GET RUSH ATT
                              filter?.playerrushingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.rushatt !== null
                                    ? `${person.rushatt}`
                                    : ''
                                  : ''
                              ),

                              // GET RUSH TD
                              filter?.playerrushingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.rushtd !== null
                                    ? `${person.rushtd}`
                                    : ''
                                  : ''
                              ),

                              // GET RUSH YDS AVG
                              filter?.playerrushingstats?.map((person) =>
                                person?.player[0]?.slug?.current ===
                                data?.sanityRoster?.slug?.current
                                  ? person.rushyds === null
                                    ? ''
                                    : `${Math.round(
                                        `${
                                          `${person.rushyds}` /
                                          `${person.rushatt}`
                                        }`
                                      )}`
                                  : ''
                              ),
                            ])}
                            title="Rushing Stats"
                            columns={rushcols}
                            options={options}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Paper>
                ) : (
                  ''
                ),
              ]),
            ])
            .flat()
            .reduce(function (results, item) {
              return item;
            }, 0)}
        </PlayerStyle>
      )}
    </>
  );
}
export default function Stats(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <PlayerStats slug={props.slug} />;
}
