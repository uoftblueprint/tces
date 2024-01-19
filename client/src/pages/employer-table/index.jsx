import { useState } from "react";
import EmployerTableComponent from "../../components/employer-table-component";

function EmployerTable() {
  function createData(
    employerName,
    date,
    phoneNumber,
    email,
    primaryContact,
    owner,
  ) {
    return { employerName, date, phoneNumber, email, primaryContact, owner };
  }

  const mockData = [
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
    createData(
      "Emily Zhou",
      new Date("11/23/2003"),
      "+1 111 111 1111",
      "email@email.com",
      "First Last",
      "Emily Zhou",
    ),
  ];

  // Set the initial state with the mock data
  // eslint-disable-next-line no-unused-vars
  const [employerData, setEmployerData] = useState(mockData);

  return <EmployerTableComponent employerData={employerData} />;
}

export default EmployerTable;
