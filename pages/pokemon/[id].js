import { PokemonDetail } from '@/components/PokemonData'
import { useRouter } from 'next/router'

//https://pokeapi.co/api/v2/pokemon/1 1 is the [id]
 
export default function Page() {
  const router = useRouter()
  return (
  <>
    <PokemonDetail url={`https://pokeapi.co/api/v2/pokemon/${router.query.id}`}/>

    
  </> 
  )
    
}