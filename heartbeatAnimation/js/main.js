// JavaScript Document

(function() {
	"use strict";
	console.log("SEAF Fired");

//variables

	var circles = ".heart";
	

var tl = new TimelineMax();


tl.add(TweenMax.staggerFrom(circles, 2, { scale: 0.5, opacity:0, delay:0.1, ease:Elastic.easeOut}, 0.2));
	tl.add(TweenMax.staggerTo(circles, 2, { scale: 0.5, opacity:0, delay:0.1, ease:Elastic.easeIn}, 0.2));

// tl.add(TweenMax.staggerFrom(squares, 2, { scale: 1.5, opacity:0, delay:0.1, ease: Back.easeOut, rotation:180}, 0.2));
// 	tl.add(TweenMax.staggerTo(squares, 2, { scale: 1.5, opacity:0, delay:0.1, ease: Back.easeIn, rotation:180}, 0.2));

// tl.add(TweenMax.staggerFrom(pentagon, 2, { scale: 1.5, opacity:0, delay:0.1, ease: Elastic.easeOut, rotation:90}, 0.2));
// 	tl.add(TweenMax.staggerTo(pentagon, 2, { scale: 1.5, opacity:0, delay:0.1, ease: Bounce.easeOut }, 0.2));

// tl.add(TweenMax.staggerFrom(title, 2, { scale: 1.5, opacity:0, delay:0.4, ease: Elastic.easeOut }, 2));
	
// tl.add(TweenMax.staggerFrom(subText, 2, { scale: 1.5, opacity:0, delay:0.4, ease: Power0.easeONone }, 2));


})();