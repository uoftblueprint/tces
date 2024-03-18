const JobLeadTimelineEntry = require("../models/job_lead_timeline_entry.model");
const EmployerTimelineEntry = require("../models/employer_timeline_entry.model");
const ClientTimelineEntry = require("../models/client_timeline_entry.model");
const JobLead = require("../models/job_lead.model");
const Client = require("../models/client.model");
const User = require("../models/user.model");

const submitPlacementUpdateEntryInTimelines = async (data, pageType) => {
  // eslint-disable-next-line camelcase
  const { type, job_lead, client, user, employer, body } = data;

  // eslint-disable-next-line camelcase
  const jobLeadObject = await JobLead.findOne({ where: { id: job_lead } });
  const clientObject = await Client.findOne({ where: { id: client } });
  const userObject = await User.findOne({ where: { id: user } });

  const title = `${userObject.first_name} ${userObject.last_name} placed ${clientObject.name} with ${jobLeadObject.job_title}`;
  let mainBody = `A new placement has been made for ${clientObject.name} by ${userObject.first_name} ${userObject.last_name} for the position at ${jobLeadObject.job_title}.`;

  if (body) {
    mainBody += body;
  }

  const jobLeadBody = await JobLeadTimelineEntry.create({
    date_added: new Date(),
    type,
    title,
    body: mainBody,
    client,
    // eslint-disable-next-line camelcase
    job_lead,
    user,
  });

  await ClientTimelineEntry.create({
    date_added: new Date(),
    type,
    title,
    body: mainBody,
    client,
    // eslint-disable-next-line camelcase
    job_lead,
    user,
  });

  const employerBody = await EmployerTimelineEntry.create({
    date_added: new Date(),
    type,
    title,
    body: mainBody,
    client,
    employer,
    // eslint-disable-next-line camelcase
    job_lead,
    user,
  });

  if (pageType === "job_lead") {
    return jobLeadBody;
  }
  if (pageType === "employer") {
    return employerBody;
  }
  return null;
};

module.exports = {
  submitPlacementUpdateEntryInTimelines,
};
