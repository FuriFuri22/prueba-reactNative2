const api_fetch = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=300&offset=1");
  const resJson = await response.json();

  const promises = resJson.results.map(async (x) => {
    const url = await fetch(x.url);
    const responseJson = await url.json();

    return {
      nombre: responseJson.name,
      imagen: responseJson.sprites.other["official-artwork"].front_default,
      tipo:[
         responseJson.types[0],
        (responseJson.types[1])? responseJson.types[1]:{ type: { name: 'sintipo' } }
        // ...
      ] 
    };
  });

  const resol = await Promise.all(promises);
  return resol;
};

export default api_fetch;




/*const api_fetch = async()=>{
  
	const response= await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20")//Se hace una peticion get y se espera la respuesta de la api 

    const resJson = response.json()//Interpretamos el json

    const resol = []// Se declara un array para almacenar la respuesta de la api de  los datos que requerimos

     resJson.then(async res=> {
      for(const x of res.results){
        
        const url = await fetch(x.url)
        
        const responseJson = url.json()
        
        responseJson.then(resp => resol.push({
          nombre: resp.name, 
          imagen: resp.sprites.other["official-artwork"].front_default
        }))
      }
    })
    return resol
}

export default api_fetch*/



