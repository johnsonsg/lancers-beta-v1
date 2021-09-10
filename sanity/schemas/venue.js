import { FaLocationArrow as icon } from '@react-icons/all-files/fa/FaLocationArrow';

export default {
  // computer name
  name: 'venue',
  // visible title
  title: 'Venue',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Venu Name',
      type: 'string',
      description: 'ex. Manchester H.S.',
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
      name: 'location',
      title: 'Location Address',
      type: 'string',
    },
  ],
};
