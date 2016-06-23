import _ from 'lodash';

RouterHistory = {
  paths: [],
  limit: 10,
  isReturn: false,
  isReturningNow: false,
  track: true,

  handleExitRoute(context) {
    const { path } = context;
    const isSamePathAsLastOne = _.last(RouterHistory.paths) === path;
    const hasExceededTheLimit = RouterHistory.paths.length > RouterHistory.limit;
    if(!isSamePathAsLastOne && RouterHistory.track && !RouterHistory.isReturningNow) {
      RouterHistory.paths.push(path);
      if(hasExceededTheLimit) RouterHistory.paths.shift();
    }
    RouterHistory.track = true;
  },

  handleEnterRoute(context) {
    RouterHistory.isReturn = RouterHistory.isReturningNow && RouterHistory.isReturn;
    RouterHistory.isReturningNow = false;
  },

  clearHistory() {
    const current = RouterHistory.paths.pop();
    RouterHistory.paths = [current];
  },

  dontTrack() {
    RouterHistory.track = false;
  },

  returnOrGo(defaultPath, defaultParam, defaultQueryParams) {
    RouterHistory.isReturn = true;
    RouterHistory.isReturningNow = true;
    const lastPath = RouterHistory.paths.pop();
    if(!lastPath) FlowRouter.go(defaultPath, defaultParam, defaultQueryParams);
    return FlowRouter.go(lastPath);
  },

  return() {
    RouterHistory.returnOrGo();
  }
};

FlowRouter.triggers.exit([RouterHistory.handleExitRoute]);
FlowRouter.triggers.enter([RouterHistory.handleEnterRoute]);

export default RouterHistory;
