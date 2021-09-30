import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import BlockContent from '@sanity/block-content-to-react';
import CoachesStyle from './coaches-style';
import LineElement from '../../assets/images/DiagonalElement.svg';

const COACHES_ROSTERS = gql`
  query GetCoachesData($slug: String!) {
    allSanityCoaches(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        _rawBio
        slug {
          current
        }
        name
        title
        email
        mobile
        phone
        image {
          asset {
            fixed(height: 10, width: 10) {
              src
              srcSet
              base64
            }
            url
          }
        }
        hero {
          asset {
            fluid {
              src
            }
          }
        }
        bio {
          children {
            text
          }
        }
      }
    }
  }
`;

function CoachesProfile({ slug }) {
  const { loading, error, data } = useQuery(COACHES_ROSTERS, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [coaches, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityCoaches.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  const body = coaches?.map((bios) => [
    bios?.bio?.map((info) => [info.children[0].text]),
  ]);
  const body2 = coaches?.map((bios) => [bios?._rawBio]);

  const heroImage = coaches?.map((image) => [`${image.hero.asset.fluid.src}`]);

  // const awayTeamLogo = recap?.map((getawayteam) => [
  //   getawayteam?.visitingteamresults?.visitingTeam?.map((visitingteam) => [
  //     ` ${visitingteam.image.asset.fluid.src}`,
  //   ]),
  // ]);

  return (
    <>
      {loading ? null : (
        <CoachesStyle>
          {coaches?.map((coach) => [
            <Container
              className="hero"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `top center`,
              }}
            >
              <Row>
                {coach?.image?.asset?.url ? (
                  <Col
                    xs={6}
                    md={3}
                    lg={2}
                    className="coachesImg"
                    style={{
                      background: `#d8d8d8 url(${coach?.image?.asset?.url})`,
                      height: `200px`,
                      width: `150px`,
                    }}
                  />
                ) : (
                  ''
                )}
              </Row>
              <Row className="bottom-bar">
                <Col
                  xs={12}
                  md={{ span: 9, offset: 2 }}
                  lg={{ span: 10, offset: 2 }}
                  className="text-xs-center align-self-center coachesName"
                >
                  <h2>{coach.name}</h2>
                </Col>
              </Row>
            </Container>,

            <Container>
              <Row className="info-bar">
                <Col
                  md={{ span: 5, offset: 2 }}
                  className="text-xs-center align-self-center"
                >
                  <h2>
                    <span>Title:</span>
                    {coach.title}
                  </h2>
                </Col>
                <Col md={5} className="text-xs-center align-self-center">
                  <h2>
                    <span>Email:</span>
                    {coach.email}
                  </h2>
                </Col>
              </Row>
            </Container>,

            <Container className="bio-body">
              <Row>
                <Col className="title-bar">
                  <h2 className="mr-2 align-self-center">
                    <span
                      style={{
                        textTransform: 'capitalize',
                        color: 'var(--orange)',
                      }}
                    >
                      About
                    </span>{' '}
                    <strong>{coach.name}</strong>{' '}
                    <img className="ml-2" src={LineElement} alt="element" />{' '}
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col className="coachesInfo my-4">
                  {/* {body} */}
                  <BlockContent blocks={coach._rawBio} />
                </Col>
              </Row>
            </Container>,
          ])}
        </CoachesStyle>
      )}
    </>
  );
}

export default function CoachesInfo(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <CoachesProfile slug={props.slug} />;
}
