const express = require(`express`);
const app = express();
const port = 3000;
const cors = require("cors");

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});

// Раздача статики
app.use(express.static(`./react-pizza/public`));

app.use(cors());

// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/react-pizza");

// модель
let pizzasSchema = new mongoose.Schema({
  imageUrl: String,
  name: String,
  types: Array,
  sizes: Array,
  price: Number,
  category: Number,
  rating: Number,
});
let cartSchema = new mongoose.Schema({
  imageUrl: String,
  name: String,
  type: String,
  size: Number,
  price: Number,
});

let Pizza = mongoose.model("pizzas", pizzasSchema);
let Cart = mongoose.model("cart", cartSchema);


app.post("/pizzas", async function (req, res) {
  try {
    let { categoryId, type, search } = req.body;

    let types = { [type]: 1 };
    let filters;
    if (categoryId !== 0) {
      filters = { category: categoryId };
    } else {
      filters = {};
    }
    if (search !== "") {
      filters.name = { $regex: new RegExp(search, "i") };
    }
    let pizzas = await Pizza.find(filters).sort(types);
    res.send(pizzas);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.get("/cart", async function (req, res) {
  try {
    let pizzasCart = await Cart.find({});
    res.send(pizzasCart);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});
app.post("/cart/add", async function (req, res) {
  try {
    let type = req.body.type;
    let size = req.body.size;
    let price = req.body.price;
    let name = req.body.name;
    let imageUrl = req.body.imageUrl;
    let item = new Cart({
      type: type,
      size: size,
      price: price,
      name: name,
      imageUrl: imageUrl,
    });
    await item.save();

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.get("/cart/remove", async function (req, res) {
  try {
    let id = req.query.id;
    console.log(id);
    let remove = await Cart.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

app.get("/cart/removeAll", async function (req, res) {
  try {
    let remove = await Cart.deleteMany();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});
