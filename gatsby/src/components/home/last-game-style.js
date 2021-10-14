import styled from 'styled-components';

const BoxScoreStyle = styled.div`
  .table thead th {
    vertical-align: bottom;
    border-bottom: none !important;
  }
  .table th {
    border-top: none !important;
  }
  .card-header {
    color: var(--darkblue);
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-style: italic;
    background: white;
  }
  .qtr-wrapper {
    padding: 0 5px;
  }
  .qtr {
    background: var(--darkblue);
    color: var(--white);
    /* padding: 0.1rem 0.3rem;
    border-radius: 0.15rem;
    font-weight: 400; */
    border-radius: 0.25rem;
    padding: 0.09rem 0.25rem;
    font-size: 1rem;
    font-weight: 700;
  }
  .score {
    color: var(--darkblue);
    font-size: 1.1rem;
    /* padding: 0.1rem 0.3rem; */
    /* font-weight: 400; */
    font-weight: 500;
  }
  .team {
    font-size: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--ltgray);
    .lancers {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--darkblue);
      vertical-align: middle;
    }
    img {
      width: 30px;
      height: auto;
      margin-right: 0.8rem;
    }
  }
  @media (max-width: 576px) {
    .qtr {
      padding: 0.2rem 0.3rem;
      font-size: 0.9rem;
    }
    .score {
      font-size: 0.9rem;
      font-weight: 600;
    }
    .team {
      font-size: 0.9rem;
      .lancers {
        display: none;
      }
      img {
        width: 30px;
      }
    }
  }
`;

export default BoxScoreStyle;
