export const animationAuth = {
  opacity: [0, 1],
  delay: 200,
  translateY: '0em',
  elasticity: function(el, i, l) {
    return 200 + i * 200;
  }
};
