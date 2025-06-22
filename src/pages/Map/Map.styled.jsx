import { styled } from "@mui/material/styles";


export const SuggestionsUl = styled("ul")(({ theme }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  background: "#fff",
  border: "1px solid #ccc",
  maxHeight: "200px",
  overflowY: "auto",
  position: "absolute",
  top: "45px",
  width: "100%",
  zIndex: 3,
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
}));

export const SuggestionsLi = styled("li")(({ theme }) => ({
  padding: "10px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  padding: "8px",
  fontSize: "16px",
}));
