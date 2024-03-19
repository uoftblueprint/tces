const Client = require("../../models/client.model");
const Employer = require("../../models/employer.model");
const JobLead = require("../../models/job_lead.model");
const User = require("../../models/user.model");

const deleteUserHandler = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: `User with id ${user_id} does not exist in the database`,
        data: null,
      });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({
        status: "fail",
        message: "A user cannot delete themselves",
        data: null,
      });
    }

    await user.destroy();

    // re-assign creator of their their job leads, clients and employers to admin
    const creator_clients = await Client.findAll({
      where: { creator: user_id },
    });
    const creator_job_leads = await JobLead.findAll({
      where: { creator: user_id },
    });
    const creator_employer = await Employer.findAll({
      where: { creator: user_id },
    });

    creator_clients.forEach(
      async (x) => await x.update({ creator: req.user.id }),
    );
    creator_job_leads.forEach(
      async (x) => await x.update({ creator: req.user.id }),
    );
    creator_employer.forEach(
      async (x) => await x.update({ creator: req.user.id }),
    );

    // re-assign owner of their their job leads, clients and employers to admin
    const owner_clients = await Client.findAll({ where: { owner: user_id } });
    const owner_job_leads = await JobLead.findAll({
      where: { owner: user_id },
    });
    const owner_employer = await Employer.findAll({
      where: { owner: user_id },
    });

    owner_clients.forEach(async (x) => await x.update({ owner: req.user.id }));
    owner_job_leads.forEach(
      async (x) => await x.update({ owner: req.user.id }),
    );
    owner_employer.forEach(async (x) => await x.update({ owner: req.user.id }));

    return res.status(200).json({
      status: "success",
      message: `No Content`,
      data: null,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "An unexpected error occured" });
  }
};

module.exports = deleteUserHandler;
