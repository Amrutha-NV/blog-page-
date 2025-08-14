const express = require("express");
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


let posts = [{
        id: uuidv4(),
        username: "Amrutha",
        content: "hey this is my first post"
    },
    {
        id: uuidv4(),
        username: "Amrutha",
        content: "hey this is my first post"
    },
    {
        id: uuidv4(),
        username: "Amrutha",
        content: "hey this is my first post"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => (id == p.id))

    res.render("post.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => (id == p.id));
    post.content = req.body.content;
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => (id == p.id));
    console.log(post);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    posts = posts.filter((p) => (id != p.id));
    res.redirect("/posts");

});


app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
});