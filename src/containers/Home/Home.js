import React from 'react';
import List from './List'
import Karousel from './Karousel'
import SideBar from './SideBar'


const Home = (match) => {
    return (
        <div>
            <div className="slider">

                <Karousel />
            </div>

            <div>
                <SideBar />
                <List page={match.page} />

            </div>
        </div>
    );
};

export default Home;