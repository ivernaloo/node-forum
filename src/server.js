"use strict";

import './base';

$.init((err) => {
    if (err){
        console.error(err);
        process.exit(-1);
    } else {
        console.log('inited [env=%s]',$.env);
    }

});


