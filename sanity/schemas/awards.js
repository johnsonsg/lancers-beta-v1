import { GiAmericanFootballBall as icon } from '@react-icons/all-files/gi/GiAmericanFootballBall';

export default {
  // computer name
  name: 'awards',
  // visible title
  title: 'Honors & Awards',
  type: 'document',
  icon,
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      title: 'Award By Player',
      name: 'awardsbyplayer',
      type: 'array',
      of: [{ type: 'playerofaward' }],
    },
  ],
};
