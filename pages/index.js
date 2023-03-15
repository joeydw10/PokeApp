import { PokemonData } from "@/components/PokemonData"
import Error from "next/error";
import { useEffect, useState } from "react"
import { Card, Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";


const PER_PAGE = 12;

export default function Home() {
  const [pokemonList, setPokemonList] = useState();
  const [page, setPage] = useState(1);
  const {data, error} = useSWR(`https://pokeapi.co/api/v2/pokemon?limit=151`);

  const previousPage = () =>{
    if(page > 1){
      setPage(page - 1);
    }
  }
  const nextPage = () =>{
    if (page < pokemonList.length){
      setPage(page + 1)
    }
  }

  useEffect(() =>{
    let results = [];
    if(data){
      for (let i = 0; i < data?.length; i += PER_PAGE) {
        const chunk = data?.id.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setPokemonList(results);
      setPage(1);
    }
  }, [data]);

  if (error){
    return <Error statusCode={404}/>;
  }
  if (!pokemonList){
    return null;
  }

  return (
    <>
    {/* <PokemonData id={151}/> */}
    {pokemonList.length > 0 ? (
        <Row className="gy-4">
          {pokemonList[page - 1].map((id) => {
            return (
              <Col lg={3} key={id}>
                <PokemonData id={id} />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row>
          <Col>
            <Card>
              <h4>Nothing Here</h4>
              Try searching for something else.
            </Card>
          </Col>
        </Row>
      )}

      {pokemonList.length > 0 ? (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      ) : null}
    </>
  )
}
