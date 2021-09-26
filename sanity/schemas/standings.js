import { GiAmericanFootballBall as icon } from '@react-icons/all-files/gi/GiAmericanFootballBall';

export default {
  // computer name
  name: 'standings',
  // visible title
  title: 'Standings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'total_wins',
      type: 'number',
      title: 'Total Wins',
    },
    {
      name: 'total_lost',
      type: 'number',
      title: 'Total Losts',
    },
    {
      name: 'home_wins',
      type: 'number',
      title: 'Home Wins',
    },
    {
      name: 'home_lost',
      type: 'number',
      title: 'Home Lost',
    },
    {
      name: 'away_wins',
      type: 'number',
      title: 'Away Wins',
    },
    {
      name: 'away_lost',
      type: 'number',
      title: 'Away Lost',
    },
  ],
};
