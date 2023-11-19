import logo from "../assets/images/logo.png";

function Bottom() {
  return (
    <footer>
      <img src={logo} alt="blank"/>

      <div className="social-media">
        <h3>Reach us on:</h3>
        <ul>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-square-instagram"></i>
        <i className="fa-brands fa-x-twitter"></i>
        </ul>
      </div>
    </footer>
  );
}

export default Bottom;