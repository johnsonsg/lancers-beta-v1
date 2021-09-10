import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import Avatar from '@material-ui/core/Avatar';
import { GiAmericanFootballPlayer } from '@react-icons/all-files/gi/GiAmericanFootballPlayer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import RosterStyle from './roster-style';
import GET_DATA from '../../data/getRosterData';

const columns = [
  {
    name: 'image',
    label: ' ',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'number',
    label: '#',
    options: {
      filter: false,
      sort: false,
      width: 50,
    },
  },
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true,
      // filterList: [],
      // If using Filter List, you need to comment out "filter: & sor:"
    },
  },
  {
    name: 'positionvalue',
    label: 'Position',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'playerheight',
    label: 'HT',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'playerweight',
    label: 'WT',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'team',
    label: 'Team',
    options: {
      // filter: true,
      // sort: true,
      // filterList: ['Varsity'],
      filterList: ['Varsity'],
    },
  },
  {
    name: 'grade',
    label: 'Grade',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'playerstatus',
    label: 'Status',
    options: {
      // filter: true,
      // sort: true,
      filterList: ['Current'],
    },
  },

  {
    name: 'profile',
    label: 'View Profile',
    options: {
      filter: false,
      sort: false,
    },
  },
];

const options = {
  filter: true,
  // onFilterChange: (changedColumn, filterList) => {
  //   console.log(changedColumn, filterList);
  // },
  selectableRows: 'none',
  pagination: false,
  elevation: 0,
  search: true,
  viewColumns: true,
};

// Function that filters players by year(season).
function TeamRoster() {
  const { loading, error, data } = useQuery(GET_DATA, {
    fetchPolicy: 'no-cache',
  });
  const [team, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityRoster.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  // Select option that uses the filter function displaying players by year.
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        width: '100%',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
      marginBottom: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const StyledButton = withStyles({
    root: {
      // background: 'linear-gradient(45deg, #FF640B 30%, #fa6f1b 90%)',
      background: 'rgba(255, 100, 5)',
      borderRadius: 50,
      border: 0,
      color: 'white',
      padding: '2px 20px',
      boxShadow:
        '0px 3px 1px -2px rgb(0 0 0 / 8%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 1px 5px 0px rgb(0 0 0 / 6%)',
      '&:hover': {
        background: '#ff8c26',
      },
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  // Create Filter To Filter BY Season
  // const filterTeam = (value) => {
  //   const filteredList = [];
  //   data.allSanityRoster.nodes.forEach((filter) => {
  //     let hasFilter = false;
  //     filter.seasons.forEach((season) => {
  //       if (season.name === value) {
  //         hasFilter = true;
  //       }
  //     });
  //     if (hasFilter) {
  //       filteredList.push(filter);
  //     }
  //   });
  //   setFilters(filteredList);
  // };

  const currentYear = new Date().getFullYear();
  console.log('CURRENT YEAR', currentYear);

  // Continue Filter Player List By Season
  // const [year, setYear] = React.useState(currentYear);

  // const handleChange = (event) => {
  //   setYear(event.target.value);
  // };

  // function TeamSeasons() {
  //   return (
  //     <FormControl variant="outlined" className={classes.formControl}>
  //       <InputLabel id="demo-simple-select-outlined-label">Season</InputLabel>
  //       <Select
  //         labelId="demo-simple-select-outlined-label"
  //         id="demo-simple-select-outlined"
  //         value={year}
  //         onChange={handleChange}
  //         label="Season"
  //       >
  //         {data.allSanitySeasons.nodes.map((season) => [
  //           <MenuItem
  //             key={season.id}
  //             value={`${season.name}`}
  //             onClick={() => filterTeam(`${season.name}`)}
  //           >
  //             {season.name}
  //           </MenuItem>,
  //         ])}
  //       </Select>
  //     </FormControl>
  //   );
  // }

  // Filter Team by Team Level Varsity / JV
  const [cols, setCols] = useState(columns); // This sets Cols to read filters being created to break down player. Only need this once for all filters.
  const [teamFilter, setTeamFilter] = useState('Varsity'); // Change this to 'Varsity' if you uncomment line 230 'const filterList = [value];'

  const onTeamFilter = ({ target: { value } }) => {
    setTeamFilter(value);
    const filteredCols = [...cols];
    // const filterList = [value];
    /*
    ** If you want to add a reset to "All", comment out line 230 and uncomment this function **
    let filterList = [];
    if (value !== 'All') {
      filterList = [value];
    }
    */
    let filterList = [];
    if (value !== 'All') {
      filterList = [value];
    }
    // Target the column to filter on.
    filteredCols[6].options.filterList = filterList;
    setCols(filteredCols);
  };

  function TeamLevel() {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Varsity/JV
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={onTeamFilter}
          value={teamFilter}
          label="Varsity/JV"
        >
          <MenuItem key="All" value="All">
            All Players
          </MenuItem>
          <MenuItem key="Varsity" value="Varsity">
            Varsity
          </MenuItem>
          <MenuItem key="JV" value="JV">
            Junior Varsity
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

  // Filter Player by Status "Current / Past"
  const [statusFilter, setStatusFilter] = useState('Current');

  const onStatusFilter = ({ target: { value } }) => {
    setStatusFilter(value);
    const filteredCols = [...cols];
    const filterList = [value];
    /*
    ** If you want to add a reset to "All", Remove line 228 and uncomment this function **
    let filterList = [];
    if (value !== 'All') {
      filterList = [value];
    }
    */
    // Target the column to filter on.
    filteredCols[8].options.filterList = filterList;
    setCols(filteredCols);
  };

  function TeamStatus() {
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={onStatusFilter}
          value={statusFilter}
          label="Status"
        >
          {/* <MenuItem key="All" value="All">
            All
          </MenuItem> */}
          <MenuItem key="Current" value="Current">
            Current
          </MenuItem>
          <MenuItem key="Past" value="Past">
            Past
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

  return (
    <>
      {loading ? null : (
        <>
          <Container className="px-0">
            <Row>
              <Col>
                <RosterStyle>
                  {/* <TeamSeasons /> */}
                  <TeamLevel />
                  <TeamStatus />

                  <MUIDataTable
                    className="mt-3"
                    // title="Varsity Team Roster"
                    data={team?.map((filter) => [
                      filter.image === null ? (
                        <GiAmericanFootballPlayer size={35} />
                      ) : (
                        <Avatar
                          key={filter.name}
                          alt={filter.name}
                          src={filter.image?.asset?.fixed?.src}
                        />
                        // <img
                        //   className="avatar"
                        //   src={filter.image?.asset?.fixed?.src}
                        //   alt="name of player"
                        // />
                      ),

                      `${filter.number}`,

                      // <Link to={`/player/${filter.slug.current}`}>
                      //   {filter.name}
                      // </Link>,

                      `${filter.name}`,

                      filter.positions
                        .map((position) => [`${position.positionvalue} `])
                        .join(', '),

                      filter.playerheight === null
                        ? ''
                        : `${filter.playerheight}`,

                      filter.playerweight === null
                        ? ''
                        : `${filter.playerweight}`,

                      filter.team === null ? '' : `${filter.team.join(' / ')}`,

                      filter.grade === null ? '' : `${filter.playersgrade}`,
                      // `${filter.seasons?.map((year) => [year.name])}`,

                      filter.playerstatus === null
                        ? ''
                        : `${filter.playerstatus}`,

                      // <Button
                      //   className={classes.button}
                      //   component={Link}
                      //   to={`/player/${filter.slug.current}`}
                      // >
                      //   <span className="text-white">View Player</span>
                      // </Button>,

                      <StyledButton
                        component={Link}
                        to={`/player/${filter.slug.current}`}
                      >
                        View Profile
                      </StyledButton>,
                    ])}
                    columns={cols}
                    options={options}
                  />
                </RosterStyle>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default function ExportRoster() {
  // console.log('DataTable:', roster);
  return <TeamRoster />;
}
