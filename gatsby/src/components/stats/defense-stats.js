/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import PassingStatsStyle from './stats-style';
// import GET_PASSING_STATS from '../../data/getScheduleData';
const GET_PASSING_STATS = gql`
  query GetGameData($slug: String!) {
    allSanitySchedules(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        slug {
          current
        }
        playerpassingstats {
          player {
            name
            slug {
              current
            }
          }
          passatt
          passcomp
          passint
          passtd
          passyds
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
    name: 'passcomp',
    label: 'COMP',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'passatt',
    label: 'ATT',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'passyds',
    label: 'YDS',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'passtd',
    label: 'TD',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'passint',
    label: 'INT',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'pct',
    label: 'COMP%',
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
  elevation: false,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
};

function PassingStats({ slug }) {
  // console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_PASSING_STATS, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });

  const [passing, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes[0]);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  return (
    <>
      {loading ? null : (
        <PassingStatsStyle>
          <Container className="px-0 my-1">
            <Row>
              <Col className="mb-5">
                <MUIDataTable
                  className="px-2"
                  data={passing?.playerpassingstats?.map((filter) => [
                    `${filter?.player[0].name}`,
                    filter.passcomp === null ? '' : `${filter.passcomp}`,
                    filter.passatt === null ? '' : `${filter.passatt}`,
                    filter.passyds === null ? '' : `${filter.passyds}`,
                    filter.passtd === null ? '' : `${filter.passtd}`,
                    filter.passint === null ? '' : `${filter.passint}`,
                    `${Math.round(
                      `${(`${filter.passcomp}` / `${filter.passatt}`) * 100}`
                    )}%`,
                  ])}
                  title="Lancers Passing Stats"
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </Container>
        </PassingStatsStyle>
      )}
    </>
  );
}
export default function Stats(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <PassingStats slug={props.slug} />;
}
