import { Link } from "react-router-dom";

function ButterflyCard({ butterfly }) {
  const { name, image, id } = butterfly;

  return (
    <>
      <Link to={`/butterflies/${id}`}>
        <div>
          <h1>{name}</h1>
          <img src={image} />
        </div>
      </Link>
    </>
  );
}
export default ButterflyCard;
