import { useParams } from "react-router-dom";
import EditComponent from "../../components/edit-user-component";

function Edit() {
  const { userID } = useParams();
  const parsedUserID = parseInt(userID, 10);

  return <EditComponent userID={parsedUserID} />;
}

export default Edit;
