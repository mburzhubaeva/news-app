const express = require('express');

const createRouter = connection => {
  const router = express.Router();

  router.get('/', (req, res) => {
    let query = 'SELECT * FROM `comments`';
    let data = [0];

    if (req.query.post_id) {
      query = 'SELECT * FROM `comments` WHERE `post_id` = ?';
      data.push(req.query.post_id);
    }

    connection.query(query, data, (error, results) => {
      if (error) {
        res.status(500).send({error: 'Database error'});
      }

      res.send(results);
    });
  };

  return router;

});

module.exports = createRouter;