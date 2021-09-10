import styled from 'styled-components';

const HeaderStyle = styled.div`
  .header {
    text-align: center;
    justify-content: center;
    display: flex;
    padding: 2rem 0;
    background: rgb(12, 31, 62);
    background: -moz-linear-gradient(
      180deg,
      rgba(12, 31, 62, 1) 2%,
      rgba(33, 66, 106, 1) 2%,
      rgba(12, 31, 62, 1) 67%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(12, 31, 62, 1) 2%,
      rgba(33, 66, 106, 1) 2%,
      rgba(12, 31, 62, 1) 67%
    );
    background: linear-gradient(
      180deg,
      rgba(12, 31, 62, 1) 2%,
      rgba(33, 66, 106, 1) 2%,
      rgba(12, 31, 62, 1) 67%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0c1f3e",endColorstr="#0c1f3e",GradientType=1);
    justify-content: space-between;
    align-items: center;
    /* position: fixed; */
    width: 100%;
    z-index: 1;
    top: 0;

    img {
      /* width: 450px; */
      width: 90%;
    }
  }

  /* ----- @media 768 ----- */
  @media (max-width: 768px) {
    .header {
      background-color: rgb(18, 40, 76, 0.9);
      height: 3.75rem;
      z-index: 1;
      padding: 3rem 0;

      /* img {
        width: 90%;
      } */
    }
  }
`;

export default HeaderStyle;
