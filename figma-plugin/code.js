// Pet-Pop Onboarding Screens — Figma Plugin
// Creates all 5 onboarding states as 390×844 frames in the current file

figma.showUI(__html__, { width: 340, height: 220, title: 'Pet-Pop Onboarding Screens' });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'create') return;
  try {
    figma.ui.postMessage({ type: 'status', text: '加载字体...' });
    await loadFonts();
    figma.ui.postMessage({ type: 'status', text: '生成画面...' });
    const frames = await buildAllScreens();
    figma.viewport.scrollAndZoomIntoView(frames);
    figma.ui.postMessage({ type: 'done', count: frames.length });
  } catch (err) {
    figma.ui.postMessage({ type: 'error', message: String(err) });
  }
};

// ── Font Loading ─────────────────────────────────────────────────
async function loadFonts() {
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Extra Bold' }),
  ]);
}

// ── Color Helpers ────────────────────────────────────────────────
function hex(h) {
  return { r: parseInt(h.slice(1,3),16)/255, g: parseInt(h.slice(3,5),16)/255, b: parseInt(h.slice(5,7),16)/255, a:1 };
}
function solid(c) { return [{ type:'SOLID', color: typeof c==='string'?hex(c):c }]; }
function linGrad(deg, stops) {
  const rad = ((deg-90)*Math.PI)/180, cos=Math.cos(rad), sin=Math.sin(rad);
  return [{ type:'GRADIENT_LINEAR',
    gradientStops: stops.map(([p,c])=>({ position:p, color:hex(c) })),
    gradientTransform: [[cos,sin,0.5-cos*0.5-sin*0.5],[-sin,cos,0.5+sin*0.5-cos*0.5]] }];
}

// ── Node Helpers ─────────────────────────────────────────────────
const GOLD = () => linGrad(135,[[ 0,'#F5B720'],[1,'#F09628']]);
const BG   = () => linGrad(160,[[0,'#FFFBF0'],[1,'#FFF8E1']]);

function mkFrame(name,x,w,h,fills,cr) {
  const f = figma.createFrame();
  f.name=name; f.resize(w,h); f.x=x; f.y=0;
  f.fills=fills||BG(); if(cr!=null)f.cornerRadius=cr;
  f.clipsContent=true; return f;
}
function mkRect(x,y,w,h,fills,cr,strk,sw) {
  const r=figma.createRectangle();
  r.x=x;r.y=y;r.resize(w,h);r.fills=fills||[];
  if(cr!=null)r.cornerRadius=cr;
  if(strk){r.strokes=strk;r.strokeWeight=sw||1.5;}
  return r;
}
function mkText(x,y,str,size,style,color,width,align) {
  const t=figma.createText();
  t.x=x;t.y=y;t.characters=str;
  t.fontSize=size||13; t.fontName={family:'Inter',style:style||'Regular'};
  t.fills=solid(color||'#1A1A1A');
  if(width){t.textAutoResize='HEIGHT';t.resize(width,t.height);}
  if(align)t.textAlignHorizontal=align;
  return t;
}
function add(parent,...nodes){ nodes.forEach(n=>parent.appendChild(n)); }

// ── Shared: Header (logo + progress) ────────────────────────────
function addHeader(f, label, num, pct) {
  add(f,
    mkText(24,52,'🐾  Pet-Pop',20,'Extra Bold','#F09628'),
    mkText(24,94,label,13,'Bold','#6B7280'),
    mkText(350,94,`${num}/3`,13,'Bold','#F09628'),
    mkRect(24,114,342,6,solid('#E5E7EB'),3),
    mkRect(24,114,Math.max(4,Math.round(342*pct)),6,GOLD(),3)
  );
}

// ── Shared: Bottom Buttons ───────────────────────────────────────
function addButtons(f, label, enabled, showBack) {
  const bx = showBack ? 80 : 24;
  const bw = 390 - bx - 24;
  add(f,
    mkRect(bx,778,bw,46,enabled?GOLD():solid('#E5E7EB'),9999),
    mkText(bx,791,label,14,'Bold',enabled?'#FFFFFF':'#9CA3AF',bw,'CENTER')
  );
  if(showBack){
    add(f,
      mkRect(24,778,46,46,solid('#F3F4F6'),14),
      mkText(24,791,'←',18,'Bold','#6B7280',46,'CENTER')
    );
  }
}

// ── Shared: Pet Face (simplified) ───────────────────────────────
function addPetFace(f, cx, cy, size) {
  const s = size/100;
  const r = (dx,dy,w,h,fill,cr) => { const n=mkRect(cx+dx*s,cy+dy*s,w*s,h*s,solid(fill),cr?cr*s:0); f.appendChild(n); return n; };
  r(-50,-60,100,80,'#C2855A',40);       // head
  r(-70,-80, 30,40,'#A0612A',15);       // left ear
  r( 40,-80, 30,40,'#A0612A',15);       // right ear
  r(-30,-30, 14,14,'#1A1A1A',7);        // left eye
  r( 16,-30, 14,14,'#1A1A1A',7);        // right eye
  r(-26,-36, 5,5,'#FFFFFF',2.5);        // eye shine L
  r( 20,-36, 5,5,'#FFFFFF',2.5);        // eye shine R
  r(-14,-10, 28,16,'#E07070',8);        // nose
}

// ════════════════════════════════════════
// SCREEN 1  Step 1 – Empty Upload
// ════════════════════════════════════════
function buildS1(x) {
  const f = mkFrame('S1 · 上传照片 · Empty', x, 390, 844, BG(), 44);
  addHeader(f,'上传照片',1,0.33);
  add(f,
    mkText(24,138,'上传宠物照片',22,'Extra Bold','#1A1A1A'),
    mkText(24,165,'AI 将自动识别你的宠物特征',13,'Regular','#9CA3AF'),
    // upload box
    mkRect(24,190,342,190,solid('#F9FAFB'),18,
      [{type:'SOLID',color:hex('#D1D5DB')}],2.5),
    // camera icon
    mkRect(155,230,60,60,linGrad(135,[[0,'#FEF3C7'],[1,'#FDE68A']]),16),
    mkText(155,242,'📷',26,'Regular','#374151',60,'CENTER'),
    mkText(24,302,'拖拽照片到此处  或点击上传',13,'Semi Bold','#6B7280',342,'CENTER'),
    // select button
    mkRect(140,336,110,32,GOLD(),9999),
    mkText(140,341,'选择照片',13,'Bold','#FFFFFF',110,'CENTER')
  );
  addButtons(f,'下一步：填写信息',false,false);
  return f;
}

// ════════════════════════════════════════
// SCREEN 2  Step 1 – Photo Uploaded
// ════════════════════════════════════════
function buildS2(x) {
  const f = mkFrame('S2 · 上传照片 · Uploaded', x, 390, 844, BG(), 44);
  addHeader(f,'上传照片',1,0.33);
  add(f,
    mkText(24,138,'上传宠物照片',22,'Extra Bold','#1A1A1A'),
    mkText(24,165,'AI 将自动识别你的宠物特征',13,'Regular','#9CA3AF'),
    // upload box filled
    mkRect(24,190,342,220,linGrad(160,[[0,'#FFFBF0'],[1,'#FEF3C7']]),18,
      [{type:'SOLID',color:hex('#F5B720')}],2.5)
  );
  // Pet face in upload box
  addPetFace(f,195,265,80);
  add(f,
    // checkmark badge
    mkRect(218,280,28,28,solid('#10B981'),14),
    mkText(218,284,'✓',14,'Bold','#FFFFFF',28,'CENTER'),
    mkText(24,322,'照片已上传',13,'Semi Bold','#6B7280',342,'CENTER'),
    // AI card
    mkRect(24,424,342,100,solid('#FFFFFF'),16),
    mkText(40,440,'✨  AI 识别结果',13,'Bold','#374151')
  );
  // Tags
  const tagData=[{l:'柴犬系',bg:'#FEF3C7',c:'#D97706',x:40},{l:'傲娇型',bg:'#FCE7F3',c:'#BE185D',x:114},{l:'萌系外貌',bg:'#EDE9FE',c:'#7C3AED',x:192}];
  tagData.forEach(t=>{
    const tw=t.l.length*14+28;
    add(f, mkRect(t.x,466,tw,26,solid(t.bg),9999), mkText(t.x,471,t.l,13,'Bold',t.c,tw,'CENTER'));
  });
  addButtons(f,'下一步：填写信息',true,false);
  return f;
}

// ════════════════════════════════════════
// SCREEN 3  Step 2 – Empty Form
// ════════════════════════════════════════
function buildS3(x) {
  const f = mkFrame('S3 · 填写信息 · Empty', x, 390, 844, BG(), 44);
  addHeader(f,'填写信息',2,0.67);
  add(f,
    mkText(24,138,'打造你的 IP',22,'Extra Bold','#1A1A1A'),
    mkText(24,165,'越详细，AI 生成效果越好',13,'Regular','#9CA3AF'),
    mkText(24,198,'宠物昵称 *',13,'Bold','#374151'),
    mkRect(24,218,342,48,solid('#FFFFFF'),14,[{type:'SOLID',color:hex('#E5E7EB')}],2),
    mkText(40,232,'给宠物起个响亮的名字...',14,'Regular','#9CA3AF'),
    mkText(24,286,'性格特征（可多选）',13,'Bold','#374151')
  );
  // Pills all inactive
  ['呆萌','傲娇','活泼','贪吃'].reduce((px,p)=>{
    const pw=p.length*14+36;
    add(f, mkRect(px,308,pw,34,solid('#FFFFFF'),9999,[{type:'SOLID',color:hex('#E5E7EB')}],2),
           mkText(px,315,p,14,'Bold','#6B7280',pw,'CENTER'));
    return px+pw+8;
  },24);
  add(f, mkText(24,362,'主攻赛道（单选）',13,'Bold','#374151'));
  [['🍗','吃播',24,384],['✨','颜值',207,384],['🎭','才艺',24,460],['📖','故事',207,460]].forEach(([ic,lb,tx,ty])=>{
    add(f, mkRect(tx,ty,171,64,solid('#FFFFFF'),14,[{type:'SOLID',color:hex('#E5E7EB')}],2),
           mkText(tx+14,ty+20,ic,22,'Regular','#374151'),
           mkText(tx+52,ty+23,lb,14,'Bold','#374151'));
  });
  addButtons(f,'下一步：预览 IP',false,true);
  return f;
}

// ════════════════════════════════════════
// SCREEN 4  Step 2 – Form Filled
// ════════════════════════════════════════
function buildS4(x) {
  const f = mkFrame('S4 · 填写信息 · Filled', x, 390, 844, BG(), 44);
  addHeader(f,'填写信息',2,0.67);
  add(f,
    mkText(24,138,'打造你的 IP',22,'Extra Bold','#1A1A1A'),
    mkText(24,165,'越详细，AI 生成效果越好',13,'Regular','#9CA3AF'),
    mkText(24,198,'宠物昵称 *',13,'Bold','#374151'),
    mkRect(24,218,342,48,solid('#FFFFFF'),14,[{type:'SOLID',color:hex('#F5B720')}],2),
    mkText(40,232,'可乐',14,'Semi Bold','#1A1A1A'),
    mkText(24,286,'性格特征（可多选）',13,'Bold','#374151')
  );
  // Pills: 活泼 & 贪吃 selected
  [['呆萌',false],['傲娇',false],['活泼',true],['贪吃',true]].reduce((px,[p,active])=>{
    const pw=p.length*14+36;
    add(f, mkRect(px,308,pw,34,active?GOLD():solid('#FFFFFF'),9999,active?[]:[{type:'SOLID',color:hex('#E5E7EB')}],2),
           mkText(px,315,p,14,'Bold',active?'#FFFFFF':'#6B7280',pw,'CENTER'));
    return px+pw+8;
  },24);
  add(f, mkText(24,362,'主攻赛道（单选）',13,'Bold','#374151'));
  // Tracks: 吃播 selected
  [['🍗','吃播',24,384,true],['✨','颜值',207,384,false],['🎭','才艺',24,460,false],['📖','故事',207,460,false]].forEach(([ic,lb,tx,ty,active])=>{
    add(f, mkRect(tx,ty,171,64,active?linGrad(135,[[0,'#FEF3C7'],[1,'#FDE68A']]):solid('#FFFFFF'),14,
                 [{type:'SOLID',color:hex(active?'#F5B720':'#E5E7EB')}],2),
           mkText(tx+14,ty+20,ic,22,'Regular','#374151'),
           mkText(tx+52,ty+23,lb,14,'Bold',active?'#D97706':'#374151'));
  });
  addButtons(f,'下一步：预览 IP',true,true);
  return f;
}

// ════════════════════════════════════════
// SCREEN 5  Step 3 – IP Preview
// ════════════════════════════════════════
function buildS5(x) {
  const f = mkFrame('S5 · 确认 IP · Preview', x, 390, 844, BG(), 44);
  addHeader(f,'确认 IP',3,1.0);
  add(f,
    mkText(24,138,'你的 IP 诞生了！',22,'Extra Bold','#1A1A1A',342,'CENTER'),
    mkText(24,165,'AI 已为你生成专属宠物 IP',13,'Regular','#9CA3AF',342,'CENTER'),
    // IP cover
    mkRect(105,196,180,180,GOLD(),24)
  );
  // Shine
  const shine=mkRect(105,196,180,180,[{type:'GRADIENT_RADIAL',
    gradientStops:[{position:0,color:{r:1,g:1,b:1,a:0.3}},{position:1,color:{r:1,g:1,b:1,a:0}}],
    gradientTransform:[[1,0,0],[0,1,0]]}],24);
  f.appendChild(shine);
  // Pet face
  addPetFace(f,195,265,80);
  add(f,
    mkText(105,348,'可乐',20,'Extra Bold','#FFFFFF',180,'CENTER'),
    mkText(267,192,'✨',18,'Regular','#F5B720'),
    // track badge
    mkRect(105,392,180,36,GOLD(),9999),
    mkText(105,400,'🍗  吃播赛道 推荐',13,'Bold','#FFFFFF',180,'CENTER'),
    // stats card
    mkRect(24,444,342,118,solid('#FFFFFF'),16),
    // row 1: personality
    mkText(40,460,'性格',12,'Bold','#9CA3AF'),
    mkRect(82,457,44,24,solid('#FEF3C7'),9999),
    mkText(82,463,'活泼',11,'Bold','#D97706',44,'CENTER'),
    mkRect(132,457,44,24,solid('#FEF3C7'),9999),
    mkText(132,463,'贪吃',11,'Bold','#D97706',44,'CENTER'),
    // row 2: level
    mkText(40,498,'等级',12,'Bold','#9CA3AF'),
    mkRect(82,494,76,24,solid('#F09628'),9999),
    mkText(82,500,'LV.1 新人',11,'Bold','#FFFFFF',76,'CENTER'),
    // row 3: reward
    mkText(40,534,'奖励',12,'Bold','#9CA3AF'),
    mkText(82,532,'🎁 新手礼包 100 Token 已到账',12,'Semi Bold','#374151')
  );
  addButtons(f,'🐾 开始养成！',true,true);
  return f;
}

// ── Build All Screens ─────────────────────────────────────────────
async function buildAllScreens() {
  let page = figma.root.children.find(p => p.name === 'Onboarding Screens');
  if (!page) { page = figma.createPage(); page.name = 'Onboarding Screens'; }
  figma.currentPage = page;

  // Remove previous frames
  [...page.children].forEach(n => n.remove());

  const GAP = 40;
  const builders = [buildS1, buildS2, buildS3, buildS4, buildS5];
  const frames = builders.map((build, i) => {
    const f = build(i * (390 + GAP));
    page.appendChild(f);
    return f;
  });

  // Labels below each frame
  const labels = [
    'Step 1 · Empty\n上传照片（空状态）',
    'Step 1 · Uploaded\n照片已上传 + AI 识别',
    'Step 2 · Empty\n填写信息（空表单）',
    'Step 2 · Filled\n可乐 / 活泼 / 吃播',
    'Step 3 · Preview\nIP 诞生 → 开始养成',
  ];
  labels.forEach((lbl, i) => {
    const t = figma.createText();
    t.characters = lbl;
    t.fontSize = 13;
    t.fontName = { family:'Inter', style:'Bold' };
    t.fills = solid('#374151');
    t.x = i*(390+GAP);
    t.y = 860;
    t.textAutoResize = 'WIDTH_AND_HEIGHT';
    page.appendChild(t);
  });

  return frames;
}
