const mongoose = require("mongoose");

const codeEditorSchema = new mongoose.Schema(
    {
        code: { type: String },
        language: { type: String, required: true, default: "javascript" },
        createdBy: { type: String, required: true },
        isLive: { type: Boolean, required: true},
    },
    { timestamps: true }
);

const CodeEditorModel = mongoose.model("codeEditor", codeEditorSchema);

module.exports = { CodeEditorModel };
