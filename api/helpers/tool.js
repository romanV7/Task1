'use strict'

const dataset = ['receivedId', 'gottenId', 'companyId', 'currIn', 'currOut', 'stuff', 'key', 'key_']

const workerTask = message => {
  const { task } = message
  const newarr = task.map(el => el.split(";").map(el => parseFloat(el)))
  const sortFn = (a, b) => (a[4] > b[4] ? -1 : 1)
  const findIndexFn = t => t[0] === thing[0] && t[1] === thing[1]
  const filterFn = (thing, index, self) => index === self.findIndex(findIndexFn)
  const mapper = array => array.map((elem, i) => ({ [dataset[i++]]: elem }))
  const sorted = newarr.sort(sortFn)
  const res = sorted.filter(filterFn)
  const convert = (i = 0) => res.map(mapper)

  const array = []
  for (let i = 0, { length } = res; i < length; i++) {
    array.push(Object.assign(...convert()[i], {}))
  }
  process.send(array)
}

module.exports = { workerTask }
