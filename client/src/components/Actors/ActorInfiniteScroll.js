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
  componentDidUpdate(prevProps) {
    // this is if we update the path we where on had it for "popular" "nowPlaying" "topRated"
    // if (this.props.kind !== prevProps.kind) {
    //   this.setState(() => ({
    //     path: this.props.kind,
    //     count: 1
    //   }));
    // }
    // will need this for when searching for actor/actesses
    // if (this.props.searchMovie !== prevProps.searchMovie) {
    //   this.setState(() => ({
    //     count: 1
    //   }))
    // }

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