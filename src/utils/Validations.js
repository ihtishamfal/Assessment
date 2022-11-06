import { Validators, formValidator } from './Validate';

function register(data) {
  const valArr = [
    {
      validationFunction: () => Validators.userNameValidator('First Name', data.firstName),
    },
    {
      validationFunction: () => Validators.userNameValidator('Last Name', data.lastName),
    },
    {
      validationFunction: () => Validators.emailValidator('Email', data.email),
    },
    {
      validationFunction: () => Validators.nullValidator('Password', data.password),
    },
  ];

  const validated = formValidator(null, valArr);

  return validated;
}

function login(data) {
  const valArr = [
    {
      validationFunction: () => Validators.emailValidator('Email', data.email),
    },
    {
      validationFunction: () => Validators.nullValidator('Password', data.password),
    },
  ];

  const validated = formValidator(null, valArr);

  return validated;
}

function addCategory(data) {
  const valArr = [
    {
      validationFunction: () => Validators.nullValidator('Category Name', data.categoryname),
    },
    {
      validationFunction: () => Validators.nullValidator('Description', data.description),
    },
    {
      validationFunction: () => Validators.reactquillnullValidator('Description', data.description),
    },
  ];

  const validated = formValidator(null, valArr);

  return validated;
}
function addCar(data) {
  const valArr = [
    {
      validationFunction: () => Validators.nullValidator('Category', data.category),
    },
    {
      validationFunction: () => Validators.nullValidator('Color', data.color),
    },
    {
      validationFunction: () => Validators.nullValidator('Model', data.model),
    },
    {
      validationFunction: () => Validators.nullValidator('Make by', data.makeby),
    },
    {
      validationFunction: () => Validators.nullValidator('Registration no', data.registrationno),
    },
  ];

  const validated = formValidator(null, valArr);

  return validated;
}

// eslint-disable-next-line import/prefer-default-export
export {
  register, login, addCategory, addCar,
};
