export const loginIn = (authData) => ({
  type: 'loginIn',
  payload: {
    authData,
  },
});

export const logOut = () => ({
  type: 'logOut',
});
