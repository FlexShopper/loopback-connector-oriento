/**
 * Created by rabee3 on 4/21/15.
 */
'use strict';

var Oriento = require('oriento');
var http = require('http');

exports.initialize = function (dataSource, callBack) {

    // try environment variable for development
    var orientHost = process.env.ORIENTDB_HOST;  //source.settings.host;
    var orientPort = process.env.ORIENTDB_PORT;  //source.settings.port;
    var orientUser = process.env.ORIENTDB_USERNAME;  //source.settings.username;
    var orientPass = process.env.ORIENTDB_PASSWORD;  //source.settings.password;

    if(typeof orientHost == "undefined" && typeof orientPort == "undefined") {
        orientHost = source.settings.host;
        orientPort = source.settings.port;
        orientUser = source.settings.username;
        orientPass = source.settings.password;
    }

    var server = Oriento({
        host: orientHost,
        port: orientPort,
        username: orientUser,
        password: orientPass
    });

    dataSource.connector = server;
    dataSource.connector.dataSource = dataSource;

    return callBack && callBack();
}



