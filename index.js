const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');
const cors = require('cors');

mongoose
  .connect(
    'mongodb+srv://eltac:4771680El@cluster0.f9vmpjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.log(err));

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/posts', (req, res) => {
  Post.find().then((data) => {
    res.status(200).json({
      message: 'success',
      posts: data,
    });
  });
});

app.post('/api/posts', (req, res) => {
  const post = new Post({
    name: req.body.name,
  });
  post.save();
  res.status(201).send('post requests!');
});

app.delete('/api/posts/:id', (req, res) => {
  Post.findOneAndDelete(req.params.id)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.status(201).send('post deleted!');
    })
    .catch((err) => console.log(err));
});

app.use('/', (req, res) => {
  res.send('Welcome to Node server');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri =
//   'mongodb+srv://eltac:4771680El@cluster0.f9vmpjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
