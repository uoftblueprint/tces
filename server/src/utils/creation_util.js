export const addDefaultDates = (object) => {
  object.date_added = new Date();
  object.date_updated = new Date();
};

export const setOwnerAndCreator = (object, user_id) => {
  object.creator = user_id;
  object.owner = object.owner || user_id;
};
