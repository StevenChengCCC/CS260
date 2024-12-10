const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let scores = [];