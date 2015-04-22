/**
 * Created by rabee3 on 4/21/15.
 */
'use strict';

var Oriento = require('oriento');
var Connector = require('loopback-connector').Connector;
var util = require('util');

var OrientDB = function(settings) {
    //Connector.call(this, 'oriento', settings);
    this.settings = settings;
};

// Inherit from loopback-datasource-juggler BaseSQL
require('util').inherits(OrientDB, Connector);

OrientDB.prototype.connect = function(callback) {
    var server = Oriento({
        host: this.settings.host,
        port: this.settings.port,
        username: this.settings.username,
        password: this.settings.password
    });

    var dbConnection = server.use(this.settings.database);
    this.dbConnection   = dbConnection;
    if(this.dbConnection) {
        process.nextTick(done);
        callback && callback();
    }
}

OrientDB.prototype.count = function count(model, callback, where) {
    this.dbConnection.select('count(*)').from(model).where(where).scalar().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

OrientDB.prototype.create = function (model, data, callback) {
    this.dbConnection.insert().into(model).set(data).one().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

OrientDB.prototype.updateOrCreate = function updateOrCreate(model, data, callback) {
    return this.create(model, data, callback);
};

OrientDB.prototype.destroy = function destroy(model, id, callback) {
    this.dbConnection.delete().from(model).where({id: id}).limit(1).scalar().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

OrientDB.prototype.save = function (model, data, callback) {
    return this.create(model, data, callback);
};

OrientDB.prototype.find = function find(model, id, callback) {
    this.dbConnection.select(' * ').from(model).where({id: id}).scalar().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

OrientDB.prototype.exists = function (model, id, callback) {
    this.dbConnection.select(' * ').from(model).where({id: id}).limit(1).scalar().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

OrientDB.prototype.all = function all(model, filter, callback) {
    this.dbConnection.select(' * ').from(model).where(filter).scalar().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

OrientDB.prototype.destroyAll = function destroyAll(model, where, callback) {
    this.dbConnection.delete().from(model).where(where).scalar().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

OrientDB.prototype.updateAttributes = function updateAttrs(model, id, data, callback) {
    this.dbConnection.update(model).set(data).where({id: id}).scalar().then(function (result) {
        return callback(null, result);
    }).catch(function (error) {
        return callback(error);
    });
};

// exports
exports.initialize =  function (dataSource, callBack) {
        if (!Oriento) {
            return;
        }

        // try environment variables if set for development
        var orientHost      = process.env.ORIENTDB_HOST;
        var orientPort      = process.env.ORIENTDB_PORT;
        var orientUser      = process.env.ORIENTDB_USERNAME;
        var orientPass      = process.env.ORIENTDB_PASSWORD;
        var orientDBname    = process.env.ORIENTDB_DBNAME;

        // Grab the settings from datasource.json
        if (typeof orientHost == "undefined" && typeof orientPort == "undefined") {
            orientHost      = source.settings.host;
            orientPort      = source.settings.port;
            orientUser      = source.settings.username;
            orientPass      = source.settings.password;
            orientDBname    = source.settings.dbname;
        }

        // hand the connector an Orient database connection we will be using.
        var orientObj = new OrientDB({
            host: orientHost,
            port: orientPort,
            username: orientUser,
            password: orientPass,
            database: orientDBname
        });

        dataSource.connector = orientObj.dbConnection;
        dataSource.connector.dataSource = dataSource;

        //dataSource.client.on('error', function (err) {
        //    dataSource.emit('error', err);
        //    dataSource.connected = false;
        //    dataSource.connecting = false;
        //});

        if (callBack) {
            dataSource.connecting = true;
            dataSource.connector.connect(callBack);
        }
};

exports.OrientDB = OrientDB;


