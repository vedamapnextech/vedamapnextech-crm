const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.get("/api/customers", (req, res) => {

  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      company: "ABC Logistics",
      city: "Jaipur",
      email: "rahul@gmail.com",
      product: "GPS Tracker",
      address: "Vaishali Nagar, Jaipur",
      status: "Active",
    },
    {
      id: 2,
      name: "Amit Verma",
      phone: "9876500000",
      company: "XYZ Transport",
      city: "Delhi",
      email: "amit@gmail.com",
      product: "RFID",
      address: "Vaishali Nagar, Delhi",
      status: "Pending",
    },
    {
      id: 3,
      name: "Rohit Singh",
      phone: "9876512345",
      company: "Fast Cargo",
      city: "Ajmer",
      email: "rohit@gmail.com",
      product: "Fuel Sensor",
      address: "Vaishali Nagar, Ajmer",
      status: "Active",
    },
  ];

  res.json(customers);

});


app.get("/api/customers/:id", (req, res) => {

  const customers = [

    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      company: "ABC Logistics",
      city: "Jaipur",
      email: "rahul@gmail.com",
      product: "GPS Tracker",
      address: "Vaishali Nagar, Jaipur",
      status: "Active",
    },

    {
      id: 2,
      name: "Amit Verma",
      phone: "9876500000",
      company: "XYZ Transport",
      city: "Delhi",
      email: "amit@gmail.com",
      product: "RFID",
      address: "Vaishali Nagar, Delhi",
      status: "Pending",
    },

    {
      id: 3,
      name: "Rohit Singh",
      phone: "9876512345",
      company: "Fast Cargo",
      city: "Ajmer",
      email: "rohit@gmail.com",
      product: "Fuel Sensor",
      address: "Vaishali Nagar, Ajmer",
      status: "Active",
    },

  ];

  const customer = customers.find(
    (customer) => customer.id === Number(req.params.id)
  );

  res.json(customer);

});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});