/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

import RecordsStyle from './team-records-style';

export const GET_TEAM_RECORDS = gql`
  query GetRecordsData {
    allSanityRecords {
      nodes {
        recordtype
        title
        lancerrecords {
          name
          recordnumber
          seasonsplayed
          player {
            name
          }
        }
      }
    }
  }
`;

function TeamRecords() {
  const { loading, error, data } = useQuery(GET_TEAM_RECORDS, {
    fetchPolicy: 'no-cache',
  });

  const [records, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityRecords.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  return (
    <>
      {loading ? null : (
        <RecordsStyle>
          <Container className="px-0 my-3">
            <Row>
              <Col md={6}>
                {records?.map((filter) => [
                  filter?.recordtype[0] === 'Individual' ? (
                    <Paper elevation={1} className="my-3 p-4">
                      <div className="record-card">
                        <Row className="row-header">
                          <Col xs={8} className="align-self-center">
                            <h2>{filter.title}</h2>
                          </Col>
                          <Col xs={4} className="text-right">
                            <span className="record-number">
                              {filter.lancerrecords[0].recordnumber}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={8}>
                            <div className="labels">Name</div>
                          </Col>
                          <Col xs={4} className="text-right">
                            <div className="labels">Year</div>
                          </Col>
                        </Row>
                        {filter?.lancerrecords?.map((getplayers) => [
                          <Row>
                            <Col xs={6}>
                              <div className="record-data">
                                {getplayers.name
                                  ? getplayers.name
                                  : getplayers?.player?.map((playersname) => [
                                      playersname.name ? playersname.name : '',
                                    ])}
                              </div>
                            </Col>
                            <Col xs={6} className="text-right">
                              <div className="record-data">
                                {getplayers.seasonsplayed}
                              </div>
                            </Col>
                          </Row>,
                        ])}
                      </div>
                    </Paper>
                  ) : null,
                ])}
              </Col>

              <Col md={6}>
                {records?.map((filter) => [
                  filter?.recordtype[0] === 'Team' ? (
                    <Paper elevation={1} className="my-3 p-4">
                      <div className="record-card">
                        <Row className="row-header">
                          <Col xs={8} className="align-self-center">
                            <h2>{filter.title}</h2>
                          </Col>
                          <Col xs={4} className="text-right">
                            <span className="record-number">
                              {filter.lancerrecords[0].recordnumber}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="labels">Year</div>
                          </Col>
                        </Row>
                        {filter?.lancerrecords?.map((getplayers) => [
                          <Row>
                            <Col>
                              <div className="record-data">
                                {getplayers.seasonsplayed}
                              </div>
                            </Col>
                          </Row>,
                        ])}
                      </div>
                    </Paper>
                  ) : null,
                ])}
              </Col>
            </Row>
          </Container>
        </RecordsStyle>
      )}
    </>
  );
}
export default function Stats() {
  // eslint-disable-next-line react/destructuring-assignment
  return <TeamRecords />;
}
