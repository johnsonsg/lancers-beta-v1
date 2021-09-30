import React from 'react';
import { Container } from 'react-bootstrap';
import PassingStats from './season-passing';
import RushingStats from './season-rushing';

export default function SeasonStats() {
  return (
    <Container className="px-0">
      <PassingStats />
      <RushingStats />
    </Container>
  );
}
