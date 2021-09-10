import React from 'react';
import { Container } from 'react-bootstrap';
import ScheduleCard from './schedule-card';
import TitleDivider from '../title-divider/title-divider';

const currentYear = new Date().getFullYear();
const theTitle = `Fall - ${currentYear}`;
export default function Schedule() {
  return (
    <Container className="py-5">
      <TitleDivider name={theTitle} />
      <ScheduleCard key="Schedule" />
    </Container>
  );
}
