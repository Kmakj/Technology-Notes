//index.js root file
const defaultState = {
  appName: "Technology-Notes",
  articles: null
};

const reducer = function(state = defaultState, action) {
  return state;
};

const store = createStore(reducer);
