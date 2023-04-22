const twilio = require('twilio');
const cron = require('node-cron');
const accountSid = 'AC2bfe4bf126f9f98cf620f73959563da6';
const authToken = '151c47aeccba0898f23afb73cde2bc7e';
const client = twilio(accountSid, authToken);
const Class = require("../models/Class");

