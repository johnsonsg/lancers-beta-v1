import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewsStyle from './news-style';

export const GET_TEAM_NEWS = gql`
  query GetNewsData {
    allSanityNews {
      nodes {
        id
        slug {
          current
        }
        name
        image {
          asset {
            url
            fluid {
              src
            }
          }
        }
        customized {
          children {
            text
          }
        }
      }
    }
  }
`;

function TeamNews() {
  const { loading, error, data } = useQuery(GET_TEAM_NEWS, {
    fetchPolicy: 'no-cache',
  });

  const [postData, setPost] = useState(null);
  console.log('POST DATA', postData);

  useEffect(() => {
    if (!loading && data) {
      setPost(data.allSanityNews.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  return (
    <>
      {loading ? null : (
        <NewsStyle>
          <Container className="my-5">
            <Row>
              {postData?.map((blog) => (
                <Col md="auto">
                  <Card
                    className="py-3"
                    style={{ width: '18rem' }}
                    key={blog.name}
                  >
                    <Card.Img
                      variant="top"
                      src={blog?.image?.asset?.url}
                      alt={blog?.name}
                    />
                    <Card.Body>
                      <Card.Title>
                        <h2>{blog?.name}</h2>
                      </Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <div align="center">
                        <Link to={`/post/${blog?.slug?.current}`}>
                          <Button variant="primary">Go somewhere</Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </NewsStyle>
      )}
    </>
  );
}

export default function News() {
  return <TeamNews />;
}
