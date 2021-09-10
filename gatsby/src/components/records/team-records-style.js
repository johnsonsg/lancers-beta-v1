import styled from 'styled-components';

const RecordsStyle = styled.div`
  .record-card {
    .row-header {
      border-bottom: 1px solid rgb(226, 226, 226);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      h2 {
        font-size: 1rem;
        font-weight: 700;
        color: var(--darkblue);
        text-transform: uppercase;
        margin: 0;
      }
      .record-number {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--orange);
      }
    }
    .labels {
      font-size: 0.8rem;
      font-weight: 600;
      color: #aaa;
      text-transform: uppercase;
    }
    .record-data {
      color: var(--darkblue);
      font-weight: 500;
      padding: 0.5rem 0;
    }
  }
`;

export default RecordsStyle;
