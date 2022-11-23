const request = require("supertest")
const app = require("../app");

describe("/", () => {
    it("PUT / 400 (Missing Coin Value)", () => {
        return request(app).put("/").then(response => {
            expect(response.headers["x-coins"]).toBe('0');        
            expect(response.statusCode).toBe(400);
        });
    });

    it("PUT / 400 (Incorrect Coin Value)", () => {
        return request(app).put("/").send({coin:2}).then(response => {
            expect(response.headers["x-coins"]).toBe('0');
            expect(response.statusCode).toBe(400);
        });
    });

    it("PUT / 204", () => {
        return request(app).put("/").send({coin:1}).then(response => {
            expect(response.headers["x-coins"]).toBe('1');
            expect(response.statusCode).toBe(204);
        });
    });

    it("DELETE / 204", () => {
        return request(app).delete("/").then(response => {
            expect(response.headers["x-coins"]).toBe('0');
            expect(response.statusCode).toBe(204);
        });
    });
});

describe("/inventory", () => {
    it("GET / 200", () => {
        return request(app).get("/inventory").then(response => {
            expect(response.text).toBe("[0,5,1]");
            expect(response.statusCode).toBe(200);
        });
    });
});

describe("/inventory/:id", () => {
    it("GET / 200 ( OUT OF STOCK )", () => {
        return request(app).get("/inventory/soda").then(response => {
            expect(response.text).toBe("0");
            expect(response.statusCode).toBe(200);
        });
    });

    it("GET / 200 ( 5 in Stock )", () => {
        return request(app).get("/inventory/water").then(response => {
            expect(response.text).toBe("5");
            expect(response.statusCode).toBe(200);
        });
    });

    it("GET / 200 ( 1 in Stock )", () => {
        return request(app).get("/inventory/juice").then(response => {
            expect(response.text).toBe("1");
            expect(response.statusCode).toBe(200);      
        });
    });

    it("PUT / 404 ( 0 in Stock )", () => {
        return request(app).put("/inventory/soda").then(response => {
            expect(response.headers["x-coins"]).toBe('0');
            expect(response.statusCode).toBe(404);});
    });

    it("PUT / 403 ( Insufficient Coins )", () => {
        return request(app).put("/inventory/juice").then(response => {
            expect(response.headers["x-coins"]).toBe('0');
            expect(response.statusCode).toBe(403);
        });
    });

    it("PUT / 200", () => {
        return request(app).put("/inventory/juice").set('Cookie', ['coins=5']).then(response => {
            expect(response.headers["x-coins"]).toBe('3');
            expect(response.headers["x-inventory-remaining"]).toBe('0');
            expect(response.statusCode).toBe(200);
        });
    });

    it("PUT / 200", () => {
        return request(app).put("/inventory/water").set('Cookie', ['coins=7']).then(response => {
            expect(response.headers["x-coins"]).toBe('5');
            expect(response.headers["x-inventory-remaining"]).toBe('4');
            expect(response.statusCode).toBe(200);
        });
    });
});
