// Documentation for Effects:
// http://api.jqueryui.com/category/effects/
var Effects = {
   'none': {},
   'blind': { direction: "up" },
   'blind2': { direction: "down" },
   'blind3': { direction: "left" },
   'blind4': { direction: "right" },
   'blind5': { direction: "vertical" },
   'blind6': { direction: "horizontal" },
   'bounce': {},
   'clip': { direction: "vertical" },
   'clip2': { direction: "horizontal" },
   'drop': { direction: "left" },
   'drop2': { direction: "right" },
   'drop3': { direction: "up" },
   'drop4': { direction: "down" },
   'explode': { pieces: 9 },
   'explode2': { pieces: 4 },
   'explode3': { pieces: 16 },
   'fade': {}, // new
   'fold': { size: 200 },
   'fold2': { size: 200, horizFirst: true },
   'highlight': { color: "red" }, // only works well for images smaller than the viewport
/*
   'highlight3': { color: "yellow" },
   'highlight4': { color: "green" },
   'highlight5': { color: "blue" },
   'highlight6': { color: "violet" },
   'highlight7': { color: "black" },
*/
   'puff': { percent: 150 },
   'pulsate': { times: 3 },
   'scale': { percent: 0 }, // default center
   'scale2': { percent: 0, origin: ["bottom", "right"] },
   'scale3': { percent: 0, origin: ["bottom", "left"] },
   'scale4': { percent: 0, origin: ["top", "right"] },
   'scale5': { percent: 0, origin: ["top", "left"] },
   'shake': { times: 5 },
   'shake2': { direction: "up", times: 5 },
   //'size': { to: { width: 0, height: 200 }, origin: ["bottom", "right"], scale: "content" },
   'slide': { direction: "left" },
   'slide2': { direction: "up" },
   'slide3': { direction: "down" },
   'slide4': { direction: "right" },

   '-': []
};
