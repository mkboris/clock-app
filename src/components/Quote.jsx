import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";

const StyledQuote = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Blockquote = styled.blockquote`
  font-weight: var(--fw-regular);
  font-size: var(--fs-xs);
  line-height: 1.5;
  color: var(--clr-white);
  max-width: 33.75rem;
`;

const Cite = styled.cite`
  font-weight: var(--fw-bold);
  display: block;
  padding-top: 6px;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  align-self: flex-start;
  flex-shrink: 0;
  padding-top: 8px;
`;

async function fetchQuote() {
  try {
    const { data } = await axios.get("https://zenquotes.io/api/random");
    return { text: data[0].q, author: data[0].a };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { text: "Failed to load quote.", author: "Unknown" };
  }
}

function Quote() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["quote"],
    queryFn: fetchQuote,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <StyledQuote>
      <Blockquote>
        “{data.text}”<Cite>{data.author}</Cite>
      </Blockquote>

      <Button
        aria-label="Next quote"
        onClick={() => refetch()}
        disabled={isLoading}
      >
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z"
            fill="#FFF"
            fillRule="nonzero"
            opacity=".5"
          />
        </svg>
      </Button>
    </StyledQuote>
  );
}

export default Quote;
