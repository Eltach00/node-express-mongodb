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
  const pagesize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pagesize && currentPage) {
    postQuery.skip(pagesize * (currentPage - 1)).limit(pagesize);
  }
  postQuery
    .then((documents) => {
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
  console.log(post);
  Post.updateOne({ _id: req.params.id }, post).then((data) => {
    res.status(200).send('post update!');
  });
};

export const deletePostsHandler = (req, res) => {
  Post.findOneAndDelete(req.params.id)
    .then(() => {
      res.status(201).send('post deleted!');
    })
    .catch((err) => console.log(err));
};
