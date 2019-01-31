require('./../config/config');

const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Notes} = require('./../models/notes');
const {Users} = require('./../models/users');
const {notes, populateNotes, users, populateUsers} = require('./seed/seed');

beforeEach(populateNotes);
beforeEach(populateUsers);

//tests begin here

