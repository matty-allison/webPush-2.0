const express = require("express");
const webpush = require("web-push");
const path = require("path");
require("dotenv").config();
const Cors = require("cors");

const app = express();

//set the static path
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());
app.use(
  Cors({
    credentials: true,
    methods: "*",
  })
);

// app.get("../src/composbles/worker.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
// });
// app.get("*", function response(req, res) {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//subscribe route
app.post("/subscribe", (req, res) => {
  const publicVapidKey = process.env.PublicVapidKey;
  const privateVapidKey = process.env.PrivateVapidKey;

  webpush.setVapidDetails(
    `mailto:${process.env.Mail}`,
    publicVapidKey,
    privateVapidKey
  );
  //get push subscription object
  const subscription = req.body;

  //send status 201
  res.status(201).json({});

  //create paylod
  const payload = JSON.stringify({ title: "Node Js Push Notification" });

  //pass the object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
