const axios = require('axios');
const User = require('../models/User');
const getAuthParams = require('../utils/validators/marvel-validator');

const listComics = async () => {
  const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?limit=50&${getAuthParams()}`);

  const comics = response.data.data.results.map((comic) => ({
    id: comic.id,
    title: comic.title,
    thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    description: comic.description || "No se ha encontrado una descripción.",
  }));

  return comics;
};

const getComicDetail = async (comicId) => {

  const comicResponse = await axios.get(`https://gateway.marvel.com/v1/public/comics/${comicId}?${getAuthParams()}`);
  const comic = comicResponse.data.data.results[0];

  // // Obtener los detalles de los personajes desde collectionURI
  // let characters = [];
  // if (comic.characters.collectionURI) {
  //   const characterResponse = await axios.get(`${comic.characters.collectionURI}?${getAuthParams()}`);
  //   characters = characterResponse.data.data.results;
  // }

  return {
    id: comic.id,
    title: comic.title,
    description: comic.description || "No se ha encontrado una descripción.",
    pageCount: comic.pageCount || "Sin detalles",
    variantDescription: comic.variantDescription || "No hay descripción de variante.",
    imageUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    creators: comic.creators.items.map(creator => ({
      name: creator.name,
      role: creator.role
    })),
    characters : comic.characters.items,
    price: comic.prices.length ? comic.prices[0].price : "-"
  };
};

const addFavoriteComic = async (userId, comicId) => {
  const user = await User.findById(userId);
  const index = user.favorites.indexOf(comicId);
  if (index !== -1) {
    user.favorites = user.favorites.filter((id) => id !== comicId);
  } else {
    user.favorites.push(comicId);
  }
  await user.save();
};


module.exports = { listComics, getComicDetail, addFavoriteComic };
