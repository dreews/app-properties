import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Flex, Button, Box, Image, Text, 
} from 'rebass';
import context from '../stores/context';
import Carousel from '../components/Carousel';
import Wrapper from '../components/Wrapper';
import LogoVivarealBlue from './images/logo_vivareal_blue.svg';
import LogoZap from './images/logo_zap.png';
import ImageBed from './images/bed.svg';
import ImageBath from './images/bath.svg';
import ImagePark from './images/park.svg';
import ImageArea from './images/area.svg';


class Property extends Component {
  static contextType = context;

  componentWillMount() {
    const { appStore } = this.context;
    const { match } = this.props;

    if (!appStore.getCurrentProperties.length) {
      appStore.setPortal(match.params.portal);
      appStore.setPropertyIdSelected(match.params.id);
      appStore.doRequestProperties();
    }
  }

  render() {
    const { appStore, propertiesStore } = this.context;
    const { history } = this.props;

    if (!appStore.getPropertySelected.length) {
      return false;
    }

    const {
      pricingInfos,
      bathrooms,
      usableAreas,
      bedrooms,
      parkingSpaces,
      address,
    } = appStore.getPropertySelected[0];

    return (
      <Wrapper>
        <Flex
          px={[2]}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Button
            bg={appStore.isVivareal ? 'blue' : 'orange'}
            onClick={() => {
              history.push(`/portal/${appStore.portal}`);
            }}
          >
            Voltar
          </Button>
          { appStore.isVivareal && (
            <Box>
              <Image
                height="40px"
                p={2}
                src={LogoVivarealBlue}
                alt="Logo Vivareal"
              />
            </Box>
          )}
          { !appStore.isVivareal && (
            <Box>
              <Image
                src={LogoZap}
                alt="Logo Zap"
              />
            </Box>
          ) }
        </Flex>
        <Box p={2}>
          <Carousel images={appStore.getPropertySelected[0].images} cover={appStore.getPropertySelected[0].images[0]} />

          <Box p={[2, 4]} color="darkgray">
            { propertiesStore.isRental(pricingInfos.businessType) && (
              <Text fontWeight={800} fontSize={[2, 3, 5]}>Apartamento para Aluguel</Text>
            ) }

            { propertiesStore.isSale(pricingInfos.businessType) && (
              <Text fontWeight={800} fontSize={[2, 3, 5]}>Apartamento para Venda</Text>
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
              <Text fontWeight="bold" fontSize={[2, 3, 4]}>
                {parseFloat(pricingInfos.rentalTotalPrice).toLocaleString(
                  'pt-br',
                  { style: 'currency', currency: 'BRL' },
                )}
              </Text>
            ) }

            { propertiesStore.isSale(pricingInfos.businessType) && (
              <Text fontWeight="bold" fontSize={[2, 3, 4]}>
                {parseFloat(pricingInfos.price).toLocaleString(
                  'pt-br',
                  { style: 'currency', currency: 'BRL' },
                )}
              </Text>
            ) }
          </Box>
        </Box>
      </Wrapper>
    )
  }
}

export default observer(Property);
