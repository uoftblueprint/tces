import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ErrorComponent from "../../../shared/error-screen-component";
import LoadingComponent from "../../../shared/loading-screen-component";
import { getAllUsers } from "../../../../utils/api";

function ManagedUsersLoader({ setManagedUsers, children }) {
  const [loading, setLoading] = useState(true);
  const [errorDisplay, setError] = useState(null);

  useEffect(() => {
    const fetchManagedUsers = async () => {
      try {
        const response = await getAllUsers();
        if (response.ok) {
          const usersData = await response.json();

          const formattedUsers = usersData.data.rows.map((user) => ({
            userID: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            isAdmin: user.is_admin,
          }));
          setManagedUsers(formattedUsers);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Fetch failed.");
        }
      } catch (error) {
        setError("An error occurred: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManagedUsers();
  }, []);

  if (loading) return <LoadingComponent isLoading={loading} />;
  if (errorDisplay) return <ErrorComponent message={errorDisplay} />;

  return children;
}

ManagedUsersLoader.propTypes = {
  setManagedUsers: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default ManagedUsersLoader;
