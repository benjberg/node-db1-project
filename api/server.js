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


module.exports = server;
