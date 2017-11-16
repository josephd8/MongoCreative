var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');


router.post('/contacts',function(req,res,next) {
	
	var contact = new Contact(req.body);
	contact.save(function(err,contact){
		if(err){ return next(err);}
		res.json(contact);
	});	

});

router.get('/contacts',function(req,res,next) {
	
	Contact.find(function(err,contacts){
		if(err){ return next(err);}
		res.json(contacts);
	
	});

});

router.param('contact', function(req, res, next, id) {
  var query = Contact.findById(id);
  query.exec(function (err, contact){
    if (err) { return next(err); }
    if (!contact) { return next(new Error("can't find contact")); }
    req.contact = contact;
    return next();
  });
});

router.get('/contacts/:contact', function(req, res) {
  res.json(req.contact);
});

//router.put('/comments/:comment/upvote', function(req, res, next) {
 // req.comment.upvote(function(err, comment){
   // if (err) { return next(err); }
    //res.json(comment);
  //});
//});

router.delete('/contacts/:contact', function(req, res) {
  console.log("in Delete");
  req.contact.remove();
  res.sendStatus(200);
});

module.exports = router;
