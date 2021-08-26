const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

/**
 * cpf - string
 * name - string
 * id - uuid (universally unique identifier)
 * statement []
 */
app.post("/accounts", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    customer => customer.cpf === cpf
  );

  if(customerAlreadyExists) {
    return response.status(400).json({
      error: "Customer already exists!"
    })
  }

  const id = uuidv4();

  customers.push({
    cpf,
    name,
    id,
    statement: []
  });

  return response.status(201).send();
})

app.listen(3333, () => console.log("Server listening on port 3333"));