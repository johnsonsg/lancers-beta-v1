import styled from 'styled-components';

const SummaryStyle = styled.div`
  .card-header {
    color: var(--darkblue);
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-style: italic;
    background: white;
  }
  .label {
    color: var(--gray);
    font-size: 0.85rem;
    text-transform: uppercase;
  }
  .yards {
    font-size: 1.1rem;
    text-align: left;
    color: var(--darkblue);
  }
  .bg-progressbar {
    background-color: var(--orange) !important;
  }
  .visiting-team-name-logo {
    font-size: 1rem;
    margin-right: 1.4rem;
    line-height: 1.4rem;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--ltgray);
    vertical-align: middle;
  }
  .home-team-name-logo {
    font-size: 1rem;
    margin-left: 1.4rem;
    line-height: 1.4rem;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--ltgray);
    vertical-align: middle;
  }
`;

export default SummaryStyle;
