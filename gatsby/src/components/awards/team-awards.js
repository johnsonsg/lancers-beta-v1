/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

import AwardsStyle from './team-awards-style';

export const GET_TEAM_AWARDS = gql`
  query GetAwardsData {
    allSanityAwards(sort: { order: ASC, fields: order }) {
      nodes {
        order
        title
        awardsbyplayer {
          name
          player {
            name
            positions {
              positionvalue
            }
          }
          seasons {
            name
          }
        }
      }
    }
  }
`;

function TeamAwards() {
  const { loading, error, data } = useQuery(GET_TEAM_AWARDS, {
    fetchPolicy: 'no-cache',
  });

  const [awards, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityAwards.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  return (
    <>
      {loading ? null : (
        <AwardsStyle>
          <Container className="px-0 my-3">
            <Row>
              {awards?.map((filter) => [
                <Col md={12}>
                  <Paper elevation={1} className="my-3 p-4">
                    <div className="award-card">
                      <Row className="row-header">
                        <Col sm={12} md={10} className="align-self-center">
                          <h2>{filter.title}</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={8}>
                          <div className="labels">Name</div>
                        </Col>
                        <Col sm={12} md={4} className="text-md-right">
                          <div className="labels">Year</div>
                        </Col>
                      </Row>
                      {filter?.awardsbyplayer?.map((getplayers) => [
                        <Row className="awards-data">
                          <Col sm={12} md={8}>
                            <div className="award-data">
                              {getplayers.name
                                ? getplayers.name
                                : getplayers?.player?.map((playersname) => [
                                    playersname.name ? playersname.name : '',
                                  ])}
                            </div>
                          </Col>
                          <Col sm={12} md={4} className="text-md-right">
                            <div className="award-data">
                              {getplayers.seasons[0].name}
                            </div>
                          </Col>
                        </Row>,
                      ])}
                    </div>
                  </Paper>
                </Col>,
              ])}
            </Row>
          </Container>
        </AwardsStyle>
      )}
    </>
  );
}
export default function Stats() {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <TeamAwards />;
}
