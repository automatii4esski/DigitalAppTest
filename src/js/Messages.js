export class Messages {
  static isRequiredError(name) {
    return `Field ${name} is requierd`;
  }

  static maxLengthError(length) {
    return `Max length is ${length}`;
  }

  static minLengthError(length) {
    return `Min length is ${length}`;
  }

  static invalidFormatError(name) {
    return `${name} has invalid format`;
  }
}
