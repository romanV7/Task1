'use strict'

const chunkArray = (arr, elementsByPart, clientsCount) => {
  const { length } = arr
  const tasks = []
  let needWorkers = length / elementsByPart
  if (needWorkers > clientsCount) {
    console.log('Dividing tasks between subprocesses...')
    while (needWorkers > clientsCount) {
      elementsByPart++
      needWorkers = length / elementsByPart
    }
    console.log('Each worker takes its task')
    console.log({ needWorkers, elementsByPart })
  }
  let i = 0
  while (arr.length > 0) {
    tasks.push(arr.splice(0, elementsByPart))
  }
  return tasks
}

const sortFn = (a, b) => (a['stuff'] > b['stuff'] ? -1 : 1)
const findIndexFn = t =>  t['receivedId'] === thing['receivedId'] && t['gottenId'] === thing['gottenId']
const finterFn = (thing, index, self) => index === self.findIndex(findIndexFn)

const sortAgain = arr => arr.sort(sortFn).filter(finterFn)

module.exports = { chunkArray, sortAgain }
