const { REACT_APP_API_BASE_URL } = process.env;

const login = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/login`, {
      method: "POST",
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

export default login;
