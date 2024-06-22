const connect = require("connect"); // Importing the 'connect' library
const url = require("url"); // Importing the 'url' library

// Function to handle the calculations
const ansCal = (req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parsing the URL to get query parameters
  const queryParams = parsedUrl.query; // Extracting query parameters
  const operation = queryParams.method; // Extracting the 'method' parameter
  const num1 = parseFloat(queryParams.x); // Extracting and converting the 'x' parameter to a float
  const num2 = parseFloat(queryParams.y); // Extracting and converting the 'y' parameter to a float

  let calResult;
  switch (operation) {
    case "add":
      calResult = `${num1} + ${num2} = ${num1 + num2}`; // Addition operation
      break;
    case "subtract":
      calResult = `${num1} - ${num2} = ${num1 - num2}`; // Subtraction operation
      break;
    case "multiply":
      calResult = `${num1} * ${num2} = ${num1 * num2}`; // Multiplication operation
      break;
    case "divide":
      calResult = `${num1} / ${num2} = ${num1 / num2}`; // Division operation
      break;
    default:
      calResult = "Error: Invalid method."; // Error message for invalid methods
  }

  res.writeHead(200, { "Content-Type": "text/plain" }); //Setting the response header to plain text
  res.end(calResult); // Sending the result back to the client
};

const app = connect(); // Creating a new Connect app

app.use("/lab2", ansCal); // Adding the ansCal middleware for the '/lab2' route

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000"); // Starting the server on port 3000
});
