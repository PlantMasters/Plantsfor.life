var paginate = require('express-paginate');
var mongoosePaginate = require('mongoose-paginate');
var Plants = require('../schemas/plant');
mongoosePaginate.paginate.options = {limit:24};

module.exports = function(app) {

  app.use(paginate.middleware(24, 480));

  // app.get('/plants', function(req, res, next) {
  //
  //   Plants.paginate({}, {
  //     page: req.query.page,
  //     limit: req.query.limit
  //   }, function(err, Plants, pageCount, itemCount) {
  //
  //     if (err) return next(err);
  //
  //     res.format({
  //       html: function() {
  //         res.render('Plants', {
  //           Plants: Plants,
  //           pageCount: pageCount,
  //           itemCount: itemCount,
  //           pages: paginate.getArrayPages(req)(10, pageCount, req.query.page)
  //         });
  //       },
  //       json: function() {
  //         // inspired by Stripe's API response for list objects
  //         res.json({
  //           object: 'list',
  //           has_more: paginate.hasNextPages(req)(48),
  //           data: Plants
  //         });
  //       }
  //     });
  //   });
  // });
};
