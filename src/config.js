"use strict";

/*
*  another forum
*
* @author
*
* */

module.exports = function(set, get, has){

    // server listen port
    set('web.port', 3000);

    // session secret
    set('web.session.secret', 'test');
};