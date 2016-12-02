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
    let newIndexFile = (serverType === 'hapijs') ? 'indexHapi.js' : 'indexExpress.js';
    let deleteIndexFile = (serverType === 'hapijs') ? 'indexExpress.js' : 'indexHapi.js';
    let indexFilePath = 'server/plugins/webapp/index.js';
    let fileToMove = ('server/plugins/webapp/').concat(newIndexFile);
    let fileToDelete = ('server/plugins/webapp/').concat(deleteIndexFile);

    this.fs.copy(
      this.templatePath('server'),
      this.destinationPath(this.options.generateInto, 'server')
    );

    this.fs.move(fileToMove, indexFilePath);
    this.fs.delete(fileToDelete);
  }
});
