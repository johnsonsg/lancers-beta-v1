import React from 'react';
import { Container } from 'react-bootstrap';
import SeasonStats from '../components/season-stats/season-stats';
import TitleDivider from '../components/title-divider/title-divider';

export default function GetTeamStats() {
  return (
    <Container className="py-5">
      <TitleDivider name="Season Stats" />
      <SeasonStats />
    </Container>
  );
}
