import React from 'react';
import { useQuery, gql } from '@apollo/client';

const TEAM_SPONSORS = gql`
  query GetTeamSponsors {
    allSanitySponsor {
      nodes {
        name
        image {
          asset {
            fixed {
              src
            }
            url
          }
        }
      }
    }
  }
`;

function TeamSponsors() {
  const { loading, error, data } = useQuery(TEAM_SPONSORS);
  // const players = data.allSanityRoster.nodes;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allSanitySponsor.nodes.map((sponsor) => (
    <div key={sponsor.name}>
      <p>
        <span className="mr-2">
          presented by: <img src={sponsor.image.asset.url} alt="sponsor" />
          {/* {sponsor.name} */}
        </span>
      </p>
    </div>
  ));
}

export default function Sponsors() {
  return (
    <>
      <TeamSponsors />
    </>
  );
}
