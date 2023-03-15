import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";


export function PokemonData(prop) {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${prop.id}`
  );
  if (error) {
    return <Error statusCode={404} />;
  }
  if (!data) {
    return null;
  }
  return (
    <Card>
      <Card.Img
        src={
          data?.sprites.other["official-artwork"].front_default ||
          "https://via.placeholder.com/50x50.png?text=%5B+Not+Available+%5D"
        }
      />
      <Card.Body>
        <Card.Title>{data?.name || "N/A"}</Card.Title>
        <Card.Text>
          <strong>ID: </strong> {data?.id || "N/A"}
          <br />
          <strong>Classification:</strong> {data?.classification || "N/A"}
          <br />
          <strong>Medium:</strong> {data?.medium || "N/A"} <br />
        </Card.Text>
        <Link href={`/artwork/${data?.objectID}`} passHref>
          <Button variant="dark">
            <strong>ID: </strong>
            {data?.objectID}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
