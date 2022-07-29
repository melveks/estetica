const dbCategory = _db.queryFirst(
  `SELECT * FROM categoria WHERE codigo = ?`,
  _req.getString("category")
);

if (dbCategory) {
  _db.insert(
    "estabelecimento",
    _val
      .map()
      .set("categoria_id", dbCategory.getInt("id"))
      .set("nome", _req.getString("name"))
      .set("telefone", _req.getString("telefone"))
      .set("email", _req.getString("email"))
      .set("fotografia", _req.getFile("photo"))
      .set("documento", _req.getFile("documento"))
  );
  _out.json(_val.map().set("result", true));
} else {
  _header.status(404);
  _out.json(_val.map().set("error", true).set("code", "category-not-found"));
}
