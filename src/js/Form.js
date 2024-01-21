class Form {
  elementClass;
  element;

  constructor(elementClass) {
    this.elementClass = elementClass;
    this.element = document.querySelector('.' + elementClass);
  }
}
