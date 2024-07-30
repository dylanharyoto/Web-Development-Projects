var p1 = Math.floor(Math.random() * 6) + 1;
var p2 = Math.floor(Math.random() * 6) + 1;
var dp1 = "./images/dice" + p1 + ".png";
var dp2 = "./images/dice" + p2 + ".png";

document.querySelector(".img1").setAttribute("src", dp1);
document.querySelector(".img2").setAttribute("src", dp2);