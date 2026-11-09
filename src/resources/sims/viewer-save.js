// Save to file for the three.js viewers (knit, weave, woven lattice), shared by all
// of them: the view as a PNG, and the curves on show as a 3D model, OBJ or STL. Each
// viewer calls setupSave once with its scene and camera, a file-name stem, and (for
// the model) how to list its curves and scale them to millimetres; the buttons and
// fields are the viewer's own, by id: saveBtn, pngMM and pngInfo for the picture,
// objBtn, stlBtn and modelInfo for the model.
//
// The picture: the largest square of the view beside the panel, centred where the
// model sits, drawn again at the chosen width and 300 dpi on a transparent
// background, with the resolution recorded in the file. A second, temporary
// renderer draws the same scene with the same camera, so colours, antialiasing and
// sections match the screen; lines keep their width relative to the picture.
//
// The model: every curve a closed tube (flat caps at its ends) of its radius, drawn
// more finely round than on screen and scaled so that the viewer's unit of length is
// the given number of millimetres, since neither format records units. Each tube is
// one closed solid: the cap rings, which repeat the tube's end points so the caps
// shade flat on screen, are merged with them, and the shading normals are dropped.
// OBJ keeps each curve as a named object; STL is one binary mesh.
import * as THREE from 'three';

const $ = id => document.getElementById(id);
const DPI = 300;

// A tube closed at both ends by flat caps: each cap is a fan from the end point to the
// tube's own end ring, so the seam is exact, wound and lit to face out along the tangent.
export function cappedTube(curve, segs, radius, radial){
  const tube = new THREE.TubeGeometry(curve, segs, radius, radial, false);
  const tp = tube.attributes.position.array, tn = tube.attributes.normal.array, ti = tube.index.array;
  const ring = radial+1, nv = tp.length/3, total = nv + 2*(1+ring);
  const pos = new Float32Array(3*total), nor = new Float32Array(3*total), idx = new Uint32Array(ti.length + 6*radial);
  pos.set(tp); nor.set(tn); idx.set(ti);
  let v = nv, f = ti.length;
  for(const end of [0,1]){
    const c = curve.getPointAt(end), n = curve.getTangentAt(end);
    if(!end) n.negate();
    const put = (x,y,z)=>{ pos.set([x,y,z], 3*v); nor.set([n.x,n.y,n.z], 3*v); v++; };
    const base = v, r0 = end ? segs*ring : 0;
    put(c.x, c.y, c.z);
    for(let j=0;j<ring;j++) put(tp[3*(r0+j)], tp[3*(r0+j)+1], tp[3*(r0+j)+2]);
    const e1 = new THREE.Vector3().fromArray(pos, 3*(base+1)).sub(c), e2 = new THREE.Vector3().fromArray(pos, 3*(base+2)).sub(c);
    const flip = e1.cross(e2).dot(n) < 0;
    for(let j=1;j<=radial;j++){ idx[f++] = base; idx[f++] = base + (flip ? j+1 : j); idx[f++] = base + (flip ? j : j+1); }
  }
  tube.dispose();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nor,3));
  geo.setIndex(new THREE.BufferAttribute(idx,1));
  return geo;
}

// Marks a PNG with its resolution: a pHYs chunk (pixels per metre) after IHDR, in place
// of any the encoder wrote.
async function withDpi(blob, dpi){
  const src = new Uint8Array(await blob.arrayBuffer()), ppm = Math.round(dpi/0.0254);
  const chunk = new Uint8Array(21), dv = new DataView(chunk.buffer);
  dv.setUint32(0, 9); chunk.set([0x70,0x48,0x59,0x73], 4);              // length 9, "pHYs"
  dv.setUint32(8, ppm); dv.setUint32(12, ppm); chunk[16] = 1;           // x, y; unit: metre
  dv.setUint32(17, crc32(chunk.subarray(4, 17)));
  const parts = [src.subarray(0, 8)];
  for(let p = 8; p < src.length; ){
    const len = new DataView(src.buffer, src.byteOffset + p, 4).getUint32(0), end = p + 12 + len;
    const type = String.fromCharCode(...src.subarray(p+4, p+8));
    if(type !== 'pHYs') parts.push(src.subarray(p, end));
    if(type === 'IHDR') parts.push(chunk);
    p = end;
  }
  return new Blob(parts, {type:'image/png'});
}
function crc32(bytes){
  let crc = 0xFFFFFFFF;
  for(const b of bytes){ let c = (crc ^ b) & 0xFF; for(let k=0;k<8;k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crc = (crc >>> 8) ^ c; }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function download(blob, name){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}

// scene, camera (a function: the camera in use), stem (a function: the file name without
// its extension), and for the model: curves (a function: [{pts, radius, name}] of the curves
// on show, pts as {x, y, z}), unit (a function: millimetres per unit of length), input (the
// field that sets it), suffix (a function: what the file name adds, e.g. "_lambda-20mm"),
// note (a function: the scale, for the OBJ's header), describe (size => the text of the
// info line, size being "X × Y × Z mm") and empty (the info line when nothing is on show).
export function setupSave({scene, camera, stem, model}){
  const view = $('view'), panel = $('panel'), errBox = $('err'), overlay = $('overlay');
  const fail = (what, err)=>{ errBox.style.display='block'; errBox.textContent = what + ' failed: ' + err.message; console.error(err); };
  const busy = async (btn, job)=>{ btn.disabled = true; try { await job(); } finally { btn.disabled = false; } };

  // ---- the picture
  const pngMM = $('pngMM'), pngInfo = $('pngInfo');
  const pngPx = ()=> Math.round(Math.min(300, Math.max(20, +pngMM.value || 100))/25.4*DPI);
  const showPngInfo = ()=>{ const S = pngPx(); pngInfo.textContent = `Square PNG, ${S} × ${S} px at ${DPI} dpi, transparent background.`; };
  pngMM.addEventListener('input', showPngInfo); showPngInfo();
  async function makePNG(){
    const S = pngPx(), w = view.clientWidth, h = view.clientHeight, cam = camera();
    const vr = view.getBoundingClientRect(), pr = panel.getBoundingClientRect(), mobile = innerWidth <= 720;
    const freeW = mobile ? w : vr.right - pr.right;
    const freeH = mobile && panel.classList.contains('open') ? pr.top - vr.top : h;
    const s = Math.max(1, Math.min(freeW, freeH));
    const c = cam.clone();
    c.setViewOffset(w, h, (w-s)/2, (h-s)/2, s, s);             // the square round the model's centre
    c.updateMatrixWorld();
    const exp = new THREE.WebGLRenderer({antialias:true, alpha:true, preserveDrawingBuffer:true});
    exp.setPixelRatio(1); exp.setSize(S, S, false); exp.setClearColor(0x000000, 0);
    const lineMats = []; scene.traverse(o=>{ if(o.material && o.material.isLineMaterial) lineMats.push(o.material); });
    lineMats.forEach(m=>m.resolution.set(s, s));
    try { exp.render(scene, c); }
    finally { lineMats.forEach(m=>m.resolution.set(w, h)); }
    const blob = await new Promise(r=>exp.domElement.toBlob(r, 'image/png'));
    exp.dispose(); exp.forceContextLoss();
    return withDpi(blob, DPI);
  }
  $('saveBtn').addEventListener('click', e=>busy(e.currentTarget, async ()=>{
    try { download(await makePNG(), stem() + '.png'); } catch(err){ fail('Save', err); }
  }));
  if(!model) return { makePNG, update(){} };

  // ---- the model
  const modelInfo = $('modelInfo');
  // The size the model will have: the tubes' extent, from each centreline point and the circle
  // of the tube's radius across it there, which reaches radius*sqrt(1 - t_k^2) along axis k
  // (t the unit tangent); the flat end caps add nothing along the tube.
  function sizeMM(curves){
    const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity], s = model.unit();
    for(const {pts, radius} of curves) for(let j=0; j<pts.length; j++){
      const p = pts[j], a = pts[Math.max(0, j-1)], b = pts[Math.min(pts.length-1, j+1)];
      const t = [b.x-a.x, b.y-a.y, b.z-a.z], L = Math.hypot(...t) || 1, c = [p.x, p.y, p.z];
      for(let k=0; k<3; k++){ const e = radius*Math.sqrt(Math.max(0, 1 - (t[k]/L)**2)); lo[k] = Math.min(lo[k], c[k]-e); hi[k] = Math.max(hi[k], c[k]+e); }
    }
    return [0, 1, 2].map(k=>((hi[k]-lo[k])*s).toFixed(1)).join(' × ') + ' mm';
  }
  function update(){
    const curves = model.curves();
    modelInfo.textContent = curves.length ? model.describe(sizeMM(curves)) : model.empty;
  }
  model.input.addEventListener('input', update);
  const toVec = pts => pts.map(p=>new THREE.Vector3(p.x, p.y, p.z));
  function modelGroup(mergeVertices){
    const g = new THREE.Group(), s = model.unit();
    for(const c of model.curves()){
      const curve = new THREE.CatmullRomCurve3(toVec(c.pts), false, 'centripetal', 0.5);
      const tube = cappedTube(curve, Math.min(8000, Math.max(64, c.pts.length)), c.radius, 16);
      tube.scale(s, s, s); tube.deleteAttribute('normal');
      const geo = mergeVertices(tube, 1e-6*s); tube.dispose();
      const mesh = new THREE.Mesh(geo); mesh.name = c.name; g.add(mesh);
    }
    g.updateMatrixWorld(true);
    return g;
  }
  async function saveModel(fmt){
    if(!model.curves().length){ modelInfo.textContent = model.empty; return; }
    const {mergeVertices} = await import('three/addons/utils/BufferGeometryUtils.js');
    const g = modelGroup(mergeVertices);
    try{
      let blob;
      if(fmt === 'obj'){
        const {OBJExporter} = await import('three/addons/exporters/OBJExporter.js');
        blob = new Blob([`# ${document.title}: ${overlay.textContent}\n# millimetres; ${model.note()}\n` + new OBJExporter().parse(g)], {type:'text/plain'});
      } else {
        const {STLExporter} = await import('three/addons/exporters/STLExporter.js');
        blob = new Blob([new STLExporter().parse(g, {binary:true})], {type:'model/stl'});
      }
      download(blob, stem() + model.suffix() + '.' + fmt);
    } catch(err){ fail('Save', err); }
    finally{ g.traverse(o=>{ if(o.geometry) o.geometry.dispose(); }); }
  }
  $('objBtn').addEventListener('click', e=>busy(e.currentTarget, ()=>saveModel('obj')));
  $('stlBtn').addEventListener('click', e=>busy(e.currentTarget, ()=>saveModel('stl')));
  return { makePNG, modelGroup, update };
}
