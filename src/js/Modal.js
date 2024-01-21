import { Form } from './Form';
import { Overlay } from './Overlay';

export class Modal {
  static commonWrapper = document.querySelector('.modal-wrapper');
  static commonCloseButton = document.querySelector(
    '.modal-wrapper__close-button'
  );

  elementClass;
  element;

  constructor(elementClass) {
    this.elementClass = elementClass;
    this.element = document.querySelector('.' + elementClass);
  }

  show() {
    Overlay.show();
    Overlay.setOnHide(() => this.hide());
    this.element.classList.remove(this.elementClass + '--hidden');
  }

  hide() {
    this.element.classList.add(this.elementClass + '--hidden');
  }
}

export class ModalForm extends Modal {
  form;

  constructor(elementClass, form) {
    super(elementClass);
    this.form = form;
  }

  hide() {
    super.hide();
    this.form.resetForm();
  }
}
