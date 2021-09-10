export default {
  name: 'gamestats',
  title: 'Game Stats',
  type: 'object',
  fieldsets: [
    {
      name: 'offense',
      title: 'Offense',
      // title: false,
      options: {
        columns: 6, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'defense',
      title: 'Defense',
      // title: false,
      options: {
        columns: 6, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'fg',
      title: 'Field Goal',
      // title: false,
      options: {
        columns: 6, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'punt',
      // title: false,
      title: 'Punt',
      options: {
        columns: 6, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'returns',
      // title: false,
      title: 'Returns',
      options: {
        columns: 6, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],

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
      name: 'game',
      type: 'array',
      title: 'Game',
      of: [
        {
          type: 'reference',
          to: [{ type: 'schedules' }],
        },
      ],
    },
    {
      name: 'passatt',
      type: 'number',
      title: 'ATT',
      fieldset: 'offense',
    },
    {
      name: 'passcomp',
      type: 'number',
      title: 'COMP',
      fieldset: 'offense',
    },
    {
      name: 'passyds',
      type: 'number',
      title: 'YDS',
      fieldset: 'offense',
    },
    {
      name: 'passtd',
      type: 'number',
      title: 'TD',
      fieldset: 'offense',
    },
    {
      name: 'passint',
      type: 'number',
      title: 'INT',
      fieldset: 'offense',
    },
    {
      name: 'rushyds',
      type: 'number',
      title: 'YDS',
      fieldset: 'offense',
    },
    {
      name: 'rushatt',
      type: 'number',
      title: 'ATT',
      fieldset: 'offense',
    },
    {
      name: 'rushtd',
      type: 'number',
      title: 'TD',
      fieldset: 'offense',
    },
    {
      name: 'rushavg',
      type: 'number',
      title: 'AVG',
      fieldset: 'offense',
    },
    {
      name: 'rec',
      type: 'number',
      title: 'REC',
      fieldset: 'offense',
    },
    {
      name: 'recyds',
      type: 'number',
      title: 'YDS',
      fieldset: 'offense',
    },
    {
      name: 'recavg',
      type: 'number',
      title: 'AVG',
      fieldset: 'offense',
    },
    {
      name: 'rectd',
      type: 'number',
      title: 'TD',
      fieldset: 'offense',
    },
    {
      name: 'dsolo',
      type: 'number',
      title: 'SOLO',
      fieldset: 'defense',
    },
    {
      name: 'dasst',
      type: 'string',
      title: 'AST',
      fieldset: 'defense',
    },
    {
      name: 'dsck',
      type: 'number',
      title: 'SCK',
      fieldset: 'defense',
    },
    {
      name: 'dtotal',
      type: 'number',
      title: 'TOT',
      fieldset: 'defense',
    },
    {
      name: 'dint',
      type: 'number',
      title: 'INT',
      fieldset: 'defense',
    },
    {
      name: 'dfrec',
      type: 'number',
      title: 'FREC',
      fieldset: 'defense',
    },
    {
      name: 'made',
      type: 'number',
      title: 'M',
      fieldset: 'fg',
    },
    {
      name: 'fgattp',
      type: 'number',
      title: 'A',
      fieldset: 'fg',
    },
    {
      name: 'pct',
      type: 'number',
      title: 'PCT',
      fieldset: 'fg',
    },
    {
      name: 'punts',
      type: 'number',
      fieldset: 'punt',
    },
    {
      name: 'pyds',
      type: 'number',
      title: 'YDS',
      fieldset: 'punt',
    },
    {
      name: 'pavg',
      type: 'number',
      title: 'AVG',
      fieldset: 'punt',
    },
    {
      name: 'returnyds',
      type: 'number',
      title: 'YDS',
      fieldset: 'returns',
    },
    {
      name: 'returnatt',
      type: 'number',
      title: 'ATT',
      fieldset: 'returns',
    },
    {
      name: 'returnavg',
      type: 'number',
      title: 'AVG',
      fieldset: 'returns',
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
