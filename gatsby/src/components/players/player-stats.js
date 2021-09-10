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
    allSanitySchedules(sort: { fields: order, order: ASC }) {
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

  // const url = data?.sanityRoster?.slug?.current;
  // console.log('URL', url);

  // const playername = data?.sanityRoster?.name;
  // console.log('PLAYERSNAME', playername);

  // const gameplayer = player?.map(function (recapplayer) {
  //   return (
  //     <div key={recapplayer.id}>
  //       {recapplayer?.playerpassingstats[0]?.player[0]?.name}
  //     </div>
  //   );
  // });
  // console.log('GAMEPLAYER', gameplayer);

  // const gametitle = player?.map(function (recap) {
  //   return `${recap?.playerpassingstats[0]?.player[0]?.slug.current}`;
  // });
  // console.log('GAMETITLE', gametitle);

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
          <Paper elevation={1} className="my-1">
            <Container className="px-0 my-1">
              <Row>
                <Col className="mx-2 mt-4 mb-0">
                  <ShowStats />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <MUIDataTable
                    data={player?.map((filter) => [
                      filter.seasons[0].name === null
                        ? ''
                        : `${filter.seasons[0].name}`,
                      // filter.week[5] === null ? '' : `${filter.week[5]}`,
                      filter.week === null ? '' : `${filter.week}`,
                      filter?.hometeamresults?.homeTeam?.map((team) => [
                        team.name === 'Manchester'
                          ? filter?.visitingteamresults?.visitingTeam?.map(
                              (visitor) => [`${visitor.name}`]
                            )
                          : `@ ${team.name}`,
                      ]),
                      filter?.hometeamresults?.homeTeam?.map((hometeam) => [
                        hometeam.name &&
                          filter?.visitingteamresults?.visitingTeam?.map(
                            (awayteam) => [
                              awayteam.name === 'Manchester'
                                ? `${filter.visitingteamresults.thescore.outcome}`
                                : `${filter.hometeamresults.thescore.outcome}`,
                            ]
                          ),
                      ]),
                      `
                        ${filter.visitingteamresults.thescore.final}
                        -
                        ${filter.hometeamresults.thescore.final}
                        `,

                      // Get Pass ATT
                      filter?.playerpassingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.passatt === null
                            ? ''
                            : `${filters.passatt}`
                          : '',
                      ]),

                      // Get Pass Comp
                      filter?.playerpassingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.passcomp === null
                            ? ''
                            : `${filters.passcomp}`
                          : '',
                      ]),
                      // Get Pass Yds
                      filter?.playerpassingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.passyds === null
                            ? ''
                            : `${filters.passyds}`
                          : '',
                      ]),
                      // Get Pass TD
                      filter?.playerpassingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.passtd === null
                            ? ''
                            : `${filters.passtd}`
                          : '',
                      ]),
                      // Get Pass Int
                      filter?.playerpassingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.passint === null
                            ? ''
                            : `${filters.passint}`
                          : '',
                      ]),

                      // Get Percentage
                      filter?.playerpassingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.passcomp === null
                            ? ''
                            : `${Math.round(
                                `${
                                  (`${filters.passcomp}` /
                                    `${filters.passatt}`) *
                                  100
                                }`
                              )}%`
                          : '',
                      ]),
                    ])}
                    title="Passing Stats"
                    columns={passcols}
                    options={options}
                  />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col>
                  <MUIDataTable
                    data={player?.map((filter) => [
                      // for each game that has stats and those stats has a player return
                      // If game has player
                      // if player has stats return stats
                      filter.seasons[0].name === null
                        ? ''
                        : `${filter.seasons[0].name}`,
                      filter.week[5] === null ? '' : `${filter.week[5]}`,
                      filter?.hometeamresults?.homeTeam?.map((team) => [
                        team.name === 'Manchester'
                          ? filter?.visitingteamresults?.visitingTeam?.map(
                              (visitor) => [`${visitor.name}`]
                            )
                          : `@ ${team.name}`,
                      ]),
                      filter?.hometeamresults?.homeTeam?.map((hometeam) => [
                        hometeam.name &&
                          filter?.visitingteamresults?.visitingTeam?.map(
                            (awayteam) => [
                              awayteam.name === 'Manchester'
                                ? `${filter.visitingteamresults.thescore.outcome}`
                                : `${filter.hometeamresults.thescore.outcome}`,
                            ]
                          ),
                      ]),
                      `
                        ${filter.visitingteamresults.thescore.final}
                        -
                        ${filter.hometeamresults.thescore.final}
                        `,

                      // Get Rush Yds
                      filter?.playerrushingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.rushyds === null
                            ? ''
                            : `${filters.rushyds}`
                          : '',
                      ]),
                      // Get Rush Att
                      filter?.playerrushingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.rushatt === null
                            ? ''
                            : `${filters.rushatt}`
                          : '',
                      ]),
                      // Get Rush Td
                      filter?.playerrushingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.rushtd === null
                            ? ''
                            : `${filters.rushtd}`
                          : '',
                      ]),
                      // Get Rush Yds Avg %
                      filter?.playerrushingstats?.map((filters) => [
                        filters?.player[0]?.slug?.current ===
                        data?.sanityRoster?.slug?.current
                          ? filters.rushyds === null
                            ? ''
                            : `${Math.round(
                                `${`${filters.rushyds}` / `${filters.rushatt}`}`
                              )}`
                          : '',
                      ]),
                    ])}
                    title="Rushing Stats"
                    columns={rushcols}
                    options={options}
                  />
                </Col>
              </Row>
            </Container>
          </Paper>
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
