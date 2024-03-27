
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;
const db=new pg.Client(
  {
    user: "",
    host: "",
    database: "",
    password: "",
    port: 5432,
  }
);
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let items=[
 
];
 var tit="Today's Tasks";
 var id="2";
app.post("/day",  (req,res)=>{
   tit="Today's Tasks";
   id="1";
  res.redirect("/");

});
app.post("/week",  (req,res)=>{
   tit="This week's Tasks";
   id="2";
   res.redirect("/");

});
app.post("/month",  (req,res)=>{
  tit="This month's Tasks";
   id="3";
   res.redirect("/");
  
});



app.get("/", async (req, res) => {
  try{
    const result=await db.query(`SELECT * FROM items${id} ORDER BY id ASC`);
    items=result.rows;
  res.render("index.ejs", {
    listTitle: tit,
    listItems: items,
  });
}catch (err)
{
  console.log(err);
}
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
 
  try {
    await db.query(`INSERT INTO items${id} (title) VALUES ($1)`,[item]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const sid = req.body.updatedItemId;

  try {
    await db.query(`UPDATE items${id} SET title = ($1) WHERE id = $2`, [item, sid]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});


app.post("/delete", async (req, res) => {
  const sid = req.body.deleteItemId;
  try {
    await db.query(`DELETE FROM items${id} WHERE id = $1`, [sid]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
