// mongoose es el paquete npm para manejarBD Mongo
const newmongoose = require('mongoose');

// resolver 'deprecation warnings' configurando los flags correspondientes
newmongoose.set('useNewUrlParser', true);
newmongoose.set('useFindAndModify', false);
newmongoose.set('useCreateIndex', true);
newmongoose.set('useUnifiedTopology', true);
newmongoose.set('useNewUrlParser', true);

module.exports = newmongoose;