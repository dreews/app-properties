import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Text, Flex, Button, Box,
} from 'rebass';
import context from '../stores/context';

class Home extends Component {
  static contextType = context;

  componentWillMount() {
    const { appStore } = this.context;

    if (!appStore.getCurrentProperties.length) {
      appStore.doRequestProperties();
    }
  }

  render() {
    const { history } = this.props;
    const { appStore } = this.context;

    if (!appStore.getAllPropeties.length) {
      return false;
    }

    return (
      <>
        <Box p={2}>
          <Text textAlign="center">
            Clique abaixo para filtrar os imóveis por portal
          </Text>
        </Box>
        <Flex
          justifyContent="center"
        >
          <Box p={2}>
            <Button
              bg="blue"
              onClick={() => {
                appStore.setPortal('vivareal');
                history.push('/portal/vivareal');
              }}
            >
              vivareal
            </Button>
          </Box>
          <Box p={2}>
            <Button
              bg="gray"
              onClick={() => {
                appStore.setPortal('zap');
                history.push('/portal/zap');
              }}
            >
              zap
            </Button>
          </Box>
        </Flex>
      </>
    );
  }
}

export default observer(Home);
