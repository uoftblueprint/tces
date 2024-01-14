// helper functions with all relating to users

function getUserByIdHelper(managedUsers, userID) {
  return managedUsers.find((user) => user.userID === userID);
}

function getInitialsAndDisplayName(user) {
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "NA";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Unknown";
  return { initials, fullName };
}

export { getUserByIdHelper, getInitialsAndDisplayName };
