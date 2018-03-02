import './adapter.config';
import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/components/App/App';
import Image from '../src/components/Image/Image';

describe('<App />', () => {
    it('successfully renders <Image />', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Image)).toHaveLength(1);
    });

    it('renders title', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1')).toHaveLength(1);
    });
});

