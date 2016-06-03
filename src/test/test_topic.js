"use strict";

/*
*  test the node proejct
*
* */

import {expect} from 'chai';
import {session} from '../test';


describe('topic', function(){

    it('create topic', async function(){

        const request = session();

        {
            const ret = await request.post('/api/login', {
                name: 'test0',
                password: '12345678'
            });
            console.log(ret);
            expect(ret.token).to.be.a('string');
        }

        {
            const ret = await request.post('/api/topic/add', {
                title: '哈哈哈哈',
                content: '什么什么什么',
                tags: 'test'
            });
            console.log(ret);
            expect(ret.topic.title).to.equal('哈哈哈哈');
            expect(ret.topic.content).to.equal('什么什么什么');
            expect(ret.topic.tags).to.have.members(['test']);
        }
    });
});