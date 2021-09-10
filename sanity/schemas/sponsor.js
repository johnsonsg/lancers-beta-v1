import { RiAdvertisementFill as icon } from '@react-icons/all-files/ri/RiAdvertisementFill';

export default {
  // computer name
  name: 'sponsor',
  // visible title
  title: 'Sponsors',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Sponsors Name',
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
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Genre',
      name: 'genre',
      type: 'string',
      options: {
        list: [
          { title: 'Sci-Fi', value: 'sci-fi' },
          { title: 'Western', value: 'western' },
        ],
      },
    },
  ],
};
