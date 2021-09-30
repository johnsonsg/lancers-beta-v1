/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import React from 'react';
import Container from 'react-bootstrap/Container';
import NewsPost from '../components/news/news-post';

export default function SingleNewsPost({ ...other }) {
  return (
    <>
      <Container className="py-5">
        <NewsPost slug={other.pageContext.slug} />
      </Container>
    </>
  );
}
