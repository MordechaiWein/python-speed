import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";
import ButterflyCollection from "./components/ButterflyCollection";
import ButterflyCard from "./components/ButterflyCard";
import ButterflyDetails from "./components/ButterflyDetails";
import ButterflyForm from "./components/ButterflyForm";
import PlantCollection from "./components/PlantCollection";
import PlantCard from "./components/PlantCard";
import PlantDetails from "./components/PlantDetails";
import PlantForm from "./components/PlantForm";

function App() {
  const [butterflies, setButterflies] = useState([]);
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);
  const updateUser = (user) => setUser(user);

  useEffect(() => {
    fetchUser();
    fetchButterflies();
    fetchPlants();
  }, []);

  const fetchButterflies = () => {
    fetch("/butterflies")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Unauthorized");
        }
      })

      .then(setButterflies)
      .catch((error) => console.log(error.message));
  };

  //    try and except, try will run until and error is thrown, then it goes to the except
  //    same as the .then

  const fetchPlants = () => {
    fetch("/plants")
      .then((res) => res.json())
      .then(setPlants);
  };

  const fetchUser = () =>
    fetch("/authorized").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
          fetchButterflies();
          fetchPlants();
        });
      } else {
        setUser(null);
      }
    });

  const addNewTag = () => {};

  if (!user)
    return (
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/authentication"
            element={<Authentication updateUser={updateUser} />}
          />
        </Routes>
      </>
    );

  return (
    <>
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/authentication"
          element={<Authentication updateUser={updateUser} />}
        />
        <Route
          path="/butterflies"
          element={
            <ButterflyCollection butterflies={butterflies} user={user} />
          }
        />
        <Route path="/butterflycard" element={<ButterflyCard />} />
        <Route path="/butterflies/:id" element={<ButterflyDetails />} />
        <Route path="/butterflies/new" element={<ButterflyForm />} />
        <Route
          path="/plants"
          element={<PlantCollection plants={plants} user={user} />}
        />
        <Route path="/plantcard" element={<PlantCard />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="/plants/new" element={<PlantForm />} />
      </Routes>
    </>
  );
}
export default App;
