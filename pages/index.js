import { PokemonData } from "@/components/PokemonData";
import Error from "next/error";
import { useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";

const PER_PAGE = 20;

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon/`);


  useEffect(() => {
    if (data) {
      setPokemonList(data);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page < data?.length) {
      setPage(page + 1);
    }
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
      {console.log(pokemonList)}
      {console.log("data")}
      {console.log(pokemonList?.results)}
      {console.log("results")}
      <Row className="gy-4">
        {data?.results.map((pokemon) => {
          return (
            <Col lg={3} key={pokemon.url}>
              <PokemonData url={pokemon.url} />
            </Col>
          );
        })}
      </Row>

      {data?.results.length > 0 ? (
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
  );
}
