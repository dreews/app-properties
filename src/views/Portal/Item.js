import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Flex, Box, Card, Text, Image,
} from 'rebass';
import { Link as BaseLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import context from '../../stores/context';
import Carousel from '../../components/Carousel';
import ImageBed from '../images/bed.svg';
import ImageBath from '../images/bath.svg';
import ImagePark from '../images/park.svg';
import ImageArea from '../images/area.svg';

const Link = styled(BaseLink)`
  border-radius: 2px;
  background-color: ${props => (
    props.vivareal === 'true'
      ? props.theme.colors.blue
      : props.theme.colors.orange
  )};
  color: white;
  font-weight: 800;
  font-size: 11px;
  padding: 5px 10px;
  text-transform: uppercase;
  display: inline-block;
  text-decoration: none;
  margin-top: 5px;

  @media screen and (min-width: 768px) {
    margin-top: 10px;
    padding: 8px 20px;
    font-size: 12px;
  }
`;

class Item extends Component {
  static contextType = context;

  render() {
    const { appStore, propertiesStore } = this.context;
    const { item } = this.props;
    const {
      pricingInfos,
      bathrooms,
      usableAreas,
      bedrooms,
      parkingSpaces,
      address,
    } = item;

    return (
      <Card
        width={[1, 1, 700]}
        fontSize={1}
        fontWeight="bold"
        p={[3, 4]}
        my={2}
        bg="white"
        borderRadius={2}
      >
        <Flex>
          <Box pt={[1]} width={['100px', '250px']}>
            <Carousel images={item.images} cover={item.images[0]} />
          </Box>
          <Box pl={[2, 4]} color="darkgray">
            { propertiesStore.isRental(pricingInfos.businessType) && (
              <Text fontWeight={800} fontSize={[2, 3, 3]}>Apartamento para Aluguel</Text>
            ) }

            { propertiesStore.isSale(pricingInfos.businessType) && (
              <Text fontWeight={800} fontSize={[2, 3, 3]}>Apartamento para Venda</Text>
            ) }

            { (address.neighborhood || address.city) && (
              <Text fontSize={[1]}>{address.neighborhood} - {address.city}</Text>
            ) }

            <Flex py={[2]} justifyContent="start" alignItems="center">
              <Image mx={[1, 3]} my={[1, 2]} src={ImageBath} alt="" width={['15px', '18px']} />
              {` ${bathrooms}`}

              <Image mx={[1, 3]} my={[1, 2]} src={ImageBed} alt="" width={['15px', '18px']} />
              {` ${bedrooms}`}

              <Image mx={[1, 3]} my={[1, 2]} src={ImagePark} alt="" width={['15px', '18px']} />
              {` ${parkingSpaces}`}

              <Image mx={[1, 3]} my={[1, 2]} src={ImageArea} alt="" width={['15px', '18px']} />
              {` ${usableAreas}`}
            </Flex>

            { propertiesStore.isRental(pricingInfos.businessType) && (
              <Text fontWeight="bold" fontSize={[2, 3]}>
                {parseFloat(pricingInfos.rentalTotalPrice).toLocaleString(
                  'pt-br',
                  { style: 'currency', currency: 'BRL' },
                )}
              </Text>
            ) }

            { propertiesStore.isSale(pricingInfos.businessType) && (
              <Text fontWeight="bold" fontSize={[2, 3]}>
                {parseFloat(pricingInfos.price).toLocaleString(
                  'pt-br',
                  { style: 'currency', currency: 'BRL' },
                )}
              </Text>
            ) }

            <Link
              vivareal={appStore.isVivareal.toString()}
              to={(`/portal/${appStore.portal}/${item.id}`)}
              onClick={() => {
                appStore.setPropertyIdSelected(item.id);
              }}
            >
              Ver detalhes
            </Link>
          </Box>
        </Flex>
      </Card>
    );
  }
}

export default observer(Item);
