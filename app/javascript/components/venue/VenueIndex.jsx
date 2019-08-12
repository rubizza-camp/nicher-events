import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class EventList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { venues: [] };
  }

  componentDidMount() {
    Axios.get('/api/v1/venues')
      .then(res => {
        this.setState({ venues: res.data });
      })
      .catch(error => console.log('error', error))
  }

  render() {
    const createEventUrl = '/venues/new';
    return (
      <div>
        <Link to={createEventUrl} className="btn btn-outline-primary">Add venue</Link>
        {this.state.venues.map((venue) => {
          return(
            <div key={venue.id}>
              <h2><Link to={`/events/${venue.id}`}>{venue.address}</Link></h2>
              <p>{venue.description}</p>
              <hr/>
            </div>
          )
        })} 
      </div>
    );
  }
}