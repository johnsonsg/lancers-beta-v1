export default {
  name: 'teamrecord',
  title: 'Team Record',
  type: 'object',
  fields: [
    // This section does not work correctly.  Ref note in Roster.js
    {
      name: 'player',
      type: 'array',
      title: 'Player',
      description: 'If Player is not listed, please fill in the name below.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'roster' }],
        },
      ],
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'seasonsplayed',
      title: 'Season Played',
      type: 'string',
    },
    {
      name: 'recordnumber',
      title: 'Record',
      type: 'string',
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
      subtitle: 'name',
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
