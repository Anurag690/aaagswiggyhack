import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../store/actions";
import Picker from "../components/Picker";
import Placard from "../components/placard";

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  };

  handleRefreshClick = e => {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    const isEmpty = posts.length === 0;
    return (
      <div
        className="hide-scrollbar-from-window"
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
      >
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={["reactjs", "frontend"]}
        />
        {isEmpty ? (
          isFetching ? (
            <h2>Loading...</h2>
          ) : (
            <h2>Empty.</h2>
          )
        ) : (
          <div
            style={{
              opacity: isFetching ? 0.5 : 1,
              overflowY: "scroll",
              height: window.innerHeight,
              width: "-webkit-fill-available"
            }}
          >
            <Placard />
            <Placard />
            <Placard />
            <Placard />
            <Placard />
            <Placard />
            <Placard />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(App);
