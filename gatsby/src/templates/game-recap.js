import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GameRecapStyle from '../components/recap/game-recap-style';
import ScoreBoardHeader from '../components/recap/game-recap-header';
import BoxScore from '../components/recap/box-score';
import Summary from '../components/recap/summary';
import TeamStats from '../components/recap/team-stats';
import IndividualStats from '../components/recap/individual-stats';
import TitleDivider from '../components/title-divider/title-divider';

export default function GameRecapPage({ ...other }) {
  return (
    <GameRecapStyle>
      <ScoreBoardHeader slug={other.pageContext.slug} />
      <TitleDivider name="The Game" />
      <Container className="px-md-0">
        <Row>
          <Col xs={12} md={7}>
            <BoxScore slug={other.pageContext.slug} />
            <Summary slug={other.pageContext.slug} />
            <IndividualStats slug={other.pageContext.slug} />
          </Col>
          <Col xs={12} md={5}>
            <TeamStats slug={other.pageContext.slug} />
          </Col>
        </Row>
      </Container>
    </GameRecapStyle>
  );
}
