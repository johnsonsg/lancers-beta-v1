/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import ReceivingStatsStatsStyle from './stats-style';
// import GET_STATS from '../../data/getPlayerStats';
const GET_RECEIVING_STATS = gql`
  query GetGameData($slug: String!) {
    allSanitySchedules(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        id
        slug {
          current
        }
        playerreceivingstats {
          player {
            name
            slug {
              current
            }
          }
          rec
          recavg
          rectd
          recyds
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
    name: 'rec',
    label: 'REC',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'recyds',
    label: 'YDS',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'rectd',
    label: 'TD',
    options: {
      filter: false,
      sort: false,
      setCellProps: () => ({ align: 'center' }),
      setCellHeaderProps: () => ({ align: 'center' }),
    },
  },
  {
    name: 'recavg',
    label: 'AVG',
    options: {
      filter: false,
      sort: false,
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

function ReceivingStats({ slug }) {
  // console.log('SLUG', slug);
  const { loading, error, data } = useQuery(GET_RECEIVING_STATS, {
    variables: { slug },
    fetchPolicy: 'no-cache',
  });

  const [receiving, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanitySchedules.nodes[0]);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  return (
    <>
      {loading ? null : (
        <ReceivingStatsStatsStyle>
          <Container className="px-0 my-1">
            <Row>
              <Col className="mb-5">
                <MUIDataTable
                  className="px-2"
                  data={receiving?.playerreceivingstats?.map((filter) => [
                    `${filter?.player[0].name}`,
                    filter.rec === null ? '' : `${filter.rec}`,
                    filter.recyds === null ? '' : `${filter.recyds}`,
                    filter.rectd === null ? '' : `${filter.rectd}`,
                    `${Math.round(`${`${filter.recyds}` / `${filter.rec}`}`)}`,
                  ])}
                  title="Lancers Receiving Stats"
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </Container>
        </ReceivingStatsStatsStyle>
      )}
    </>
  );
}
export default function Stats(props) {
  // create custom hook pass it into slug value
  // eslint-disable-next-line react/destructuring-assignment
  return <ReceivingStats slug={props.slug} />;
}
