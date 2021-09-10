import styled from 'styled-components';

const GameRecapStyle = styled.div`
  color: white;
  background: var(--darkblue);

  .logos {
    position: relative;
    padding: 2rem;
    justify-content: top top;
    background-size: cover;
  }
  .logos::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(21, 44, 78, 0.9);
  }

  .team-titles {
    h2 {
      font-size: 0.8rem;
      text-transform: uppercase;
      margin: 0;
    }
    h3 {
      text-transform: uppercase;
      font-size: 1.5rem;
      margin: 0;
    }
  }
  .final-txt {
    font-size: 1.43rem;
    text-transform: uppercase;
    padding: 3rem 0;
  }

  @media screen and (min-width: 857px) {
    .team-logo {
      height: 80px;
    }
    .final-score {
      font-size: 65px;
      font-weight: 600;
      line-height: 60px;
      vertical-align: top;
      margin: 0;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 857px) {
    .team-logo {
      height: 40px;
    }
    .final-score {
      font-size: 35px;
      font-weight: 600;
      line-height: 60px;
      vertical-align: top;
      margin: 0;
    }
  }
  @media screen and (min-width: 414px) and (max-width: 767.99px) {
    .team-logo {
      height: 40px;
    }
    .final-score {
      font-size: 35px;
      font-weight: 600;
      line-height: 60px;
      vertical-align: top;
      margin: 0;
    }
  }
`;

export default GameRecapStyle;
