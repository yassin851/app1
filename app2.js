var express = require('express')
var bodyParser = require('body-parser')
 
var jwt = require('jsonwebtoken');

 //var JASON = require("JASON");

var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const ObjectID=require ('mongodb').ObjectID;




 //var JASON = require("JASON");



const connection = (closure)=>{
return MongoClient.connect('mongodb://localhost:27017/Projet',(err,client)=>{
if (err)return console.log(err);
    
let db= client.db('Projet');
closure(db)
})
}

/*app.get('/users', (req, res)=> {
connection(db=>{
    db.collection('Users').find().toArray((err,result)=>{
        res.send(result);
    });
})
}) */

app.post('/auth/register', (req,res)=>{
    connection( (db)=>{
        db.collection('Auth').insert(req.body,(err,result)=>{
          res.send(result);
        });
        
      })
    
 
})
app.post('/auth/login', (req,res)=>{
  connection( (db)=>{
    db.collection('Auth').findOne( {email:req.body.email},(err,result)=>{
        if (result)
     { if (req.body.password == result.password)
        { let token=jwt.sign(result,'my_pass');
            res.send({Message:'ok',token:token});}
        else 
        {
            res.send('bad password');
        }
    
}
     else{
         res.send('user not found');
     }
    });
    
  })

})
app.listen(3000)
