var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectID=require ('mongodb').ObjectID;

var express = require('express');
var app = express();

app.use(bodyParser.json());

//base

const connection = (closure)=>{
    return MongoClient.connect('mongodb://localhost:27017/AppDb',(err,client)=>{
    if (err)return console.log(err);
        
    let db= client.db('AppDb');
    closure(db)
    })
    }
    
    app.get('/users', (req, res)=> {
    connection(db=>{
        db.collection('Users').find().toArray((err,result)=>{
            res.send(result);
        });
    })
    }) 
    //
    /* app.post('/users', (req, res)=> {
        connection(db=>{
            db.collection('Users').insert(req.body, (err,result)=>{
                res.send(result);
            });
        })
        })  */
       
    
    
    
  

