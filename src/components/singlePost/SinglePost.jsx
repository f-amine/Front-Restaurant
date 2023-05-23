import {  useLocation } from "react-router-dom";
import "./singlePost.css";
import RouteMap from "../map/RouteMap";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export default function SinglePost() {
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const [latlng, setLatLng] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
      const token = Cookies.get("jwt");
        axios.post("http://localhost:8081/api/v1/auth/user", {
          "jwt":token
        }).then((response) => {
          setUser(response.data);
          console.log("hhhhhhhhhhhhhhhhh",response.data);
        
      })
        .catch((error) => console.log(error));
      }, []);
useEffect(() => {
  console.log("user",user);
}, [user]);
  function handleChildValue(newValue) {
    setLatLng(newValue);
    console.log(latlng);
  }
  console.log("🚀 ~ file: SinglePost.jsx:40 ~ SinglePost ~ restaurant.picture:", restaurant.picture)
  return user!= null&&(
    <div className="singlePost">
      <div className="singlePostWrapper">
      <img
          className="singlePostImg"
          src={"/" +  restaurant.picture}
          
          alt=""
        />
        <h1 className="singlePostTitle">
          <div className="singlePostEdit">
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Restaurant Name : 
            <b className="singlePostAuthor">
                {restaurant.nom}
            </b>
          </span>
          <span>Opens At: {restaurant.open}  ||  Closes at : {restaurant.close}</span>
        </div>
        <div className="singlePostInfo">
          <span>
            Restaurant Owner : 
            <b className="singlePostAuthor">
                {user.firstName} {user.lastName}
            </b>
          </span>
          <span>Address : {restaurant.adresse}</span>
        </div>
        {user !=null && (
        <RouteMap field={{
          lat:parseFloat(restaurant.lattitude),
          long:parseFloat(restaurant.longtitude),
          userlat: user.latitude,
          userlong: user.longitude}} />
        )}
      </div>
    </div>
  );
}
