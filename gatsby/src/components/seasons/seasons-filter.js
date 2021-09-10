import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GET_SEASON_DATA from '../../data/getSeasonsData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '100%',
      // padding: '0.55rem 0.90rem',
      // padding: theme.spacing(1),
      // margin: theme.spacing(1),
      // height: theme.spacing(16),
    },
  },

  button: {
    padding: '.35rem 1rem',
    borderRadius: '5rem',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    marginBottom: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function TeamSeasons() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_SEASON_DATA, {
    fetchPolicy: 'no-cache',
  });

  const [year, setFilters] = React.useState('');

  const handleChange = (event) => {
    setFilters(event.target.value);
  };

  const filterList = (value) => {
    const filteredList = [];
    data.allSanitySchedules.nodes.forEach((filter) => {
      let hasFilter = false;
      filter.seasons.forEach((season) => {
        if (season.name === value) {
          hasFilter = true;
        }
      });
      if (hasFilter) {
        filteredList.push(filter);
      }
    });
    setFilters(filteredList);
  };

  if (loading) return `Loading...`;
  if (error) return ` ${error}`;

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Season</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={year}
          onChange={handleChange}
          label="Season"
        >
          {/* 
          ** If you only want to show years that have players attached to them
          {data.allSanityRoster.nodes[0].seasons.map((season) => [ 
          */}
          {data.allSanitySeasons.nodes.map((season) => [
            <MenuItem
              key={season.id}
              value={`${season.name}`}
              onClick={() => filterList(`${season.name}`)}
            >
              {season.name}
            </MenuItem>,
          ])}
        </Select>
      </FormControl>
    </div>
  );
}

export default function SeasonsFilter() {
  return <TeamSeasons />;
}
