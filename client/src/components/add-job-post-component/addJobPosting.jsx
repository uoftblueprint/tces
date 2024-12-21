import { useState } from "react";
import dayjs from "dayjs";
import AddJobPost from "./index";
import UserType from "../../prop-types/UserType";

function AddJobPostParent({ currUser }) {
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
      description: "",
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
  return (
    <AddJobPost
      jobPostData={jobPostData}
      updateJobPostData={updateJobPostData}
      currUser={currUser}
    />
  );
}

AddJobPostParent.propTypes = {
  currUser: UserType.isRequired,
};

export default AddJobPostParent;
