import React, { Component } from 'react'

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {}
    }
  }
  componentDidMount() {
    // console.log(this.props.match.params.id);
    const { id } = this.props.match.params;
    fetch(`/actor/${id}`)
      .then((res) => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        this.setState(() => ({
          actor: data
        }));
      })
      .catch(err => console.log(JSON.stringify(err, undefined, 2)))
  }
  render() {
    return (
      <div>
        This will be the more info page for actor/actress
      </div>
    )
  }
}

export default MoreInfo;