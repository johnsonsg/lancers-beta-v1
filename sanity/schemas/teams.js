import { GiAmericanFootballHelmet as icon } from '@react-icons/all-files/gi/GiAmericanFootballHelmet';

export default {
  // computer name
  name: 'teams',
  // visible title
  title: 'Teams',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Team',
      type: 'string',
    },
    {
      name: 'mascot',
      title: 'Mascot',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Team Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
