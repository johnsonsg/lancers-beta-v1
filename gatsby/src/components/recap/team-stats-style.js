import styled from 'styled-components';

const TeamStatsStyle = styled.div`
  color: var(--gray);

  .card-header {
    color: var(--darkblue);
    font-weight: 500;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-style: italic;
    background: white;
  }

  .subheader {
    font-size: 1rem;
    color: var(--darkblue);
    font-weight: 600;
  }
  .final-txt {
    font-size: 1.43rem;
    text-transform: uppercase;
    padding: 3rem 0;
  }
  .final-score {
    font-size: 65px;
    font-weight: 600;
    line-height: 60px;
    vertical-align: top;
    margin: 0;
  }
`;

export default TeamStatsStyle;
