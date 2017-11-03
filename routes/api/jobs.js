const router = require("express").Router();
const movieController = require("jobsController");

// Matches with "/api/books"
router.route("/")
  .get(movieController.findAll)
  .post(movieController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(movieController.findById)
  .put(movieController.update)
  .delete(movieController.remove);

module.exports = router;