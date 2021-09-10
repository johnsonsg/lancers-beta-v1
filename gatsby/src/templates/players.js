/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { GiAmericanFootballPlayer } from '@react-icons/all-files/gi/GiAmericanFootballPlayer';
import { ImStatsBars } from '@react-icons/all-files/im/ImStatsBars';
import { GiTrophy } from '@react-icons/all-files/gi/GiTrophy';
import Box from '@material-ui/core/Box';
import Container from 'react-bootstrap/Container';
import PlayerInformation from '../components/players/players-card';
import Stats from '../components/players/player-stats';
import PlayerStyle from '../components/players/player-style';

function TabPanel(props) {
  const { children, value, index, ...tabs } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...tabs}
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function PlayerProfile({ ...other }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PlayerStyle>
      <Container>
        <PlayerInformation slug={other.pageContext.slug} />
        <AppBar position="static" elevation="0" color="white">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="scrollable force tabs example"
          >
            <Tab
              label="Stats"
              icon={<ImStatsBars size="1.4rem" />}
              {...a11yProps(0)}
            />
            <Tab
              label="Awards"
              icon={<GiTrophy size="1.4rem" />}
              {...a11yProps(1)}
            />
            <Tab
              label="Bio"
              icon={<GiAmericanFootballPlayer size="1.4rem" />}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <TabPanel className="mx-0 px-0" value={value} index={0}>
          <Stats slug={other.pageContext.slug} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Container>
    </PlayerStyle>
  );
}
