export default {
  name: 'receivingstats',
  title: 'Receiving Stats',
  type: 'object',
  fields: [
    // This section does not work correctly.  Ref note in Roster.js
    {
      name: 'player',
      type: 'array',
      title: 'Player',
      of: [
        {
          type: 'reference',
          to: [{ type: 'roster' }],
        },
      ],
    },
    {
      name: 'seasons',
      title: 'Season',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'seasons' }],
        },
      ],
    },
    {
      name: 'rec',
      type: 'number',
      title: 'REC',
    },
    {
      name: 'recyds',
      type: 'number',
      title: 'YDS',
    },
    {
      name: 'recavg',
      type: 'number',
      title: 'AVG',
    },
    {
      name: 'rectd',
      type: 'number',
      title: 'TD',
    },
  ],
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    columns: 1, // Defines a grid for the fields and how many columns it should have
  },
  preview: {
    select: {
      // title: 'game.0.title',
      title: 'player.0.name',
      subtitle: 'game.0.seasons.0.name',
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
