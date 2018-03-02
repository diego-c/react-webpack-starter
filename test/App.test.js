import 'babel-polyfill';
import 'regenerator-runtime';
import './adapter.config';
import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../src/components/App/App';

describe('<App />', () => {
    it('successfully renders <Image />', () => {

        import('../src/components/Image/Image')
        .then(module => module.default)
        .then(Image => {
            const wrapper = shallow(<App />);
            expect(wrapper.find(Image)).toHaveLength(1);
        })
        .catch(err => console.log('Could not load Image: ', err));        
    });

    it('renders title', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1')).toHaveLength(1);
    });
});

