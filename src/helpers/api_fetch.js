const api_fetch = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=300&offset=1");
  const resJson = await response.json();

  const promises = resJson.results.map(async (x) => {
    const url = await fetch(x.url);
    const responseJson = await url.json();

    return {
      id: responseJson.id ,
      nombre: responseJson.name,
      imagen: responseJson.sprites.other["official-artwork"].front_default,
      tipo:[
         responseJson.types[0],
        (responseJson.types[1])
        ? responseJson.types[1]
        :{ type: { name: 'sintipo' } }
        // ...
      ] ,
      isActive: true
    };
  });

  const resol = await Promise.all(promises);
  return resol;
};

export default api_fetch;




