const express = require("express");
const router = express.Router();
const multiparty = require("multiparty");
const { uploadToAws } = require("../uploadToAws");

router.post("/", (req, res) => {
  let form = new multiparty.Form();

  form.parse(req, async function (err, fields, files) {
    if (fields.password[0] !== process.env.PASSWORD) {
      return res.status(401).json("Unauthorized!");
    }
    const uploadFile = await uploadToAws(files.file[0]);
    if (uploadFile) {
      return res.json(uploadFile);
    }
  });
});

module.exports = router;
