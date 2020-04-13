import React, { Component } from 'react';
import { connect } from 'react-redux'
import { appendMovies, searchMovie } from "../actions/moviesActions";

class InfiniteScroll extends Component {
  state = {
    count: 1,
    path: ""
  }
  componentDidMount() {
    if (this.props.movies.length > 19) {
      let prevCount = this.props.movies.length / 20;
      // console.log(`prevcocunt ${prevCount}`);
      this.setState(prevState => ({
        count: prevCount
      }));
    }
    this.setState(() => ({
      path: this.props.kind
    }));
    if (this.state.count <= 10) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  componentDidUpdate(prevProps) {
    if (this.props.kind !== prevProps.kind) {
      this.setState(() => ({
        path: this.props.kind,
        count: 1
      }));
    }
    if (this.props.searchMovie !== prevProps.searchMovie) {
      this.setState(() => ({
        count: 1
      }))
    }

  }
  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      // Do awesome stuff like loading more content!
      // console.log("redbull", this.props.movies);
      if (this.props.movies.length < 100) {
        this.more();
      }
    }
  }
  more = async () => {
    if (this.props.movies.length <= 19) {
      this.setState(prevState => ({
        count: 1
      }));
    }
    await this.setState(prevState => ({
      count: prevState.count += 1
    }));
    // console.log("Appppendix");
    if (this.state.path === "searchMovie") {
      this.props.appendMovies(this.state.path, this.state.count, this.props.searchMovie);
    } else {
      this.props.appendMovies(this.state.path, this.state.count);
    }
  }
  render() {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}


export default connect(undefined, { appendMovies })(InfiniteScroll);