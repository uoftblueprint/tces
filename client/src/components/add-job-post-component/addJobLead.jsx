import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import AddJobLead from "./index";
import UserType from "../../prop-types/UserType";

function AddJobLeadParent({ setLocalExitRoute, currUser }) {
  // const initialState = {
  //   jobInfo: {
  //     id: 0,
  //     title: "",
  //     employer: "",
  //     location: "",
  //     minCompensation: null,
  //     maxCompensation: null,
  //     hoursPerWeek: null,
  //     creationDate: dayjs(),
  //     expirationDate: dayjs().add(1, "month"),
  //     employmentType: NaN,
  //     additionalInfo: "",
  //   },
  //   applicationFields: {
  //     custom_questions: [],
  //   },
  // };

  const initialState = {
    jobInfo: {
      id: 0,
      title: "he",
      employer: "he",
      location: "he",
      minCompensation: 10,
      maxCompensation: 20,
      hoursPerWeek: 30,
      creationDate: dayjs(),
      expirationDate: dayjs().add(1, "month"),
      employmentType: "Hourly",
      additionalInfo: "Hellooo",
    },
    applicationFields: {
      custom_questions: [],
    },
  };
  const [jobPostData, setJobPostData] = useState(initialState);

  const updateJobPostData = (section, data) => {
    setJobPostData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };
  return (
    <div>
      <AddJobLead
        jobPostData={jobPostData}
        updateJobPostData={updateJobPostData}
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
