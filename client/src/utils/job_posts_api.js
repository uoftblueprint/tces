const { REACT_APP_API_BASE_URL } = process.env;

const getAllJobPost = async (queryParams) => {

    // eslint-disable-next-line no-useless-catch
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/job_posts/${queryParams}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
    },
    );
    return response;
  };

export { getAllJobPost };


const getOneJobPost = async (jobPostId) => {

    // eslint-disable-next-line no-useless-catch
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/job_posts/${jobPostId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
    },
    );
    return response;
  };

export { getOneJobPost };

