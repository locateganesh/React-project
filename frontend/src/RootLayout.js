// import { Outlet, useNavigation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import MainNavigation from './components/MainNavigation'

const RootLayout = () => {
    // const navigate = useNavigation(); // navigate.state, Used when waiting for data. it give 3 state idle (nothing loading), loading (data loading), submitting (data posting or submitting).
    
    return (
        <>
            <MainNavigation />
            {/* {navigate.state === 'loading' && <p>Loading...</p>} */}
            <main>
                <Outlet />
            </main>
        </>

    )
}

export default RootLayout;