const Lead = require("../models/Lead");
const Customer = require("../models/Customer");
const Dealer = require("../models/Dealer");
const DealerCustomer = require("../models/DealerCustomer");
const Employee = require("../models/Employee");
const Product = require("../models/Product");
const Installation = require("../models/Installation");

const globalSearch = async (req, res) => {
    try {
        const query = req.query.query?.trim();

        if (!query) {
            return res.json([]);
        }

        const regex = new RegExp(query, "i");

        const [
            leads,
            customers,
            dealers,
            dealerCustomers,
            employees,
            products,
            installations,
        ] = await Promise.all([

            Lead.find({
                $or: [
                    { name: regex },
                    { phone: regex },
                    { company: regex },
                    { city: regex },
                ],
            }).limit(5),

            Customer.find({
                $or: [
                    { name: regex },
                    { phone: regex },
                    { company: regex },
                    { wbCode: regex },
                ],
            }).limit(5),

            Dealer.find({
                $or: [
                    { name: regex },
                    { phone: regex },
                    { city: regex },
                    { state: regex },
                ],
            }).limit(5),

            DealerCustomer.find({
                $or: [
                    { name: regex },
                    { company: regex },
                    { phone: regex },
                    { wbCode: regex },
                ],
            }).limit(5),

            Employee.find({
                $or: [
                    { fullName: regex },
                    { employeeId: regex },
                    { mobileNumber: regex },
                    { email: regex },
                ],
            }).limit(5),

            Product.find({
                $or: [
                    { name: regex },
                    { brand: regex },
                    { model: regex },
                ],
            }).limit(5),

            Installation.find({
                $or: [
                    { wbCode: regex },
                    { siteName: regex },
                    { engineer: regex },
                    { location: regex },
                ],
            }).limit(5),

        ]);

        res.json({
            leads,
            customers,
            dealers,
            dealerCustomers,
            employees,
            products,
            installations,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Search Failed",
        });

    }
};

module.exports = {
    globalSearch,
};