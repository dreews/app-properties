import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Flex, Button, Box } from 'rebass';
import context from '../stores/context';

class Portal extends Component {
  static contextType = context;

  render() {
    const { history, match } = this.props;

    return (
      <>
        <Flex p={2} justifyContent="center">
          <Button
            bg="black"
            onClick={() => {
              history.push('/');
            }}
          >
            Voltar
          </Button>
        </Flex>
        <Box p={2}>
          Portal {match.params.portal}
          <Box p={2}>
            <Link to={`/portal/${match.params.portal}/1`}>{match.params.portal} 1</Link>
          </Box>
        </Box>
      </>
    )
  }
}

export default observer(Portal);
