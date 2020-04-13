const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());


server.get('/', (req,res) => {
    res.status(200).json({ api: 'up'})
});

server.get('/api/accounts', (req, res) => {
    db.select('*').from('accounts').then(accounts =>{
        res.status(200).json(accounts)
    }).catch(err => {
        res.status(500).json({message: 'an error has occurred'})
    })
})

server.get('/api/accounts/:id', (req, res) =>{
    db.select('*').from('accounts').where({ id: req.params.id }).first().then(accounts =>{
        if (accounts.id){
            res.status(200).json(accounts)
        } else{
            res.status(404).json({ message: 'No accounts match that ID'})
        }
    }).catch(error =>{
        res.status(500).json({message: 'an error has occurred'})
    })
})

server.post('/api/accounts', (req, res) =>{
    const accData= req.body;
    db('accounts').insert(accData, 'id')
    .then(ids => {
        const id = ids[0];
        db('accounts').where({ id }).first()
        .then(accounts => {
            res.status(200).json({ data: accounts})
        })
    }).catch(error =>{
        res.status(500).json({message: 'an error has occurred'})
    })
})

server.patch('/api/accounts/:id', (req, res)=>{
    const changes= req.body;
    const {id} = req.params;
    db('accounts').where({ id })
    .update(changes)
    .then(count => {
        if (count > 0 ){
            res.status(200).json({ message: 'account updated'})
        } else {
            res.status(404).json({message: 'no account with that ID found'})
        }
    }).catch(error =>{
        res.status(500).json({ messsage: 'an error has occurred'})
    })
})

server.delete('/api/accounts/:id', (req, res) =>{
    const {id} = req.params;
    db('accounts').where({ id })
    .del().then(el =>{
        if (el > 0){
            res.status(202).json({message: 'account deleted'})
        } else {
            res.status(404).json({ message: 'no account matches that ID'})
        }
    }).catch(error =>{
        res.status(500).json({message: 'an error has occurred'})
    })
})

module.exports = server;
