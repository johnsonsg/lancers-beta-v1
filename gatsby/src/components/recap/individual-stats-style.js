import styled from 'styled-components';

const IndividualStatsStyle = styled.div`
  .card-header {
    color: var(--darkblue);
    font-weight: 700;
    font-size: 1.2rem;
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
    font-size: 1.2rem;
    text-align: left;
    color: var(--darkblue);
  }
  .bg-progressbar {
    background-color: var(--orange) !important;
  }
  .MuiChip-root {
    display: none !important;
  }
  .playerImg {
    background-color: #d8d8d8 !important;
    min-height: 325px;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: top center !important;
    border-radius: 0.25rem 0 0 0.25rem !important;
  }
  .playerNoImg {
    background-color: #d8d8d8 !important;
    min-height: 200px;
    padding: 5rem 0;
  }
  .hudl-btn {
    width: 135px;
    font-size: 1.3rem;
    color: var(--white);
    :hover {
      color: var(--orange);
    }
  }
  @media (min-width: 768px) {
    .playerInfo {
      padding: 2.5rem;
      color: var(--white);
      font-size: 1.3rem;

      h2 {
        font-size: 2.5rem;
        font-weight: 700;
        vertical-align: middle;
        color: var(--white) !important;
      }
      .number {
        font-size: 2.25rem;
        font-weight: regular;
        line-height: 1.2;
      }
      .position {
        color: var(--orange);
        font-size: 1.5rem;
        font-weight: 700;
      }
      .info-titles {
        font-weight: 400;
        margin-right: 0.5rem;
        line-height: 2rem;
      }
      .info-txt {
        font-weight: 600;
        line-height: 2.5rem;
      }
      .info-team {
        text-transform: uppercase;
      }
    }

    tbody tr:nth-child(even) {
      background-color: #fdfdfd;
    }

    .MuiPaper-elevation4 {
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    }

    .MuiPaper-rounded {
      border-radius: 0.25rem;
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

    .simple-tab-panel {
      border-radius: 4px;
      background: white;
    }

    .MuiBox-root {
      /* padding: 1rem; */
      padding: 0rem;
    }
  }

  @media (max-width: 768px) {
    .playerImg {
      height: 300px;
    }
    .playerNoImg {
      height: 300px;
    }
    .playerInfo {
      padding: 2rem;
      color: var(--white);
      font-size: 1.3rem;
      h2 {
        font-size: 2rem;
        font-weight: 700;
        vertical-align: middle;
        color: var(--white) !important;
      }
      .number {
        font-size: 2rem;
        font-weight: regular;
        line-height: 1.2;
      }
      .position {
        color: var(--orange);
        font-size: 1.3rem;
        font-weight: 700;
      }
      .info-titles {
        font-weight: 400;
        color: var(--white);
        margin-right: 0.5rem;
        line-height: 2rem;
      }
      .info-txt {
        font-weight: 600;
        color: var(--white);
        line-height: 2.5rem;
      }
      .info-team {
        text-transform: uppercase;
      }
    }

    tbody tr:nth-child(even) {
      background-color: #f7f7f7;
    }

    .MuiPaper-elevation4 {
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    }

    .MuiPaper-rounded {
      border-radius: 4px;
    }

    .MuiTable-root {
      thead tr th:first-child,
      tbody tr td:first-child {
      }
    }

    .MuiTableCell-root {
      text-align: left;
    }

    .simple-tab-panel {
      border-radius: 4px;
      background: white;
    }

    .MuiBox-root {
      padding: 0rem;
    }
  }
`;

export default IndividualStatsStyle;
