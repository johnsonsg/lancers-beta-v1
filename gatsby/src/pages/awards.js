import React from 'react';
import { Container } from 'react-bootstrap';
import Schedule from '../components/awards/team-awards';
import TitleDivider from '../components/title-divider/title-divider';

export default function TeamAwards() {
  return (
    <Container className="py-5">
      <TitleDivider name="Awards & Honors" />
      <Schedule key="Awards" />
    </Container>
  );
}
