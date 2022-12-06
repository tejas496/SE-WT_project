var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM sample_data ORDER BY id DESC";
	//var query = "SELECT * FROM sample_data ORDER BY previousvisit DESC"


	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'Patients record', action:'list', sampleData:data});
		}

	});

});

router.get("/", function(request, response, next){

	var query = "SELECT * FROM sample_data  ";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'Patients record', action:'list', sampleData:data});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("sample_data", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){
    
	var name = request.body.name;

	var age = request.body.age;

	var gender = request.body.gender;

	var address = request.body.address;

	var phonenumber = request.body.phonenumber;
 
	var occupation = request.body.occupation;

	var salary = request.body.salary;

	var History = request.body.History;


	var disease = request.body.disease;

	var medicinename = request.body.medicinename;

	var dosage = request.body.dosage;

	var duration = request.body.duration;

	var diagnosis = request.body.dignosis;

	var previousvisit = request.body.previousvisit;

	var nextappointment = request.body.nextappointment;

    var query = `
	INSERT INTO sample_data 
	(name,age,gender,address,phonenumber,occupation,salary,History,disease,medicinename,dosage,duration,diagnosis,previousvisit,nextappointment) 
	VALUES ("${name}", "${age}", "${gender}","${address}", "${phonenumber}", "${occupation}", "${salary}","${History}","${disease}","${medicinename}","${dosage}","${duration}","${diagnosis}","${previousvisit}","${nextappointment}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/sample_data");
		}

	});

});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('sample_data', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var name = request.body.name;

	var age = request.body.age;

	var gender = request.body.gender;

	var address = request.body.address;

	var phonenumber = request.body.phonenumber;

	var occupation = request.body.occupation;

	var salary = request.body.salary;

	var History = request.body.History;

	var disease = request.body.disease;

	var medicinename = request.body.medicinename;

	var dosage = request.body.dosage;

	var duration = request.body.duration;

	var diagnosis = request.body.diagnosis;

	var previousvisit = request.body.previousvisit;

	var nextappointment = request.body.nextappointment;


	var query = `
	UPDATE sample_data 
	SET name = "${name}", 
	age = "${age}", 
	gender = "${gender}", 
	address = "${address}" ,
	phonenumber = "${phonenumber}",
	occupation = "${occupation}",
	salary = "${salary}" ,
	History = "${History}" ,
    disease = "${disease}",
	medicinename = "${medicinename}",
	dosage = "${dosage}",
	duration = "${duration}",
	diagnosis = "${diagnosis}",
	previousvisit = "${previousvisit}",
	nextappointment = "${nextappointment}"
	WHERE id = "${id}"
	`;
	/*var query = `
	UPDATE sample_data 
	SET fare = "${fare} + 0"
	WHERE distance = "${distance} > 100kms  "
	`;*/

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/sample_data');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM sample_data WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/sample_data");
		}

	});

});

module.exports = router;