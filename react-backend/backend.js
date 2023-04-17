const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
	const id = req.params['id'];
	let result = findUserById(id)
	if (result === undefined || result.length == 0)
		res.status(404).send('Resource not found.');
	else {
		deleteUser(result)
		res.status(200).send('OK')
	}
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    let user = addUser(userToAdd);
    res.status(201).send(user);
});

function generate_id() {
    return uuidv4();
}

//TODO Fix this shit
function deleteUser(user){
	users.user_list.splice(users.user_list.indexOf(user), 1);
}

function addUser(user){
    user['id'] = generate_id();
    users['users_list'].push(user);
    return user;
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}


const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}
