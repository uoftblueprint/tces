const { REACT_APP_API_BASE_URL } = process.env;

const login = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });
  return response;
};

const logout = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const isUserLoggedIn = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/is_logged_in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const createUser = async (firstName, lastName, userEmail, userPassword) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      password: userPassword,
    }),
  });
  return response;
};

const getAllUsers = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const modifyUser = async (modifiedUser) => {
  const modifyUserBody = modifiedUser.password
    ? {
        first_name: modifiedUser.firstName,
        last_name: modifiedUser.lastName,
        email: modifiedUser.email,
        password: modifiedUser.password,
        is_admin: modifiedUser.isAdmin,
      }
    : {
        first_name: modifiedUser.firstName,
        last_name: modifiedUser.lastName,
        email: modifiedUser.email,
        is_admin: modifiedUser.isAdmin,
      };
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/users/${modifiedUser.userID}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifyUserBody),
    },
  );
  return response;
};

const deleteUser = async (userID) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users/${userID}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const getEmployer = async (employerID) => {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/employers/${employerID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export {
  login,
  logout,
  isUserLoggedIn,
  createUser,
  getAllUsers,
  modifyUser,
  deleteUser,
  getEmployer,
};
