import { Link } from "react-router-dom";
import "./post.css";

export default function Post({restaurant}) {
  
  return (
    <div className="post">
      <img
        className="postImg"
        src={restaurant.photos.url}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
        {restaurant.restaurantspecialite && restaurant.restaurantspecialite.map((item, index) => (
          <span className="postCat" key={index}>
            <Link className="link" to={`/restaurants/${restaurant.id}`}>
              {item.specialite.nom}
            </Link>
          </span>
        ))}

        </div>
        <span className="postTitle">
          <Link to={`/restaurants/${restaurant.id}`} className="link">
            {restaurant.nom}
          </Link>
        </span>
        <hr />
        <span className="postDate">Opens At: {restaurant.open}  ||  Closes at : {restaurant.close}</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam?
      </p>
    </div>
  );
}
