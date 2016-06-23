Package.describe({
  name: 'cinn:router-history',
  version: '0.0.1',
  summary: 'Keep track of FlowRouter navigation history',
  git: 'https://github.com/cinn-labs/meteor-router-history',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3.1');
  api.use('ecmascript');
  api.use('kadira:flow-router@2.12.1');
  api.export('RouterHistory');
  api.addFiles('router-history.client.js', 'client');
});
