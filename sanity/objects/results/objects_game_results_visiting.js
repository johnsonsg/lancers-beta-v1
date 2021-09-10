export default {
  name: 'thevisitingteamresults',
  title: 'Results',
  type: 'object',
  fieldsets: [
    {
      name: 'sectiontwo',
      title: false,
      options: {
        columns: 1, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    {
      name: 'visitingTeam',
      title: ' ',
      // fieldset: 'sectiontwo',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teams' }] }],
    },
    {
      name: 'thescore',
      title: 'Scoring & Results',
      type: 'score',
      // fieldset: 'sectiontwo',
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
    // columns: 3, // Defines a grid for the fields and how many columns it should have
  },
};
