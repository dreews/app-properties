import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';
import Context from './stores/context';
import Home from './views/Home';
import Portal from './views/Portal';
import Property from './views/Property';

class App extends Component {
  static contextType = Context;

  componentDidMount() {
    const { appStore } = this.context;
    setTimeout(() => {
      appStore.setTitle(' test mobx');
      appStore.doRequestProperties();
    }, 2000);
  }

  render() {
    const { appStore } = this.context;

    return (
      <div className="App">
        Grupo Zap
        {appStore.title}

        <div>
          <Link to="/portal/vivareal">vivareal</Link>
        </div>
        <div>
          <Link to="/portal/zap">zap</Link>
        </div>

        <Route exact path="/" component={Home} />
        <Route exact path="/portal/:portal" component={Portal} />
        <Route exact path="/portal/:portal/:id" component={Property} />
      </div>
    );
  }
}

export default observer(App);
