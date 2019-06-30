import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

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
        <img src={cover} alt="" onClick={this.toggleModal} width="100" height="100"/>
        <ModalGateway>
          {modalIsOpen ? (
            <Modal onClose={this.toggleModal}>
              <Carousel views={imgs} />
            </Modal>
          ) : null}
        </ModalGateway>
      </>
    )
  }
}

export default CustomCarousel;
