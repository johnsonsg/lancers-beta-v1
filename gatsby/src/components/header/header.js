import React from 'react';
import { Link } from 'gatsby';
import { Container, Row } from 'react-bootstrap';
import HeaderStyle from './header-style';
import Nav from '../menu/nav';

import Logo1 from '../../assets/images/LOGOBANNER.svg';
// import Logo1 from '../../assets/images/lancerfootball.svg';
import LogoBack from '../../assets/images/headerbackrepeat_v2.svg';

export default function Header() {
  return (
    <>
      <HeaderStyle>
        {/* <div className={header}> */}
        <div
          className="header"
          style={{
            backgroundImage: `url(${LogoBack})`,
            backgroundRepeat: `repeat`,
            backgroundPosition: `center center`,
            backgroundColor: `#05090f`,
          }}
        >
          <Container className="align-center">
            <Row className="justify-content-center py-2">
              <Link to="/" aria-label="Go to home">
                <img src={Logo1} alt="Lancers Logo" />
              </Link>
            </Row>
          </Container>
        </div>
      </HeaderStyle>
      <Nav />
    </>
  );
}
