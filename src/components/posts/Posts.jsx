import Post from "../post/Post";
import "./posts.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Posts() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/restaurants/")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.log(error));
  }, []);
  console.log("🚀 ~ file: Posts.jsx:7 ~ Posts ~ restaurants:", restaurants)

  return (
    <div className="posts">
          {restaurants.map((restaurant) => ( 
            <Post key={restaurant.id} restaurant={restaurant} />
          ))}
    </div>
  );
}
