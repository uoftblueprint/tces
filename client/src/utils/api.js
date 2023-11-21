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

export { login, logout, isUserLoggedIn };
