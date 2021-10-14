/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import React from 'react';
import Container from 'react-bootstrap/Container';
import PlayerInformation from '../components/players/players-card';
import Stats from '../components/players/player-stats';
import PlayerStyle from '../components/players/player-style';

export default function PlayerProfile({ ...other }) {
  return (
    <PlayerStyle>
      <Container>
        <PlayerInformation slug={other.pageContext.slug} />
        <Stats slug={other.pageContext.slug} />
      </Container>
    </PlayerStyle>
  );
}
