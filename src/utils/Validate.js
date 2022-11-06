import { kRegExpEmail, kRegExpUserName } from './Constants';

function isEmpty(str) {
  return !str || str.length === 0;
}

class Validators {
  static noValidator() {
    return null;
  }

  static nullValidator(name, value) {
    if (isEmpty(value)) {
      return {
        key: name,
        message: `${name} can't be empty`,
      };
    }
    return null;
  }

  static reactquillnullValidator(name, value) {
    if (isEmpty(value) || value === '<p><br></p>') {
      return {
        key: name,
        message: `${name} can't be empty`,
      };
    }
    return null;
  }

  static selectValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} must be selected`;
    }
    return null;
  }

  static lengthValidator(name, value, length) {
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    if (String(value).length < length) {
      return `${name} can't be less than ${length} characters`;
    }

    return null;
  }

  static emailValidator(name, value) {
    if (isEmpty(value)) {
      return {
        key: name,
        message: `${name} can't be empty`,
      };
    }

    const regexMatch = value.match(kRegExpEmail);

    if (!regexMatch) {
      return {
        key: name,
        message: `Invalid ${name} Format`,
      };
    }

    return null;
  }

  static userNameValidator(name, value) {
    if (isEmpty(value)) {
      return {
        key: name,
        message: `${name} can't be empty`,
      };
    }

    const regexMatch = value.match(kRegExpUserName);

    if (!regexMatch) {
      return {
        key: name,
        message: `${name} can only contain alphabets, numbers or underscore`,
      };
      // return `${name} can only contain alphabets, numbers or underscore`;
    }

    return null;
  }
}

function formValidator(data, objsArr) {
  for (let i = 0; i < objsArr.length; i++) {
    const objDataValidationError = objsArr[i].validationFunction
      ? objsArr[i].validationFunction()
      : Validators.nullValidator(objsArr[i].name, data.get(objsArr[i].name));

    if (objDataValidationError) {
      //   toast.error(objDataValidationError);
      return objDataValidationError;
    }
  }

  return true;
}

export { Validators, formValidator };
