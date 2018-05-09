var bodyParser = require('body-parser');
var express = require('express');

/* var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
 */


var app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectID=require ('mongodb').ObjectID;




app.use(bodyParser.json());

 //var JASON = require("JASON");





const connection = (closure)=>{
return MongoClient.connect('mongodb://localhost:27017/Projet',(err,client)=>{
if (err)return console.log(err);
    
let db= client.db('Projet');
closure(db)
})
}

/* app.post('/auth/login',(req,res)=>{
    console.log(req.body);
    res.send('this is login');
})

app.post('/auth/email',(req,res)=>{
    console.log(req.body);
    res.send('this is email');
}) */


/* app.get('/users', (req, res)=> {
connection(db=>{
    db.collection('Auth').find().toArray((err,result)=>{
        res.send(result);
    });
})
})  */
//
 app.post('/users', (req, res)=> {
    connection(db=>{ 
        db.collection('Users').insert(req.body, (err,result)=>{
            res.send(result);
        });
    })
    })  *///post insert
    /* app.post('/user', (req,res)=>{
        console.log(req.body)
        connection( (db)=>{
          db.collection('Auth').insert(req.body,(err,result)=>{
            res.send(result);
          });
          
        })
      })  */
     /*  app.post('/users', (req,res)=>{
        console.log(req.body)
        connection( (db)=>{
            db.collection('Auth').find().toArray((err,result)=>{
            res.send(result);
          });
          
        })
      })
 */


//app.listen(3000)
//const assert = require('assert');
 
// Connection URL
/* const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  insertDocuments(db, function() {
    client.close();
  });
}); */
app.post('/auth/login', (req,res)=>{
    console.log(req.body);
    connection( (db)=>{
      db.collection('Auth').findOne( {email:req.body.email},(err,result)=>{
          if (result)
       { if (req.body.password == result.password)
          { res.send('ok');}
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