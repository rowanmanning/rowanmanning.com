'use strict';

const assert = require('node:assert/strict');
const findTestElements = require('./helper/find-test-elements');
const hugoBuild = require('./helper/hugo-build');
const loadBuiltHTML = require('./helper/load-built-html');
const parseOpenGraphMeta = require('./helper/parse-open-graph-meta');
const parseStructuredData = require('./helper/parse-structured-data');
const parseTwitterMeta = require('./helper/parse-twitter-meta');

global.assert = assert;
global.findTestElements = findTestElements;
global.hugoBuild = hugoBuild;
global.loadBuiltHTML = loadBuiltHTML;
global.parseOpenGraphMeta = parseOpenGraphMeta;
global.parseStructuredData = parseStructuredData;
global.parseTwitterMeta = parseTwitterMeta;
