var express = require('express');
var router = express.Router();

// Initializing Fake Inventory
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
    "quantity": 1
  }
]

// Get the inventory
router.get('/', function(req, res, next) {
  const remainingItems = inventory.map(item => item.quantity)
  res.json(remainingItems);
});

// Get specific item's quantity
router.get('/:id', function(req, res, next) {
  const {id } = req.params
  const item = inventory.find(el => el.id === id)
  if (item) {
    res.json(item.quantity);
  } else {
    res.json(0);
  }
});

// In case the quantity is insufficient
router.put('/:id', function (req, res, next) {
  const {id } = req.params
  const item = inventory.find(el => el.id === id)
  const totalCoins = Number(req.cookies.coins || 0)

  if(!item || (item && item.quantity === 0)){
    res.set('X-Coins', totalCoins).sendStatus(404)
  } else {
    next()
  }
})

// In case the coins are insufficient
router.put('/:id', function (req, res, next) {
  const totalCoins = Number(req.cookies.coins || 0)

  if(totalCoins < 2) {
    res.set('X-Coins', totalCoins).sendStatus(403)
  } else {
    next()
  }
})

// Buying an item
router.put('/:id', function(req, res, next) {
  const {id } = req.params
  const totalCoins = Number(req.cookies.coins || 0)

  // Update Coins
  const updatedCoins = totalCoins - 2

  // Update Inventory
  const item = inventory.find(el => el.id === id)
  item.quantity -= 1;

  // number of items vended in this transaction
  res.cookie('coins', 0).set('X-Coins', updatedCoins).set('X-Inventory-Remaining', item.quantity).json({quantity : 1});
  // number of items vended since stock refill of this item
  // res.cookie('coins', 0).set('X-Coins', updatedCoins).set('X-Inventory-Remaining', item.quantity).json({quantity : 5 - item.quantity});
});


module.exports = router;
