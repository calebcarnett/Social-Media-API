const router = require("express").router();

const {
  getSingleThought,
  getThoughts,
  createThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete();
