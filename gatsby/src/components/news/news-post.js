import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import BlockContent from '@sanity/block-content-to-react';
import NewsStyle from './news-style';

const SINGLE_NEWS_POST = gql`
  query GetNewsPostData($slug: String!) {
    allSanityNews(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        _rawCustomized
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
          _rawChildren
          children {
            text
          }
        }
      }
    }
  }
`;

function NewsPost({ slug }) {
  const { loading, error, data } = useQuery(SINGLE_NEWS_POST, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [post, setPost] = useState();
  console.log('POST', post);

  useEffect(() => {
    if (!loading && data) {
      setPost(data.allSanityNews.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  // const bodyContent = post?.map((body) => [
  //   body?.customized?.map((content) => [content._rawChildren[0].text]),
  // ]);
  // console.log('BODY', bodyContent);

  return (
    <>
      {loading ? null : (
        <NewsStyle>
          {post?.map((news) => [
            <Container>
              <Row>
                <Col>
                  <h1>{news?.name}</h1>
                  <div>
                    <BlockContent blocks={news._rawCustomized} />
                  </div>
                </Col>
              </Row>
            </Container>,
          ])}
        </NewsStyle>
      )}
    </>
  );
}

export default function SingleNewsPost(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <NewsPost slug={props.slug} />;
}
