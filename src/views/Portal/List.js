import React, { Component } from 'react';
import { observer } from 'mobx-react';
import context from '../../stores/context';
import Item from './Item';

class List extends Component {
  static contextType = context;

  render() {
    const { appStore, paginationStore } = this.context;

    return (
      <>
        { appStore.getCurrentProperties
          .slice(paginationStore.firstItem, paginationStore.lastItem)
          .map(item => <Item key={item.id} item={item} />) }
      </>
    );
  }
}

export default observer(List);
