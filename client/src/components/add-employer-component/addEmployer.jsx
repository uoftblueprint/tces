import { useState } from "react";
import AddCompanyInfo from "./company-info-component";
import AddEmployerInfo from "./employer-contact-component";
import AddEmployerJobLead from "./job-lead-component";

function AddEmployer() {
  const [page, setPage] = useState(1);
  const [showAddSecondaryButton, setShowAddSecondaryButton] = useState(true);
  const [employerData, setEmployerData] = useState({
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
        employerAddress: null,
        city: null,
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
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const updateEmployerData = (section, data) => {
    setEmployerData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
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
        />
      )}
      {page === 2 && (
        <AddEmployerInfo
          employerData={employerData.employerContacts}
          setEmployerData={(data) =>
            updateEmployerData("employerContacts", data)
          }
          onPageChange={handlePageChange}
        />
      )}
      {page === 3 && (
        <AddEmployerJobLead
          employerData={employerData.jobLeads}
          setEmployerData={(data) => updateEmployerData("jobLeads", data)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default AddEmployer;
