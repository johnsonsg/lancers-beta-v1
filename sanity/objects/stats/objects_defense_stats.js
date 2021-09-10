export default {
  name: 'defensestats',
  title: 'Defensive Stats',
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
      name: 'dsolo',
      type: 'number',
      title: 'SOLO',
    },
    {
      name: 'dasst',
      type: 'string',
      title: 'AST',
    },
    {
      name: 'dsck',
      type: 'number',
      title: 'SCK',
    },
    {
      name: 'dtotal',
      type: 'number',
      title: 'TOT',
    },
    {
      name: 'dint',
      type: 'number',
      title: 'INT',
    },
    {
      name: 'dfrec',
      type: 'number',
      title: 'FREC',
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
