import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople';
import { FaAdversal } from '@react-icons/all-files/fa/FaAdversal';
import { FaRegNewspaper } from '@react-icons/all-files/fa/FaRegNewspaper';
import { IoIosStats } from '@react-icons/all-files/io/IoIosStats';
import { FaCameraRetro } from '@react-icons/all-files/fa/FaCameraRetro';
import { GiTrophy } from '@react-icons/all-files/gi/GiTrophy';
import { FaAward } from '@react-icons/all-files/fa/FaAward';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';
import SideDrawerStyle from './side-drawer-style';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    color: 'white',
  },
  paper: {
    backgroundColor: '#343B3F',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <SideDrawerStyle>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <IoIosPeople />
            </ListItemIcon>
            <ListItemText>
              <Link Link to="/schedule">
                Boosters
              </Link>
            </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <FaAdversal />
            </ListItemIcon>
            <ListItemText>
              <Link Link to="/schedule">
                Sponsors
              </Link>
            </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <FaRegNewspaper />
            </ListItemIcon>
            <ListItemText>
              <Link Link to="/schedule">
                News
              </Link>
            </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <IoIosStats />
            </ListItemIcon>
            <ListItemText>
              <Link Link to="/stats">
                Stats
              </Link>
            </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <FaCameraRetro />
            </ListItemIcon>
            <ListItemText>
              <Link Link to="/schedule">
                Photos
              </Link>
            </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <GiTrophy />
            </ListItemIcon>
            <ListItemText>
              <Link Link to="/records">
                Records
              </Link>
            </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <FaAward />
            </ListItemIcon>
            <ListItemText>
              <Link Link to="/awards">
                Awards
              </Link>
            </ListItemText>
          </ListItem>
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </div>
    </SideDrawerStyle>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            classes={{
              root: classes.root, // class name, e.g. `root-x`
            }}
            onClick={toggleDrawer(anchor, true)}
          >
            <IoIosMenu size={30} /> Menu
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            classes={{ paper: classes.paper }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
