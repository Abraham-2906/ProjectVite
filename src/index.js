import { searchShowByName, getShowData, getEpisodeList } from "./services/tvmaze.js";

const $form = document.querySelector(".search-form");
const $input =$form.querySelector("input");
const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");

// Función para renderizar una serie por su ID
async function renderShow(id) {
  $header.setHTMLUnsafe("<p>Cargando serie...</p>");
  $episodes.setHTMLUnsafe("");

  try {
    const show = await getShowData(id);
    const seasons = await getEpisodeList(id);


    // 1. Renderizar cabecera (póster, título y nota promedio)
    const averageRating = show.rating?.average ? ` ⭐ ${show.rating.average}` : "";
    $header.setHTMLUnsafe(`
      <img class="poster" src="${show.image}" alt="${show.name}">
      <h1>${show.name}${averageRating}</h1>
    `);


    // 2. Plantilla para cada episodio 
    const createEpisodeHTML = (episode) => {
      const ratingFloor = episode.rating ? Math.floor(episode.rating) : 0;
      const titleTooltip = `T${episode.season}E${episode.number}: ${episode.name ?? "Episodio"} (Nota: ${episode.rating ?? "S/N"})`;
      return `<div class="episode episode-${episode.number} rating-${ratingFloor}" title="${titleTooltip}">${episode.number}</div>`;
    };

    // 3. Plantilla para cada temporada
    const createSeasonHTML = (data, number) => {
      const episodesHTML = data.map(createEpisodeHTML).join("");
      return `
        <article class="season">
          <header class="season-header">T${number}</header>
          ${episodesHTML}
        </article>
      `;
    };

    // 4. Inyectar temporadas
    const list = Object.values(seasons).map((season, index) => createSeasonHTML(season, index + 1));
    $episodes.setHTMLUnsafe(list.join(""));
  } catch (error) {
    console.error(error);
    $header.setHTMLUnsafe("<h1>Error al cargar los episodios</h1>");
  }
}

// Evento al enviar el formulario de búsqueda
$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = $input.value.trim();
  if (!query) return;

  $header.setHTMLUnsafe("<p>Buscando serie...</p>");
  $episodes.setHTMLUnsafe("");

  const showId = await searchShowByName(query);
  if (!showId) {
    $header.setHTMLUnsafe(`<h1>No se encontraron series para "${query}"</h1>`);
    return;
  }

  renderShow(showId);
});

// Carga inicial por defecto para la mejor serie, profe si lee esto vease Better Call Saul, no se va a arrepentir :D
renderShow("618");