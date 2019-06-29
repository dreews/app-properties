import React from 'react';
import { Box } from 'rebass';

const Item = ({ item }) => {
  return (
    <Box p={2}>
      {item.id}
    </Box>
  );
};

export default Item;
