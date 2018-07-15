const mongoose = require('mongoose');

const SchemaM = mongoose.Schema;

const proxySchema = new SchemaM({
  ip: {
    type: String,
  },
  port: {
    type: Number,
  },
  country: {
    type: String,
  },
  time: {
    type: Number,
    default: new Date()
  }
});

const Proxy = mongoose.model('proxy', proxySchema);

module.exports = Proxy;
