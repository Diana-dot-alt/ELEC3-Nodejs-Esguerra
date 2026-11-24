// Name: Diana C. Esguerra
// Activity: N2 - Modular Calculator

const operations = require("./operations");
const formatResult = require("./formatter");
const os = require("os");

const operation = process.argv[2];
const numbers = process.argv.slice(3).map(Number);

console.log("===== MODULAR CALCULATOR =====");
console.log("Operating System:", os.platform());

if (!operation || numbers.length < 2 || numbers.some(isNaN)) {
    console.log("Error: Please provide an operation and valid numbers.");
    console.log("Example: node index.js add 12 8");
    process.exit(1);
}

const a = numbers[0];
const b = numbers[1];

try {
    let result;

    switch (operation.toLowerCase()) {
        case "add":
            result = operations.add(a, b);
            break;

        case "subtract":
            result = operations.subtract(a, b);
            break;

        case "multiply":
            result = operations.multiply(a, b);
            break;

        case "divide":
            result = operations.divide(a, b);
            break;

        case "average":
            result = operations.average(numbers);
            break;

        default:
            throw new Error("Unknown operation: " + operation);
    }

    console.log(formatResult(operation, a, b, result));

} catch (error) {
    console.log("Error:", error.message);
}