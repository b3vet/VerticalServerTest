import express from "express";
import db from "./db.js";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.send("Server is up and running!");
});

app.post("/data", (req, res) => {
  const { temp, hum, pressure, name } = req.body;

  const params = [temp, hum, pressure, name];

  db.run(
    `INSERT INTO data (temperature, humidity, pressure, name) VALUES (?, ?, ?, ?);`,
    params,
    (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.table({
        temperature: temp,
        humidity: hum,
        pressure: pressure,
        name: name,
        message: "Row inserted to db!",
      });
    }
  );

  res.send("Data received successfully!");
});

app.get("/data", (req, res) => {
    db.all("SELECT * FROM data ORDER BY created_at DESC", (err, rows) => {
        if (err) {
        console.log(err.message);
        return;
        }
        res.send(rows);
    });
});

app.use(function (req, res) {
  res.status(404);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
