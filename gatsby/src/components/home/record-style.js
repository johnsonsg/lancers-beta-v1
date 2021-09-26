import styled from 'styled-components';

const RecordStyle = styled.div`
  .MuiTableCell-body {
    color: rgba(0, 0, 0, 0.87);
    font-size: 1rem;
  }
  img {
    max-width: 30px;
    width: auto;
    height: auto;
  }
  .MuiTableFooter-root {
    display: none;
  }
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

  @media (max-width: 576px) {
  }
`;

export default RecordStyle;
