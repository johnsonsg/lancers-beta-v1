export default {
  name: 'careerstats',
  title: 'Career Stats',
  type: 'object',
  fieldsets: [
    {
      name: 'career_stats',
      title: false,
      options: {
        columns: 5, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    {
      name: 'att',
      type: 'string',
      title: 'ATT',
      fieldset: 'career_stats',
    },
    {
      name: 'comp',
      type: 'string',
      title: 'COMP',
      fieldset: 'career_stats',
    },
    {
      name: 'yds',
      type: 'string',
      title: 'YDS',
      fieldset: 'career_stats',
    },
    {
      name: 'td',
      type: 'string',
      title: 'TD',
      fieldset: 'career_stats',
    },
    {
      name: 'int',
      type: 'string',
      title: 'INT',
      fieldset: 'career_stats',
    },
    {
      name: 'rate',
      type: 'string',
      title: 'RATE',
      fieldset: 'career_stats',
    },
    {
      name: 'ryds',
      type: 'string',
      title: 'YDS',
      fieldset: 'career_stats',
    },
    {
      name: 'ratt',
      type: 'string',
      title: 'ATT',
      fieldset: 'career_stats',
    },
    {
      name: 'rtd',
      type: 'string',
      title: 'TD',
      fieldset: 'career_stats',
    },
    {
      name: 'avg',
      type: 'string',
      title: 'AVG',
      fieldset: 'career_stats',
    },
  ],
  options: {
    collapsible: false, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    // columns: 3, // Defines a grid for the fields and how many columns it should have
  },
};
