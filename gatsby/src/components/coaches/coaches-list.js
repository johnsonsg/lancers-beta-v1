import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import Avatar from '@material-ui/core/Avatar';
import { GiWhistle } from '@react-icons/all-files/gi/GiWhistle';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CoachesTeamStyle from './coaches-list-style';

const COACHES_ROSTERS = gql`
  query {
    allSanityCoaches(sort: { order: ASC, fields: order }) {
      nodes {
        slug {
          current
        }
        order
        team
        name
        title
        email
        mobile
        phone
        image {
          asset {
            fixed(height: 35, width: 35) {
              src
              srcSet
              base64
            }
            url
          }
        }
        bio {
          children {
            text
          }
        }
      }
    }
  }
`;

const columns = [
  {
    name: 'image',
    label: ' ',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true,
      // filterList: [],
      // If using Filter List, you need to comment out "filter: & sor:"
    },
  },
  {
    name: 'title',
    label: 'Title',
    options: {
      filter: true,
      sort: true,
      // filterList: [],
      // If using Filter List, you need to comment out "filter: & sor:"
    },
  },
  {
    name: 'team',
    label: 'Varsity/JV',
    options: {
      filter: true,
      sort: true,
      // filterList: [],
      // If using Filter List, you need to comment out "filter: & sor:"
    },
  },
  {
    name: 'profile',
    label: 'View Profile',
    options: {
      filter: false,
      sort: false,
    },
  },
];

const options = {
  filter: false,
  filterType: 'dropdown',
  selectableRows: 'none',
  pagination: false,
  elevation: 0,
  search: false,
  download: false,
  print: false,
  viewColumns: false,
};

function CoachesList() {
  const { loading, error, data } = useQuery(COACHES_ROSTERS, {
    fetchPolicy: 'no-cache',
  });
  const [coaches, setFilters] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFilters(data.allSanityCoaches.nodes);
    }
    if (error) console.log(error);
  }, [loading, error, data]);

  const StyledButton = withStyles({
    root: {
      // background: 'linear-gradient(45deg, #FF640B 30%, #fa6f1b 90%)',
      background: 'rgba(255, 100, 5)',
      borderRadius: 50,
      border: 0,
      color: 'white',
      padding: '2px 20px',
      boxShadow:
        '0px 3px 1px -2px rgb(0 0 0 / 8%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 1px 5px 0px rgb(0 0 0 / 6%)',
      '&:hover': {
        background: '#ff8c26',
      },
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  return (
    <>
      {loading ? null : (
        <>
          <Container className="px-0">
            <Row>
              <Col>
                <CoachesTeamStyle>
                  <MUIDataTable
                    className="mt-3"
                    // title="Coaching Staff"
                    data={coaches?.map((filter) => [
                      filter.image === null ? (
                        <GiWhistle size={35} />
                      ) : (
                        <Avatar
                          key={filter.name}
                          alt={filter.name}
                          src={filter.image?.asset?.fixed?.src}
                        />
                      ),

                      `${filter.name}`,
                      `${filter.title}`,
                      `${filter.team}`,
                      <StyledButton
                        component={Link}
                        to={`/coach/${filter.slug.current}`}
                      >
                        View Profile
                      </StyledButton>,
                    ])}
                    columns={columns}
                    options={options}
                  />
                </CoachesTeamStyle>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default function TheCoaches() {
  return <CoachesList />;
}
