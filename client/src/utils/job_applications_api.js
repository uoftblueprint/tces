const { REACT_APP_API_BASE_URL } = process.env;

const uploadJobApplication = async (file) => {
  const formData = new FormData();
  formData.append("resume", file); // Assuming "resume" is the field name for the file

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/job_applications`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return response;
};

export default uploadJobApplication;
