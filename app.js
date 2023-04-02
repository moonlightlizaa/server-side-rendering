// Importeer express uit de node_modules map
import express from "express";

// API

const url = "https://api.visualthinking.fdnd.nl/api/v1/methods?first=100";
const data = await fetch(url).then((response) => response.json());

// console.log(data);

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set("view engine", "ejs");
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources
app.use(express.static("public"));

// Maak een route voor de index
app.get("/", function (req, res) {
  // res.send('Hello World!')
  res.render("index", data);
});

// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 6500);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
