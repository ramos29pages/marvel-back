const { listComics, getComicDetail, addFavoriteComic } = require('../services/comic-service');

const listComicsController = async (req, res) => {
  try {
    const comics = await listComics();
    res.json(comics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getComicDetailController = async (req, res) => {
  try {
    const comic = await getComicDetail(req.params.comicId);
    res.json(comic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addFavoriteController = async (req, res) => {
  try {
    const { comicId } = req.body;
    console.log(comicId, req.userId);
    await addFavoriteComic(req.userId, comicId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({  success: false, error: err.message });
  }
};

module.exports = { listComicsController, getComicDetailController, addFavoriteController };
