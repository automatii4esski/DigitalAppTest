import { FormValidation } from './FormValidation';

export class Form {
  elementClass;
  element;
  errorElements = {};
  schema;
  validation = new FormValidation();

  constructor(elementClass, schema) {
    this.elementClass = elementClass;
    this.element = document.querySelector('.' + elementClass);
    this.schema = schema;

    this.findErrorElements();
  }

  findErrorElements(element = this.element) {
    for (const el of element.querySelectorAll('[data-error]')) {
      this.errorElements[el.dataset.for] = el;
    }
  }

  resetForm() {
    this.element.reset();
    this.resetErrors();
  }

  resetSingleError(name) {
    this.validation.resetSingleError(name);
    this.errorElements[name].textContent = '';
  }

  resetErrors() {
    for (const value of Object.values(this.errorElements)) {
      value.textContent = '';
    }

    this.validation.resetErrors();
  }

  validateForm() {
    if (!this.schema) return;

    const formData = new FormData(this.element);
    const errors = this.validation.validateFormData(formData, this.schema);

    if (Object.keys(errors).length !== 0) return false;

    return true;
  }

  fillErrors() {
    for (const [key, value] of Object.entries(this.validation.errors)) {
      this.errorElements[key].textContent = value;
    }
  }
}
