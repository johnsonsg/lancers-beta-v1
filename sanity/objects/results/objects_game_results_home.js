export default {
  name: 'thehometeamresults',
  title: 'Results',
  type: 'object',
  fieldsets: [
    {
      name: 'sectionhome',
      title: false,
      options: {
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    {
      name: 'homeTeam',
      title: ' ',
      // fieldset: 'sectionhome',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teams' }] }],
    },
    {
      name: 'thescore',
      title: 'Scoring & Results',
      type: 'score',
      // fieldset: 'sectionhome',
    },
    {
      name: 'teamgamestats',
      title: 'Team Game Stats',
      type: 'teamstats',
      // fieldset: 'sectionhome',
    },
  ],
  options: {
    collapsible: false, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
  },
};
