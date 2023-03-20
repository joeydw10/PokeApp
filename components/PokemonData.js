import Error from "next/error";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";

export function PokemonData(prop) {
  const { data, error } = useSWR(`${prop.url}`);
  // console.log(data);
  if (error) {
    return <Error statusCode={404} />;
  }
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
            <span id="pokemonType" className={data?.types[0].type.name}>
              {data?.types[0].type.name}
            </span>
            {data?.types[1] ? (
              <span id="pokemonType" className={data?.types[1].type.name}>
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
