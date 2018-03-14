import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import sample from '../data/sampleData.js';

import About from '../client/src/About.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('About Component', () => {
  test('should render correctly', () => {
    expect(shallow(<About photo={sample[0].photo} />)).toMatchSnapshot();
  });
});

describe("rendered `About`", () => {
  it("received three props", () => {
    const component = shallow(<About photo={sample[0].photo} />);
    expect(component.props().children.length).toBe(3);
  });
});
