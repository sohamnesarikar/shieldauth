import { app } from "./app.js";
import connectDB from "./config/db.js";
import connectToRedis from "./config/redisClient.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    connectToRedis()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is listening on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.log(`Something went wrong in redis connection`, error);
      });
  })
  .catch((error) =>
    console.log("Something went wrong in database connection", error),
  );
