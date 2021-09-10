import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import BoxScoreStyle from './box-score-style';
import MLogo from '../../assets/images/M.svg';
import LineElement from '../../assets/images/DiagonalElement.svg';

const BOXSCORE_DATA = gql`
  query GetGameData($slug: String!) {
    allSanitySchedules(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        week
        title
        slug {
          current
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

function BoxScore({ slug }) {
  const { loading, error, data } = useQuery(BOXSCORE_DATA, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [recap, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  // console.log('RECAP', recap);

  return (
    <>
      {loading ? null : (
        <BoxScoreStyle>
          <Container className="px-0 py-4">
            <Card border="light">
              <Card.Header>
                <span className="mr-2">BOX SCORE</span>
                <img src={LineElement} alt="element" />
              </Card.Header>
              <Container className="pb-3">
                <Row className="my-4">
                  <Col xs={3} md={6} />
                  <Col xs className="text-center qtr-wrapper">
                    <span className="qtr">1</span>
                  </Col>
                  <Col xs className="text-center qtr-wrapper">
                    <span className="qtr">2</span>
                  </Col>
                  <Col xs className="text-center qtr-wrapper">
                    <span className="qtr">3</span>
                  </Col>
                  <Col xs className="text-center qtr-wrapper">
                    <span className="qtr">4</span>
                  </Col>
                  <Col xs className="text-center qtr-wrapper">
                    <span className="qtr">T</span>
                  </Col>
                </Row>
                <Row className="my-3">
                  {recap?.map((visitors) => [
                    <>
                      <Col xs={3} md={6} className="team pl-md-4">
                        {visitors?.visitingteamresults?.visitingTeam?.map(
                          (visitingteam) => [
                            visitingteam?.name === 'Manchester' ? (
                              <>
                                <img src={MLogo} alt="Logo" />
                                <span className="lancers">
                                  {visitingteam.mascot}
                                </span>
                              </>
                            ) : (
                              // `${visitingteam.name}`
                              <>
                                <img
                                  src={visitingteam.image.asset.url}
                                  alt="team logo"
                                />
                                <span>{visitingteam.name}</span>
                              </>
                            ),
                          ]
                        )}
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {visitors.visitingteamresults.thescore.firstqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {visitors.visitingteamresults.thescore.secondqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {visitors.visitingteamresults.thescore.thirdqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {visitors.visitingteamresults.thescore.fourthqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {visitors.visitingteamresults.thescore.final}
                        </span>
                      </Col>
                    </>,
                  ])}
                </Row>
                <Row className="my-3">
                  {recap?.map((hometeam) => [
                    <>
                      <Col xs={3} md={6} className="team pl-md-4">
                        {hometeam?.hometeamresults?.homeTeam?.map(
                          (thehometeam) => [
                            thehometeam?.name === 'Manchester' ? (
                              <>
                                <img src={MLogo} alt="Logo" />
                                <span className="lancers">
                                  {thehometeam.mascot}
                                </span>
                              </>
                            ) : (
                              // `${thehometeam.name}`
                              <>
                                <img
                                  src={thehometeam.image.asset.url}
                                  alt="team logo"
                                  height="85px"
                                />
                                <span className="lancers">
                                  {thehometeam.name}
                                </span>
                              </>
                            ),
                          ]
                        )}
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {hometeam.hometeamresults.thescore.firstqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {hometeam.hometeamresults.thescore.secondqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {hometeam.hometeamresults.thescore.thirdqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {hometeam.hometeamresults.thescore.fourthqtr}
                        </span>
                      </Col>
                      <Col xs className="text-center">
                        <span className="score">
                          {hometeam.hometeamresults.thescore.final}
                        </span>
                      </Col>
                    </>,
                  ])}
                </Row>
              </Container>
            </Card>
          </Container>
        </BoxScoreStyle>
      )}
    </>
  );
}
export default function GameRecap(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <BoxScore slug={props.slug} />;
}
