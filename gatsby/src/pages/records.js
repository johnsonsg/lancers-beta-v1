import React from 'react';
import { Container } from 'react-bootstrap';
import Schedule from '../components/records/team-records';
import TitleDivider from '../components/title-divider/title-divider';

export default function TeamRecords() {
  return (
    <Container className="py-5">
      <TitleDivider name="Team Records" />
      <Schedule key="Records" />
    </Container>
  );
}
