import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import RecordStyle from './record-style';
import MLogo from '../../assets/images/M.svg';
import LineElement from '../../assets/images/DiagonalElement.svg';

const TEAM_RECORD_DATA = gql`
  query {
    allSanitySchedules(sort: { fields: _updatedAt, order: DESC }, limit: 1) {
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

function TeamRecord() {
  const { loading, error, data } = useQuery(TEAM_RECORD_DATA, {
    fetchPolicy: 'no-cache',
  });
  const [record, setFilters] = useState();
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
        <RecordStyle>
          <Container className="px-0 py-4">
            <Card border="light">
              <Card.Header>
                <span className="mr-2">RECORD</span>
                <img src={LineElement} alt="element" />
              </Card.Header>
            </Card>
          </Container>
        </RecordStyle>
      )}
    </>
  );
}
export default function TheTeamsRecord() {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <TeamRecord />;
}
