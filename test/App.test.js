import './config/adapter.config';
import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/components/App/App';

describe('<App />', () => {
    
    it('successfully renders <Image /> asynchronously', () => {

        import('../src/components/Image/Image')
        .then(module => module.default)
        .then(Image => {

            const imgWrapper = shallow(<Image />);
            imgWrapper.setProps({ path: 'react-logo.png' });
            const wrapper = shallow(<App />);
            expect(wrapper.childAt(0).prop('path')).toEqual(imgWrapper.find('img').prop('src'));
        })
        .catch(err => console.log('Could not load Image: ', err));        
    });
});

