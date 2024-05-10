import express from "express";
import DataStore from "nedb";

const PORT = 8000;

//BDD
const db = new DataStore({ filename: "perso" }); // cree une sorte de fichier texte pour la bd
db.loadDatabase();

const app = express();

app.use(express.json());

//CREATE
app.post("/api/perso", (req, res) => {
  console.log(req.body);
  db.insert(req.body); //pour inserer dans perso
  res.send(req.body);
});

//READ ALL
app.get("/api/perso", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) console.log(err);
    res.send(docs);
  });
});

//READ one
app.get("/api/perso/:id", (req, res) => {
  db.find({ _id: req.params.id }, (err, docs) => {
    if (err) console.log(err);
    res.send(docs);
  });
});

//UPDATE
app.patch("/api/perso/:id", (req, res) => {
  db.update({ _id: req.params.id }, { $set: { ...req.body } });
  res.send(req.body);
});

//DELETE
app.delete("/api/perso/:id", (req, res) => {
  db.remove({ _id: req.params.id });
});

app.listen(PORT, () => {
  console.log(`le serveur est lancer sur le port : ${PORT}`);
});
