// helper functions with all things related to job Leads

function valuetext(value) {
  return `$${value}`;
}

function findCompensationRange(managedJobLeads) {
  if (managedJobLeads.length < 1) return [null, null];

  let minCompensation = managedJobLeads[0]?.compensationMin ?? 0;
  let maxCompensation = managedJobLeads[0]?.compensationMax ?? 0;

  managedJobLeads.forEach((lead) => {
    if (lead.compensationMin < minCompensation)
      minCompensation = lead.compensationMin;
    if (lead.compensationMax > maxCompensation)
      maxCompensation = lead.compensationMax;
  });

  if (minCompensation === maxCompensation) {
    minCompensation = 0;
  }

  return [minCompensation, maxCompensation];
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
function getOwnerIds(managedJobLeads, getUserById) {
  const uniqueCreatorIDs = new Set();
  const ownerDetails = [];

  managedJobLeads.forEach((lead) => {
    if (!uniqueCreatorIDs.has(lead.creatorID)) {
      uniqueCreatorIDs.add(lead.creatorID);

      const user = getUserById(lead.creatorID);

      const userName = user
        ? `${user.firstName} ${user.lastName}`
        : `User ${lead.creatorID}`;

      ownerDetails.push({
        creatorID: lead.creatorID,
        userName,
      });
    }
  });

  return ownerDetails;
}

export { valuetext, findHoursPerWeekRange, findCompensationRange, getOwnerIds };
