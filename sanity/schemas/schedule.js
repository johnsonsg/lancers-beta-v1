import { GiCalendar as icon } from '@react-icons/all-files/gi/GiCalendar';
// import MyCustomStringInput from '../components/CustomComponent';

export default {
  // computer name
  name: 'schedules',
  // visible title
  title: 'Schedule',
  type: 'document',
  icon,
  fieldsets: [
    {
      name: 'matchcol',
      title: false,
      options: {
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    // {
    //   name: 'customString',
    //   title: 'This is a cool custom string',
    //   type: 'string',
    //   inputComponent: MyCustomStringInput,
    // },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      placeholder: 'Manchester vs Opponents Name',
      description: 'Type: Manchester vs Opponents Name',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      description: '* Important: Do not change the slug once it is generated',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'week',
      title: 'Week',
      type: 'string',
      placeholder: 'Enter Week Number',
      description: 'Enter Week Number: ex. Week 1',
    },
    {
      name: 'seasons',
      title: 'Season',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'seasons' }] }],
    },
    {
      name: 'matchday',
      title: 'Matchday',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Monday', value: 'Mon' },
          { title: 'Thursday', value: 'Thurs' },
          { title: 'Friday', value: 'Fri' },
          { title: 'Saturday', value: 'Sat' },
        ],
      },
    },

    {
      name: 'datetime',
      title: 'Date and Time',
      type: 'datetime',
      options: {
        dateFormat: 'MM-DD-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'venue' }] }],
    },
    {
      title: 'Game Sponsored By',
      name: 'gamesponsor',
      type: 'array',
      description: 'Only one sponsor per game',
      of: [
        {
          type: 'reference',
          to: [{ type: 'sponsor' }],
        },
      ],
    },
    {
      name: 'hometeamresults',
      title: 'Home Team',
      type: 'thehometeamresults',
      fieldset: 'matchcol',
      initialValue: {
        time: '123',
      },
    },
    {
      name: 'visitingteamresults',
      title: 'Away Team',
      type: 'thevisitingteamresults',
      fieldset: 'matchcol',
    },

    {
      title: 'Player Stats',
      name: 'playerstats',
      type: 'array',
      of: [{ type: 'gamestats' }],
      // of: [{ type: 'gamestats' }, { type: 'passingstats' }],
      // this creates a select option
    },
    {
      title: 'Passing Stats',
      name: 'playerpassingstats',
      type: 'array',
      of: [{ type: 'passingstats' }],
    },
    {
      title: 'Rushing Stats',
      name: 'playerrushingstats',
      type: 'array',
      of: [{ type: 'rushingstats' }],
    },
    {
      title: 'Receiving Stats',
      name: 'playerreceivingstats',
      type: 'array',
      of: [{ type: 'receivingstats' }],
    },
    {
      title: 'Defensive Stats',
      name: 'playerdefensivestats',
      type: 'array',
      of: [{ type: 'defensestats' }],
    },
    {
      title: 'Punting Stats',
      name: 'playerpuntingstats',
      type: 'array',
      of: [{ type: 'puntstats' }],
    },
    {
      title: 'Field Goal Stats',
      name: 'playerfieldgoalstats',
      type: 'array',
      of: [{ type: 'fgstats' }],
    },
  ],

  preview: {
    select: {
      title: 'week',
      subtitle: 'title',
      date: 'datetime',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle,
      };
    },
  },
};
