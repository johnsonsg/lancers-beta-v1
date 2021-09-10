/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import TeamStatsStyle from './team-stats-style';
// import MLogo from '../../assets/images/M.png';
import LineElement from '../../assets/images/DiagonalElement.svg';
import MLogo from '../../assets/images/M.svg';

const TEAMSTATS_DATA = gql`
  query GetTeamStatsData($slug: String!) {
    allSanitySchedules(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        week
        title
        slug {
          current
        }

        playerpassingstats {
          player {
            name
          }
          passatt
          passcomp
          passint
          passtd
          passyds
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
        seasons {
          name
        }
        matchday
        datetime(formatString: "MM/DD")
        location {
          name
        }
        hometeamresults {
          teamgamestats {
            time
            netyards
            total_rushing
            rush_attempts
            avg_rush_yards
            total_passing
            pass_att
            pass_comp
            avg_pass_yards
            rushing_touchdowns
            passing_touchdowns
            other_touchdowns
            first_downs
            third_down_att
            third_down_conv
            fourth_down_att
            fourth_down_conv
            penalties_num
            penalties_yds
            turnovers
            fumbles_lost
            int_thrown
            sacks_allowed
            field_goals
            punts
            return_yards
            punt_return
            kickoff_return
            int_return
          }
          homeTeam {
            name
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
          teamgamestats {
            time
            netyards
            total_rushing
            rush_attempts
            avg_rush_yards
            total_passing
            pass_att
            pass_comp
            avg_pass_yards
            rushing_touchdowns
            passing_touchdowns
            other_touchdowns
            first_downs
            third_down_att
            third_down_conv
            fourth_down_att
            fourth_down_conv
            penalties_num
            penalties_yds
            turnovers
            fumbles_lost
            int_thrown
            sacks_allowed
            field_goals
            punts
            return_yards
            punt_return
            kickoff_return
            int_return
          }
          visitingTeam {
            name
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

function TeamStats({ slug }) {
  const { loading, error, data } = useQuery(TEAMSTATS_DATA, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [teamStats, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  // Get Passing Yards Total
  const passStats = teamStats?.map((passing) => [
    passing.playerpassingstats.reduce(
      (total, currentValue) => (total += currentValue.passyds),
      0
    ),
  ]);
  // Get Passing Ints Total
  const passInt = teamStats?.map((passing) => [
    passing.playerpassingstats.reduce(
      (total, currentValue) => (total += currentValue.passint),
      0
    ),
  ]);
  // Get Passing Att Total
  const passAtt = teamStats?.map((passing) => [
    passing.playerpassingstats.reduce(
      (total, currentValue) => (total += currentValue.passatt),
      0
    ),
  ]);
  // Get Passing Comp Total
  const passComp = teamStats?.map((passing) => [
    passing.playerpassingstats.reduce(
      (total, currentValue) => (total += currentValue.passcomp),
      0
    ),
  ]);

  // Get Passing Comp %
  const passRate = `${Math.round(`${(`${passComp}` / `${passAtt}`) * 100}`)}%`;
  console.log('PASSRATE', passRate);

  // Get Rushing Yards Total
  const rushStats = teamStats?.map((rushing) => [
    rushing.playerrushingstats.reduce(
      (total, currentValue) => (total += currentValue.rushyds),
      0
    ),
  ]);
  // Get Rushing Att Total
  const rushAtt = teamStats?.map((rushing) => [
    rushing.playerrushingstats.reduce(
      (total, currentValue) => (total += currentValue.rushatt),
      0
    ),
  ]);

  // Get Rushing Average
  const rushAvg = `${Math.round(`${`${rushStats}` / `${rushAtt}`}`)}`;

  // Get the total of rushing and passing
  const rushflattened = [].concat.apply([], rushStats);
  const passflattened = [].concat.apply([], passStats);
  const totalOffense = rushflattened.map(function (num, idx) {
    return num + passflattened[idx];
  });
  // console.log(totalOffense);

  return (
    <>
      {loading ? null : (
        <TeamStatsStyle>
          <div className="px-0 py-4">
            <Card border="light">
              <Card.Header>
                <span className="mr-2">Team Stats</span>{' '}
                <img src={LineElement} alt="element" />
              </Card.Header>
              <Container className="px-4">
                {/* TEAMS */}
                <Row className="align-items-center my-4">
                  <Col lg={6} className="my-2" />
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((getawayteam) => [
                      getawayteam?.visitingteamresults?.visitingTeam?.map(
                        (visitingteam) => [
                          visitingteam.name === 'Manchester' ? (
                            <img
                              src={MLogo}
                              alt="Manchester Lancers Logo"
                              height="30"
                            />
                          ) : (
                            <div className="team-logo">
                              <img
                                src={visitingteam.image.asset.url}
                                alt="team logo"
                                height="35px"
                              />
                            </div>
                          ),
                        ]
                      ),
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((home) => [
                      home?.hometeamresults?.homeTeam?.map((hometeam) => [
                        hometeam.name === 'Manchester' ? (
                          <img
                            src={MLogo}
                            alt="Manchester Lancers Logo"
                            height="30"
                          />
                        ) : (
                          <div className="team-logo">
                            <img
                              src={hometeam.image.asset.url}
                              alt="team logo"
                              height="35px"
                            />
                          </div>
                        ),
                      ]),
                    ])}
                  </Col>
                </Row>

                {/* TIME */}
                <Row className="align-items-center">
                  <Col>
                    <span className="subheader">TIME OF POS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .time === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.time}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats.time === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.time}`,
                    ])}
                  </Col>
                </Row>

                {/* TOTAL NET YARDS */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">TOTAL YARDS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${totalOffense}`
                        : visitingteamstats.visitingteamresults.teamgamestats
                            .netyards === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.netyards}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${totalOffense}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .netyards === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.netyards}`,
                    ])}
                  </Col>
                </Row>

                {/* NET YARDS RUSHING */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">TOTAL RUSHING</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${rushStats}`
                        : visitingteamstats.visitingteamresults.teamgamestats
                            .total_rushing === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.total_rushing}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${rushStats}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .total_rushing === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.total_rushing}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Rush Attempts</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${rushAtt}`
                        : visitingteamstats.visitingteamresults.teamgamestats
                            .rush_attempts === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.rush_attempts}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${rushAtt}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .rush_attempts === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.rush_attempts}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Avg Rush Yards</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${rushAvg}`
                        : visitingteamstats.visitingteamresults.teamgamestats
                            .avg_rush_yards === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.avg_rush_yards}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${rushAvg}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .avg_rush_yards === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.avg_rush_yards}`,
                    ])}
                  </Col>
                </Row>

                {/* NET YARDS PASSING */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">TOTAL PASSING</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${passStats}`
                        : visitingteamstats.visitingteamresults.teamgamestats
                            .total_passing === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.total_passing}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${passStats}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .total_passing === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.total_passing}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Comp. - Att.</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${passComp} of ${passAtt}`
                        : visitingteamstats.visitingteamresults.teamgamestats
                            .pass_att === null &&
                          visitingteamstats.visitingteamresults.teamgamestats
                            .pass_comp === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.pass_comp} of
                        ${visitingteamstats.visitingteamresults.teamgamestats.pass_att}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${passComp} of ${passAtt}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .pass_att === null &&
                          hometeamstats.hometeamresults.teamgamestats
                            .pass_comp === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.pass_comp} of
                        ${hometeamstats.hometeamresults.teamgamestats.pass_att}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Comp %</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${passRate}`
                        : // `${Math.round(
                        //   `${(`${passComp}` / `${passAtt}`) * 100}`
                        // )}%`

                        visitingteamstats.visitingteamresults.teamgamestats
                            .avg_pass_yards === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.avg_pass_yards}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${passRate}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .avg_pass_yards === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.avg_pass_yards}`,
                    ])}
                  </Col>
                </Row>

                {/* TOUCHDOWNS */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">TOUCHDOWNS</span>
                  </Col>
                  <Col xs lg={3} className="text-right" />
                  <Col xs lg={3} className="text-right" />
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Rushing TDs</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .rushing_touchdowns === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.rushing_touchdowns}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .rushing_touchdowns === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.rushing_touchdowns}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Passing TDs</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .passing_touchdowns === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.passing_touchdowns}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .passing_touchdowns === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.passing_touchdowns}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Other</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .other_touchdowns === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.other_touchdowns}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .other_touchdowns === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.other_touchdowns}`,
                    ])}
                  </Col>
                </Row>

                {/* 1ST DOWN */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">1ST DOWNS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .first_downs === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.first_downs}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .first_downs === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.first_downs}`,
                    ])}
                  </Col>
                </Row>

                {/* 3RD DOWN CONV */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">3RD DOWN CONV</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .third_down_att === null &&
                      visitingteamstats.visitingteamresults.teamgamestats
                        .third_down_conv === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.third_down_conv} of
                        ${visitingteamstats.visitingteamresults.teamgamestats.third_down_att} `,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .third_down_att === null &&
                      hometeamstats.hometeamresults.teamgamestats
                        .third_down_conv === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.third_down_conv} of
                        ${hometeamstats.hometeamresults.teamgamestats.third_down_att}`,
                    ])}
                  </Col>
                </Row>

                {/* 4TH DOWN CONV */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">4TH DOWN CONV</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .fourth_down_att === null &&
                      visitingteamstats.visitingteamresults.teamgamestats
                        .fourth_down_conv === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.fourth_down_conv} of
                        ${visitingteamstats.visitingteamresults.teamgamestats.fourth_down_att} `,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .fourth_down_att === null &&
                      hometeamstats.hometeamresults.teamgamestats
                        .fourth_down_conv === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.fourth_down_conv} of
                        ${hometeamstats.hometeamresults.teamgamestats.fourth_down_att}`,
                    ])}
                  </Col>
                </Row>

                {/* PENALTIES - YARDS */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">PENALTIES - YDS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .penalties_yds === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.penalties_yds}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .penalties_yds === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.penalties_yds}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Num of Penalties</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .penalties_num === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.penalties_num}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .penalties_num === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.penalties_num}`,
                    ])}
                  </Col>
                </Row>

                {/* TURNOVERS */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">TURNOVERS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .turnovers === null
                        ? ''
                        : `${visitingteamstats.visitingteamresults.teamgamestats.turnovers}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats.turnovers ===
                      null
                        ? ''
                        : `${hometeamstats.hometeamresults.teamgamestats.turnovers}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Fumbles - Lost</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .fumbles_lost === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.fumbles_lost}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .fumbles_lost === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.fumbles_lost}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Int. Thrown</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.visitingTeam[0]
                        .name === 'Manchester'
                        ? `${passInt}`
                        : visitingteamstats.visitingteamresults.teamgamestats
                            .int_thrown === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.int_thrown}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.homeTeam[0].name ===
                      'Manchester'
                        ? `${passInt}`
                        : hometeamstats.hometeamresults.teamgamestats
                            .int_thrown === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.int_thrown}`,
                    ])}
                  </Col>
                </Row>

                {/* SACKS ALLOWED */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">SACKS ALLOWED</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .sacks_allowed === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.sacks_allowed}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .sacks_allowed === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.sacks_allowed}`,
                    ])}
                  </Col>
                </Row>

                {/* FIELD GOALS */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">FIELD GOALS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .field_goals === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.field_goals}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .field_goals === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.field_goals}`,
                    ])}
                  </Col>
                </Row>

                {/* PUNTS - AVG */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">NUM OF PUNTS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .punts === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.punts}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats.punts === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.punts}`,
                    ])}
                  </Col>
                </Row>

                {/* RETURN YARDS */}
                <Row className="my-3 pt-3 align-items-center border-top">
                  <Col>
                    <span className="subheader">RETURN YDS</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .return_yards === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.return_yards}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .return_yards === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.return_yards}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Punts - Returns</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .punt_return === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.punt_return}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .punt_return === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.punt_return}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Kickoffs - Returns</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .kickoff_return === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.kickoff_return}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats
                        .kickoff_return === null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.kickoff_return}`,
                    ])}
                  </Col>
                </Row>
                <Row className="my-3 align-items-center">
                  <Col>
                    <span>Int. Returns</span>
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((visitingteamstats) => [
                      visitingteamstats.visitingteamresults.teamgamestats
                        .int_return === null
                        ? '-'
                        : `${visitingteamstats.visitingteamresults.teamgamestats.int_return}`,
                    ])}
                  </Col>
                  <Col xs lg={3} className="text-right">
                    {teamStats?.map((hometeamstats) => [
                      hometeamstats.hometeamresults.teamgamestats.int_return ===
                      null
                        ? '-'
                        : `${hometeamstats.hometeamresults.teamgamestats.int_return}`,
                    ])}
                  </Col>
                </Row>
              </Container>
            </Card>
          </div>
        </TeamStatsStyle>
      )}
    </>
  );
}
export default function theTeamStats(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <TeamStats slug={props.slug} />;
}
