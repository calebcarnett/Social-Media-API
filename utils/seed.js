const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", async () => {
  console.log("connected to database");
  try {
    // Delete existing users and thoughts if any exist
    await User.deleteMany({});

    await Thought.deleteMany({});

    // Create new users and thoughts
    const createdUsers = await User.insertMany(users);
    const thoughtsWithUsers = thoughts.map((thought) => {
      const user = createdUsers.find(
        (user) => user.username === thought.username
      );
      return { ...thought, username: user.username };
    });
    await Thought.insertMany(thoughtsWithUsers);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
});
