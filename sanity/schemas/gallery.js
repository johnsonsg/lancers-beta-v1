import { BsCamera as icon } from '@react-icons/all-files/bs/BsCamera';

export default {
  name: 'photos',

  title: 'Gallery',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'News Title',
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
      title: 'Gallery',
      name: 'gamephotos',
      type: 'array',
      of: [{ type: 'gallery' }],
    },
    // {
    //   name: 'image',
    //   title: 'Image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    // },
  ],
};
