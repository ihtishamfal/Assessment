/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
const initialData = {
  data: {},
};

const AuthReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'loginIn':
      const { authData } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          auth: {
            token: authData?.accessToken,
            email: authData?.user?.email,
          },
        },
      };
    case 'logOut':
      return {
        ...state,
        data: [],
      };

    default:
      return state;
  }
};

export default AuthReducer;
