var express = require('express');
var router = express.Router();

// Add a coin
router.put('/', function(req, res, next) {
  const coin = Number(req.body.coin)
  const totalCoins = Number(req.cookies.coins || 0)

  if(coin === 1) {
    const updatedCoins = totalCoins + coin
    res.cookie('coins', updatedCoins).set('X-Coins', updatedCoins).sendStatus(204);
  } else {
    res.set('X-Coins', totalCoins).sendStatus(400)
  }
})

// Cancel Transaction
router.delete('/', function(req, res, next) {
  const totalCoins = Number(req.cookies.coins || 0)
  res.cookie('coins', 0).set('X-Coins', totalCoins).sendStatus(204);
});

module.exports = router;
