var express = require('express');
var router = express.Router();

// Add a coin
router.put('/', function(req, res, next) {
  const coin = Number(req.body.coin)
  const totalCoins = Number(req.cookies.coins)

  if(coin === 1) {
    const updatedCoins = totalCoins + coin
    res.cookie('coins', updatedCoins)
    res.set('X-Coins', updatedCoins)
    res.sendStatus(204);
  } else {
    res.set('X-Coins', totalCoins).status(400).send({error : 'Missing coin'})
  }
})

// Cancel Transaction
router.delete('/', function(req, res, next) {
  const totalCoins = Number(req.cookies.coins)
  res.cookie('coins', 0).set('X-Coins', totalCoins).sendStatus(204);
});

module.exports = router;
