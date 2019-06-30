import React, { Component } from 'react';
import { Box, Card } from 'rebass';
import context from '../../stores/context';

class Item extends Component {
  static contextType = context;

  render() {
    const { appStore } = this.context;
    const { item } = this.props;
    const { pricingInfos } = item;

    return (
      <Card
        fontSize={1}
        fontWeight='bold'
        p={2}
        my={2}
        bg='#efefef'
        borderRadius={8}
      >
        <Box p={2}>
          { appStore.isRental(pricingInfos.businessType) && (
            <>
              <h2>Apartamento para Aluguel</h2>
              <p>{parseFloat(pricingInfos.rentalTotalPrice).toFixed(2)}</p>
            </>
          ) }

          { appStore.isSale(pricingInfos.businessType) && (
            <>
              <h2>Apartamento para Venda</h2>
              <p>{parseFloat(pricingInfos.price).toFixed(2)}</p>
            </>
          ) }

          {item.id}
        </Box>
      </Card>
    );
  }
}

export default Item;
