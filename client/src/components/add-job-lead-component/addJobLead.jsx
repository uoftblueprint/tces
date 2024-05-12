import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import AddJobLead from "./index";
import UserType from "../../prop-types/UserType";

function AddJobLeadParent({ setLocalExitRoute, currUser }) {
  const initialState = {
    jobLeads: [
      {
        id: 0,
        employer: NaN,
        title: "",
        minCompensation: 0,
        maxCompensation: 0,
        hoursPerWeek: null,
        nationalOC: NaN,
        description: "",
        creationDate: dayjs(),
        expirationDate: dayjs().add(1, "month"),
        employmentType: NaN,
        numPositions: NaN,
      },
    ],
  };
  const [jobLeadData, setJobLeadData] = useState(initialState);

  const updateJobLeadData = (data) => {
    setJobLeadData((prevData) => ({
      ...prevData,
      jobLeads: data,
    }));
  };

  return (
    <div>
      <AddJobLead
        jobLeadData={jobLeadData.jobLeads}
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
