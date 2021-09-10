import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DividerStyle from './divider-style';
import Sponsor from '../sponsors/sponsors';

export default function TitleDivider(props) {
  // console.log(data);
  // const roster = data.roster.nodes;
  // const sponsorBrownsAuto = data.sponsorBrownsAuto.nodes;

  // eslint-disable-next-line react/destructuring-assignment
  const Title = props.name;

  return (
    <DividerStyle>
      <Container className="activemt-5 mb-3">
        <Row className="title-divider">
          <Col md={2} className="px-md-0">
            <h2>{Title}</h2>
          </Col>
          <Col md={{ span: 3, offset: 7 }} className="sponsor py-md-0 my-md-0">
            <div className="float-md-right">
              {/* <SponsorImage sponsorBrownsAuto={sponsorBrownsAuto} /> */}
              {/* <Sponsor /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </DividerStyle>
  );
}
