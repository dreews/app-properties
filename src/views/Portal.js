import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Flex, Button, Box, Image,
} from 'rebass';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';
import context from '../stores/context';
import List from './Portal/List';
import LogoVivarealBlue from './images/logo_vivareal_blue.svg';
import LogoZap from './images/logo_zap.png';
import Wrapper from '../components/Wrapper';

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
    const { appStore, paginationStore } = this.context;

    if (!appStore.getCurrentProperties.length) {
      return false;
    }

    return (
      <Wrapper>
        <Flex
          px={[2]}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Button
            bg={appStore.isVivareal ? 'blue' : 'orange'}
            onClick={() => {
              history.push('/');
            }}
          >
            Voltar
          </Button>
          { appStore.isVivareal && (
            <Box>
              <Image
                height="40px"
                p={2}
                src={LogoVivarealBlue}
                alt="Logo Vivareal"
              />
            </Box>
          )}
          { !appStore.isVivareal && (
            <Box>
              <Image
                src={LogoZap}
                alt="Logo Zap"
              />
            </Box>
          ) }
        </Flex>

        <List />

        <Pagination vivareal={appStore.isVivareal}>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={paginationStore.getPageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(e) => {
              paginationStore.setPageSelected(e.selected);
            }}
            containerClassName="pagination"
            activeClassName="active"
          />
        </Pagination>
      </Wrapper>
    );
  }
}

export default observer(Portal);
