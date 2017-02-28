#Node-Forum

又一个Node Forum，专业造轮子 17/2/22


## Todo
 - mongoose改成node.js driver native,涉及到ORM改成ODM 17/2/28

## Reference
merge-deep和Object.assign的区别
```js
  Object.assign({
      a: {
          b: {
              c: 'c',
              d: 'd'
          }
      }
  }, {
      a: {
          b: {
              e: 'e',
              f: 'f'
          }
      }
  }

```
得到的结果是{a: { b : { c: 'c', d: 'd', e: 'e', f: 'f'}}}

```js
{
    a: {
        b: {
            c: 'c',
            d: 'd'
        }
    }
}.merge({
    a: {
        b: {
            e: 'e',
            f: 'f'
        }
    }
})


```
得到的结果是{a: { b : {e: 'e', f: 'f'}}}
