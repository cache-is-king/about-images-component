import React from 'react';
import ajax from './ajax.js';
import About from './About.jsx';
import SideBar from './SideBar.jsx';
import Banner from './Banner.jsx';

class SummaryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: '',
      description: '',
      hours: '',
      phone: '',
      price: '',
      style: '',
      banner: '',
      photo: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    ajax.get(this.state.id, (err, data) => {
      if (err) {
        throw err;
      } else {
        this.setState({
          name: data.name,
          description: data.about.description,
          hours: data.about.hours,
          phone: data.about.phone,
          price: data.about.price,
          style: data.about.style,
          banner: data.banner,
          photo: data.photo,
        });
      }
    });
  }

  render() {
    return (
      <div className="grid">
        <div className="banner"><Banner banner={this.state.banner} /></div>
        <div className="main">
          <div className="about"><About description={this.state.description} name={this.state.name} photo={this.state.photo} /></div>
        </div>
        <div className="sidebar">
          <div><SideBar hours={this.state.hours} phone={this.state.phone} price={this.state.price} style={this.state.style} /></div>
        </div>
      </div>
    );
  }
}

export default SummaryView;
