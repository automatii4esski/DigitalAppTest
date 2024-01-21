import { Modal, ModalForm } from './Modal';
import { Overlay } from './Overlay';
import { Form } from './Form';
import { messageFormSchema } from './Schemas';

const contactButton = document.querySelector('.contact__button');

const messageForm = new Form('modal-message__form', messageFormSchema);
const modalMessage = new ModalForm('modal-message', messageForm);
const modalSuccess = new Modal('modal-success');

Modal.commonWrapper.addEventListener('click', (e) => e.stopPropagation());
Modal.commonCloseButton.addEventListener('click', () =>
  Overlay.hideWithModal()
);
Overlay.element.addEventListener('click', () => Overlay.hideWithModal());

contactButton.addEventListener('click', () => modalMessage.show());

messageForm.element.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!messageForm.validateForm()) {
    messageForm.fillErrors();
    return;
  }

  modalMessage.hide();
  modalSuccess.show();
});

messageForm.element.addEventListener('change', (e) => {
  messageForm.resetSingleError(e.target.name);
});
