const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        userIdList: [{ type: String }],
        codeEditorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "codeEditor",
        },
    },
    { timestamps: true }
);

const roomsModel = mongoose.model("rooms", roomSchema);

module.exports = { roomsModel };
