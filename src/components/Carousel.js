import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Image, Box } from 'rebass';

class CustomCarousel extends Component {
  state = { modalIsOpen: false }

  constructor() {
    super();
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  }

  render() {
    const { modalIsOpen } = this.state;
    const { images, cover } = this.props;

    const imgs = [
      {
        source: images[0],
      },
      {
        source: images[1],
      },
    ];

    return (
      <>
        <Image
          src={cover}
          alt="Imagem de capa do Imóvel"
          onClick={this.toggleModal}
        />
        <ModalGateway>
          {modalIsOpen ? (
            <Modal onClose={this.toggleModal}>
              <Carousel views={imgs} />
            </Modal>
          ) : null}
        </ModalGateway>
      </>
    );
  }
}

export default CustomCarousel;
