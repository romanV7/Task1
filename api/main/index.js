'use strict'

const fetch = require('node-fetch')
const jszip = require('jszip')
const fs = require('fs')

const newZip = new jszip()

const Connect = require('../../connection')
const Master = require('../cluster/master.js')

const show = async () => {
  const data = await fetch('http://api.bestchange.ru/info.zip')
  const buffer = await data.arrayBuffer()
  const { files } = await newZip.loadAsync(buffer)
  const matched = files['bm_rates.dat']
  const string = await matched.async('string')
  Master.start(string)
  process.on('sorted', async data => {
    try {
      const url = 'mongodb://localhost:27017'//process.env.MONGO_URL  //
      const [ db, client ] = await Connect.connectToDb(url)
      const collection = db.collection("collection");
      await collection.insertOne({ ...data })
      console.log('Connected successfully to database')
      console.log('Successfully saved to database')
      await client.close()
      console.log('Connection closed')
      process.exit(0)
    } catch (e) {
      console.log(e)
    }
  })
}

show()
