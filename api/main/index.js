'use strict'

const fetch = require('node-fetch')
const jszip = require('jszip')
const fs = require('fs')

const newZip = new jszip()

const Connect = require('../../connection')

const show = async () => {
  const data = await fetch('http://api.bestchange.ru/info.zip')
  const buffer = await data.arrayBuffer()
  const { files } = await newZip.loadAsync(buffer)
  const matched = files['bm_rates.dat']
  const string = await matched.async('string')
  const query = sort(string)

  try {
    const url = 'mongodb://localhost:27017'//process.env.MONGO_URL  //
    const db = await Connect.connectToDb(url)
    const collection = db.collection("collection");
    await collection.insertOne({ ...query })
    console.log('Connected successfully to database')
    console.log('Successfully saved to database')

  } catch (e) {
    console.log(e)
  }
}

const sort = str => {
  const arr = str.split('\n')
  const newarr = arr.map(el => el.split(";").map(el => parseFloat(el)))
  const sorted = newarr.sort((a, b) => (a[4] > b[4] ? -1 : 1))
  console.log({ input: sorted.length }, '\nStart sorting...')
  const res = sorted.filter((thing, index, self) => index === self.findIndex(t => t[0] === thing[0] && t[1] === thing[1]))
  console.log({ output: res.length})
  return res
}
(async () => await show())()
