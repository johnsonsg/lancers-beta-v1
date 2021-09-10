/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MUIDataTable from 'mui-datatables';
import PlayerStyle from './player-style';
import GET_STATS from '../../data/getPlayerStats';

const currentYear = new Date().getFullYear();

const passingColumns = [
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
  // console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_STATS, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });

  // Select option that uses the filter function displaying players by year.
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

  const [player, setFilters] = useState();
  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

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

  const passingConditional = player?.map((getstats) => [
    getstats?.playerpassingstats?.map((showstats) => [
      `${showstats?.passatt}`,
      `${showstats?.player[0]?.name}`,
    ]),
  ]);
  console.log('PASSING ATTS', passingConditional);

  const rushingConditional = player?.map((getstats) => [
    getstats?.playerrushingstats?.map((showstats) => [
      // `${showstats?.rushatt}`,
      `${showstats?.player[0]?.name}`,
    ]),
  ]);
  console.log('RUSHING ATTS', rushingConditional);

  const url = data?.sanityRoster?.slug?.current;
  console.log('URL', url);

  const playername = data?.sanityRoster?.name;
  console.log('PLAYERSNAME', playername);

  // const abc = player?.map((getstats) => [
  //   getstats?.playerrushingstats?.map((showstats) => [
  //     showstats?.player[0]?.name === playername,
  //   ]),
  // ]);

  return (
    <>
      {loading ? null : (
        <PlayerStyle>
          <Paper elevation={1} className="my-1">
            <Container className="px-0 my-1">
              <Row>
                <Col className="mx-2 mt-4 mb-0">
                  {/* <TeamSeasons className="mx-2 mt-4 mb-0" /> */}
                  <ShowStats />
                </Col>
              </Row>
              {/* <Row>
                <Col>
                  {player?.map((getstats) => [
                    getstats?.playerrushingstats?.map((showstats) => [
                      showstats?.player[0]?.name === playername ? (
                        <MUIDataTable
                          className="px-2"
                          data={player?.map((filter) => [
                            // Get Year
                            `${filter.seasons[0].name}`,
                            // Get Week
                            `${filter.week[5]}`,
                            // Get Team Played
                            filter?.hometeamresults?.homeTeam?.map((team) => [
                              team.name === 'Manchester'
                                ? filter?.visitingteamresults?.visitingTeam?.map(
                                    (visitor) => [`${visitor.name}`]
                                  )
                                : `@ ${team.name}`,
                            ]),
                            // Get Game Results
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
                                      `${
                                        `${filters.rushyds}` /
                                        `${filters.rushatt}`
                                      }`
                                    )}`
                                : '',
                            ]),
                          ])}
                          title="Rushing"
                          columns={rushcols}
                          options={options}
                        />
                      ) : null,
                    ]),
                  ])}
                </Col>
              </Row> */}
              <Row>
                <Col className="mb-5">
                  <MUIDataTable
                    className="px-2"
                    data={player?.map((filter) => [
                      // Get Year
                      `${filter.seasons[0].name}`,
                      // Get Week
                      `${filter.week[5]}`,
                      // Get Team Played
                      filter?.hometeamresults?.homeTeam?.map((team) => [
                        team.name === 'Manchester'
                          ? filter?.visitingteamresults?.visitingTeam?.map(
                              (visitor) => [`${visitor.name}`]
                            )
                          : `@ ${team.name}`,
                      ]),
                      // Get Game Results
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
                      // Get Score
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
                      // Get Pass Comp %
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
                    title="Passing"
                    columns={passcols}
                    options={options}
                  />
                </Col>
              </Row>
              {/* <Row>
                <Col className="mb-5">
                  <MUIDataTable
                    className="px-2"
                    data={player?.map((filter) => [
                      // Get Year
                      `${filter.seasons[0].name}`,
                      // Get Week
                      `${filter.week[5]}`,
                      // Get Team Played
                      filter?.hometeamresults?.homeTeam?.map((team) => [
                        team.name === 'Manchester'
                          ? filter?.visitingteamresults?.visitingTeam?.map(
                              (visitor) => [`${visitor.name}`]
                            )
                          : `@ ${team.name}`,
                      ]),
                      // Get Game Results
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
                      // Get Score
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
                    title="Rushing"
                    columns={rushcols}
                    options={options}
                  />
                </Col>
              </Row> */}
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
