import { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  background: var(--clr-white);
  border-radius: 28px;
  border: transparent;
  font-weight: var(--fw-bold);
  font-size: 0.75rem;
  letter-spacing: 3.75px;
  text-transform: uppercase;
  color: var(--clr-black);
  padding-block: 0.25em;
  padding-inline: 1.25em 0.25em;
  width: fit-content;
  flex-shrink: 0;

  &:hover svg > g > circle {
    transition: all 0.3s ease-in;
  }

  &:hover svg > g > circle {
    fill: #999999;
  }

  @media (min-width: 26.875rem) {
    font-size: var(--fs-sm);
    letter-spacing: var(--ls-xxl);
    padding-block: 0.5em;
    padding-inline: 1.75em 0.5em;
  }

  @media (min-width: 51.875rem) {
    align-self: flex-end;
  }

  span {
    mix-blend-mode: normal;
    opacity: 0.5;
  }
`;

function Button({ onToggleExpanded, onToggleQuote }) {
  const [text, setText] = useState("More");

  const toggleText = () => {
    setText((prev) => (prev === "More" ? "Less" : "More"));
  };

  return (
    <StyledButton
      aria-label="Toggle Expanded View"
      onClick={() => {
        onToggleExpanded();
        onToggleQuote();
        toggleText();
      }}
    >
      <span>{text}</span>
      <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <circle fill="#303030" cx="20" cy="20" r="20" />
          <path
            stroke="#FFF"
            strokeWidth="2"
            d={text === "More" ? "M14 17l6 6 6-6" : "M14 23l6-6 6 6"}
            transform="scale(-1, 1) translate(-40, 0)"
          />
        </g>
      </svg>
    </StyledButton>
  );
}

export default Button;
