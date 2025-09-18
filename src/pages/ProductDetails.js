import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ProductDetails = () => {
    const params = useParams();
    return (
        <>
            <h1>Product details</h1>
            <p>{params.productId}</p>
            <p><Link to=".." relative="path">Back</Link></p> {/* relative="route" is default. that means it goes to route not path */}
        </>
    )
}

export  default ProductDetails;