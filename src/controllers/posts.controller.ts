import Post from '../models/post.model.js';

export const postPostsHandler = (req, res) => {
  const post = new Post({
    name: req.body.name,
  });
  post.save().then((doc) => {
    res.status(201).send({ id: doc.id });
  });
};

export const getPostsHandler = (req, res) => {
  Post.find().then((data) => {
    res.status(200).json({
      message: 'success',
      posts: data,
    });
  });
};

export const patchPostsHandler = (req, res) => {
  const post = new Post({
    _id: req.params.id,
    name: req.body.name,
  });
  Post.updateOne({ _id: req.params.id }, post).then((data) => {
    res.status(200).send('post update!');
  });
};

export const deletePostsHandler = (req, res) => {
  Post.findOneAndDelete(req.params.id)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.status(201).send('post deleted!');
    })
    .catch((err) => console.log(err));
};
