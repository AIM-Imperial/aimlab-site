// The weave's geometry, shared by the viewer weave-viewer.html and by the drawing
// behind the homepage title, backgrounds/weave.js; both load this file, which
// defines window.WeaveGeometry. Lengths are in wavelengths (LAM = 1); the lattice's
// vertices are LV = LAM/2 apart, the first at the origin. The 3D volumetric weave has
// three families of yarns, the weft, warp and wup along x, y and z (P: cfg3, the
// configuration at the origin; nx, ny, nz, the cells each way; a, the offset; ratio,
// the amplitude over the offset; hand and handSeed, the yarns' handedness); the 2D
// plain weave has the weft and the warp (P: cfg2, nx, ny, a). A yarn is {i, p, q, ...,
// pts}: its family, its lattice line, and SAMPLES points per wavelength along it.
window.WeaveGeometry = (function () {
  "use strict";
const TAU = 2*Math.PI;
const LAM = 1, LV = LAM/2;                       // wavelength and vertex spacing
const SAMPLES = 64;                              // points per wavelength along each yarn
const V = (x,y,z)=>({x,y,z});
const CFG3 = {A:[1,1,1], B:[1,1,-1], C:[-1,1,-1], D:[-1,1,1]};
for(const k of 'ABCD') CFG3[k+'b'] = CFG3[k].map(v=>-v);           // the bar configurations: every sign reversed
const NAMES = ['weft','warp','wup'];
const A_C = Math.SQRT2/16;                        // collision amplitude of the helical family
const CFG2 = {weft:1, warp:-1};                   // 2D: c at the origin, 1 weft over warp, -1 warp over weft

/* -------------------------------------------- geometry of the 3D volumetric weave */

function crossMatrix(c){ const [x,y,z]=c; return [[0,y,z],[x,0,-z],[-x,-y,0]]; }
function transverse(i){ return i===0?[1,2] : i===1?[0,2] : [0,1]; }   // (j, j') in x<y<z order

// Phases of the yarn along i at a vertex of configuration c, for amplitude A = ratio*a.
// A cos(Phi) = a c at the vertex; the sign pattern gives an ellipse rather than a planar
// yarn, and sigma = +1 reproduces the phases of Section 2.3 (sigma = -1 is the mirror image).
function phasesFor(i,c,ratio,sigma){
  const C = crossMatrix(c), [j,jp] = transverse(i);
  const phi = Math.acos(Math.min(1, 1/ratio));                  // arccos(a/A)
  const Pj  = C[i][j]  > 0 ? phi : Math.PI - phi;               // arccos(a c_ij / A)
  const Pjp = C[i][jp] > 0 ? phi : Math.PI - phi;
  return [sigma*Pj, -sigma*C[i][j]*C[i][jp]*Pjp];
}

// +1 right-handed, -1 left-handed, 0 planar (in-phase).
function handed(i,Ph){
  const s = Math.sin(Ph[0]-Ph[1]) * (i===1 ? -1 : 1);           // (y; x, z) is the anti-cyclic order
  return s > 1e-9 ? 1 : s < -1e-9 ? -1 : 0;
}

function pointOn3(y,t,A){
  const [j,jp] = transverse(y.i), th = TAU*t/LAM, X=[0,0,0];
  X[y.i] = t;
  X[j]  = A*Math.cos(th+y.Ph[0]) + y.p*LV;
  X[jp] = A*Math.cos(th+y.Ph[1]) + y.q*LV;
  return V(X[0],X[1],X[2]);
}

// Handedness asked of yarn (i,p,q): +1 right, -1 left. "Alt" alternates with the
// parity of the yarn's lattice line, so the yarns at the origin are right-handed;
// "Random" draws each yarn from a seeded hash, redrawn on each click of the button.
// The in-phase family is planar whatever is asked.
function coin(i,p,q,seed){
  let h = Math.imul(i+1,0x9E3779B1) ^ Math.imul(p+7,0x85EBCA77) ^ Math.imul(q+13,0xC2B2AE3D) ^ seed;
  h ^= h>>>15; h = Math.imul(h,0x2C1B3C6D); h ^= h>>>12; h = Math.imul(h,0x297A2D39); h ^= h>>>15;
  return (h & 1) === 1;
}
function wantHand(P,i,p,q){
  if(P.hand==='L') return -1;
  if(P.hand==='alt') return (p+q)%2===0 ? 1 : -1;
  if(P.hand==='rand') return coin(i,p,q,P.handSeed) ? 1 : -1;
  return 1;
}

function buildYarns3(P){
  const c0 = CFG3[P.cfg3], n=[P.nx,P.ny,P.nz], a=P.a, A=P.ratio*a, yarns=[];
  for(let i=0;i<3;i++){
    const [j,jp] = transverse(i);
    for(let p=0;p<2*n[j];p++) for(let q=0;q<2*n[jp];q++){
      const want = wantHand(P,i,p,q);
      const c = ((p+q)%2) ? c0.map(v=>-v) : c0;                   // configuration at the yarn's t = 0 vertex
      let Ph = phasesFor(i,c,P.ratio,1);
      if(want && handed(i,Ph)===-want) Ph = phasesFor(i,c,P.ratio,-1);
      const y = {i,p,q,Ph,hand:handed(i,Ph)};
      const t0 = -LAM/4, t1 = (2*n[i]-1)*LV + LAM/4;             // lambda/4 past the end vertices (half a cell: lambda/4 either side of its one vertex)
      const m = Math.round(SAMPLES*(t1-t0)/LAM) + 1, pts = new Array(m);
      for(let s=0;s<m;s++) pts[s] = pointOn3(y, t0+(t1-t0)*s/(m-1), A);
      y.pts = pts; yarns.push(y);
    }
  }
  return yarns;
}

// Interlacing point of every pair of yarns at every vertex, and the sign of their separation.
function analyse(P,yarns){
  const key = (i,p,q)=>i+':'+p+':'+q, map = new Map();
  for(const y of yarns) map.set(key(y.i,y.p,y.q), y);
  const c0 = CFG3[P.cfg3], n=[P.nx,P.ny,P.nz], a=P.a, A=P.ratio*a;
  const res = {nPairs:0, inverted:[], minSep:Infinity, worst:null};
  for(let u=0;u<2*n[0];u++) for(let v=0;v<2*n[1];v++) for(let w=0;w<2*n[2];w++){
    const idx=[u,v,w], c = ((u+v+w)%2) ? c0.map(x=>-x) : c0, C = crossMatrix(c);
    const Y = [0,1,2].map(i=>{ const [j,jp]=transverse(i); return map.get(key(i,idx[j],idx[jp])); });
    // phase of yarn y's oscillation along direction d, relative to this vertex
    const phase = (y,d)=>{ const [j]=transverse(y.i); return (d===j ? y.Ph[0] : y.Ph[1]) + idx[y.i]*Math.PI; };
    for(const [i,k] of [[0,1],[0,2],[1,2]]){
      const m = 3-i-k;
      const al = phase(Y[k],i), be = phase(Y[i],k), gi = phase(Y[i],m), gk = phase(Y[k],m);
      // same coordinate along i and along k: s_i = A cos(2 pi s_k + al), s_k = A cos(2 pi s_i + be)
      let si = a*C[k][i], sk = a*C[i][k];
      for(let it=0; it<60; it++){
        const f1 = si - A*Math.cos(TAU*sk+al), f2 = sk - A*Math.cos(TAU*si+be);
        const J12 = A*Math.sin(TAU*sk+al)*TAU, J21 = A*Math.sin(TAU*si+be)*TAU;
        const det = 1 - J12*J21;
        const dsi = (f1 - J12*f2)/det, dsk = (f2 - J21*f1)/det;
        si -= dsi; sk -= dsk;
        if(Math.abs(dsi)+Math.abs(dsk) < 1e-12) break;
      }
      const delta = A*Math.cos(TAU*si+gi) - A*Math.cos(TAU*sk+gk);   // along m, yarn i minus yarn k
      const sep = delta*C[i][m];                                      // positive when as prescribed
      res.nPairs++;
      if(sep < res.minSep){ res.minSep = sep; res.worst = [NAMES[i],NAMES[k]]; }
      if(sep < 0){
        const Pi = pointOn3(Y[i], si+idx[i]*LV, A), Pk = pointOn3(Y[k], sk+idx[k]*LV, A);
        res.inverted.push(Object.assign(V((Pi.x+Pk.x)/2,(Pi.y+Pk.y)/2,(Pi.z+Pk.z)/2), {pair:[i,k], vtx:idx}));
      }
    }
  }
  return res;
}

// Order of the lattice lines of one family for a single continuous path: unit steps
// throughout; an even grid in 2x2 blocks, which uses the two transverse directions in
// nearly equal numbers. An odd column or row (from half a cell) is run first, and the
// rest of the grid continues from the corner next to its end.
function orderPath(Pn,Qn){
  const path=[];
  let oP=0, oQ=0, sP=1, sQ=1;                                     // corner and directions of what is left
  const at = (p,q)=>path.push([oP+sP*p, oQ+sQ*q]);
  while(Pn && Qn){
    if(Pn%2){ for(let q=0;q<Qn;q++) at(0,q); oP+=sP; oQ+=sQ*(Qn-1); sQ=-sQ; Pn--; }
    else if(Qn%2){ for(let p=0;p<Pn;p++) at(p,0); oP+=sP*(Pn-1); oQ+=sQ; sP=-sP; Qn--; }
    else { blocks(Pn,Qn,at); break; }
  }
  return path;
}
function blocks(Pn,Qn,at){
  for(let r=0;r<Qn/2;r++){
    const q0=2*r, q1=2*r+1;
    if(r%2===0){
      for(let b=0;b<Pn/2;b++){
        const p0=2*b, p1=2*b+1;
        if(b<Pn/2-1){ at(p0,q0); at(p0,q1); at(p1,q1); at(p1,q0); }
        else        { at(p0,q0); at(p1,q0); at(p1,q1); at(p0,q1); }
      }
    } else {
      for(let b=Pn/2-1;b>=0;b--){
        const p0=2*b, p1=2*b+1;
        if(b===Pn/2-1){ at(p0,q0); at(p1,q0); at(p1,q1); at(p0,q1); }
        else          { at(p1,q1); at(p1,q0); at(p0,q0); at(p0,q1); }
      }
    }
  }
}

const sub=(p,q)=>V(p.x-q.x,p.y-q.y,p.z-q.z), len=p=>Math.hypot(p.x,p.y,p.z);
const unit=p=>{const l=len(p)||1; return V(p.x/l,p.y/l,p.z/l);};
const madd=(p,d,h)=>V(p.x+d.x*h,p.y+d.y*h,p.z+d.z*h);
// The turn between two yarns: the points strictly between the ends of the cubic Bezier
// curve p0 p1 p2 p3, at 24 equal steps of its parameter.
function blend(p0,p1,p2,p3){
  const out=[];
  for(let c=1;c<24;c++){
    const u=c/24, v=1-u, k0=v*v*v, k1=3*v*v*u, k2=3*v*u*u, k3=u*u*u;
    out.push(V(k0*p0.x+k1*p1.x+k2*p2.x+k3*p3.x, k0*p0.y+k1*p1.y+k2*p2.y+k3*p3.y, k0*p0.z+k1*p1.z+k2*p2.z+k3*p3.z));
  }
  return out;
}

// Joins the yarns of one family end to end with cubic blends tangent to both ends.
function serpentine3(fam,P){
  const [j,jp] = transverse(fam[0].i), Pn=2*[P.nx,P.ny,P.nz][j], Qn=2*[P.nx,P.ny,P.nz][jp];
  const byPQ = new Map(); for(const y of fam) byPQ.set(y.p+':'+y.q, y);
  const out=[];
  orderPath(Pn,Qn).forEach(([p,q],k)=>{
    let pts = byPQ.get(p+':'+q).pts.slice();
    if(k%2===1) pts.reverse();
    if(out.length){
      const Aend=out[out.length-1], A2=out[out.length-2], B=pts[0], B2=pts[1];
      const tA=unit(sub(Aend,A2)), tB=unit(sub(B,B2)), h=0.6*len(sub(B,Aend));
      for(const c of blend(Aend, madd(Aend,tA,h), madd(B,tB,h), B)) out.push(c);
    }
    for(const p of pts) out.push(p);
  });
  return out;
}

/* ------------------------------------------------ geometry of the 2D plain weave */

// Configuration c = +-1 of vertex (u, v): c0 at the origin, alternating like a checkerboard.
const cAt = (c0,u,v)=> ((u+v)%2) ? -c0 : c0;

// Yarn i (0 weft along x, 1 warp along y) on lattice line p, at p*LV across: it passes each
// vertex a c above the plane (weft) or a c below it (warp), so with s its offset sign at
// its first vertex, z = s a cos(2 pi t / lambda).
function pointOn2(y,t,a){
  const X=[0,0,0];
  X[y.i] = t; X[1-y.i] = y.p*LV; X[2] = y.s*a*Math.cos(TAU*t/LAM);
  return V(X[0],X[1],X[2]);
}
// Tangent of a yarn at parameter t (the direction it travels in there).
function tangentOn2(y,t,a){
  const T=[0,0,0];
  T[y.i] = 1; T[2] = -y.s*a*TAU/LAM*Math.sin(TAU*t/LAM);
  return unit(V(T[0],T[1],T[2]));
}

function buildYarns2(P){
  const c0 = CFG2[P.cfg2], n=[P.nx,P.ny], yarns=[];
  for(let i=0;i<2;i++){
    for(let p=0;p<2*n[1-i];p++){
      const c = i===0 ? cAt(c0,0,p) : cAt(c0,p,0);                // configuration at the yarn's t = 0 vertex
      const y = {i, p, s: i===0 ? c : -c};
      const t0 = -LAM/4, t1 = (2*n[i]-1)*LV + LAM/4;             // lambda/4 past the end vertices (half a cell: lambda/4 either side of its one vertex)
      const m = Math.round(SAMPLES*(t1-t0)/LAM) + 1, pts = new Array(m);
      for(let k=0;k<m;k++) pts[k] = pointOn2(y, t0+(t1-t0)*k/(m-1), P.a);
      y.pts = pts; yarns.push(y);
    }
  }
  return yarns;
}

// Joins the yarns of one family end to end, in order across the weave and every other
// one reversed, with cubic blends tangent to both ends: the turns at the edges.
function serpentine2(fam){
  const out=[];
  fam.slice().sort((A,B)=>A.p-B.p).forEach((y,k)=>{
    let pts = y.pts.slice();
    if(k%2===1) pts.reverse();
    if(out.length){
      const Aend=out[out.length-1], A2=out[out.length-2], B=pts[0], B2=pts[1];
      const tA=unit(sub(Aend,A2)), tB=unit(sub(B,B2)), h=0.6*len(sub(B,Aend));
      for(const c of blend(Aend, madd(Aend,tA,h), madd(B,tB,h), B)) out.push(c);
    }
    for(const p of pts) out.push(p);
  });
  return out;
}

  return { TAU, LAM, LV, SAMPLES, V, CFG3, CFG2, NAMES, A_C, crossMatrix, transverse, phasesFor, handed, pointOn3, buildYarns3, analyse, serpentine3, unit, cAt, pointOn2, tangentOn2, buildYarns2, serpentine2 };
})();
