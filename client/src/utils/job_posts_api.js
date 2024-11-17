const { REACT_APP_API_BASE_URL } = process.env;

const modifyJobPost = async (modifiedJobPost) => {
    const modifyJobPostBody = {
      values: {
        title: modifiedJobPost.owner,
        employer: modifiedJobPost.jobTitle,
        location: modifiedJobPost.location,
        hours_per_week: modifiedJobPost.hours_per_week,
        rate_of_pay_min: modifiedJobPost.rate_of_pay_min,
        rate_of_pay_max: modifiedJobPost.rate_of_pay_max,
        rate_of_pay_frequency: modifiedJobPost.rate_of_pay_frequency,
        job_type: modifiedJobPost.job_type,
        close_date: modifiedJobPost.close_date,
        job_description: modifiedJobPost.job_description,
        custom_questions: modifiedJobPost.custom_questions,
        state: modifiedJobPost.state,
      },
    };
  
    // eslint-disable-next-line no-useless-catch
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/job_posts/${modifiedJobPost.job_post_id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifyJobPostBody),
      },
    );
    return response;
  };

export { modifyJobPost };