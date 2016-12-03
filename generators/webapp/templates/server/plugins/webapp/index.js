module.exports = require(<% if (hapiJs) { %>"./hapi-plugin"<% } else { %>"./express-middleware"<% } %>);
