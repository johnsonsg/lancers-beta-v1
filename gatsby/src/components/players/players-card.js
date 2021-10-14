import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { GiAmericanFootballPlayer } from '@react-icons/all-files/gi/GiAmericanFootballPlayer';
import { Button } from '@material-ui/core';
import PlayerStyle from './player-style';
import Hudl from '../../assets/images/mark-hudl.png';
import LogoBack from '../../assets/images/lancerfootball_v2.jpeg';

import GET_PLAYER from '../../data/getPlayerCardData';

function PlayersCard({ slug }) {
  // console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_PLAYER, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [player, setFilters] = useState();
  console.log('PLAYER', player);

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityRoster.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  // const currentYear = new Date().getFullYear();
  // console.log('CURRENT YEAR', currentYear);

  // const prevYear = new Date().getFullYear() - 1;
  // console.log('PREV YEAR', prevYear);

  return (
    <>
      {loading ? null : (
        <PlayerStyle>
          <Paper elevation={1} className="my-5">
            <Container>
              <Row>
                {player?.map((players) => [
                  players?.image?.asset?.url ? (
                    <Col
                      md={5}
                      className="playerImg"
                      style={{
                        background: `#d8d8d8 url(${players?.image?.asset?.url})`,
                      }}
                    />
                  ) : (
                    <Col md={5} className="playerNoImg text-center">
                      <GiAmericanFootballPlayer fill="#EEEEEE" size={100} />
                    </Col>
                  ),
                ])}

                <Col
                  md={7}
                  className="playerInfo"
                  style={{
                    backgroundColor: '#091426',
                    backgroundImage: `url(${LogoBack})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    padding: '0rem',
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(9, 20, 38, 0.6)',
                      width: '100%',
                      height: '100%',
                      padding: '1.5rem 3rem',
                    }}
                  >
                    <Row>
                      <Col className="text-left">
                        <h2>
                          {player?.map((players) => [`${players?.name}`])}
                        </h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="mt-1 mb-2 text-left">
                        <span className="position">
                          {player?.map((players) => [
                            `${players?.positions[0]?.positionvalue}`,
                          ])}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="mb-4 text-left">
                        <span className="number align-top">
                          # {player?.map((players) => [`${players?.number}`])}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} className="text-left">
                        <span className="info-titles">Grade:</span>
                        <span className="info-txt">
                          {player?.map((players) => [
                            players.playersgrade === null
                              ? ''
                              : `${players?.playersgrade}`,
                          ])}
                        </span>
                      </Col>
                      <Col xs={6} className="text-left">
                        <span className="info-team">
                          <strong>
                            {player?.map((players) => [
                              players.team === null ? '' : `${players?.team}`,
                            ])}
                          </strong>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} className="text-left">
                        <span className="info-titles">Height:</span>
                        <span className="info-txt">
                          {player?.map((players) => [
                            players.playerheight === null
                              ? ''
                              : `${players?.playerheight}`,
                          ])}
                        </span>
                      </Col>
                      <Col xs={6} className="text-left">
                        <span className="info-titles"> Weight: </span>
                        <span className="info-txt">
                          {player?.map((players) => [
                            players.playerweight === null
                              ? ''
                              : `${players?.playerweight} lbs`,
                          ])}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        className="hudl-btn mt-4 py-2"
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        to="#"
                      >
                        <span style={{ textTransform: 'lowercase' }}>
                          <img src={Hudl} width="20" height="20" alt="hudl" />
                          <span className="ml-2">hudl</span>
                        </span>
                      </Button>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </Paper>
        </PlayerStyle>
      )}
    </>
  );
}
export default function PlayersInfo(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <PlayersCard slug={props.slug} />;
}
