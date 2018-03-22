var isProduction = process.env.NODE_ENV === "production";
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//connect to our database mongo
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/technology-notes-db", function(err) {
    if (err) return console.error(err);
    console.log("THE DB, mongo, is connected, and I ROCK");
  });
  mongoose.set("debug", true);
}
