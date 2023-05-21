import { Link } from "react-router-dom";
import "./post.css";

export default function Post({restaurant}) {
  return (
    <Link 
    to={{ 
      pathname: `/restaurants/${restaurant.id}`,
      state: { 
        'restaurant': restaurant
      } 
    }} 
    className="link"
  >
    <div className="post">
      <img
        className="postImg"
        src={restaurant.picture}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
        {restaurant.restaurantspecialite && restaurant.restaurantspecialite.map((item, index) => (
          <span className="postCat" key={index}>
              {item.specialite.nom}
            {index !== restaurant.restaurantspecialite.length - 1 && " || "}
          </span>
        ))}


        </div>
        <span className="postTitle">
            {restaurant.nom}

        </span>
        <hr />
        <span className="postDate">Opens At: {restaurant.open}  ||  Closes at : {restaurant.close}</span>
      </div>
      <p className="postDesc">
        {restaurant.description ? restaurant.description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda officia architecto deserunt deleniti? Labore ipsum aspernatur magnam fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione atque, exercitationem quibusdam, reiciendis odio laboriosam?"}
      </p>
    </div>
    </Link>
  );
}
