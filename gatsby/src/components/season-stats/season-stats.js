import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PassingStats from './season-passing';
import RushingStats from './season-rushing';
import SeasonStatsStyle from './season-stats-style';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: 'var(--orange)',
  },
}));

export default function SeasonStats() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SeasonStatsStyle>
      <Container className="my-5 px-0">
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="PASSING" {...a11yProps(0)} />
            <Tab label="RUSHING" {...a11yProps(1)} />
            <Tab label="RECEIVING" {...a11yProps(2)} />
            <Tab label="DEFENSIVE" {...a11yProps(3)} />
            <Tab label="PUNTING" {...a11yProps(4)} />
            <Tab label="KICKING" {...a11yProps(5)} />
          </Tabs>
          <TabPanel className="tab-panel" value={value} index={0}>
            <PassingStats />
          </TabPanel>
          <TabPanel className="tab-panel" value={value} index={1}>
            <RushingStats />
          </TabPanel>
          <TabPanel className="tab-panel" value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel className="tab-panel" value={value} index={3}>
            Item Three
          </TabPanel>
          <TabPanel className="tab-panel" value={value} index={4}>
            Item Three
          </TabPanel>
          <TabPanel className="tab-panel" value={value} index={5}>
            Item Three
          </TabPanel>
        </div>
      </Container>
    </SeasonStatsStyle>
  );
}
