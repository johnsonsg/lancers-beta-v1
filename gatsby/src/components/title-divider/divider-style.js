import styled from 'styled-components';

const DividerStyle = styled.div`
  .title-divider {
    padding: 0;

    h2 {
      font-size: 1rem;
      font-weight: 800;
      border-bottom: 4px solid var(--orange);
      padding: 1rem 0;
      margin: 0;
      color: var(--darkgray);
      text-transform: uppercase;
    }

    .sponsor {
      font-size: 0.675rem;
      color: #939393;
      padding: 1rem 0;
    }
  }
  @media screen and (min-width: 768px) {
    .title-divider {
      border-bottom: 1px solid;
      border-color: rgba(151, 151, 151, 0.29);
    }
  }
`;

export default DividerStyle;
