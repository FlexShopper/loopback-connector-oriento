/**
 * Created by rabee3 on 4/21/15.
 */
'use strict';

var Oriento = require('oriento');
var SqlConnector = require('loopback-connector').SqlConnector;

(function() {
    module.exports = {
        initialize: function (dataSource, callBack) {
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

            var server = new OrientoInstance({
                host: orientHost,
                port: orientPort,
                username: orientUser,
                password: orientPass,
                database: orientDBname
            });

            dataSource.connector = dbConnection;
            dataSource.connector.dataSource = dataSource;

            dataSource.client.on('error', function (err) {
                dataSource.emit('error', err);
                dataSource.connected = false;
                dataSource.connecting = false;
            });

            process.nextTick(function () {
                return callBack && callBack();
            });
        },
        orientoinstance : function(opts) {
            return new OrientoInstance(opts);
        }
    }

    OrientoInstance = (function() {
        OrientoInstance.prototype.create = function (model, data, callback) {

        };

        OrientoInstance.prototype.updateOrCreate = function updateOrCreate(model, data, callback) {

        };

        OrientoInstance.prototype.destroy = function destroy(model, id, callback) {

        };

        OrientoInstance.prototype.save = function (model, data, callback) {

        };

        OrientoInstance.prototype.find = function find(model, id, callback) {

        };

        OrientoInstance.prototype.exists = function (model, id, callback) {

        };

        OrientoInstance.prototype.all = function all(model, filter, callback) {

        };

        OrientoInstance.prototype.destroyAll = function destroyAll(model, where, callback) {

        };

        OrientoInstance.prototype.count = function count(model, callback, where) {

        };

        OrientoInstance.prototype.updateAttributes = function updateAttrs(model, id, data, callback) {

        };
    })();
}).call(this);

function OrientoInstance(client, settings)
{

}



