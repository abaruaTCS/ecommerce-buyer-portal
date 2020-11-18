const Company = require("../models/company");

exports.findAll = (req, res) => {
  Company.find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findById = (req, res) => {
  Company.findById(req.params.id, (err, company) => {
    if (err) throw err;
    res.send(company);
  });
};

// exports.addCompany = (req, res) => {
//   Company.create(req.body, (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.send(data);
//   });
// };

// exports.removeById = (req, res) => {
//   Company.findByIdAndRemove(req.params.id, (err, company) => {
//     if (err) throw err;
//     res.send(company);
//   });
// };

// exports.updateById = (req, res) => {
//   Company.findByIdAndUpdate(req.params.id, req.body, (err, company) => {
//     if (err) throw err;
//     res.send(company);
//   });
// };

// exports.findProducts = (req, res) => {
//   // (q = {}), { products: 1 };
//   Company.find({}, { products: 1, _id: 0 })
//     .then((products) => {
//       res.send(products);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };
