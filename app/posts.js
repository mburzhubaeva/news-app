const express = require('express');

const createRouter = connection => {
  const router = express.Router();

  router.get('/', (req, res) => {
    connection.query('SELECT * FROM `posts`', (error, results) => {
      if (error) {
        res.status(500).send({error: 'Database error'});
      }

      res.send(results);
    });
  });

  router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM `posts` WHERE `id` = ?', req.params.id, (error, results) => {
      if (error) {
        res.status(500).send({error: 'Database error'});
      }

      if (results[0]) {
        res.send(results[0]);
      } else {
        res.status(404).send({error: 'Post not found'});
      }
    });
  });

  return router;
};

module.exports = createRouter;