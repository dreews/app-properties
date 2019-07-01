import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Image as BaseImage, Box } from 'rebass';
import ImageZoom from '../views/images/zoom.svg';

const Image = styled(BaseImage)`
  display: block;
`;

const WrapperImage = styled(Box)`
  position: relative;
  overflow: hidden;
`;

const WrapperZoom = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

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

    const imgs = images.map(item => ({
      source: item,
    }));

    return (
      <>
        <WrapperImage
          onClick={this.toggleModal}
        >
          <Image
            src={cover}
            alt="Imagem de capa do Imóvel"
          />
          <WrapperZoom bg="white">
            <Image
              src={ImageZoom}
              alt="Imagem de capa do Imóvel"
              width={['30px', '30px', '40px']}
              p={[1, 1, 2]}
            />
          </WrapperZoom>
        </WrapperImage>
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
