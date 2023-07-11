import ButterflyCard from "./ButterflyCard";
import { useNavigate } from "react-router-dom";

function ButterflyContainer({butterflies, user}) {
    const navigate = useNavigate()
    if (!user){
        navigate('/authentication')
    } else {
        return (
            <div>
                <h1>Butterfly Garden</h1>
                <div>
                    {butterflies.map(butterfly => <ButterflyCard  key={butterfly.id} butterfly={butterfly}  />)}
                </div>
            </div>
           )
    }     
    
  }
  export default ButterflyContainer;