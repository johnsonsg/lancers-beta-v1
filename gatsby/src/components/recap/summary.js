/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LineElement from '../../assets/images/DiagonalElement.svg';
import SummaryStyle from './summary-style';
import MLogo from '../../assets/images/M.svg';

const SUMMARY_DATA = gql`
  query GetGameData($slug: String!) {
    allSanitySchedules(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
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
        }
      }
    }
  }
`;

function Summary({ slug }) {
  const { loading, error, data } = useQuery(SUMMARY_DATA, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [summary, setFilters] = useState();
  console.log('SUMMARY', summary);
  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  // Get Passing Yards Total
  const passStats = summary?.map((passing) => [
    passing.playerpassingstats.reduce(
      (total, currentValue) => (total += currentValue.passyds),
      0
    ),
  ]);

  // Get Rushing Yards Total
  const rushStats = summary?.map((rushing) => [
    rushing.playerrushingstats.reduce(
      (total, currentValue) => (total += currentValue.rushyds),
      0
    ),
  ]);
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
        <SummaryStyle>
          <div className="px-0 pb-4">
            <Card border="light">
              <Card.Header>
                <span className="mr-2">Game Summary</span>{' '}
                <img src={LineElement} alt="element" />
              </Card.Header>
              <Container className="px-4 py-4">
                <Row>
                  {summary?.map((getteamlogo) => [
                    <>
                      <Col xs={12} md={5} className="text-md-right">
                        {getteamlogo?.visitingteamresults?.visitingTeam?.map(
                          (visitingteam) => [
                            visitingteam.name === 'Manchester' ? (
                              <div>
                                <span className="visiting-team-name-logo">
                                  {visitingteam.mascot}
                                </span>
                                <img
                                  src={MLogo}
                                  alt="Manchester Lancers Logo"
                                  height="25"
                                />
                              </div>
                            ) : (
                              <div className="team-logo">
                                <span className="visiting-team-name-logo">
                                  {visitingteam.name}
                                </span>
                                <img
                                  src={visitingteam.image.asset.url}
                                  alt="team logo"
                                  height="25"
                                />
                              </div>
                            ),
                          ]
                        )}
                      </Col>
                      <Col
                        xs={12}
                        md={{ span: 5, offset: 2 }}
                        class="text-md-left"
                      >
                        {getteamlogo?.hometeamresults?.homeTeam?.map(
                          (hometeam) => [
                            hometeam.name === 'Manchester' ? (
                              <div>
                                <img
                                  src={MLogo}
                                  alt="Manchester Lancers Logo"
                                  height="25"
                                />
                                <span className="home-team-name-logo">
                                  {hometeam.mascot}
                                </span>
                              </div>
                            ) : (
                              <div className="team-logo">
                                <img
                                  src={hometeam.image.asset.url}
                                  alt="team logo"
                                  height="25"
                                />
                                <span className="home-team-name-logo">
                                  {hometeam.name}
                                </span>
                              </div>
                            ),
                          ]
                        )}
                      </Col>
                    </>,
                  ])}
                </Row>
                {summary?.map((getteamsummary) => [
                  <>
                    <Row className="my-4 align-items-center">
                      <Col sm={5}>
                        <Row>
                          <Col sm={9}>
                            <ProgressBar
                              variant="progressbar"
                              max="800"
                              now={getteamsummary?.visitingteamresults?.visitingTeam?.map(
                                (visitingteam) => [
                                  visitingteam.name === 'Manchester'
                                    ? `${passStats}`
                                    : '-',
                                ]
                              )}
                            />
                          </Col>
                          <Col sm={3}>
                            <span className="yards">
                              {getteamsummary?.visitingteamresults?.visitingTeam?.map(
                                (visitingteam) => [
                                  visitingteam.name === 'Manchester'
                                    ? `${passStats}`
                                    : '-',
                                ]
                              )}
                            </span>
                          </Col>
                        </Row>
                      </Col>

                      <Col sm={2} className="text-center">
                        <span className="label">Pass Yds</span>
                      </Col>

                      <Col sm={5}>
                        <Row>
                          <Col sm={3}>
                            <span className="yards">
                              {getteamsummary?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name === 'Manchester'
                                    ? `${passStats}`
                                    : '-',
                                ]
                              )}
                            </span>
                          </Col>
                          <Col sm={9}>
                            <ProgressBar
                              variant="progressbar"
                              max="800"
                              now={getteamsummary?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name === 'Manchester'
                                    ? `${passStats}`
                                    : '-',
                                ]
                              )}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="my-4 align-items-center">
                      <Col sm={5}>
                        <Row>
                          <Col sm={9}>
                            <ProgressBar
                              variant="progressbar"
                              max="800"
                              now={getteamsummary?.visitingteamresults?.visitingTeam?.map(
                                (visitingteam) => [
                                  visitingteam.name === 'Manchester'
                                    ? `${rushStats}`
                                    : '-',
                                ]
                              )}
                            />
                          </Col>
                          <Col sm={3}>
                            <span className="yards">
                              {getteamsummary?.visitingteamresults?.visitingTeam?.map(
                                (visitingteam) => [
                                  visitingteam.name === 'Manchester'
                                    ? `${rushStats}`
                                    : '-',
                                ]
                              )}
                            </span>
                          </Col>
                        </Row>
                      </Col>

                      <Col sm={2} className="text-center">
                        <span className="label">Rush Yds</span>
                      </Col>

                      <Col sm={5}>
                        <Row>
                          <Col sm={3}>
                            <span className="yards">
                              {getteamsummary?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name === 'Manchester'
                                    ? `${rushStats}`
                                    : '-',
                                ]
                              )}
                            </span>
                          </Col>
                          <Col sm={9}>
                            <ProgressBar
                              variant="progressbar"
                              max="800"
                              now={getteamsummary?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name === 'Manchester'
                                    ? `${rushStats}`
                                    : '-',
                                ]
                              )}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="my-4 align-items-center">
                      <Col sm={5}>
                        <Row>
                          <Col sm={9}>
                            <ProgressBar
                              variant="progressbar"
                              max="800"
                              now={getteamsummary?.visitingteamresults?.visitingTeam?.map(
                                (visitingteam) => [
                                  visitingteam.name === 'Manchester'
                                    ? `${totalOffense}`
                                    : '-',
                                ]
                              )}
                            />
                          </Col>
                          <Col sm={3}>
                            <span className="yards">
                              {getteamsummary?.visitingteamresults?.visitingTeam?.map(
                                (visitingteam) => [
                                  visitingteam.name === 'Manchester'
                                    ? `${totalOffense}`
                                    : '-',
                                ]
                              )}
                            </span>
                          </Col>
                        </Row>
                      </Col>

                      <Col sm={2} className="text-center">
                        <span className="label">Total Yds</span>
                      </Col>

                      <Col sm={5}>
                        <Row>
                          <Col sm={3}>
                            <span className="yards">
                              {getteamsummary?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name === 'Manchester'
                                    ? `${totalOffense}`
                                    : '-',
                                ]
                              )}
                            </span>
                          </Col>
                          <Col sm={9}>
                            <ProgressBar
                              variant="progressbar"
                              max="800"
                              now={getteamsummary?.hometeamresults?.homeTeam?.map(
                                (hometeam) => [
                                  hometeam.name === 'Manchester'
                                    ? `${totalOffense}`
                                    : '-',
                                ]
                              )}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>,
                ])}
              </Container>
            </Card>
          </div>
        </SummaryStyle>
      )}
    </>
  );
}

export default function GameSummary(props) {
  // eslint-disable-next-line react/destructuring-assignment
  return <Summary slug={props.slug} />;
}
