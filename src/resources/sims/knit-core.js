// The knit's geometry: the yarn's centre line through a row of loops for the
// jersey, garter, rib and seed patterns, its Frenet frame and the fibres wound
// round it, the rows of a fabric, and the turns that join them into one path.
// P: l, a, h, d (the curve), w (the row spacing), R (the yarn's radius), omega
// (the fibres' winding), S (points per loop), nFibers, nRows, nLoops, knit ('J',
// 'G', 'R' or 'S') and connected. Shared by the viewer knit-viewer.html and by
// the drawing behind the homepage title, backgrounds/knit.js; both load this
// file, which defines window.KnitGeometry.
window.KnitGeometry = (function () {
  "use strict";
const TAU = 2*Math.PI;
const V = (x,y,z)=>({x,y,z});
function cross(u,v){return {x:u.y*v.z-u.z*v.y, y:u.z*v.x-u.x*v.z, z:u.x*v.y-u.y*v.x};}
function linspace(start,stop,num){
  if(num<1) return []; if(num===1) return [start];
  const step=(stop-start)/(num-1), o=[];
  for(let i=0;i<num;i++) o.push(start+i*step);
  return o;
}

function knitType(knit,row,loop){
  if(knit==='J') return 'P';
  if(knit==='G') return (row%2===0)?'P':'K';
  if(knit==='R') return (loop%2===0)?'P':'K';
  if(knit==='S'){
    if(row%2===0) return (loop%2===0)?'P':'K';
    return (loop%2===0)?'K':'P';
  }
}

function yarnCurve(t,l,a,h,d,knit,label){
  const x = l/TAU*(t + a*Math.sin(2*t));
  const y = h*Math.cos(t);
  let z = 0;
  if(knit==='J')      z = (label==='K') ? d*(-Math.cos(2*t))   : d*( Math.cos(2*t));
  else if(knit==='R') z = (label==='K') ? d*(-Math.cos(2*t)+1) : d*( Math.cos(2*t)-1);
  else if(knit==='G') z = (label==='K') ? d*(-Math.cos(t))     : d*( Math.cos(t));
  else if(knit==='S') z = (label==='K') ? -d*(Math.cos(3*t)-Math.cos(t))
                                        :  d*(Math.cos(3*t)-Math.cos(t));
  return V(x,y,z);
}

// Unit tangent e1 and normal e2, derived from the scaled curve.
function frenetFrame(t,l,a,h,d,knit,label){
  const C = l/TAU;
  const e1={x:0,y:0,z:0}, e2={x:0,y:0,z:0};
  if (knit === "J") {
    if (label === "K") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = 2*d*Math.sin(2*t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e2.x = C*(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.y = h*(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.z = 2*d*(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
    } else if (label === "P") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = -2*d*Math.sin(2*t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e2.x = C*(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.y = h*(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.z = 2*d*(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
    }
  } else if (knit === "R") {
    if (label === "K") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = 2*d*Math.sin(2*t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e2.x = C*(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.y = h*(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.z = 2*d*(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
    } else if (label === "P") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = -2*d*Math.sin(2*t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e2.x = C*(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.y = h*(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.z = 2*d*(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + 4*Math.pow(d, 2)*Math.pow(-2*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(2*t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + 4*Math.pow(d, 2)*Math.pow(Math.sin(2*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - 8*Math.pow(d, 2)*Math.sin(2*t)*Math.cos(2*t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
    }
  } else if (knit === "G") {
    if (label === "K") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = d*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e2.x = C*(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + Math.pow(d, 2)*Math.pow((Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.y = h*(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + Math.pow(d, 2)*Math.pow((Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.z = d*((Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + Math.pow(d, 2)*Math.pow((Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) + (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
    } else if (label === "P") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = -d*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e2.x = C*(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + Math.pow(d, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.y = h*(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + Math.pow(d, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
      e2.z = d*(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t))/Math.sqrt(Math.pow(C, 2)*Math.pow(-4*a*(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.sin(2*t) + (2*a*Math.cos(2*t) + 1)*(4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t)), 2) + Math.pow(d, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(-(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2))*Math.cos(t) - (4*Math.pow(C, 2)*a*(2*a*Math.cos(2*t) + 1)*Math.sin(2*t) - Math.pow(d, 2)*Math.sin(t)*Math.cos(t) - Math.pow(h, 2)*Math.sin(t)*Math.cos(t))*Math.sin(t), 2));
    }
  } else if (knit === "S") {
    if (label === "K") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t) - 3*Math.sin(3*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t) - 3*Math.sin(3*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = -d*(Math.sin(t) - 3*Math.sin(3*t))/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t) - 3*Math.sin(3*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      // principal normal undefined here at t = pi/2 and 3pi/2;
      // use the world z axis projected off the tangent, as the script does
      e2.y = -(e1.y*e1.z)/(e1.y*e1.y + e1.x*e1.x);
      e2.x = (-e1.y*e2.y - e1.z)/e1.x;
      e2.z = 1;
      const u = Math.sqrt(e2.x*e2.x + e2.y*e2.y + e2.z*e2.z);
      e2.x /= u; e2.y /= u; e2.z /= u;
    } else if (label === "P") {
      e1.x = C*(2*a*Math.cos(2*t) + 1)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t) - 3*Math.sin(3*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.y = -h*Math.sin(t)/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t) - 3*Math.sin(3*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      e1.z = d*(Math.sin(t) - 3*Math.sin(3*t))/Math.sqrt(Math.pow(C, 2)*Math.pow(2*a*Math.cos(2*t) + 1, 2) + Math.pow(d, 2)*Math.pow(Math.sin(t) - 3*Math.sin(3*t), 2) + Math.pow(h, 2)*Math.pow(Math.sin(t), 2));
      // principal normal undefined here at t = pi/2 and 3pi/2;
      // use the world z axis projected off the tangent, as the script does
      e2.y = -(e1.y*e1.z)/(e1.y*e1.y + e1.x*e1.x);
      e2.x = (-e1.y*e2.y - e1.z)/e1.x;
      e2.z = 1;
      const u = Math.sqrt(e2.x*e2.x + e2.y*e2.y + e2.z*e2.z);
      e2.x /= u; e2.y /= u; e2.z /= u;
    }
  }
  const e3 = cross(e1,e2);
  return [e1,e2,e3];
}

function fiberTheta(t,omega,phi,knit,label){
  if(knit==='J') return phi + t*omega - 2*Math.cos(t);
  if(knit==='R') return (label==='K') ? phi + t*omega + 2*Math.cos(t) + Math.PI
                                      : phi + t*omega - 2*Math.cos(t);
  if(knit==='G'){
    const m = t%TAU;
    if(m > Math.PI/2 && m <= 3*Math.PI/2) phi += Math.PI;
    return phi + t*omega;
  }
  return phi + t*omega;                       // seed
}

function fiberPoint(t,P,phi,label){
  const g = yarnCurve(t,P.l,P.a,P.h,P.d,P.knit,label);
  const [e1,e2,e3] = frenetFrame(t,P.l,P.a,P.h,P.d,P.knit,label);
  const th = fiberTheta(t,P.omega,phi,P.knit,label);
  const c = Math.cos(th), s = Math.sin(th);
  return V(g.x + P.R*(c*e2.x + s*e3.x),
           g.y + P.R*(c*e2.y + s*e3.y),
           g.z + P.R*(c*e2.z + s*e3.z));
}

const mid = (p,q)=>V((p.x+q.x)/2,(p.y+q.y)/2,(p.z+q.z)/2);
const add = (p,o)=>V(p.x+o[0],p.y+o[1],p.z+o[2]);

// rows of sampled points, then the script's own turn construction
function assemble(rows,sP,eP,offS,offE,connected,turnsOut){
  const n = rows.length;
  const sMP=[], eMP=[];
  for(let i=0;i<n-1;i++){
    sMP.push(add(mid(sP[i],sP[i+1]),offS));
    eMP.push(add(mid(eP[i],eP[i+1]),offE));
  }
  if(!connected) return rows;
  const out=[];
  for(let row=0;row<n;row++){
    if(row%2===0){
      for(const p of rows[row]) out.push(p);
      if(row<n-1){ out.push(eMP[row]); if(turnsOut) turnsOut.push(eMP[row]); }
    } else {
      for(let i=rows[row].length-1;i>=0;i--) out.push(rows[row][i]);
      if(row<n-1){ out.push(sMP[row]); if(turnsOut) turnsOut.push(sMP[row]); }
    }
  }
  return [out];
}

function buildYarn(P){
  const dt = TAU/P.S, rows=[], sP=[], eP=[];
  for(let row=0; row<P.nRows; row++){
    const y0 = P.w*row, pts=[];
    for(let loop=0; loop<P.nLoops; loop++){
      const t0 = TAU*loop, label = knitType(P.knit,row,loop);
      for(let s=0; s<P.S; s++){
        const t = t0 + dt*s;
        const g = yarnCurve(t,P.l,P.a,P.h,P.d,P.knit,label);
        pts.push(V(g.x, g.y+y0, g.z));
      }
    }
    rows.push(pts); sP.push(pts[0]); eP.push(pts[pts.length-1]);
  }
  return assemble(rows,sP,eP,[-P.l/4,0,0],[P.l/4,0,0],P.connected,null);
}

function buildFibers(P,turnsOut){
  const dt = TAU/P.S, dphi = TAU/P.nFibers;
  let zDir = linspace(P.l/4,-P.l/4,P.nFibers);
  if(P.nFibers===4) zDir = [P.l/8, P.l/16, -P.l/8, 0];
  const out=[];
  for(let f=0; f<P.nFibers; f++){
    const phi = dphi*f, rows=[], sP=[], eP=[];
    for(let row=0; row<P.nRows; row++){
      const y0 = P.w*row, pts=[];
      for(let loop=0; loop<P.nLoops; loop++){
        const t0 = TAU*loop, label = knitType(P.knit,row,loop);
        for(let s=0; s<P.S; s++){
          const t = t0 + dt*s;
          const e = fiberPoint(t,P,phi,label);
          pts.push(V(e.x, e.y+y0, e.z));
        }
      }
      rows.push(pts); sP.push(pts[0]); eP.push(pts[pts.length-1]);
    }
    const curves = assemble(rows,sP,eP,[-P.l/4,0,zDir[f]],[P.l/4,0,zDir[f]],
                            P.connected, turnsOut);
    for(const c of curves) out.push(c);
  }
  return out;
}

  return { TAU, V, cross, linspace, knitType, yarnCurve, frenetFrame, fiberTheta, fiberPoint, buildYarn, buildFibers };
})();
