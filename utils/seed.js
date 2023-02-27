const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

// Drop existing courses
await User.deleteMany({});

// Drop existing students
await Thought.deleteMany({});
