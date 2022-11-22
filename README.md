# Vend-O-Matic

#### Requirements:
- Download and Install [Node.js](https://nodejs.org/en/download/)
- Optional: [Postman Agent](https://www.postman.com/downloads/postman-agent/) to test the endpoints.

#### How to:
1. Clone the repository or download it to your Desktop.
2. Run `npm install` in your terminal under the project's name directory.
3. Run `npm run start` to start the server. ( The server runs on port 3000 )

#### Instructions:
A look of how a beverage vending machine works. 

- The PUT Request under `/` URI requires a `{ "coin" : 1 }` as a body request. Otherwise, it will return an HTTP 400 Bad Request response status.
- To test the endpoints under `/inventory/:id` URIs, you will need the IDs of the items stored in the inventory, you can use "soda", "water" or "juice", or edit your own inside the inventory variable under `routes/inventory.js`
