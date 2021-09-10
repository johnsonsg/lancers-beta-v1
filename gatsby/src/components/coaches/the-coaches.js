import React from 'react';
import { Container } from 'react-bootstrap';
import CoachesTeamStyle from './coaches-list-style';
import TitleDivider from '../title-divider/title-divider';
import CoachingList from './coaches-list';

export default function TeamRoster() {
  return (
    <CoachesTeamStyle>
      <Container className="py-5">
        <TitleDivider name="Coaching Staff" />
        <CoachingList />
      </Container>
    </CoachesTeamStyle>
  );
}
