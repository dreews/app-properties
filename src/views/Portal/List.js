import React, { Component } from 'react';
import { observer } from 'mobx-react';
import context from '../../stores/context';
import Item from './Item';

class List extends Component {
  static contextType = context;

  render() {
    const { appStore } = this.context;

    return (
      <>
        { appStore.getCurrentProperties.map(item => <Item key={item.id} item={item} />) }
      </>
    );
  }
}

export default observer(List);
