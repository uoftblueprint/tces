const { REACT_APP_API_BASE_URL } = process.env;

const login = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    });
    return response;
  } catch (error) {
    // TODO implement error handling logic
    throw error;
  }
};

const logout = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const isUserLoggedIn = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/is_logged_in`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const createUser = async (firstName, lastName, userEmail, userPassword) => {
  // eslint-disable-next-line no-useless-catch
  try {
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
  } catch (error) {
    // TODO implement error handling logic
    throw error;
  }
};

const getAllUsers = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    // TODO implement error handling logic
    throw error;
  }
};

const modifyUser = async (modifiedUser) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/users/${modifiedUser.userID}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: modifiedUser.firstName,
          last_name: modifiedUser.lastName,
          email: modifiedUser.email,
          password: modifiedUser.password,
          is_admin: modifiedUser.isAdmin,
        }),
      },
    );
    return response;
  } catch (error) {
    // TODO implement error handling logic
    throw error;
  }
};

const deleteUser = async (userID) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/users/${userID}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    // TODO implement error handling logic
    throw error;
  }
};

export {
  login,
  logout,
  isUserLoggedIn,
  createUser,
  getAllUsers,
  modifyUser,
  deleteUser,
};
