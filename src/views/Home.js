import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import {
  Text, Flex, Button, Box, Image,
} from 'rebass';
import context from '../stores/context';
import LogoVivareal from './images/logo_vivareal.svg';
import LogoZap from './images/logo_zap.png';
import HomeBg from './images/Home/bg.jpg';

const Wrapper = styled(Box)`
  @media screen and (min-width: 768px) {
    background: url(${HomeBg}) no-repeat center;
    height: 370px;
  }
`;

class Home extends Component {
  static contextType = context;

  render() {
    const { history } = this.props;
    const { appStore } = this.context;

    return (
      <Wrapper width={[1]} p={[2, 4, 5]}>
        <Box p={2}>
          <Text textAlign="center">
            Clique abaixo para filtrar os imóveis por portal
          </Text>
        </Box>
        <Flex
          justifyContent="center"
          flexWrap="wrap"
        >
          <Box p={2}>
            <Button
              bg="blue"
              onClick={() => {
                appStore.setPortal('vivareal');
                history.push('/portal/vivareal');
              }}
            >
              <Image
                width={[1 / 2]}
                src={LogoVivareal}
                alt="Logo Vivareal"
              />
            </Button>
          </Box>
          <Box p={2}>
            <Button
              bg="white"
              color="black"
              onClick={() => {
                appStore.setPortal('zap');
                history.push('/portal/zap');
              }}
            >
              <Image
                width={[1 / 1.6]}
                src={LogoZap}
                alt="Logo Zap"
              />
            </Button>
          </Box>
        </Flex>
      </Wrapper>
    );
  }
}

export default observer(Home);
