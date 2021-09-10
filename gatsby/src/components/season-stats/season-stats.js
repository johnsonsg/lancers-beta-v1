import React from 'react';
import { Container } from 'react-bootstrap';
import PassingStats from './season-passing';

export default function SeasonStats() {
  return (
    <Container className="px-0">
      <PassingStats />
    </Container>
  );
}
