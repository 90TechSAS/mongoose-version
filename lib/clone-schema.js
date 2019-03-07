module.exports = function(schema, mongoose) {
  'use strict';

  mongoose = mongoose || require('mongoose');

  var clonedSchema = new mongoose.Schema();

  schema.eachPath(function(key, path) {
    if (key === "_id") {
      return;
    }

    var clonedPath = {};

    clonedPath[key] = path.options;
    delete clonedPath[key].unique;

    clonedSchema.add(clonedPath);
  });

  for (const methodName in schema.methods) {
    if (schema.methods.hasOwnProperty(methodName)) {
      clonedSchema.method(methodName, schema.methods[methodName])
    }
  }

  return clonedSchema;
};