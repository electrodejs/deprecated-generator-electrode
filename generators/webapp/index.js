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

    this.fs.copyTpl(
      this.templatePath('server'),
      this.destinationPath(this.options.generateInto, 'server'),
      {hapiJs: this.config.get('serverType') === 'hapijs'}
    );

  }
});
