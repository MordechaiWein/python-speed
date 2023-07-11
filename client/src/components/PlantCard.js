import { Link } from "react-router-dom";

function PlantCard({plant}) {
  const { name, image, id } = plant;

  return (
    <>
      <Link to={`/plants/${id}`}>
        <div>
          <h1>{name}</h1>
          <img src={image} />
        </div>
      </Link>
    </>
  );
}
  export default PlantCard;