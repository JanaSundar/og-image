const colors = [
  'conic-gradient(at center bottom, rgb(159, 18, 57), rgb(229, 231, 235), rgb(252, 211, 77))',
  'conic-gradient(at left top, rgb(233, 213, 255), rgb(180, 83, 9), rgb(191, 219, 254))',
  'conic-gradient(rgb(14, 165, 233), rgb(3, 105, 161), rgb(237, 233, 254))',
  'linear-gradient(to right, rgb(254, 242, 242), rgb(255, 251, 235), rgb(30, 64, 175))',
  'radial-gradient(at right center, rgb(243, 232, 255), rgb(224, 231, 255), rgb(196, 181, 253))',
  'conic-gradient(at left center, rgb(6, 95, 70), rgb(255, 237, 213), rgb(194, 65, 12))',
  'conic-gradient(at left bottom, rgb(209, 250, 229), rgb(250, 204, 21), rgb(3, 105, 161))',
  'radial-gradient(at center bottom, rgb(6, 182, 212), rgb(199, 210, 254), rgb(30, 58, 138))',
  'conic-gradient(at right top, rgb(254, 205, 211), rgb(167, 139, 250), rgb(224, 242, 254))',
  'radial-gradient(at right bottom, rgb(212, 212, 212), rgb(94, 234, 212), rgb(244, 244, 245))',
];

export function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}