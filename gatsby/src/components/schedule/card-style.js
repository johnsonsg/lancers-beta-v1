import styled from 'styled-components';

const CardStyle = styled.div`
  .topBar {
    border-bottom: 1px solid rgb(226, 226, 226);
    padding: 0.3rem 1rem;
    .week {
      font-weight: 500;
      color: var(--darkblue);
      font-size: 1.3rem;
      padding-right: 0.5rem;
      text-transform: uppercase;
    }
    .date {
      font-weight: 300;
      color: var(--gray);
      font-size: 1.3rem;
      padding: 0 0.5rem;
    }
    .final {
      font-weight: 300;
      color: var(--gray);
      font-size: 1.3rem;
      padding: 0 0.5rem;
    }
    .result {
      font-weight: 400;
      color: var(--gray);
      font-size: 1.3rem;
      padding-right: 0.5rem;
    }
    .score {
      font-weight: 400;
      color: var(--gray);
      font-size: 1.15rem;
      padding-right: 0.5rem;
    }
    .dot {
      height: 4px;
      width: 4px;
      background-color: var(--gray);
      border-radius: 50%;
      display: inline-block;
      position: relative;
      bottom: 5px;
    }
  }

  .mlogo {
    font-family: 'Freshman', sans-serif !important;
    color: var(--orange);
    font-size: 1.8rem;
    vertical-align: middle;
  }
  .at-home {
    font-weight: 400;
    color: var(--darkblue);
    font-size: 1rem;
    vertical-align: middle;
    text-align: left;
  }
  .team-name {
    font-weight: 400;
    color: var(--ltgray);
    font-size: 1.2rem;
    vertical-align: middle;
    text-align: left;
  }
  .team-logo {
    padding: 0 0.8rem 0 0.55rem;
  }

  /* .boxscore-btn {
    background: var(--darkblue);
    color: white;
    text-transform: uppercase;
    border-radius: 50px;
    padding: 0.25rem 3rem;
    width: 100%;
    :hover {
      background: var(--darkblue);
      color: white;
    }
  } */

  .bottom-bar {
    background: #ececec;
    margin: 1rem 0 0;
    padding: 1rem;
    border-radius: 0 0 0.2rem 0.2rem;
    a {
      color: var(--darkblue);
      &:hover {
      }
    }
  }

  .boxscore {
    padding: 0.35rem 1rem;
    border-radius: 5rem;
    a {
      color: #ffffff;
    }
    &:hover {
      color: #ffffff;
    }
  }

  // X-Small devices (portrait phones, less than 576px)
  // No media query for xs since this is the default in Bootstrap

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) {
  }
  @media (max-width: 576px) {
    .topBar {
      .date {
        display: none;
      }
      .final {
        display: none;
      }
      .dot {
        display: none;
      }
    }
    .location {
      display: none;
    }
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
  }
  @media (max-width: 768px) {
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
  }
  @media (max-width: 992px) {
  }

  // X-Large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
  }
  @media (max-width: 1200px) {
  }

  // XX-Large devices (larger desktops, 1400px and up)
  @media (min-width: 1400px) {
  }
  @media (max-width: 1400px) {
  }
`;

export default CardStyle;
