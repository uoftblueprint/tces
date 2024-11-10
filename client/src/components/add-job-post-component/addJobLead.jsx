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
      hoursPerWeek: null,
      creationDate: dayjs(),
      expirationDate: dayjs().add(1, "month"),
      employmentType: NaN,
      additionalInfo: "",
    },
    applicationFields: {
      custom_questions: [],
    },
  };
  const [jobPostData, setJobLeadData] = useState(initialState);

  const updateJobLeadData = (data) => {
    setJobLeadData((prevData) => ({
      ...prevData,
      jobLeads: data,
    }));
  };

  return (
    <div>
      <AddJobLead
        jobPostData={jobPostData}
        setJobLeadData={updateJobLeadData}
        setLocalExitRoute={setLocalExitRoute}
        currUser={currUser}
      />
    </div>
  );
}

AddJobLeadParent.propTypes = {
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLeadParent;
