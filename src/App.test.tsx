import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const config = {
    type: 1,
    color: "#396AFF",
    name: "Charity3",
    address: "0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5",
  };
  render(<App {...config} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
