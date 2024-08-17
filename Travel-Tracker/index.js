import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Makan@sateayam0",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getCountries() {
  let countries = [];
  const response = await db.query("SELECT * FROM visited_countries");
  response.rows.map((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await getCountries();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const country_name = req.body.country;
  try {
    const result = await db.query(
      `SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || '${country_name.toLowerCase()}' || '%';`
    );
    const country_code = result.rows[0].country_code;
    try {
      await db.query(
        `INSERT INTO visited_countries (country_code) VALUES ('${country_code}')`
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
      const countries = await getCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (error) {
    const countries = await getCountries();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
