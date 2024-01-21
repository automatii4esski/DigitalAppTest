export const messageFormSchema = {
  fullName: {
    minLength: 4,
    isRequired: true,
  },
  email: {
    minLength: 3,
    isRequired: true,
    regEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  message: {
    maxLength: 25,
  },
};
