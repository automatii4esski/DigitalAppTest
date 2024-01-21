import { Modal } from './Modal';
import { Overlay } from './Overlay';

const contactButton = document.querySelector('.contact__button');

const modalMessage = new Modal('modal-message');

Modal.commonWrapper.addEventListener('click', (e) => e.stopPropagation());
Modal.commonCloseButton.addEventListener('click', () => Overlay.hide());
Overlay.element.addEventListener('click', () => Overlay.hide());

contactButton.addEventListener('click', () => modalMessage.show());
