import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import AddJobLead from "./index";
import UserType from "../../prop-types/UserType";

function AddJobLeadParent({ setLocalExitRoute, currUser }) {
  const initialState = {
    jobInfo: {
      id: 0,
      title: "",
      employer: "",
      location: "",
      minCompensation: null,
      maxCompensation: null,
      compensationRate: "",
      hoursPerWeek: null,
      creationDate: dayjs(),
      expirationDate: dayjs().add(1, "month"),
      employmentType: "",
      additionalInfo: "",
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
    <AddJobLead
      jobPostData={jobPostData}
      updateJobPostData={updateJobPostData}
      setLocalExitRoute={setLocalExitRoute}
      currUser={currUser}
    />
  );
}

AddJobLeadParent.propTypes = {
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLeadParent;
