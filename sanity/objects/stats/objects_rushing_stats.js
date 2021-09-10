export default {
  name: 'rushingstats',
  title: 'Rushing Stats',
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
      name: 'rushyds',
      type: 'number',
      title: 'YDS',
    },
    {
      name: 'rushatt',
      type: 'number',
      title: 'ATT',
    },
    {
      name: 'rushtd',
      type: 'number',
      title: 'TD',
    },
    {
      name: 'rushavg',
      type: 'number',
      title: 'AVG',
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
