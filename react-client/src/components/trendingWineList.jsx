import React from 'react';
import TrendingWineEntry from './trendingWineEntry.jsx';

class TrendingWineList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingWines: [
      { id:1,
        name: 'peter michael',
        year: 2009,
        price: 30
       },
      { id:2,
        name: 'berringer',
        year: 2007,
        price: 20
       },
       { id:3,
         name: 'peter michael',
        year: 2012,
        price: 15
       },
       { id:4,
         name: 'joel gatt',
        year: 2009,
        price: 30
       },
       { id:5,
         name: 'stella',
        year: 2009,
        price: 30
       },
       { id:6,
         name: 'barefoot',
        year: 2009,
        price: 10
       }
      ]
    }

  }

  render() {
    return (
      <div className='bestCategory trendingCategory'>
        <h2>
          Trending
        </h2>
        <ul>
          {this.state.trendingWines.map(trendingWine =>
            <li key={trendingWine.id}><TrendingWineEntry trendingWine={trendingWine}/></li>
          )}
        </ul>
      </div>
    )
  }
}

export default TrendingWineList;
