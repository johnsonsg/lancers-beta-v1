/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import React from 'react';
import Container from 'react-bootstrap/Container';
import CoachesInformation from '../components/coaches/coaches-profile';

export default function CoachesProfile({ ...other }) {
  return (
    <>
      <Container className="py-5">
        <CoachesInformation slug={other.pageContext.slug} />
      </Container>
    </>
  );
}
