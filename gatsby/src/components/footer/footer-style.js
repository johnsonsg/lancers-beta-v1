import styled from 'styled-components';

const FooterStyle = styled.div`
  .footer {
    display: flex;
    padding: 3rem 0;
    margin: 4rem 0 0 0;
    background: #343b3f;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    img {
      width: 150px;
    }
  }
  .twitter {
    font-size: 2.45rem;
  }

  .copy {
    color: #ffffff;
    text-align: center;
    padding: 1rem 0;
    background: #2a3235;
  }
  /* ----- @media 768 ----- */
  @media (max-width: 768px) {
    .footer {
      background: #343b3f;
      height: auto;
      z-index: 1;
      padding: 3rem 0;

      img {
        width: 100px;
      }
    }
  }
`;

export default FooterStyle;
