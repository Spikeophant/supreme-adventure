const router = require('express').Router();

const { createThought, getThought, getThoughts, delThought, updateThought } = require('../../controllers/thoughtController')