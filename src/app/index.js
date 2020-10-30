import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes';

import 'antd/dist/antd.css';
import '../services/api'
import '../services/utilities';

const App = () => {
    return (
        <Router>
            <Routes />
        </Router>
    );
}

export default App;
