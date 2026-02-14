const createHttpError = require("http-errors");
const CodeEditorService = require("../service/CodeEditorService");
const addCodeEditor = async (req, res, next) => {
    try {
        const createdRoom = CodeEditorService.createRoomInDB(req.body);
        return res.send(201, createdRoom);
    } catch (error) {
        return next(error);
    } finally {
        console.log("AddCodeEditor");
    }
};

const getCodeEditor = async (req, res, next) => {
    try {
        const editor = CodeEditorService.getCodeEditor(req.body);
        return res.send(200, editor);
    } catch (error) {
        return next(error);
    } finally {
        console.log("GetRoomEditor");
    }
};

const getAllPublicCodeEditors = async (req, res, next) => {
    try {
        
    } catch (error) {
        return next(error);
    } finally {
        console.log("GetAllCodeEditor")
    }
};

module.exports = { addCodeEditor };
