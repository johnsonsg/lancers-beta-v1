import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderStyle from './game-recap-header-style';
import MLogo from '../../assets/images/M.svg';

const SCOREBOARD_HEADER = gql`
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
                fluid {
                  aspectRatio
                  base64
                  srcSet
                  src
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

function ScoreBoardHeader({ slug }) {
  const { loading, error, data } = useQuery(SCOREBOARD_HEADER, {
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

  const awayTeamLogo = recap?.map((getawayteam) => [
    getawayteam?.visitingteamresults?.visitingTeam?.map((visitingteam) => [
      ` ${visitingteam.image.asset.fluid.src}`,
    ]),
  ]);

  const homeTeamLogo = recap?.map((gethometeam) => [
    gethometeam?.hometeamresults?.homeTeam?.map((hometeam) => [
      ` ${hometeam.image.asset.fluid.src}`,
    ]),
  ]);

  return (
    <>
      {loading ? null : (
        <HeaderStyle>
          <Container>
            <Row>
              <Col
                className="d-flex justify-content-md-end logos"
                style={{
                  backgroundImage: `url(${awayTeamLogo})`,
                  backgroundSize: `70%`,
                  backgroundRepeat: `no-repeat`,
                  backgroundPosition: `left`,
                }}
              >
                <Row>
                  <Col
                    xs={12}
                    sm="auto"
                    md="auto"
                    className="align-self-center"
                  >
                    {recap?.map((getawayteam) => [
                      getawayteam?.visitingteamresults?.visitingTeam?.map(
                        (visitingteam) => [
                          <div className="team-titles">
                            <h2>{visitingteam.name}</h2>
                            <h3>{visitingteam.mascot}</h3>
                          </div>,
                        ]
                      ),
                    ])}
                  </Col>
                  <Col xs={6} sm="auto" md="auto" className="align-self-center">
                    {recap?.map((getawayteam) => [
                      getawayteam?.visitingteamresults?.visitingTeam?.map(
                        (visitingteam) => [
                          visitingteam.name === 'Manchester' ? (
                            <img
                              src={MLogo}
                              alt="Manchester Lancers Logo"
                              className="team-logo"
                            />
                          ) : (
                            <div className="team-logo">
                              <img
                                src={visitingteam.image.asset.url}
                                alt="team logo"
                                className="team-logo"
                              />
                            </div>
                          ),
                        ]
                      ),
                    ])}
                  </Col>
                  <Col xs={6} sm="auto" md="auto" className="align-self-center">
                    {recap?.map((visitors) => [
                      <div className="final-score text-right">
                        <span className="align-text-top">
                          {visitors.visitingteamresults.thescore.final}
                        </span>
                      </div>,
                    ])}
                  </Col>
                </Row>
              </Col>
              <Col
                xs={12}
                sm={2}
                className="d-flex justify-content-md-center align-self-center"
              >
                <span className="final-txt">FINAL</span>
              </Col>
              <Col
                className="d-flex justify-content-md-start logos"
                style={{
                  backgroundImage: `url(${homeTeamLogo})`,
                  backgroundSize: `70%`,
                  backgroundRepeat: `no-repeat`,
                  backgroundPosition: `right`,
                }}
              >
                <Row>
                  <Col
                    xs={12}
                    sm="auto"
                    md="auto"
                    className="align-self-center"
                  >
                    {recap?.map((hometeam) => [
                      <div className="final-score">
                        <span className="align-text-top">
                          {hometeam.hometeamresults.thescore.final}
                        </span>
                      </div>,
                    ])}
                  </Col>
                  <Col xs={6} sm="auto" md="auto" className="align-self-center">
                    {recap?.map((home) => [
                      home?.hometeamresults?.homeTeam?.map((hometeam) => [
                        hometeam.name === 'Manchester' ? (
                          <img
                            src={MLogo}
                            alt="Manchester Lancers Logo"
                            className="team-logo"
                          />
                        ) : (
                          <div className="team-logo">
                            <img
                              src={hometeam.image.asset.url}
                              alt="team logo"
                              className="team-logo"
                            />
                          </div>
                        ),
                      ]),
                    ])}
                  </Col>
                  <Col xs={6} sm="auto" md="auto" className="align-self-center">
                    {recap?.map((home) => [
                      home?.hometeamresults?.homeTeam?.map((hometeam) => [
                        <div className="team-titles">
                          <h2>{hometeam.name}</h2>
                          <h3>{hometeam.mascot}</h3>
                        </div>,
                      ]),
                    ])}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </HeaderStyle>
      )}
    </>
  );
}
export default function GameRecap(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <ScoreBoardHeader slug={props.slug} />;
}
