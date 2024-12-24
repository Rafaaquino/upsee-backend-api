const express = require("express");
const cors = require("cors");
const config = require("./src/app/config/conf");

//routes imports
const UserRoutes = require("./src/app/routes/UserRoutes");
const DataRoutes = require("./src/app/routes/DataRoutes");

const app = express();
const PORT = "3000";

app.use(express.json());

//resolve cors
app.use(
  cors({
    credentials: true,
    origin: [
      config.HOST_FRONT,
      config.HOST_FRONT_DASH,
      config.HOST_DEV,
      config.HOST_DEV_DASH,
    ],
  })
);

//routes
app.use(`${config.API}/users`, UserRoutes);
app.use(`${config.API}/data`, DataRoutes);

app.listen(PORT, () => {
  console.log(`servidor ON em  http://localhost:${PORT}`);
});
