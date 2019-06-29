import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Flex, Button, Box } from 'rebass';
import context from '../stores/context';

class Property extends Component {
  static contextType = context;

  render() {
    const { history, match } = this.props;
    return (
      <>
        <Flex p={2} justifyContent="center">
          <Button
            bg="black"
            onClick={() => {
              history.push(`/portal/${match.params.portal}`);
            }}
          >
            Voltar
          </Button>
        </Flex>
        <Box p={2}>
          Property {match.params.id} {match.params.portal}
        </Box>
      </>
    )
  }
}

export default observer(Property);
