import * as React from "react";

import Client from "../../components/client-page";
// import { getUserByIdHelper } from "../../utils/users";

// const [managedUsers, setManagedUsers] = React.useState([]);

function ClientPage() {
  const today = new Date();
  today.setMonth(today.getMonth() - 3);
  const threeMonthsAgo = today.toLocaleDateString("en-US");
  const closureDate = new Date(threeMonthsAgo);
  const currentDate = new Date();
  const timeDifference = currentDate - closureDate;
  const monthsSinceClosure = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24 * 30.44),
  );

  const dummyOwner = {
    userID: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    isAdmin: true,
  };

  const dummyCreator = {
    userID: 2,
    firstName: "Selin",
    lastName: "Tasman",
    email: "selin.doe@example.com",
    isAdmin: true,
  };

  const initialClientInfo = {
    firstName: "First Name",
    email: "email@email.com",
    phone: "+1 111 111 1111",
    status: "Closed",
    closure_date: threeMonthsAgo,
    time_since_closure: `${monthsSinceClosure} Months`,
    status_at_exit: "Employed",
    status_at_3: "",
    status_at_6: "Employed",
    status_at_9: "Employed",
    status_at_12: "Training",
    owner: dummyOwner,
    creator: dummyCreator,
  };

  const [clientInfo, setClientInfo] = React.useState(initialClientInfo);
  const { owner, creator } = clientInfo;

  const handleSave = (updatedClientInfo) => {
    setClientInfo(updatedClientInfo);
  };

  return (
    <Client
      clientInfo={clientInfo}
      monthsSinceClosure={monthsSinceClosure}
      onSaveChanges={handleSave}
      owner={owner}
      creator={creator}
    />
  );
}

export default ClientPage;
