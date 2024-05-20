import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditComponent from "../../components/edit-user-component";
import ErrorComponent from "../../components/shared/error-screen-component";
import { getUser } from "../../utils/api";
import LoadingScreenComponent from "../../components/shared/loading-screen-component";

function Edit() {
  const errorMessage = "User to edit not found.";
  const { userID } = useParams();
  const parsedUserID = parseInt(userID, 10);

  const [userToEdit, setUserToEdit] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    const fetchUser = async () => {
      const res = await getUser(parsedUserID);
      const json = await res.json();
      if (json.status === "success") {
        const { user } = json.data;

        const userBody = {
          userID: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          isAdmin: user.is_admin,
        };

        setUserToEdit(userBody);
      } else {
        setError(errorMessage);
      }
    };

    fetchUser();
  }, []);

  if (!userToEdit) return <LoadingScreenComponent isLoading />;

  if (error) return <ErrorComponent message={errorMessage} />;

  return <EditComponent currUser={userToEdit} />;
}

Edit.propTypes = {};

export default Edit;
