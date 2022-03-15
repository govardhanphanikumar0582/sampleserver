const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../users');


router.get('/', (req, res) =>{
    res.json(users);
})

router.get('/:id', (req, res)=>{
    const found = users.some(user => user.id === parseInt(req.params.id))

    if(found){ 
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.sendStatus(400);
    }
});

router.post('/', (req, res)=>{
    const newUser = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email
    }

    if(!newUser.name || !newUser.email){
        return res.sendStatus(400);
    }

    users.push(newUser);
    res.json(users);
})

router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if(found) {
        const updateUser = req.body;
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.name = updateUser ? updateUser.name : user.name
                user.email = updateUser.email ? updateUser.email: user.email
                res.json({msg: 'User Updated', user})
            }
        })
    }
})

router.delete("/:id", (req, res)=>{
    const found = users.some((user) => user.id === parseInt(req.params.id));

    if(found) {
        users = users.filter((user) => user.id !== parseInt(req.params.id));
        res.json({
            masg: "User deleted",
            users,
        })
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;