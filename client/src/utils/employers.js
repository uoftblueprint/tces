// helper functions with all relating to employers

function getEmployerByIdHelper(employers, employerID) {
  return employers.find((employer) => employer.employerID === employerID);
}

export default getEmployerByIdHelper;
