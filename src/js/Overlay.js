export class Overlay {
  static elementClass = 'modal-overlay';
  static element = document.querySelector('.' + this.elementClass);
  static onHide;

  static show() {
    this.element.classList.remove(this.elementClass + '--hidden');
  }

  static hide() {
    this.onHide && this.onHide();
    this.element.classList.add(this.elementClass + '--hidden');
  }

  static setOnHide(onHideFunction) {
    this.onHide = onHideFunction;
  }
}
