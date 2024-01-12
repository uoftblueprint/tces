import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Client from "../../components/client-page";
import EditClientPage from "../../components/edit-client-page";

function ClientPage() {
  // return <Client />;

  const today = new Date();
  today.setMonth(today.getMonth() - 3);
  const threeMonthsAgo = today.toLocaleDateString("en-US");
  const closureDate = new Date(threeMonthsAgo);
  const currentDate = new Date();
  const timeDifference = currentDate - closureDate;
  const monthsSinceClosure = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24 * 30.44),
  );
  console.log(monthsSinceClosure);

  const initialClientInfo = {
    firstName: "First Name",
    email: "email@email.com",
    phone: "+1 111 111 1111",
    status: "Closed",
    closure_date: threeMonthsAgo,
    time_since_closure: `${monthsSinceClosure} Months`,
    status_at_exit: "Employed",
    status_at_3: "Employed",
    status_at_6: "Employed",
    status_at_9: "Employed",
    status_at_12: "Training",
  };

  const [clientInfo, setClientInfo] = React.useState(initialClientInfo);

  const handleSave = (updatedClientInfo) => {
    // Update the clientInfo state with the changes
    setClientInfo(updatedClientInfo);

    // You can also send the updated data to a server or perform any other actions
  };

  // const clientInfo = {
  //   firstName: "First Name",
  //   email: "email@email.com",
  //   phone: "+1 111 111 1111",
  //   status: "Closed",
  //   closure_date: threeMonthsAgo,
  //   time_since_closure: `${monthsSinceClosure} Months`,
  //   status_at_exit: "Employed",
  //   status_at_3: "Employed",
  //   status_at_6: "Employed",
  //   status_at_9: "Employed",
  //   status_at_12: "Training",
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/client-page"
          element={
            <Client
              clientInfo={clientInfo}
              monthsSinceClosure={monthsSinceClosure}
            />
          }
        />
        <Route
          path="/edit-client-page"
          element={
            <EditClientPage
              clientInfo={clientInfo}
              monthsSinceClosure={monthsSinceClosure}
              onSaveChanges={handleSave}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default ClientPage;
