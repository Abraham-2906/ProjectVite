const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

export const searchShowByName = async (query) => {
  const URL = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
  const results = await fetch(URL).then((res) => res.json());

  if (!results.length) return null;
  return results[0].show.id; // Retorna el ID de la coincidencia más relevante
};

export const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const data = await fetch(URL).then((res) => res.json());

  return {
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE,
  };
};

export const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const episodes = await fetch(URL).then((res) => res.json());

  const episodeList = episodes.map((episode) => ({
    name: episode.name,
    number: episode.number,
    season: episode.season,
    rating: episode.rating.average,
  }));

  const episodesBySeason = Object.groupBy(episodeList, (episode) => episode.season);
  return episodesBySeason;
};