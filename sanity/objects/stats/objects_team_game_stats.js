export default {
  name: 'teamstats',
  title: 'Team Stats',
  type: 'object',
  fieldsets: [
    {
      name: 'team',
      // title: 'Team Stats',
      title: false,
      options: {
        columns: 3, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],

  fields: [
    {
      name: 'time',
      title: 'Time of Possession',
      type: 'string',
      description: 'MM:SS',
      placeholder: '00:00',
      fieldset: 'team',
    },
    {
      name: 'netyards',
      type: 'number',
      title: 'Total Offense',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'total_rushing',
      type: 'number',
      title: 'Total Rushing',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'rush_attempts',
      type: 'number',
      title: 'Rush Attempts',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'avg_rush_yards',
      type: 'number',
      title: 'Avg Rushing',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'total_passing',
      type: 'number',
      title: 'Total Passing',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'pass_att',
      type: 'number',
      title: 'Passing Att',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'pass_comp',
      type: 'number',
      title: 'Passing Comp',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'avg_pass_yards',
      type: 'number',
      title: 'Avg Passing',
      description: 'Ignore for Mancheter',
      fieldset: 'team',
    },
    {
      name: 'rushing_touchdowns',
      type: 'number',
      title: 'Rushing TDs',
      fieldset: 'team',
    },
    {
      name: 'passing_touchdowns',
      type: 'number',
      title: 'Passing TDs',
      fieldset: 'team',
    },
    {
      name: 'other_touchdowns',
      type: 'number',
      title: 'Other TDs',
      fieldset: 'team',
    },
    {
      name: 'first_downs',
      type: 'number',
      title: '1st Downs',
      fieldset: 'team',
    },
    {
      name: 'third_down_att',
      type: 'number',
      title: '3rd Down Att',
      fieldset: 'team',
    },
    {
      name: 'third_down_conv',
      type: 'number',
      title: '3rd Down Conv',
      fieldset: 'team',
    },
    {
      name: 'fourth_down_att',
      type: 'number',
      title: '4th Down Att',
      fieldset: 'team',
    },
    {
      name: 'fourth_down_conv',
      type: 'number',
      title: '4th Down Conv',
      fieldset: 'team',
    },
    {
      name: 'penalties_num',
      type: 'number',
      title: 'Penalties - Num',
      fieldset: 'team',
    },
    {
      name: 'penalties_yds',
      type: 'number',
      title: 'Penalties - Yds',
      fieldset: 'team',
    },
    {
      name: 'turnovers',
      type: 'number',
      title: 'Num of Turnovers',
      fieldset: 'team',
    },
    {
      name: 'fumbles_lost',
      type: 'number',
      title: 'Fumbles Lost',
      fieldset: 'team',
    },
    {
      name: 'int_thrown',
      type: 'number',
      title: 'Int Thrown',
      fieldset: 'team',
    },
    {
      name: 'sacks_allowed',
      type: 'number',
      title: 'Sacks Allowed',
      fieldset: 'team',
    },
    {
      name: 'field_goals',
      type: 'number',
      title: 'Field Goals',
      fieldset: 'team',
    },
    {
      name: 'punts',
      type: 'number',
      title: 'Num of Punts',
      fieldset: 'team',
    },
    {
      name: 'return_yards',
      type: 'number',
      title: 'Net Return Yds',
      fieldset: 'team',
    },
    {
      name: 'punt_return',
      type: 'number',
      title: 'Punt Return Yds',
      fieldset: 'team',
    },
    {
      name: 'kickoff_return',
      type: 'number',
      title: 'Kickoff Return Yds',
      fieldset: 'team',
    },
    {
      name: 'int_return',
      type: 'number',
      title: 'Int Return Yds',
      fieldset: 'team',
    },
  ],

  options: {
    collapsible: false, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
    // columns: 1, // Defines a grid for the fields and how many columns it should have
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
