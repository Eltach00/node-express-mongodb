import Post from '../models/post.model.js';

export const savePostsHandler = (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    name: req.body.name,
    imagePath: req.file ? url + '/uploads/' + req.file.filename : null,
    creator: req.userData.userId,
  });
  post.save().then((doc) => {
    res.status(201).send({ id: doc.id });
  });
};

export const getPostsHandler = (req, res) => {
  const pagesize = +req.query.pagesize || 10;
  const currentPage = +req.query.page || 1;
  const postQuery = Post.find({ creator: req.userData.userId });
  let fetchedPosts;
  if (pagesize && currentPage) {
    postQuery.skip(pagesize * (currentPage - 1)).limit(pagesize);
  }
  postQuery
    .then((documents) => {
      console.log(documents);
      fetchedPosts = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: fetchedPosts,
        maxPosts: count,
      });
    });
};

export const putPostsHandler = (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/uploads/' + req.file.filename;
  }
  const post = new Post({
    _id: req.params.id,
    name: req.body.name,
    imagePath: imagePath,
  });
  Post.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    post
  ).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Update successful!' });
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  });
};

export const deletePostsHandler = (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result) {
        return res.status(200).json({ message: 'Post deleted!' });
      } else {
        return res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch((err) => console.log(err));
};
