import React from 'react';
import { Container } from 'react-bootstrap';
import TeamStyle from './team-style';

import Roster from '../roster/roster';
import TitleDivider from '../title-divider/title-divider';

export default function TeamRoster() {
  return (
    <TeamStyle>
      <Container className="py-5">
        <TitleDivider name="Team Roster" />
        <Roster />
      </Container>
    </TeamStyle>
  );
}
