// eslint is disabled here as this is a util for creating objects for our Sequelize model, hence we need
//  pothole case, and to reassign the objects
/* eslint-disable no-param-reassign, camelcase */
export const addDefaultDates = (requestObject) => {
  requestObject.date_added = new Date();
  requestObject.date_updated = new Date();
};

export const setOwnerAndCreator = (requestObject, user_id) => {
  requestObject.creator = user_id;
  requestObject.owner = requestObject.owner || user_id;
};
/* eslint-enable no-param-reassign, camelcase */
