var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const session = res.locals.session;
  res.render("index", { user: session?.user });
});

module.exports = router;
