const express = require('express');
const cors = require('cors');
const app =express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port =process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

// user : userID3
// password: G0fk2XQkuAj7YEOW


const uri = "mongodb+srv://userID3:G0fk2XQkuAj7YEOW@cluster0.frkx4db.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const userCollection=client.db('nodeMongoCrud').collection('users')
        
        // users get
        app.get('/users',async (req,res)=>{
            const query={};
            const cursor= userCollection.find(query)
            const users =await cursor.toArray()
            res.send(users)
        })

         // Update user details
         app.get('/users/:id',async(req,res)=>{
            const id =req.params.id;
            const quary ={_id: ObjectId(id)}
            const user =await userCollection.findOne(quary)
            res.send(user)
         })

        // users post 
        app.post('/users',async (req,res)=>{
            const user=req.body
            console.log(user);
            const result=await userCollection.insertOne(user)
            res.send(result)
        })

        // user update
        app.put('/users/:id',async (req ,res)=>{
            const id =req.params.id
            const filter={_id: ObjectId(id)}
            const user=req.body
            const option = { upsert: true };
            const updateUser={
                $set: {
                    name:user.name,
                    address: user.address,
                    email: user.email
                  },
            }
            const result = await userCollection.updateOne(filter,option,updateUser)
            res.send(result)
        })

        // userDelete
        app.delete('/users/:id',async (req,res)=>{
            const id= req.params.id;
            const quary={_id: ObjectId(id)}
            // console.log('trying to delete',id);
            const result = await userCollection.deleteOne(quary)
            res.send(result)
            console.log(result);
        })

       
        
    }
    finally{

    }
}
run().catch(err => console.log(err))


app.get('/',(req,res)=>{
    res.send('my node curd server is running')
})

app.listen(port,()=>{
    console.log(`node curd server run in ${port}`);
})