import styled from 'styled-components';

const CoachesStyle = styled.div`
  .MuiChip-root {
    display: none !important;
  }
  .hero {
    background: #e2e2e2;
  }
  .coachesImg {
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: top center !important;
    position: relative;
    z-index: 2;
    max-width: 100%;
    min-height: 275px;
    border: 8px solid #ffffff;
    float: left;
    top: 8rem;
    left: 0.6rem;
  }
  .coachesNoImg {
    background-color: #d8d8d8 !important;
    max-width: 100%;
    height: auto;
    padding: 5rem 0;
  }
  .bottom-bar {
    background-color: rgba(20, 44, 79, 0.8);
    color: white;
    padding: 1rem;
  }
  .info-bar {
    padding: 1rem;
    h2 {
      span {
        color: var(--orange);
        letter-spacing: 1px;
        margin-right: 1rem;
        padding-left: 0.8rem;
        font-family: 'Mulish', sans-serif;
        text-transform: uppercase;
      }
      font-family: 'Mulish', sans-serif;
      font-size: 1rem;
      color: var(--darkblue);
      border-bottom: 1px solid #cccccc;
      padding-bottom: 8px;
    }
  }
  .bio-body {
    background-color: white;
    padding: 2rem;
    .title-bar {
      border-bottom: 1px solid #f7f7f7;
    }
    h2 {
      color: var(--darkblue);
      font-weight: 500;
      font-size: 1.1rem;
      text-transform: uppercase;
      font-style: italic;
    }
    .coachesInfo {
      line-height: 2rem;
    }
  }

  @media (min-width: 768px) {
    .coachesName {
      color: var(--white);
      font-size: 1.3rem;

      h2 {
        font-size: 2rem;
        text-transform: uppercase;
        vertical-align: middle;
        color: var(--white) !important;
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 767.9px) {
    .coachesImg {
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: top center !important;
      position: relative;
      z-index: 2;
      max-width: 100%;
      min-height: 275px;
      border: 8px solid #ffffff;
      float: left;
      top: 2rem;
      left: 7rem;
    }
    .coachesNoImg {
      height: 300px;
    }
    .coachesName {
      padding: 2rem;
      color: var(--white);
      font-size: 1.3rem;
      h2 {
        padding-top: 1rem;
        font-size: 2rem;
        font-weight: 700;
        vertical-align: middle;
        text-align: center;
        color: var(--white) !important;
      }
    }
  }
`;

export default CoachesStyle;
