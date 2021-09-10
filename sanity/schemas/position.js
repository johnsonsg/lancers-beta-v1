import { GiAmericanFootballBall as icon } from '@react-icons/all-files/gi/GiAmericanFootballBall';

export default {
  // computer name
  name: 'positions',
  // visible title
  title: 'Positions',
  type: 'document',
  icon,
  fields: [
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'positionvalue',
      title: 'Value',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'position',
        maxLength: 100,
      },
    },
  ],
};
