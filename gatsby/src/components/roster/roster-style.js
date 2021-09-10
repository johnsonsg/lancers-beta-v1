import styled from 'styled-components';

const RosterStyle = styled.div`
  .MuiChip-root {
    display: none !important;
  }

  tbody tr:nth-child(even) {
    background-color: #fdfdfd;
  }

  /* .MuiInputBase-input {
    background: white;
  } */

  .MuiPaper-elevation4 {
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  }

  .MuiPaper-rounded {
    border-radius: 4px;
    padding: 1rem;
  }

  .MuiTableCell-body {
    a {
      color: white !important;
    }
  }
  .MuiTable-root {
    thead tr th:first-child,
    tbody tr td:first-child {
      width: 50px !important;
    }
    tr:hover {
      background-color: white;
    }
    tr:nth-child(even):hover {
      background-color: #fdfdfd;
    }
  }
`;

export default RosterStyle;
