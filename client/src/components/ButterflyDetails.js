import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditingButterfly from "./EditingButterfly";

function ButterflyDetails({ user, handleEdit, deleteButterfly }) {
  const [deleting, setIsDeleting] = useState(false);
  const [butterfly, setButterfly] = useState({
    name: "",
    image: "",
    genus_species: "",
    conservation_status: "",
  });
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [showTag, setShowTag] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  // useEffect(() => {
  //   setIsEditing(false)
  // }, [location])

  const addNewTag = (t) => {
    setTags([...tags, t]);
    setShowTag(false);
    fetchTags();
  };

  const fetchTags = () => {
    fetch(`/butterflies/${params.id}/tag`)
      .then((res) => res.json())
      .then((data) => setTags(data));
  };

  const newTag = {
    name: tagInput,
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    fetch(`/butterflies/${params.id}/tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    })
      .then((r) => r.json())
      .then((tagToAdd) => {
        addNewTag(tagToAdd);
        setTagInput("");
      });
  };

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/butterflies/${params.id}`).then((res) => {
      if (res.ok) {
        res.json().then((b) => setButterfly(b));
      } else {
        res.json().then((data) => setError(data.error));
      }
    });
  }, []);

  
  const handleDelete = (butterfly) => {
    fetch(`/butterfly/${params.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      deleteButterfly(butterfly)
      navigate('/butterflies')
    })}

  const { name, image, genus_species, conservation_status } = butterfly;

  if (error) return <h2>{error}</h2>;
  return (
    <>
      {deleting ? (
        <>
        <h1>Are you sure you want to delete this butterfly?</h1>
        <button onClick={() => handleDelete(butterfly)}>Yes</button>
        <button onClick={() => setIsDeleting(false)}>No</button>
        </>
      ) : (
        <>
          <div>
            <h3>Name:</h3>
            <p>{name}</p>
            <img src={image} alt="butterfly image" />
            <h3>Genus & Species:</h3>
            <p>{genus_species}</p>
            <h3>Conservation Status:</h3>
            <p>{conservation_status}</p>
          </div>
          <div>
            <h3>Tags already added to this butterfly:</h3>
            {tags.map((tag) => (
              <ul key={`${params.id}-${tag.name}`}>{tag.name}</ul>
            ))}
          </div>
          {user && user.id === butterfly.user_id && (
            <>
              <button
                onClick={() => {
                  handleEdit(butterfly);
                }}
              >
                Edit
              </button>
              <button onClick={() => setIsDeleting(true)}>Delete</button>
            </>
          )}
          {!showTag && (
            <button onClick={() => setShowTag((prevState) => !prevState)}>
              Add a tag to this butterfly!
            </button>
          )}
          {showTag && (
            <>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button onClick={handleTagSubmit}>Add your tag!</button>
            </>
          )}
        </>
      )}
    
    </>
  );
}
export default ButterflyDetails
