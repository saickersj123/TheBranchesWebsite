// 게시글 작성/조회/수정/삭제

const Post = require('./post');

// 작성
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// 조회
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 수정
exports.updatePost = async (req, res) => {
  try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPost) {
          return res.status(404).json({ error: '존재하지 않는 게시물' });
      }
      return res.status(200).json(updatedPost);
  } catch (err) {
      return res.status(400).json({ error: err.message });
  }
};

// 삭제
exports.deletePost = async (req, res) => {
  try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
          return res.status(404).json({ error: '해당 게시물이 없습니다.' });
      }
      return res.status(200).json({ message: '성공적으로 삭제되었습니다.' });
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
};