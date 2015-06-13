	

    var express = require('express');
    var bodyParser = require('body-parser');
    var port = +process.argv[2];
    var app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    var personId = 100;
     
    var persons = [
    { id: 98, firstName: "Jan", lastName: "Kowalski"},
    { id: 99, firstName: "Piotr", lastName: "Nowak"}
    ];
     
    // GET – pobranie kolekcji
    app.get('/persons', function (req, res) {
     console.log('Odczyt listy osób');
     res.json(persons);
    });
     
    // GET/id – pobranie elementu kolekcji
    app.get('/persons/:id', function (req, res) {
     console.log('Odczyt osoby o id = ' + req.params.id);
     var person = findPerson(parseInt(req.params.id, 10));
     if (person === null) {
     res.send(404);
     }
     else {
     res.json(person);
     }
    });
    function findPerson(id) {
     for (var i = 0; i < persons.length; i++) {
     if (persons[i].id === id) {
     return persons[i];
     }
     }
     return null;
    }
     
    // POST – dodanie elementu do kolekcji
    app.post('/persons', function (req, res) {
     var person = req.body;
     console.log('Zapisywanie osoby: ' + JSON.stringify(person));
     person.id = personId++;
     persons.push(person);
     res.send(person);
    });
     
    // PUT/id – edycja elementu kolekcji
    app.put('/persons/:id', function (req, res) {
     var person = req.body;
     console.log('Edycja danych osoby: ' + JSON.stringify(person));
     var currentPerson = findPerson(parseInt(req.params.id, 10));
     if (currentPerson === null) {
     res.send(404);
     }
     else {
     currentPerson.firstName = person.firstName;
     currentPerson.lastName = person.lastName;
     res.send(person);
     }
    });
     
    // DELETE/id – usunięcie elementu kolekcji
    app.delete('/persons/:id', function (req, res) {
     console.log('Usuwanie osoby ' + req.params.id);
     var person = findPerson(parseInt(req.params.id, 10));
     if (person === null) {
     res.send(404);
     }
     else {
     removePerson(parseInt(req.params.id, 10));
     res.send(person);
     }
    });
    function removePerson(id) {
     var personIndex = 0;
     for (var i = 0; i < persons.length; i++) {
     if (persons[i].id === id) {
     personIndex = i;
     }
     }
     persons.splice(personIndex, 1);
    }
     
    // strona główna
    app.get('/', function (req, res) {
     res.sendFile("persons.html", { root: __dirname });
    });
     
    // uruchomienie
    app.listen(port, function(){
    console.log("Serwer uruchomiony");
    });


