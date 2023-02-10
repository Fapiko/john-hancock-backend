import HomeAuthenticated from "./HomeAuthenticated";
import React from "react";
import {useSelector} from "react-redux";

const Home = (props) => {
    const user = useSelector(state => state.user.user);

    return (
        <>
            <h1>Home</h1>
            {user !== undefined && <HomeAuthenticated user={user}/>}
        </>
    );
}

export default Home;