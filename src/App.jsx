import { useEffect, useState } from 'react'

function App() {

  const [pokemon, setPokemon] = useState('')
  const [pokemonId, setPokemonId] = useState('')
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonImg, setPokemonImg] = useState('')
  const [pokemonValue, setPokemonValue] = useState(1)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonValue}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data) {
          setPokemonName(data.name[0].toUpperCase() + data.name.slice(1,).toLowerCase()),
            setPokemonId(data.id),
            setPokemonImg(data.sprites.versions["generation-v"]["black-white"]["animated"][
              "front_default"
            ])
          setPokemon('')
        }
      })
      .catch(err => {
        // console.error(err)
        setPokemonName('Not Found')
        setPokemonId('')
        setPokemon('')
        setPokemonImg('')
      });
  }, [pokemonValue])


  return (
    <div className='bg-[url("./assets/background.jpg")]  bg-no-repeat bg-cover w-full bg-center h-[100vh] 
    flex justify-center items-center font-sans font-semibold'>
      <div className='bg-[url("./assets/pokedex.png")]  bg-no-repeat bg-cover w-[300px] h-[450px] lg:w-[370px] lg:h-[550px]'>
        <div className='relative w-[100%] h-[100%]'>
          <div className='absolute top-[65%] px-7 py-3'>
            <form onSubmit={(e) => {
              e.preventDefault()
              setPokemonValue(pokemon)
            }}
              className='flex flex-wrap'>
              <input type="text" placeholder='Search by Name or Number'
                value={pokemon}
                onChange={(e) => setPokemon(e.target.value.toLowerCase())}
                className=' placeholder:text-slate-400 block bg-white  
              border border-slate-300 rounded-md p-2 shadow-sm focus:outline-none
            focus:border-red-700  w-[220px] text-sm lg:w-[280px]
             '/>
              {/* <button className=' bg-slate-900 text-white  button w-[80px] h-[80px]'>Search</button> */}
            </form>
          </div>
          <div className='absolute top-[55%] right-[25%] flex gap-5'>
            <p className='lg:text-2xl text-gray-500'>
              {pokemonId}
            </p>
            <p className='lg:text-2xl text-gray-700'>
              {pokemonName}
            </p>
          </div>
          <div className='absolute  top-[30%] left-[33%] lg:top-[32%] lg:left-[30%]'>
            <img src={pokemonImg} alt="" className='w-[100px] h-[80px] lg:w-[130px] lg:h-[100px]'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
