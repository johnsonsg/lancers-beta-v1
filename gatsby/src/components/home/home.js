/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
// import Paper from '@material-ui/core/Paper';
import Sidebar from '../sidebar/sidebar';
import TeamRecord from './record';
import News from './news';
import BoxScore from './last-game';
import HomeStyle from './home-style';
import TitleDivider from '../title-divider/title-divider';
import Gallery from '../gallery/gallery';

export const GET_HOME_PAGE = gql`
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
    allSanityPhotos {
      nodes {
        id
        name
        gamephotos {
          images {
            asset {
              url
              label
              title
              id
              fluid {
                src
                srcSet
                base64
              }
            }
          }
        }
      }
    }
  }
`;

function HomePage() {
  const { loading, error, data } = useQuery(GET_HOME_PAGE, {
    fetchPolicy: 'no-cache',
  });

  const [home, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityAwards.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  const gallery = data?.allSanityPhotos?.nodes;

  console.log('GALLERY', gallery);
  return (
    <>
      {loading ? null : (
        <HomeStyle>
          <Container className="px-0 my-3">
            {gallery?.map((x) => x.id)}
            <Row>
              <Col md={8}>
                <BoxScore />
                <TeamRecord />
                {/* <Paper elevation={1} className="my-3 p-4">
                  <div className="award-card">HOME PAGE</div>
                </Paper> */}
                <TitleDivider name="Latest News" />
                <News />
                <TitleDivider name="Game Shots" />
                <Gallery />
              </Col>
              <Col md={4}>
                <Sidebar />
              </Col>
              ,
            </Row>
          </Container>
        </HomeStyle>
      )}
    </>
  );
}
export default function Home() {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <HomePage />;
}
