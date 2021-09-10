import { GiNewspaper as icon } from '@react-icons/all-files/gi/GiNewspaper';

export default {
  // computer name
  name: 'news',
  // visible title
  title: 'News',
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
      name: 'customized',
      title: 'Customized block type',
      type: 'array',
      of: [
        {
          type: 'block',
          // Only allow these block styles
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
          ],
          // Only allow numbered lists
          lists: [{ title: 'Numbered', value: 'number' }],
          marks: {
            // Only allow these decorators
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
