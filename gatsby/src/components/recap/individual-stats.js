import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import IndividualStatsStyle from './individual-stats-style';
import LineElement from '../../assets/images/DiagonalElement.svg';
import PassingStats from '../stats/passing-stats';
import RushingStats from '../stats/rushing-stats';
import ReceivingStats from '../stats/receiving-stats';

const INDIVIDUALSTATS_DATA = gql`
  query GetIndividualStatsData($slug: String!) {
    allSanitySchedules(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        week
        title
        slug {
          current
        }
        playerstats {
          passyds
          recyds
          rushyds
          player {
            name
          }
        }
        seasons {
          name
        }
        matchday
        datetime(formatString: "MM/DD")
        location {
          name
        }
        hometeamresults {
          homeTeam {
            name
            image {
              asset {
                fixed(width: 50) {
                  base64
                  src
                  srcSet
                }
                fluid(maxWidth: 50) {
                  base64
                  src
                  srcSet
                }
                url
                title
              }
            }
          }
          thescore {
            firstqtr
            secondqtr
            thirdqtr
            fourthqtr
            final
            outcome
          }
        }
        visitingteamresults {
          visitingTeam {
            name
            image {
              asset {
                fixed(width: 50) {
                  base64
                  src
                  srcSet
                }
                fluid(maxWidth: 50) {
                  base64
                  src
                  srcSet
                }
                url
                title
              }
            }
          }
          thescore {
            firstqtr
            secondqtr
            thirdqtr
            fourthqtr
            final
            outcome
          }
        }
      }
    }
  }
`;

function IndividualStats({ slug }) {
  const { loading, error, data } = useQuery(INDIVIDUALSTATS_DATA, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [individualStats, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  // console.log('INDIVIDUALSTATS', individualStats);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {loading ? null : (
        <IndividualStatsStyle>
          <Card border="light">
            <Card.Header>
              <span className="mr-2">Lancer Stats</span>{' '}
              <img src={LineElement} alt="element" />
            </Card.Header>
            <AppBar
              position="static"
              elevation={0}
              color="primary"
              className="mb-4"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >
                <Tab value="one" label="Offense" {...a11yProps('one')} />
                <Tab value="two" label="Defense" {...a11yProps('two')} />
                <Tab
                  value="three"
                  label="Special Teams"
                  {...a11yProps('two')}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
              {/* {individualStats?.map((filter) => [
                filter.playerstats.map((getpass) => [
                  getpass.passyds === null ? (
                    ''
                  ) : (
                    <div>
                      {getpass.player[0].name} {getpass.passyds}
                    </div>
                  ),
                ]),
              ])} */}
              <PassingStats slug={slug} />
              <RushingStats slug={slug} />
              <ReceivingStats slug={slug} />
              {/* <ReceivingStats /> */}
            </TabPanel>
            <TabPanel value={value} index="two">
              Item Two
            </TabPanel>
            <TabPanel value={value} index="three">
              Item Three
            </TabPanel>
          </Card>
        </IndividualStatsStyle>
      )}
    </>
  );
}
export default function theIndividualStats(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <IndividualStats slug={props.slug} />;
}
