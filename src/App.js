import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import { Box, Flex, Heading } from 'rebass';
import Context from './stores/context';
import Home from './views/Home';
import Portal from './views/Portal';
import Property from './views/Property';

class App extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="App">
        <Flex
          justifyContent="center"
        >
          <Box p={2}>
            <Heading color="black" textAlign="center">
              Teste de engenharia do GrupoZap
            </Heading>

            <Route exact path="/" component={Home} />
            <Route exact path="/portal/:portal" component={Portal} />
            <Route exact path="/portal/:portal/:id" component={Property} />
          </Box>
        </Flex>
      </div>
    );
  }
}

export default observer(App);
