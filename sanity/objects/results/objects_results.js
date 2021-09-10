export default {
  name: 'score',
  title: 'Team Results',
  type: 'object',
  fieldsets: [
    {
      name: 'results',
      title: false,
      options: {
        columns: 6, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    {
      name: 'firstqtr',
      type: 'string',
      title: '1st',
      fieldset: 'results',
    },
    {
      name: 'secondqtr',
      type: 'string',
      title: '2nd',
      fieldset: 'results',
    },
    {
      name: 'thirdqtr',
      type: 'string',
      title: '3rd',
      fieldset: 'results',
    },
    {
      name: 'fourthqtr',
      type: 'string',
      title: '4th',
      fieldset: 'results',
    },
    {
      name: 'final',
      type: 'string',
      title: 'Final',
      fieldset: 'results',
    },
    {
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
      fieldset: 'results',
      of: [{ type: 'array' }],
      options: {
        list: [
          { title: 'Win', value: 'W' },
          { title: 'Loss', value: 'L' },
          { title: 'Scheduled', value: '' },
        ],
      },
    },
  ],
  options: {
    collapsible: false, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    // columns: 3, // Defines a grid for the fields and how many columns it should have
  },
};

// {
//   name: 'outcome',
//   title: 'Lancers Outcome?',
//   type: 'string',
//   // fieldset: 'hometeamresults',
//   of: [{ type: 'array' }],
//   options: {
//     list: [
//       { title: 'Win', value: 'W' },
//       { title: 'Loss', value: 'L' },
//     ],
//   },
// },
