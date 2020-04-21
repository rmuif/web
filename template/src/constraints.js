const constraints = {
  firstName: {
    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  lastName: {
    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  username: {
    length: {
      minimum: 2,
      maximum: 20,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  emailAddress: {
    email: {
      message: "^E-mail address is invalid",
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  emailAddressConfirmation: {
    email: {
      message: "^E-mail address confirmation is invalid",
    },

    equality: {
      attribute: "emailAddress",
      message: "^E-mail address confirmation is not equal to e-mail address",
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  password: {
    length: {
      minimum: 6,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  passwordConfirmation: {
    equality: "password",

    length: {
      minimum: 6,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },
};

export default constraints;
