import "./write.css";
import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantMap from "../../components/map/RestaurantMap";
export default function Write() {
  const [nom, setNom] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [adresse, setAdresse] = useState("");
  const [weekend, setWeekend] = useState("");
  const [rank, setRank] = useState("");
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [villeId, setVilleId] = useState("");
  const [latlng, setLatLng] = useState({});
  const [filePath, setFilePath] = useState("");
  console.log(filePath);
  function handleChildValue(newValue) {
  setLatLng(newValue);
  console.log(newValue);
  }
  const extractFileName = (path) => {
    const startIndex = path.lastIndexOf("\\") + 1; // Find the index of the last backslash
    return path.substring(startIndex); // Extract the substring from the last backslash position till the end
  };
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/zones/get")
      .then((response) => {
        setZones(response.data);
        console.log(response.data); // log the zones to the console
      })
      .catch((error) => console.log(error));
  }, []);
  
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/villes")
      .then((response) => setVilles(response.data))
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nom,
      open,
      close,
      adresse,
      weekend,
      rank,
      picture: "/images/"+filePath,
      zones: {
        id: zoneId,
        // nom: "Agadir Oufella",
        ville: {
          id: villeId,
          // nom: "Agadir"
        }
      },
      series: null,
      lattitude:latlng.lat,
      longtitude: latlng.lng
    };
    console.log(data);
    axios.post("http://localhost:8081/api/restaurants/save", data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="/images/7.jpg"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
        <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(event) => setFilePath(extractFileName(event.target.value))}
          />
          <input
            className="writeInput"
            placeholder="Nom"
            type="text"
            autoFocus={true}
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Open"
            type="text"
            value={open}
            onChange={(event) => setOpen(event.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Close"
            type="text"
            value={close}
            onChange={(event) => setClose(event.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Adresse"
            type="text"
            value={adresse}
            onChange={(event) => setAdresse(event.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Weekend"
            type="text"
            value={weekend}
            onChange={(event) => setWeekend(event.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Rank"
            type="text"
            value={rank}
            onChange={(event) => setRank(event.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <select
            className="writeInput"
            value={villeId}
            onChange={(event) => setVilleId(event.target.value)}
          >
            <option value="">Select a ville</option>
            {villes.map((ville) => (
              <option key={ville.id} value={ville.id}>
                {ville.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="writeFormGroup">
          <select
            className="writeInput"
            value={zoneId}
            onChange={(event) => setZoneId(event.target.value)}
          >
            <option value="">Select a zone</option>
            {zones
              .filter((zone) => zone.ville.id === parseInt(villeId, 10)) // Parse villeId to integer
              .map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.nom}
                </option>
              ))}
          </select>
        </div>


        <br/>
        <br/>
        <RestaurantMap onValueChange={handleChildValue}/>
        <button className="writeSubmit" type="submit">
          Publish Restaurant
        </button>
      </form>
    </div>
  );
}