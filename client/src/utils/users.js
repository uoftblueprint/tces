// helper functions with all relating to users

function getUserByIdHelper(managedUsers, userID) {
  return managedUsers.find((user) => user.userID === userID);
}

function getInitialsAndDisplayName(user) {
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "NA";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Unknown";
  return { initials, fullName };
}

function cleanStatusString(string) {
  if (string) {
    const stringWithSpaces = string.replace(/_/g, " ");

    return stringWithSpaces.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
}

export { getUserByIdHelper, getInitialsAndDisplayName, cleanStatusString };
