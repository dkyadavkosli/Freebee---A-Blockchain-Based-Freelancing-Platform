const router = require("express").Router();
const Comment = require("../models/Comment");

//REGISTER
router.post("/create", async (req, res) => {
  try {
    const newCom = new Comment({
      user_name: req.body.user_name,
      desc: req.body.desc
    });

    const com = newCom.save();
    res.status(200).json(com);
  } catch (err) {
    res.status(500).json("error");
  }
});

router.get("/", async (req, res) => {
  try {
    const com = await Comment.find({});
    res.status(200).json(com);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;