import { useState } from "react";
import PropTypes from "prop-types";
import AddJobLead from "./index";
import UserType from "../../prop-types/UserType";
import EmployerType from "../../prop-types/EmployerType";

function AddJobLeadParent({ employers, setLocalExitRoute, currUser }) {
  const initialState = {
    jobLeads: [
      {
        id: 0,
        employer: "",
        title: "",
        minCompensation: "",
        maxCompensation: "",
        hoursPerWeek: "",
        nationalOC: "",
        description: "",
        creationDate: null,
        expirationDate: null,
        employmentType: "",
        numPositions: "",
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

  const resetJobLeadData = () => {
    setJobLeadData(initialState);
  };

  return (
    <div>
      <AddJobLead
        jobLeadData={jobLeadData.jobLeads}
        employers={employers}
        setJobLeadData={updateJobLeadData}
        resetInitialState={resetJobLeadData}
        setLocalExitRoute={setLocalExitRoute}
        currUser={currUser}
      />
    </div>
  );
}

AddJobLeadParent.propTypes = {
  employers: PropTypes.arrayOf(EmployerType).isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLeadParent;
