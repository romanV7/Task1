'use strict';

const fetch = require('node-fetch');
const Jszip = require('jszip');

const newZip = new Jszip();

const Master = require('../cluster/master.js');
const Helpers = require('../helpers/saving.js');

const show = async () => {
  const data = await fetch('http://api.bestchange.ru/info.zip');
  const buffer = await data.arrayBuffer();
  const { files } = await newZip.loadAsync(buffer);
  const matched = files['bm_rates.dat'];
  const string = await matched.async('string');
  Master.start(string);
  process.on('sorted', Helpers.saving);
  process.on('run', () => require('../../server'));
};

show();
