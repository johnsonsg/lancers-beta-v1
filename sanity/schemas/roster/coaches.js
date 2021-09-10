import { GiWhistle as icon } from '@react-icons/all-files/gi/GiWhistle';

export default {
  // computer name
  name: 'coaches',
  // visible title
  title: 'Coaches',
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
      name: 'team',
      title: 'Team',
      type: 'array',
      description: 'Multi-Select if Needed',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Varsity', value: 'Varsity' },
          { title: 'JV', value: 'JV' },
        ],
      },
    },
    {
      name: 'name',
      title: 'Coaches Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'mobile',
      title: 'Mobile',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
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
    {
      name: 'hero',
      title: 'Hero Iamge',
      type: 'image',
      options: {
        hotspot: true,
      },
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
  ],
  preview: {
    select: {
      // title: 'game.0.title',
      title: 'name',
      subtitle: 'title',
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
