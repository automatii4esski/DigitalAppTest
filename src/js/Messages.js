export class Messages {
  static isRequiredError(name) {
    return `Field ${name} is requierd`;
  }

  static minLengthError(length) {
    return `Min length is ${length}`;
  }
}
