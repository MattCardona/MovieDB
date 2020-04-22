import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appendActorActresses } from "../../actions/actorsActions";

class ActorInfiniteScroll extends Component {
  state = {
    count: 1,
    path: ""
  }
  componentDidMount() {
    if (this.props.actors.length > 19) {
      let prevCount = this.props.actors.length / 20;
      this.setState(prevState => ({
        count: prevCount
      }));
    }

    if (this.state.count <= 10) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      // Do awesome stuff like loading more content!
      // console.log("redbull", this.props.actors);
      if (this.props.actors.length < 100) {
        this.more();
      }
    }
  }
  more = async () => {
    if (this.props.actors.length <= 19) {
      this.setState(prevState => ({
        count: 1
      }));
    }
    // await
    this.setState(prevState => ({
      count: prevState.count += 1
    }));
    // console.log("Appppendix");
    this.props.appendActorActresses("appendActorActresses", this.state.count);
  }
  render() {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}


export default connect(undefined, { appendActorActresses })(ActorInfiniteScroll);