const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


describe("GET / ", () => {
    test("should respond with Hello from server!", async () => {
        fetch("/api").then((response) => {
            expect(response.body).toEqual("Hello from server!");
            expect(response.statusCode).toBe(200);
        });
    })
})