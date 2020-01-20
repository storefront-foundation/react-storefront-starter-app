class Validator {
  validateString() {
    return { errors: [] }
  }
}

const AmpHtmlValidator = {
  getInstance() {
    return Promise.resolve(new Validator())
  },
}

module.exports = AmpHtmlValidator
