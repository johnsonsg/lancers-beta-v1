import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MdLocationOn } from '@react-icons/all-files/md/MdLocationOn';
import { MdCameraAlt } from '@react-icons/all-files/md/MdCameraAlt';
import { GiTicket } from '@react-icons/all-files/gi/GiTicket';
import GET_DATA from '../../data/getScheduleData';
import CardStyle from './card-style';
import Sidebar from '../sidebar/sidebar';

function Card() {
  const { loading, error, data } = useQuery(GET_DATA, {
    fetchPolicy: 'no-cache',
  });
  const [schedule, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  const currentYear = new Date().getFullYear();

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
      marginBottom: theme.spacing(3),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const filterList = (value) => {
    const filteredList = [];
    data.allSanitySchedules.nodes.forEach((filter) => {
      let hasFilter = false;
      filter.seasons.forEach((season) => {
        if (season.name === value) {
          hasFilter = true;
        }
      });
      if (hasFilter) {
        filteredList.push(filter);
      }
    });
    setFilters(filteredList);
  };

  const classes = useStyles();
  const [year, setYear] = React.useState();
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  function TeamSeasons() {
    return (
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Select Season
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={year}
            onChange={handleChange}
            label="Select Season"
          >
            {data.allSanitySeasons.nodes.map((season) => [
              <MenuItem
                key={season.id}
                value={`${season.name}`}
                onClick={() => filterList(`${season.name}`)}
              >
                {season.name}
              </MenuItem>,
            ])}
          </Select>
        </FormControl>
      </div>
    );
  }

  return (
    <>
      {loading ? null : (
        <>
          <Container className="px-0">
            <Row>
              <Col>
                <TeamSeasons />
              </Col>
            </Row>
          </Container>
          <Container className="mt-3 mb-3 px-0">
            <Row>
              <Col sm={12} md={8}>
                {schedule?.map((filter) => [
                  <Paper elevation={1} className="mb-5">
                    <CardStyle>
                      <Container className="topBar">
                        <Row>
                          <Col xs={6} md={9}>
                            <span className="week">{filter.week}</span>
                            <span className="dot" />
                            <span className="date">
                              {filter.matchday} {filter.datetime}
                            </span>
                            <span className="dot" />
                            <span className="final">FINAL</span>
                          </Col>
                          <Col xs={6} md={3} className="text-right pl-md-0">
                            {filter?.hometeamresults?.homeTeam?.map((team) => [
                              team.name === 'Manchester' ? (
                                <>
                                  <span className="result">
                                    {filter.hometeamresults.thescore.outcome}
                                  </span>
                                </>
                              ) : null,
                            ])}
                            {filter?.visitingteamresults?.visitingTeam?.map(
                              (team) => [
                                team.name === 'Manchester' ? (
                                  <>
                                    <span className="result">
                                      {
                                        filter.visitingteamresults.thescore
                                          .outcome
                                      }
                                    </span>
                                  </>
                                ) : null,
                              ]
                            )}
                            <span className="score">
                              {filter.visitingteamresults.thescore.final}
                              {' - '}
                              {filter.hometeamresults.thescore.final}
                            </span>
                          </Col>
                        </Row>
                      </Container>

                      <Container className="px-3 my-3">
                        <Row>
                          <Col>
                            <span className="team-name">
                              {filter?.hometeamresults?.homeTeam?.map(
                                (team) => [
                                  team.name === 'Manchester' ? (
                                    filter?.visitingteamresults?.visitingTeam?.map(
                                      (visitor) => [
                                        <>
                                          <span className="team-logo">
                                            <img
                                              src={visitor.image.asset.url}
                                              alt="team logo"
                                              height="40px"
                                            />
                                          </span>
                                          <span className="team-name">
                                            {visitor.name}
                                          </span>
                                        </>,
                                      ]
                                    )
                                  ) : (
                                    <>
                                      <span className="at-home">AT</span>
                                      <span className="team-logo">
                                        <img
                                          src={team.image.asset.url}
                                          alt="team logo"
                                          height="40px"
                                        />
                                      </span>
                                      <span className="team-name">
                                        {team.name}
                                      </span>
                                    </>
                                  ),
                                ]
                              )}
                            </span>
                          </Col>
                          <Col
                            xs={6}
                            sm={4}
                            lg="auto"
                            className="text-center text-md-right"
                          >
                            {filter.hometeamresults.thescore.outcome ===
                            null ? (
                              <Button
                                className="boxscore"
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/game/${filter.slug.current}`}
                                disabled
                              >
                                <span className="px-4">Box Score</span>
                              </Button>
                            ) : (
                              <Button
                                className="boxscore"
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/game/${filter.slug.current}`}
                              >
                                <span className="px-4">Box Score</span>
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Container>

                      <Container className="bottom-bar">
                        <Row>
                          <Col className="location">
                            <MdLocationOn />
                            <span className="align-text-top">
                              {filter?.location?.map((venue) => [
                                `${venue.name}`,
                              ])}
                            </span>
                          </Col>
                          <Col
                            xs={6}
                            sm={4}
                            lg="auto"
                            className="text-center text-md-right"
                          >
                            {filter.hometeamresults.thescore.outcome ===
                            null ? (
                              <Button
                                className={classes.button}
                                startIcon={<MdCameraAlt />}
                                disabled
                              >
                                <span className="align-text-top">
                                  Game Photos
                                </span>
                              </Button>
                            ) : (
                              <Button
                                className={classes.button}
                                startIcon={<MdCameraAlt />}
                              >
                                <span className="align-text-top">
                                  Game Photos
                                </span>
                              </Button>
                            )}
                          </Col>
                          <Col
                            xs={6}
                            sm={4}
                            lg="auto"
                            className="text-center text-md-right"
                          >
                            {filter.hometeamresults.thescore.outcome ===
                            null ? (
                              <Button
                                className={classes.button}
                                startIcon={<GiTicket />}
                              >
                                <span className="align-text-top">
                                  Buy Tickets
                                </span>
                              </Button>
                            ) : (
                              <Button
                                className={classes.button}
                                startIcon={<GiTicket />}
                                disabled
                              >
                                <span className="align-text-top">
                                  Buy Tickets
                                </span>
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </CardStyle>
                  </Paper>,
                ])}
              </Col>
              <Col sm={12} md={4}>
                <Sidebar />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default function ScheduleCard() {
  return <Card />;
}
