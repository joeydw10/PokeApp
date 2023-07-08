import { PokemonData } from "@/components/PokemonData";
import Error from "next/error";
import { useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";

const limit = 9999;

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  useEffect(() => {
    if (data) {
      setPokemonList(data);
    }
  }, [data]);

  const previousPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };
  const nextPage = () => {
    setOffset(offset + limit);
    
  };
  const genOne = () => {
    setOffset(0);
  };
  const genTwo = () => {
    setOffset(151);
  };
  const genThree = () => {
    setOffset(251);
  };
  const genFour = () => {
    setOffset(386);
  };
  const genFive = () => {
    setOffset(493);
  };
  const genSix = () => {
    setOffset(649);
  };
  const genSeven = () => {
    setOffset(721);
  };
  const genEight = () => {
    setOffset(809);
  };
  const genNine = () => {
    setOffset(905);
  };

  if (error) {
    return <Error statusCode={404} />;
  }
  if (!data) {
    return null;
  }

  return (
    <>
      {/* <PokemonData id={151}/> }
      { {console.log(pokemonList)}
      {console.log("data")}
      {console.log(pokemonList?.results)}
      {console.log("results")} */}
      <Button size="lg" onClick={genOne} variant="info">Gen 1</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genTwo} variant="info">Gen 2</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genThree} variant="info">Gen 3</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genFour} variant="info">Gen 4</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genFive} variant="info">Gen 5</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genSix} variant="info">Gen 6</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genSeven} variant="info">Gen 7</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genEight} variant="info">Gen 8</Button>&nbsp;&nbsp;
      <Button size="lg" onClick={genNine} variant="info">Gen 9</Button>&nbsp;&nbsp;
      <Row className="gy-3" xs={2} sm={2} md={4} lg={5}>
        {data?.results.map((pokemon) => {
          return (
            <Col  key={pokemon.url}>
              <PokemonData url={pokemon.url} />
            </Col>
          );
        })}
      </Row>
      <br />
      <br />
      <br />
      {data?.results.length > 0 ? (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>
                {offset + 1} - {offset + limit}
              </Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      ) : null}
    </>
  );
}
