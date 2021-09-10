import React from 'react';
import { Link } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { FaFacebook as Facebook } from '@react-icons/all-files/fa/FaFacebook';
import { AiFillTwitterCircle as Twitter } from '@react-icons/all-files/ai/AiFillTwitterCircle';
import { AiFillInstagram as Insta } from '@react-icons/all-files/ai/AiFillInstagram';
import { makeStyles } from '@material-ui/core/styles';
import FooterStyle from './footer-style';
import Logo from '../../assets/images/LogoFooter.svg';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '2rem',
    color: '#fff',
    borderRadius: '100px',
    padding: theme.spacing(2),
  },
}));
export default function Header() {
  const classes = useStyles();

  return (
    <>
      <FooterStyle>
        <div className="footer">
          <Container className="align-center">
            <Row className="justify-content-center py-2">
              <Link to="/" aria-label="Go to home">
                <img src={Logo} alt="Lancers Logo" />
              </Link>
            </Row>
            <Row>
              <Col className="text-center">
                <Button className={classes.button}>
                  <Facebook />
                </Button>
                <Button className={classes.button}>
                  <Twitter className="twitter" />
                </Button>
                <Button className={classes.button}>
                  <Insta />
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="copy">
          <Container>
            <Row>
              <Col>
                <span>@copyright 2021. All Rights Reserved</span>
              </Col>
            </Row>
          </Container>
        </div>
      </FooterStyle>
    </>
  );
}
