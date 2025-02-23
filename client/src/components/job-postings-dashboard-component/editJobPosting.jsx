import { useState } from "react";
import dayjs from "dayjs";
import EditJob from "./editJobPostingMock";
import UserType from "../../prop-types/UserType";

function EditJobPost({ currUser }) {
  const initialState = {
    jobInfo: {
      id: 0,
      title: "",
      employer: "",
      location: "",
      rate_of_pay_min: null,
      rate_of_pay_max: null,
      rate_of_pay_frequency: "",
      hours_per_week: null,
      creation_date: dayjs(),
      close_date: dayjs().add(1, "month"),
      job_type: [],
      job_description: "",
      state: ""
    },
    applicationFields: {
      custom_questions: [],
    },
    state: "",
  };

  const [jobPostData, setJobPostData] = useState(initialState);

  const updateJobPostData = (section, data) => {
    setJobPostData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };
  console.log("catch", setJobPostData);
  return (
    <EditJob
      jobPostData={jobPostData.jobInfo}
      updateJobPostData={updateJobPostData}
      currUser={currUser}
    />
  );
}

EditJobPost.propTypes = {
  currUser: UserType.isRequired,
};

export default EditJobPost;
