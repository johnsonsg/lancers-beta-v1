import styled from 'styled-components';

const AwardsStyle = styled.div`
  .awards-data:nth-child(even) {
    background: #fdfdfd;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  }
  .award-card {
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
      .award-number {
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
    .award-data {
      color: var(--darkblue);
      font-weight: 500;
      padding: 0.5rem 0;
    }
  }
`;

export default AwardsStyle;
