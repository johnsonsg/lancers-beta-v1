import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const TEAM_ROSTERS = gql`
  query GetTeamRoster($slug: String!) {
    allSanityRoster(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        name
        position
        slug {
          current
        }
      }
    }
  }
`;

function PlayerStats({ slug }) {
  const { loading, error, data } = useQuery(TEAM_ROSTERS, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });
  const [player, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityRoster.nodes[0]);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  console.log('SHAWN', data);

  return (
    <>
      {loading ? null : (
        <>
          <div>{player?.name}</div>
          {/* <div>{player?.slug?.map((players) => [`${players.current}`])}</div> */}
        </>
      )}
    </>
  );
}
export default function Stats() {
  return (
    <>
      <PlayerStats />
    </>
  );
}
