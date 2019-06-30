import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Flex, Button, Box } from 'rebass';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';
import context from '../stores/context';
import List from './Portal/List';

class Portal extends Component {
  static contextType = context;

  componentWillMount() {
    const { appStore } = this.context;
    const { match } = this.props;

    if (!appStore.getCurrentProperties.length) {
      appStore.setPortal(match.params.portal);
      appStore.doRequestProperties();
    }
  }

  render() {
    const { history } = this.props;
    const { appStore } = this.context;

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
          Portal {appStore.portal}
        </Box>
        <List />
        <Pagination>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={appStore.getPageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(e) => {
              appStore.setPageSelected(e.selected);
            }}
            containerClassName="pagination"
            activeClassName="active"
          />
        </Pagination>
      </>
    );
  }
}

export default observer(Portal);
