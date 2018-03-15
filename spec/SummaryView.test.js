import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SummaryView from '../client/src/SummaryView.jsx';

Enzyme.configure({ adapter: new Adapter() });

xdescribe('SummaryView Component', () => {
  test('should render correctly', () => {
    expect(Enzyme.shallow(<SummaryView />)).toMatchSnapshot();
  });
});
