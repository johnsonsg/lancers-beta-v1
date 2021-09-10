import { GiHourglass as icon } from '@react-icons/all-files/gi/GiHourglass';

export default {
  // computer name
  name: 'seasons',
  // visible title
  title: 'Season',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Year',
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
  ],
  orderings: [
    {
      title: 'ASC',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'DESC',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
  ],
};
