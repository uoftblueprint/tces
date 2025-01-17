module.exports = {
  create: async (data) => ({
    ...data,
    id: Math.floor(Math.random() * 1000),
    async save() {
      return this;
    },
  }),
};
