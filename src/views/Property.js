import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Flex, Button, Box } from 'rebass';
import context from '../stores/context';

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
    const { appStore } = this.context;
    const { history } = this.props;

    return (
      <>
        <Flex p={2} justifyContent="center">
          <Button
            bg="black"
            onClick={() => {
              history.push(`/portal/${appStore.getPortal}`);
            }}
          >
            Voltar
          </Button>
        </Flex>
        <Box p={2}>
          {JSON.stringify(appStore.getPropertySelected, null, ' ')}
        </Box>
      </>
    )
  }
}

export default observer(Property);
