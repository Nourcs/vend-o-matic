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
  const totalCoins = Number(req.cookies.coins)

  if(!item || (item && item.quantity === 0)){
    res.set('X-Coins', totalCoins).status(404).send({error : 'Insufficient Quantity'})
  } else {
    next()
  }
})

// In case the coins are insufficient
router.put('/:id', function (req, res, next) {
  const totalCoins = Number(req.cookies.coins)

  if(totalCoins < 2) {
    res.set('X-Coins', totalCoins).status(403).send({error : 'Insufficient Coins'})
  } else {
    next()
  }
})

// Buying an item
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
