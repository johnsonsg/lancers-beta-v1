import styled from 'styled-components';

const RecordStyle = styled.div`
  img {
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

  .MuiChip-root {
    display: none !important;
  }

  tbody tr:nth-child(even) {
    background-color: #fdfdfd;
  }

  .MuiPaper-rounded {
    border-radius: 4px;
    padding: 1rem;
  }

  .MuiTableCell-body {
    font-size: 1rem;
    a {
      color: white !important;
    }
  }
  .MuiTable-root {
    thead tr th:first-child,
    tbody tr td:first-child {
      /* width: 50px !important; */
    }
    tr:hover {
      background-color: white;
    }
    tr:nth-child(even):hover {
      background-color: #fdfdfd;
    }
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
