const route = require("express").Router();
const {
  uploadSingle,
  saveFileName,
  getImg,
  getImgs,
  deleteImg,
  uploadMultiple,
  saveMultipleFileNames,
} = require("../controllers/imgController");
const auth = require("../middleware/authJwtMiddleware");
route.post("/post/:name", auth, deleteImg, uploadSingle, saveFileName);
route.get("/getImg/:name", auth, getImg);
route.get("/getImgPublic/:name", getImg);
route.post(
  "/postMultiple/:postId",
  auth,
  uploadMultiple,
  saveMultipleFileNames,
  (req, res) => {
    res.json(req.files);
  }
);
module.exports = route;
