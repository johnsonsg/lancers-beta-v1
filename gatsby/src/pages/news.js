import React from 'react';
import { Container } from 'react-bootstrap';
import News from '../components/news/news';
import TitleDivider from '../components/title-divider/title-divider';

export default function TeamNews() {
  return (
    <Container className="py-5">
      <TitleDivider name="Team News" />
      <News key="Blog Posts" />
    </Container>
  );
}
