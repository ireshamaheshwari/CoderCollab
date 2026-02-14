const {CodeEditorModel} = require('../models/CodeEditorModel');

const createRoomInDB = async(requestBody) => {
    // console.log(requestBody);
    const createdBy = requestBody.userId;
    const language = requestBody.language;
    const isLive = String(requestBody.isLive) === "true";
    const code = requestBody.code;
    const codeEditorModel = new CodeEditorModel({createdBy, language, isLive , code});
    const codeEditor = await codeEditorModel.save();
    console.log(codeEditor)
    return codeEditor;  //return the id of newly created room in
}

const getRoomFromDB = async(requestBody) => {
    const codeEditorId = requestBody.codeEditorId;
    const codeEditor = await  CodeEditorModel.findById(codeEditorId).exec();
    if(!codeEditor){
        throw new Error("No such Room exists");
    }
    return codeEditor;
}


module.exports = {createRoomInDB};