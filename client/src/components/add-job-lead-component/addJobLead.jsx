import { useState } from "react";
import AddJobLead from "./index";

function AddJobLeadParent() {
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
    // setJobLeadData(initialState);
  };

  return (
    <div>
      <AddJobLead
        jobLeadData={jobLeadData.jobLeads}
        setJobLeadData={updateJobLeadData}
        resetInitialState={resetJobLeadData}
      />
    </div>
  );
}

export default AddJobLeadParent;
