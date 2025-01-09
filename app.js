const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");
const config = require("./src/app/config/conf");

// Define o ambiente (default: development)
const env = process.env.NODE_ENV || "development";

// Carrega o arquivo .env correspondente ao ambiente
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

//routes imports
const UserRoutes = require("./src/app/routes/UserRoutes");
const DataRoutes = require("./src/app/routes/DataRoutes");
const ExternalRoutes = require("./src/app/external/routes/ExternalRoutes");

const app = express();
const PORT = process.env.PORT || config.PORT_LOCAL;

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
      config.URL_EXTERNAL,
    ],
  })
);

//routes
app.use(`${config.API}/users`, UserRoutes);
app.use(`${config.API}/data`, DataRoutes);
app.use(`${config.API}/auth-external`, ExternalRoutes);

app.listen(PORT, () => {
  console.log(`servidor ON em  http://localhost:${PORT}`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
});
