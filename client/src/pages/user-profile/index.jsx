import UserType from "../../prop-types/UserType";
import Profile from "../../components/user-profile-component";

function UserProfile({ currUser }) {
  return <Profile currUser={currUser} />;
}

UserProfile.propTypes = {
  currUser: UserType.isRequired,
};

export default UserProfile;
