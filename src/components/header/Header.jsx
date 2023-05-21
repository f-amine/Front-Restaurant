import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Find the best</span>
        <span className="headerTitleLg">RESTAURANT</span>     
      </div>
      <img
        className="headerImg"
        src="images/pexels-photo-2961968.jpeg"
        alt=""
      />
    </div>
  );
}
