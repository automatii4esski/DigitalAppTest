export class Overlay {
  static elementClass = 'modal-overlay';
  static element = document.querySelector('.' + this.elementClass);
  static bodyElement = document.querySelector('body');
  static onHide;

  static show() {
    this.element.classList.remove(this.elementClass + '--hidden');
    this.bodyElement.classList.add('body--hidden');
  }

  static hide() {
    this.element.classList.add(this.elementClass + '--hidden');
    this.bodyElement.classList.remove('body--hidden');
  }

  static hideWithModal() {
    this.onHide && this.onHide();
    this.hide();
  }

  static setOnHide(onHideFunction) {
    this.onHide = onHideFunction;
  }
}
