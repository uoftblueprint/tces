import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import AddCompanyInfo from "./company-info-component";
import AddEmployerInfo from "./employer-contact-component";
import AddEmployerJobLead from "./employer-job-lead-component";
import {
  createEmployer,
  createEmployerContacts,
  createJobLeads,
} from "../../utils/api";
import UserType from "../../prop-types/UserType";
import ErrorScreenComponent from "../shared/error-screen-component";

function AddEmployer({ currUser }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showAddSecondaryButton, setShowAddSecondaryButton] = useState(true);
  const [errorObj, setErrorObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [employerID, setEmployerID] = useState(null);
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
        title: "",
        minCompensation: NaN,
        maxCompensation: NaN,
        hoursPerWeek: NaN,
        nationalOC: NaN,
        description: "",
        creationDate: dayjs(),
        expirationDate: dayjs().add(1, "month"),
        employmentType: NaN,
        numPositions: NaN,
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
    setEmployerData(initialState);
  };

  const addEmployer = async (employer) => {
    try {
      const response = await createEmployer(
        employer,
        currUser.userID,
        currUser.userID,
      );

      if (response.ok) {
        const data = await response.json();
        setEmployerID(data.data.employer.id);
      } else {
        setErrorObj(response);
      }
    } catch (error) {
      setErrorObj(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addJobLeads = async (jobLeads) => {
    try {
      const response = await createJobLeads(
        jobLeads,
        currUser.userID,
        currUser.userID,
      );

      if (!response.ok) {
        setErrorObj(response);
      }
    } catch (error) {
      setErrorObj(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addContacts = async (contacts) => {
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const newContact of contacts) {
        // eslint-disable-next-line no-await-in-loop
        const response = await createEmployerContacts(newContact);

        if (!response.ok) {
          setErrorObj(response);
        }
      }
    } catch (error) {
      setErrorObj(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const employerBody = {
      ...employerData.companyInfo[0],
      ...employerData.companyInfo[1],
    };

    addEmployer(employerBody);
  };

  // triggers whenever employerID is declared thus employer has been created -> so create job lead with the employer id
  useEffect(() => {
    if (employerID) {
      if (employerData.employerContacts.length > 0) {
        const contacts = employerData.employerContacts;

        const contactsBody = contacts.map((contact) => {
          return {
            name: contact.name,
            job_type: contact.jobTitle,
            phone_number: contact.phoneNumber,
            email: contact.email,
            alt_phone_number: contact.alternatePhoneNumber,
            employer: employerID,
          };
        });

        addContacts(contactsBody);
      }

      if (employerData.jobLeads[0].title) {
        const jobLeadsBody = employerData.jobLeads.map((jobLead) => {
          return {
            ...jobLead,
            employer: employerID,
          };
        });
        addJobLeads(jobLeadsBody);
      }

      navigate("/employers");
    }
  }, [employerID]);

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;

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
          isLoading={isLoading}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}

AddEmployer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currUser: UserType.isRequired,
};

export default AddEmployer;
