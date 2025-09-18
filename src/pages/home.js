import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate('/products');
  };
  return <>
    <h1>Homepage</h1>
    <Link to="products">Go to products page</Link> <br/><br/> {/* without / is a relative path */}
    <button onClick={navigateHandler}>Navigate</button>
  </>
}

export default Home;