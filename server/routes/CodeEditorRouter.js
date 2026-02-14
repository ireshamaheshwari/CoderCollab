const express = require('express');
const codeEditorRouter = express.Router();
const {addCodeEditor} = require("../controllers/CodeEditorController")
const {validateJWTToken} = require("../utils/AuthJWT")

codeEditorRouter.post('/add-editor/' , validateJWTToken , addCodeEditor);

module.exports = {codeEditorRouter};