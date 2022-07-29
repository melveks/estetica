
const dbSearch = `%${_req.getString('search')}%`

const dbEstablishments = _db.query(`
  SELECT 
    estabelecimento.*,
    categoria.nome AS categoria_nome,
    categoria.codigo AS categoria_codigo
  FROM estabelecimento
    INNER JOIN categoria ON estabelecimento.categoria_id = categoria.id
  WHERE 1 = 1
    AND estabelecimento.active = TRUE
    AND categoria.active = TRUE
    AND (
      categoria.nome LIKE ?
      OR estabelecimento.nome LIKE ?
    )
  LIMIT 3
`, dbSearch, dbSearch)

const list = _val.list()

for (const dbEstablishment of dbEstablishments) {
    list.add(
        _val.map()
            .set('uid', dbEstablishment.getString('uid'))
            .set('name', dbEstablishment.getString('nome'))
            .set('telefone', dbEstablishment.getString('telefone'))
            .set('email', dbEstablishment.getString('email'))
            .set('fotografia', dbEstablishment.getfile('photo'))
            .set('documento',dbEstablishment.getfile('documento')),
                'category', 
                _val.map()
                    .set('name', dbEstablishment.getString('categoria_nome'))
                    .set('code', dbEstablishment.getString('categoria_codigo'))
            )
    )
}

_out.json(list)