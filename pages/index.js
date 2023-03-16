import { PokemonData } from "@/components/PokemonData";
import Error from "next/error";
import { useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";

const limit = 20;

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  console.log(offset);
  console.log("offset");
  console.log(limit);
  console.log("limit");

  useEffect(() => {
    if (data) {
      setPokemonList(data);
    }
  }, [data]);

  const previousPage = () => {
    if (offset >= limit){
      setOffset(offset - limit)
    }
  };
  const nextPage = () => {
    setOffset(offset + limit);
  };

  if (error) {
    return <Error statusCode={404} />;
  }
  if (!data) {
    return null;
  }

  return (
    <>
      {/* <PokemonData id={151}/> */}
      {/* {console.log(pokemonList)}
      {console.log("data")}
      {console.log(pokemonList?.results)}
      {console.log("results")} */}
      <Row className="gy-3" md={5}>
        {data?.results.map((pokemon) => {
          return (
            <Col key={pokemon.url}>
              <PokemonData url={pokemon.url} />
            </Col>
          );
        })}
      </Row>
      <br/>
      <br/>
      <br/>
      {data?.results.length > 0 ? (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{offset + 1} - {offset+ limit}</Pagination.Item>
              <Pagination.Next onClick={nextPage}/>
            </Pagination>
          </Col>
        </Row>
      ) : null}
    </>
  );
}
