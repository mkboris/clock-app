import styled from "styled-components";

const StyledLoader = styled.span`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #25b09b;
  animation: l15 1s infinite linear;

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: l15 2s infinite;
  }

  &::after {
    margin: 8px;
    animation-duration: 3s;
  }

  @keyframes l15 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

function Loader() {
  return <StyledLoader></StyledLoader>;
}

export default Loader;
