import * as React from 'react';


class CardList extends React.Component {

  state = {
    cards: [],
    cardComponents: []
  }



  componentDidMount = () => {
    let newComponents = []

    newComponents.push(<p>Card 1</p>);


      this.setState({
          cardComponents: newComponents
      })

  }


  render = () => {
    return (
      this.state.cardComponents
    );
  }
}

export default CardList