if (process.env.NODE_ENV === 'production') {
    import('babel-polyfill')
    .then(() => console.log('babel-polyfill enabled'))
}

import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';

render(<App />, document.getElementById('root'));