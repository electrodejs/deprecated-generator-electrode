'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });
  },

  writing: function () {
    let serverType = this.config.get('serverType');
    this.fs.copyTpl(
      this.templatePath('server'),
      this.destinationPath(this.options.generateInto, 'server'),
      {hapiJs: serverType === 'hapijs'}
    );
    let deleteIndexFile = (serverType === 'hapijs') ?
                          '/server/plugins/webapp/express-middleware.js'
                          : '/server/plugins/webapp/hapi-plugin.js';
    this.fs.delete(this.destinationPath(this.options.generateInto).concat(deleteIndexFile));

  }
});
