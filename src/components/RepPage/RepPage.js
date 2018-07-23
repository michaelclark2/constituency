import React from 'react';
import moment from 'moment';
import './RepPage.css';

import openSecrets from '../../apicalls/opensecrets';

class RepPage extends React.Component {
  state = {
    rep: {},
  }
  componentDidMount () {
    openSecrets
      .getIndustry(this.props.match.params.id)
      .then(rep => {
        this.setState({rep});
      })
      .catch(err => {
        console.error('error getting rep info', err);
      });
  }
  render () {
    const {rep} = this.state;
    if (!rep.id) {
      return (
        <div className="RepPage">
          <h1 className="text-center">Loading Representative Info</h1>
        </div>
      );
    } else {
      return (
        <div className="RepPage">
          <div className="col-xs-12">
            <div className="panel panel-default clearfix">
              <div className="col-xs-4">
                <img className="image-responsive" src={`http://bioguide.congress.gov/bioguide/photo/${rep.name.last[0]}/${rep.id.bioguide}.jpg`} alt=""/>
              </div>
              <div className="col-xs-8">
                <h1>{rep.name.official_full}</h1>
                <h2>Age: {moment().diff(rep.bio.birthday, 'years')}</h2>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default RepPage;
