import { useState } from "react";
import AddCompanyInfo from "./company-info-component";
import AddEmployerInfo from "./employer-contact-component";
import AddEmployerJobLead from "./job-lead-component";

function AddEmployer() {
  const [page, setPage] = useState(1);
  const [showAddSecondaryButton, setShowAddSecondaryButton] = useState(true);
  const initialState = {
    companyInfo: [
      {
        id: 0,
        businessName: "",
        businessLegalName: "",
        naicsCode: "",
        phoneNumber: "",
        faxNumber: "",
        generalEmail: "",
        website: "",
        employerAddress: "",
        city: "",
        province: "",
        postalCode: "",
      },
    ],
    employerContacts: [
      {
        id: 0,
        name: "",
        jobTitle: "",
        phoneNumber: "",
        email: "",
        alternatePhoneNumber: "",
      },
    ],
    jobLeads: [
      {
        id: 0,
        jobTitle: "",
        compensation: "",
        hoursPerWeek: "",
        description: "",
        creationDate: null,
        expirationDate: null,
        employmentType: "",
      },
    ],
  };
  const [employerData, setEmployerData] = useState(initialState);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const updateEmployerData = (section, data) => {
    setEmployerData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  const resetEmployerData = () => {
    // setEmployerData(initialState);
  };

  return (
    <div>
      {page === 1 && (
        <AddCompanyInfo
          employerData={employerData.companyInfo}
          setEmployerData={(data) => updateEmployerData("companyInfo", data)}
          onPageChange={handlePageChange}
          showAddSecondaryButton={showAddSecondaryButton}
          setShowAddSecondaryButton={setShowAddSecondaryButton}
          resetInitialState={resetEmployerData}
        />
      )}
      {page === 2 && (
        <AddEmployerInfo
          employerData={employerData.employerContacts}
          setEmployerData={(data) =>
            updateEmployerData("employerContacts", data)
          }
          onPageChange={handlePageChange}
          resetInitialState={resetEmployerData}
        />
      )}
      {page === 3 && (
        <AddEmployerJobLead
          employerData={employerData.jobLeads}
          setEmployerData={(data) => updateEmployerData("jobLeads", data)}
          onPageChange={handlePageChange}
          resetInitialState={resetEmployerData}
        />
      )}
    </div>
  );
}

export default AddEmployer;
