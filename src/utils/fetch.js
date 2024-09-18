const accesKey = '_HVFdn752nXNMouh4zrEtbBgJGB21zEuuJe5y0VcliA'

export default async function fetchApi(query = 'paisaje', page = 1) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${15}&client_id=${accesKey}`
  )
  const response = await res.json()
  return response
}
