import { useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";

function PlantContainer({plants, user}) {
  const navigate = useNavigate()
  
  if (!user){
    navigate('/authentication')
  } else{
    return (
      <div>
          <h1>Plant Collection</h1>
          <div>
              {plants.map(plant => <PlantCard  key={plant.id} plant={plant}  />)}
          </div>
      </div>
     )
  }

}
  export default PlantContainer;