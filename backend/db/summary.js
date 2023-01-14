const store = {};

const getSummary = (link) => {
  return store[link];
};

const addSummary = (link, summary) => {
  store[link] = summary;
};

module.exports = {
  getSummary,
  addSummary,
};
