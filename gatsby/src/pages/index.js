import React from 'react';
import { Container } from 'react-bootstrap';
// import TitleDivider from '../components/title-divider/title-divider';
import Home from '../components/home/home';

export default function HomePage() {
  return (
    <Container className="py-5">
      {/* <TitleDivider name="Home" /> */}
      <Home />
    </Container>
  );
}
