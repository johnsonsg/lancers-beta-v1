/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import React from 'react';
import SeasonSchedule from '../components/seasons/seasonschedule';
import TitleDivider from '../components/title-divider/title-divider';

export default function PlayerProfile({ ...other }) {
  const currentYear = new Date().getFullYear();
  const theTitle = `Regular Season`;

  return (
    <>
      <TitleDivider name={theTitle} />
      <SeasonSchedule slug={other.pageContext.slug} />
    </>
  );
}
