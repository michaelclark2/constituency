import React, {Component} from 'react';
import AmCharts from '@amcharts/amcharts3-react';
import moment from 'moment';
import './RepPage.css';

import openSecrets from '../../apicalls/opensecrets';

class RepPage extends Component {
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
          <h1 className="text-center">Loading Representative Info...</h1>
        </div>
      );
    } else {
      const currTerm = rep.terms[rep.terms.length - 1];
      const contributors = rep.contributors.contributor.map(data => {
        return {...data['@attributes']};
      });
      const industries = rep.industries.industry.map(data => {
        return {...data['@attributes']};
      });
      const terms = rep.terms.map(term => {
        return (
          <div key={term.start} className="term-panel">
            <div className={
              term.party === 'Democrat' ? (
                'panel panel-primary'
              ) : (
                term.party === 'Republican' ? (
                  'panel panel-danger'
                ) : (
                  'panel panel-default'
                )
              )}>
              <h5>{term.type === 'sen' ? 'Senate' : 'House'} {term.party}</h5>
              <h6>{term.state} {term.type === 'sen' ? '' : (term.district || 1)}</h6>
              <h6>{moment(term.start).format('M/YY')} - {moment(term.end).format('M/YY')}</h6>
            </div>
          </div>
        );
      });
      return (
        <div className="RepPage container">
          <div className="col-xs-12 main-info">
            <div className="col-xs-9">
              <h1>{currTerm.type === 'sen' ? 'Sen.' : 'Rep.'} {rep.name.official_full}, {currTerm.state} {currTerm.district || ''} ({currTerm.party[0]})</h1>
              <div className="subtitle">
                <h5>Age: {moment().diff(rep.bio.birthday, 'years')}</h5>
                <h5>Elected: {moment(currTerm.start).format('MMM YYYY')}</h5>
                <h5>Term End: {moment(currTerm.end).format('MMM YYYY')}</h5>
              </div>
              <div className="col-xs-12">
                <h3>{terms.length} Terms Served</h3>
                <div className="terms">
                  {terms}
                </div>
              </div>
            </div>
            <div className="col-xs-3">
              <img className="image-responsive" src={`http://bioguide.congress.gov/bioguide/photo/${rep.name.last[0]}/${rep.id.bioguide}.jpg`} alt=""/>
            </div>
          </div>
          <div className="col-xs-12 main-info">
            <div className="col-xs-12">
              <h2 className="text-center">Top 10 Industries</h2>
              <AmCharts.React
                className="industry"
                options={{
                  type: 'pie',
                  pullOutRadius: '10%',
                  balloonText: '[[title]]<br><span style="font-size:14px"><b>[[value]]</b> ([[percents]]%)</span><br><span>Individuals: [[indivs]]</span><br><span>PACs: [[pacs]]</span>',
                  innerRadius: '60%',
                  titleField: 'industry_name',
                  valueField: 'total',
                  creditsPosition: 'bottom-right',
                  startDuration: 0,
                  labelRadius: 10,
                  allLabels: [],
                  balloon: {},
                  legend: {
                    enabled: false,
                  },
                  titles: [],
                  dataProvider: industries,
                }}
              />
            </div>
            <div className="col-xs-12">
              <h2 className="text-center">Top 10 Contributors<br/><small>{rep.contributors['@attributes'].notice}</small></h2>

              <AmCharts.React
                className="contribs"
                options={{
                  type: 'pie',
                  pullOutRadius: '10%',
                  balloonText: '[[title]]<br><span style="font-size:14px"><b>[[value]]</b> ([[percents]]%)</span><br><span>Individuals: [[indivs]]</span><br><span>PACs: [[pacs]]</span>',
                  innerRadius: '60%',
                  titleField: 'org_name',
                  valueField: 'total',
                  creditsPosition: 'bottom-right',
                  startDuration: 0,
                  labelRadius: 10,
                  allLabels: [],
                  balloon: {},
                  legend: {
                    enabled: false,
                  },
                  titles: [],
                  dataProvider: contributors,
                }}
              />
            </div>
          </div>
        </div>
      );
    }
  }
};

export default RepPage;
