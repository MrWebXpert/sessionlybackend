const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  buffer: { type: Buffer },
});
const File = new mongoose.model("Files", fileSchema);

module.exports = File;