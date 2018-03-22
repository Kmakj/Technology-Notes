//index.js root file
const defaultState = {
  appName: "Meowdium",
  articles: null
};

const reducer = function(state = defaultState, action) {
  return state;
};

const store = createStore(reducer);
