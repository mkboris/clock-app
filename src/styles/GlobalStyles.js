import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
   /* COLORS */
  --clr-black: hsl(0, 0%, 0%);
  --clr-white: hsl(0, 0%, 100%);
  --clr-dark-gray: hsl(0, 0%, 19%);
  
  /* TYPOGRAPHY */

  /* font-family */
  --ff-inter: "Inter", serif;
  
  /* font-sizes */
  --fs-xxxl: clamp(6.25rem, 20vw, 12.5rem);
  --fs-xxl: clamp(1.25rem, 6vw, 3.5rem);
  --fs-xl: clamp(0.9375rem, 5vw, 2.5rem);
  --fs-lg: clamp(0.9375rem, 3vw, 1.5rem);
  --fs-md: clamp(0.9375rem, 2.5vw, 1.25rem);
  --fs-sm: 1rem;
  --fs-xs: clamp(0.75rem, 3vw, 1.125rem);
  --fs-xxs: clamp(0.625rem, 2.5vw, 0.9375rem);

  /* letter-spacing */
  --ls-xxl: 5px;
  --ls-xl: 4.8px;
  --ls-lg: 4px;
  --ls-md: 3px;
  --ls-smd: 2px;
  --ls-sm: -5px;
  --ls-xs: -2.5px;
  
  /* font-weight */
  --fw-bold: 700;
  --fw-regular: 400;
  --fw-light: 300;
}

/* RESET */

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Prevent font size inflation */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  box-sizing: border-box;
}

/* Remove default margin in favour of better control in authored CSS */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin-block-end: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* Set core body defaults */
body {
  min-height: 100dvh;
  line-height: 1.5;
  font-family: var(--ff-inter);

  background-image: url(${(props) => props.bgMobile});
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;

  @media (min-width: 26.875rem) {
    background-image: url(${(props) => props.bgTablet});
    background-position: center;
  }

  @media (min-width: 48rem) {
    background-image: url(${(props) => props.bgDesktop});
    }
}

/* Remove default margins */
html,
body {
  margin: 0;
  padding: 0;
  border: 0;
}

* {
  margin: 0;
}

/* Set shorter line heights on headings and interactive elements */
h1,
h2,
h3,
h4,
button,
input,
label {
  line-height: 1.1;
}

/* Balance text wrapping on headings */
h1,
h2,
h3,
h4 {
  overflow-wrap: break-word;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}

/* Make images easier to work with */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Make sure textareas without a rows attribute are not tiny */
textarea:not([rows]) {
  min-height: 10em;
}

/* Anything that has been anchored to should have extra scroll margin */
:target {
  scroll-margin-block: 5ex;
}

/* remove animations for people who've turned them off */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Smooth scroll */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

button {
  cursor: pointer;
}

`;

export default GlobalStyles;
