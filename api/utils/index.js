'use strict'

const fetch = require('node-fetch')
const jszip = require('jszip')
const fs = require('fs')

const newZip = new jszip()

const show = async () => {
  const data = await fetch('http://api.bestchange.ru/info.zip')
  const buffer = await data.arrayBuffer()
  const { files } = await newZip.loadAsync(buffer)
  const matched = files['bm_rates.dat']
  const string = await matched.async('string')
  return sort(string)
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
