import { GiAmericanFootballPlayer as icon } from '@react-icons/all-files/gi/GiAmericanFootballPlayer';
// import CustomComponent from '../../components/CustomComponent';

export default {
  // computer name
  name: 'roster',
  // visible title
  title: 'Roster',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Players Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'This will set the url to thier profile page',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'number',
      title: 'Players Number',
      type: 'number',
    },
    {
      title: 'Grade',
      name: 'playersgrade',
      type: 'string',
      options: {
        list: [
          { title: '8th', value: '8th' },
          { title: '9th', value: '9th' },
          { title: '10th', value: '10th' },
          { title: '11th', value: '11th' },
          { title: '12th', value: '12th' },
        ],
      },
    },
    {
      name: 'playerheight',
      title: 'Height',
      type: 'string',
      description: `ex. 6' 2"`,
    },
    {
      name: 'playerweight',
      title: 'Weight',
      type: 'string',
      description: 'Do not enter "lbs"',
    },
    {
      name: 'team',
      title: 'Team',
      type: 'array',
      description: 'Multi-Select if Needed',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Varsity', value: 'Varsity' },
          { title: 'JV', value: 'JV' },
        ],
      },
    },
    {
      title: 'Status',
      name: 'playerstatus',
      type: 'string',
      options: {
        list: [
          { title: 'Current', value: 'Current' },
          { title: 'Past', value: 'Past' },
        ],
      },
    },
    {
      name: 'positions',
      title: 'Positions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'positions' }] }],
    },
    {
      name: 'seasons',
      title: 'Seasons Played',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'seasons' }] }],
    },

    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // {
    //   title: 'Game Stats',
    //   name: 'playerstats',
    //   type: 'array',
    //   of: [{ type: 'gamestats' }],
    // },
  ],
};
