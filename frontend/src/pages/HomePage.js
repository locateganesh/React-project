import { Link } from "react-router-dom";
import PageContent from "../components/PageContent";


const HomePage = () => {
    return (
        <PageContent title="Welcome">
            <p>Browse all our amazing <Link to='/events'>events!</Link></p>
        </PageContent>
    )
}

export default HomePage;