// helper functions with all things related to job Leads

function valuetext(value) {
  return `$${value}`;
}

function findCompensationRange(managedJobLeads) {
  if (managedJobLeads.length < 1) return [null, null];

  let minCompensation = managedJobLeads[0]?.compensationMin ?? 0;
  let maxCompensation = managedJobLeads[0]?.compensationMax ?? 0;

  managedJobLeads.forEach((lead) => {
    if (lead.compensationMin && lead.compensationMin < minCompensation)
      minCompensation = lead.compensationMin;
    if (lead.compensationMin && lead.compensationMax > maxCompensation)
      maxCompensation = lead.compensationMax;
  });

  if (minCompensation === maxCompensation) {
    minCompensation = 0;
  }

  return [minCompensation, maxCompensation];
}

function displayCompensationRange(min, max, postfix = "") {
  const minComp = min || "0";
  const maxComp = max || "0";
  return `$${minComp}${postfix} - $${maxComp}${postfix}`;
}

function findHoursPerWeekRange(managedJobLeads) {
  if (managedJobLeads.length < 1) return [null, null];
  let minHoursPerWeek = managedJobLeads[0]?.hoursPerWeek ?? 0;
  let maxHoursPerWeek = managedJobLeads[0]?.hoursPerWeek ?? 0;

  managedJobLeads.forEach((lead) => {
    if (lead.hoursPerWeek && lead.hoursPerWeek < minHoursPerWeek) {
      minHoursPerWeek = lead.hoursPerWeek;
    }
    if (lead.hoursPerWeek && lead.hoursPerWeek > maxHoursPerWeek)
      maxHoursPerWeek = lead.hoursPerWeek;
  });

  if (minHoursPerWeek === maxHoursPerWeek) {
    minHoursPerWeek = 0;
  }

  minHoursPerWeek = minHoursPerWeek ?? 0;
  maxHoursPerWeek = maxHoursPerWeek ?? 0;

  return [minHoursPerWeek, maxHoursPerWeek];
}

// get all the Creator names to display in options filter tab
function getOwnerIds(ownerIDList, getUserById) {
  const uniqueOwnerIDs = new Set();
  const ownerDetails = [];

  ownerIDList.forEach((ownerID) => {
    if (!uniqueOwnerIDs.has(ownerID)) {
      uniqueOwnerIDs.add(ownerID);

      const user = getUserById(ownerID);

      const userName = user
        ? `${user.firstName} ${user.lastName}`
        : `User ${ownerID}`;

      ownerDetails.push({
        ownerID,
        userName,
      });
    }
  });

  return ownerDetails;
}

export {
  valuetext,
  findHoursPerWeekRange,
  findCompensationRange,
  getOwnerIds,
  displayCompensationRange,
};
