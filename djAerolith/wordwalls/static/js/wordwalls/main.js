requirejs.config({
  baseUrl: '/static/js/wordwalls',
  paths: {
    jquery: '/static/js/aerolith/jquery-1.9.1.min',
    jquery_ui: '/static/js/aerolith/jquery-ui-1.10.2.custom.min',
    underscore: '/static/lib/underscore-min',
    backbone: '/static/lib/backbone-1.0.0',
    mustache: '/static/lib/mustache',
    text: '/static/lib/require/text',
    csrfAjax: '/static/js/aerolith/csrfAjax',
    json2: '/static/js/aerolith/json2'
  },
  shim: {
    underscore: {
      exports: '_'  // ^_^
    },
    backbone: {
      deps: ['underscore', 'jquery', 'json2'],
      exports: 'Backbone'
    },
    'jquery_ui': ['jquery'],
    'json2': {
      exports: 'JSON'
    }
  }
});


define([
  'module',
  'jquery',
  'models/Configure',
  'views/ConfigureView',
  'views/AppView',
  'csrfAjax'
  ], function (module, $, Configure, ConfigureView, AppView) {
  "use strict";
  $(function() {
    var accounts, Dispatcher, configuration, configurationView, appView,
        addlParams;
    /* Load bootstrapped params from backend. */
    addlParams = module.config().addlParams;
    addlParams = $.parseJSON(module.config().addlParams);
    configuration = new Configure;
    configurationView = new ConfigureView({
      model: configuration,
      el: $("#customize_popup")
    });
    appView = new AppView();
    appView.setTablenum(module.config().tablenum);
    Dispatcher = _.clone(Backbone.Events);
    // Scope of 'this' is going to drive me nuts.
    Dispatcher.listenTo(configuration, 'change', _.bind(
      appView.configChange, appView));
    /*
     * Catch beforeunload events. I can't figure out how to put this in
     * the appView.
     */
    window.onbeforeunload = _.bind(appView.unloadEventHandler, appView);

    /* Load addlParams into app. */
    configuration.setConfig(addlParams.style);
    if (_.has(addlParams, 'saveName')) {
      appView.setSaveName(addlParams.saveName);
    }
    if (mixpanel) {
      mixpanel.track('Entered table');
    }
  });
});