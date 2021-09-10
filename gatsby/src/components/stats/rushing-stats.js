/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import RushingStatsStyle from './stats-style';
// import GET_STATS from '../../data/getPlayerStats';

const GET_RUSHING_STATS = gql`
  query GetGameData($slug: String!) {
    allSanitySchedules(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        slug {
          current
        }
        playerrushingstats {
          player {
            name
            slug {
              current
            }
          }
          rushatt
          rushavg
          rushtd
          rushyds
        }
      }
    }
  }
`;

const columns = [
  {
    name: 'name',
    label: 'PLAYER',
    options: {
      filter: false,
      sort: false,
    },
  },

  {
    name: 'rushatt',
    label: 'ATT',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rushyds',
    label: 'YDS',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rushtd',
    label: 'TD',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rushavg',
    label: 'AVG',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
];

const options = {
  filter: false,
  selectableRows: false,
  pagination: false,
  elevation: 0,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
};

function RushingStats({ slug }) {
  // console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_RUSHING_STATS, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });

  const [rushing, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes[0]);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  return (
    <>
      {loading ? null : (
        <RushingStatsStyle>
          <Container className="px-0 my-1">
            <Row>
              <Col className="mb-5">
                <MUIDataTable
                  className="px-2"
                  data={rushing?.playerrushingstats?.map((filter) => [
                    `${filter?.player[0].name}`,
                    filter.rushatt === null ? '' : `${filter.rushatt}`,
                    filter.rushyds === null ? '' : `${filter.rushyds}`,

                    filter.rushtd === null ? '' : `${filter.rushtd}`,
                    `${Math.round(
                      `${`${filter.rushyds}` / `${filter.rushatt}`}`
                    )}`,
                  ])}
                  title="Lancers Rushing Stats"
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </Container>
        </RushingStatsStyle>
      )}
    </>
  );
}
export default function Stats(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <RushingStats slug={props.slug} />;
}
