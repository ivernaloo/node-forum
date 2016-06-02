"use strict";

/*
*  test the node proejct
*
* */

import {expect} from 'chai';
import request from '../test';

describe('topic', function(){

    it('list', async function(){

        const res = await request.get('/api/topic/list');
        console.log(res);
    })
});