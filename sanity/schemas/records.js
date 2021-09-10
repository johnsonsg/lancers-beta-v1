import { GiAmericanFootballBall as icon } from '@react-icons/all-files/gi/GiAmericanFootballBall';

export default {
  // computer name
  name: 'records',
  // visible title
  title: 'Team Records',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    // {
    //   name: 'slug',
    //   title: 'slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 100,
    //   },
    // },
    {
      name: 'recordtype',
      title: 'Record Type',
      type: 'array',
      description: 'Multi-Select if Needed',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Individual', value: 'Individual' },
          { title: 'Team', value: 'Team' },
        ],
      },
    },
    {
      title: 'Records',
      name: 'lancerrecords',
      type: 'array',
      of: [{ type: 'teamrecord' }],
    },
  ],
};
