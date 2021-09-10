import { createGlobalStyle } from 'styled-components';
// import '@fontsource/roboto';
// import '@fontsource/roboto/900.css';

const GlobalStyles = createGlobalStyle`
  :root {
    --blue: #0071ce;
    --darkblue: #142C4F; /* rgb(18,40,76) */
    --orange: #FF6605;
    --yellow: #ebaa00;
    --gray: #525252;
    --ltgray: #7F7F7F;
    --white: #fff;
    --darkgray: #333C3F;

    

  body, html{
    background: #EEEEEE;
    margin: 0 !important;
    padding: 0 !important;
    font-family: 'Mulish', sans-serif;
  }

  p { 
    margin-top: 0;
    margin-bottom: 2rem!important;
  }

  p:last-child {
    margin-top: 0;
    margin-bottom: 0!important;
  }

  section {
    padding: 5rem 0 0;
  }

  section:last-child {
    padding: 5rem 0;
  }
  
  /* MDB Button */
.btn {
  color: #12284C;
  text-transform: uppercase;
  vertical-align: bottom;
  border: 0;
  box-shadow: none!important;
  font-weight: 500;
  padding: .5rem 1.5rem!important;
  font-family: 'Mulish', sans-serif;
  font-size: 0.8rem!important;
  line-height: 1.5;
}

.btn-lg {
    color: #12284C;
    text-transform: uppercase;
    vertical-align: bottom;
    border: 0;
    box-shadow: none!important;
    font-weight: 500;
    padding: .5rem 4.5rem!important;
    font-family: 'Mulish', sans-serif;
    font-size: 0.875rem!important;
    line-height: 1.5;
}

.btn-primary {
  background-color: var(--blue);
  color: var(--white);
}

.btn-primary:hover {
  background-color: var(--darkblue);
}

.btn-light {
  color: #12284C!important;
  background-color: var(--white);
  box-shadow: none!important;
}

/* MUI Classes */
.MuiButton-label {
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  font-family: 'Mulish', sans-serif;
}

/* Homepage Video */
.video-background {
  display: block;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  object-fit: cover!important;
  object-position: center;
}

@media (max-width: 1080px) { 
  .video-background {
    display: block;
    z-index: 1;
    height: 100vh;
    width: 100vw;
    object-fit: cover!important;
    object-position: center;
  }
 }

 @media (max-width: 575px) {
  h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.6;
    font-size: 2rem!important;
    padding: 4rem 0 0!important;
}
 }

`;

export default GlobalStyles;
