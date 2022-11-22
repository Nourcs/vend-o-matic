var express = require('express');
var router = express.Router();

let inventory = [
  {
    "id": "soda",
    "quantity": 0
  },
  {
    "id": "water",
    "quantity": 5
  },
  {
    "id": "juice",
    "quantity": 5
  }
]

// Inventory
router.get('/', function(req, res, next) {
  const remainingItems = inventory.map(item => item.quantity)
  res.json(remainingItems);
});

// Inventory ID
router.get('/:id', function(req, res, next) {
  const {id } = req.params
  const item = inventory.find(el => el.id === id)
  if (item) {
    res.json(item.quantity);
  } else {
    res.json(0);
  }
});

// Insufficient Quantity
router.put('/:id', function (req, res, next) {
  const {id } = req.params
  const item = inventory.find(el => el.id === id)
  const totalCoins = Number(req.cookies.coins)

  if(!item || (item && item.quantity === 0)){
    res.set('X-Coins', totalCoins).sendStatus(404)
  } else {
    next()
  }
})

// Insufficient Coins
router.put('/:id', function (req, res, next) {
  const totalCoins = Number(req.cookies.coins)

  if(totalCoins < 2) {
    res.set('X-Coins', totalCoins).sendStatus(403)
  } else {
    next()
  }
})

// Main Route
router.put('/:id', function(req, res, next) {
  const {id } = req.params
  const totalCoins = Number(req.cookies.coins)

  // Update Coins
  const updatedCoins = totalCoins - 2

  // Update Inventory
  const item = inventory.find(el => el.id === id)
  item.quantity -= 1;

  res.cookie('coins', 0).set('X-Coins', updatedCoins).set('X-Inventory-Remaining', item.quantity).json({quantity : 1});
});


module.exports = router;
