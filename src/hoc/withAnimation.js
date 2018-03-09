import React, { Component } from 'react';
const anime = typeof window !== 'undefined' ? require('animejs') : _ => _;

export const withAnimation = (input, initialStyle) => BaseComponent => {
  class WithAnimation extends Component {
    constructor(props) {
      super(props);
      this.targets = [];

      let { children } = props;
      if (!Array.isArray(children)) children = [children];
      this.children = {
        cur: children,
        prev: [],
        next: []
      };
    }

    componentDidMount() {
      this.createAnime();
    }

    componentWillUnmount() {
      anime.remove(this.animeProps);
    }

    createAnime = (props = this.props) => {
      this.animeProps = { targets: this.div, ...input };

      anime.remove(this.targets);

      if (typeof this.anime === undefined) this.anime = anime(this.animeProps);
      else {
        this.anime = anime(this.animeProps);
      }
    };

    addTarget = newTarget => {
      this.targets = [...this.targets, newTarget];
    };

    render() {
      return (
        <div
          style={initialStyle}
          ref={div => {
            this.div = div;
          }}
        >
          <BaseComponent {...this.props} />
        </div>
      );
    }
  }

  return WithAnimation;
};
