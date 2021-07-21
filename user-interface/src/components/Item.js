import React from "react";
import Container from "./Container";

const Item = ({ searchTerm }) => {
  return (
    <div>
      <Container searchTerm={searchTerm} />
    </div>
  );
};

export default Item;
