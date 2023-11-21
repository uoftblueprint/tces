import { useState } from "react";
import AddCompanyInfo from "./company-info-component";
import AddEmployerInfo from "./employer-contact-component";
import AddEmployerJobLead from "./job-lead-component";

function AddEmployer() {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // State to hold employer data
  // const [employerData, setEmployerData] = useState({
  //   companyInfo: {
  //     businessName: "",
  //     businessLegalName: "",
  //     naicsCode: "",
  //     phoneNumber: "",
  //     faxNumber: "",
  //     generalEmail: "",
  //     website: "",
  //     employerAddress: "",
  //     city: "",
  //     province: "",
  //     postalCode: "",
  //   },
  //   employerContacts: [
  //     {
  //       id: 0,
  //       name: "",
  //       jobTitle: "",
  //       phoneNumber: "",
  //       email: "",
  //       alternatePhoneNumber: "",
  //     },
  //   ],
  //   jobLeads: [
  //     {
  //       id: 0,
  //       jobTitle: "",
  //       compensation: "",
  //       hoursPerWeek: "",
  //       description: "",
  //       creationDate: null,
  //       expirationDate: null,
  //       employmentType: "",
  //     },
  //   ],
  // });

  return (
    <div>
      {page === 1 && (
        <AddCompanyInfo
          // employerData={employerData}
          // setEmployerData={setEmployerData}
          onPageChange={(pageNumber) => handlePageChange(pageNumber)}
        />
      )}
      {page === 2 && (
        <AddEmployerInfo
          // employerData={employerData}
          // setEmployerData={setEmployerData}
          onPageChange={(pageNumber) => handlePageChange(pageNumber)}
        />
      )}
      {page === 3 && (
        <AddEmployerJobLead
          // employerData={employerData}
          // setEmployerData={setEmployerData}
          onPageChange={(pageNumber) => handlePageChange(pageNumber)}
        />
      )}
    </div>
  );
}

export default AddEmployer;
