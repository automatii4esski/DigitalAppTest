import { Messages } from './Messages';

export class FormValidation {
  errors = {};

  resetErrors() {
    this.errors = {};
  }

  resetSingleError(name) {
    delete this.errors[name];
  }

  validateFormData(formData, schema) {
    for (const [key, value] of formData.entries()) {
      const params = schema[key];

      if (!params) continue;
      if (!this.validateByIsRequired(key, value, params)) continue;
      if (!this.validateByMinLength(key, value, params)) continue;
    }
    return this.errors;
  }

  validateByMinLength(key, value, params) {
    if (params.minLength && value.length < params.minLength) {
      this.errors[key] = Messages.minLengthError(params.minLength);
      return false;
    }
    return true;
  }

  validateByIsRequired(key, value, params) {
    if (params.isRequired && !value) {
      this.errors[key] = Messages.isRequiredError(key);
      return false;
    }
    return true;
  }
}
