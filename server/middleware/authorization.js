const Template = require("../models/template");

module.exports = (req, res, next) => {
  console.log("authorization");
  Template.findById(req.params.templateId)
    .then(template => {
      if (template) {
        if (template.user_id.toString() === req.headers.decoded.id) next();
        else throw { status: 401, message: "Error authorization!" };
      } else throw { status: 400, message: "Template not found" };
    })
    .catch(err => next(err));
};
