import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { Box, Flex, Heading } from 'rebass';
import Context from './stores/context';
import Home from './views/Home';
import Portal from './views/Portal';
import Property from './views/Property';

const Wrapper = styled(Flex)`
  min-height: 100vh;
`;

class App extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="App">
        <Wrapper
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          <Box p={[2, 0]} width={[1]}>
            <Flex justifyContent="center">
              <Heading
                color="#333"
                textAlign="center"
                fontWeight={[800, 300]}
                fontSize={[3, 4, 4]}
                width={[1, 1, 1 / 2]}
                my={[3, 4, 4]}
              >
                Teste de engenharia do GrupoZap
              </Heading>
            </Flex>

            <Route exact path="/" component={Home} />
            <Route exact path="/portal/:portal" component={Portal} />
            <Route exact path="/portal/:portal/:id" component={Property} />
          </Box>
        </Wrapper>
      </div>
    );
  }
}

export default observer(App);
