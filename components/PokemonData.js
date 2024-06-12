import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";

export function PokemonData(prop) {
  const { data, error } = useSWR(`${prop.url}`);
  // console.log("Data from PokemonData.js ", data);
  if (error) {
    return <Error statusCode={404} />;
  }
  // Ensure data exists
  if (!data) {
    return null;
  }
  return (
    <>
      <br />
      <Card>
        <Card.Img
          src={
            data?.sprites.other["official-artwork"].front_default ||
            "https://via.placeholder.com/50x50.png?text=%5B+Not+Available+%5D"
          }
        />
        <Card.Body>
          <Card.Title className="text-capitalize">{data?.name || "N/A"}</Card.Title>
          <Card.Subtitle>Entry: {data.id}</Card.Subtitle>
          <Card.Text>
            <span id="pokemonType" className={`${data?.types[0].type.name} text-capitalize`}>
              {data?.types[0].type.name}
            </span>
            {data?.types[1] ? (
              <span id="pokemonType" className={`${data?.types[1].type.name} text-capitalize`}>
                {data?.types[1].type.name}
              </span>
            ) : null}
            <br />
          </Card.Text>
          <Link href={`/pokemon/${data?.id}`} passHref>
            <Button variant="primary">
              <strong>ID: </strong>
              {data?.id}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export function PokemonDetail(prop) {
  const { data, error } = useSWR(`${prop.url}`);
  // console.log("Data from PokemonData.js function PokemonDetail", data);
  if (error) {
    return <Error statusCode={404} />;
  }
  // Ensure data exists and has the necessary properties
  if (!data || !data.types || data.types.length === 0) {
    return null;
  }

  return (
    <>

    <Container className="text-center my-4">
      <Row className="justify-content-center">
      <h2 className="text-capitalize text-center">{data?.name}</h2>
        <Col xs={12} md={6} lg={4} className="mb-3">
        <Image
            src={data?.sprites.other["official-artwork"].front_default || "https://via.placeholder.com/50x50.png?text=%5B+Not+Available+%5D"}
            alt="Normal"
            height={250}
            width={250}
            />
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
        <Image
            src={data?.sprites.other["official-artwork"].front_shiny || "https://via.placeholder.com/50x50.png?text=%5B+Not+Available+%5D"}
            alt="Normal"
            height={250}
            width={250}
            />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <p>Entry: {data.id}</p>
          <p>
            <span id="pokemonType" className={`${data?.types[0].type.name} text-capitalize me-2`}>
              {data?.types[0].type.name}
            </span>
            {data?.types[1] && (
              <span id="pokemonType" className={`${data?.types[1].type.name} text-capitalize`}>
                {data?.types[1].type.name}
              </span>
            )}
          </p>
        </Col>
      </Row>
    </Container>
    </>
  );
}
