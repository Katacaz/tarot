'use strict';

// This order is permanent: id=01 is The Fool and id=22 is The World.
const CARDS = [
  ['The Fool','Beginnings, curiosity, and a leap into the unknown.','Proceed with the confidence of someone who has not read the instructions.'],
  ['The Magician','Creativity, initiative, and making things happen.','You have the tools. Their warranty is unclear.'],
  ['The High Priestess','Intuition, mystery, and quiet knowledge.','The vibes are classified.'],
  ['The Empress','Growth, generosity, and abundance.','Hydrate your plants and your group chat.'],
  ['The Emperor','Structure, discipline, and responsibility.','You have been promoted to spreadsheet guardian.'],
  ['The Hierophant','Tradition, learning, and shared wisdom.','Consult the ancient texts (the pinned messages).'],
  ['The Lovers','Connection, values, and meaningful choices.','Choose wisely. Or ask the group chat.'],
  ['The Chariot','Drive, direction, and determination.','You are steering. Nobody checked the brakes.'],
  ['Strength','Patience, courage, and gentle perseverance.','Your emotional support animal believes in you.'],
  ['The Hermit','Reflection, solitude, and inner guidance.','Do not disturb mode is a spiritual practice.'],
  ['Wheel of Fortune','Cycles, chance, and unexpected turns.','The algorithm has opinions today.'],
  ['Justice','Fairness, clarity, and accountability.','Receipts will be requested.'],
  ['The Hanged Man','New perspectives, surrender, and patience.','Try turning the problem upside down.'],
  ['Death','Endings, transformations, and fresh starts.','A dramatic rebrand is imminent.'],
  ['Temperance','Balance, moderation, and finding harmony.','Perhaps a second coffee is not balance.'],
  ['The Devil','Temptation, attachment, and unhelpful patterns.','Close the shopping tab. You know which one.'],
  ['The Tower','Sudden changes and shaky assumptions.','Everything is fine. The room is metaphorically on fire.'],
  ['The Star','Hope, healing, and renewed inspiration.','A tiny glimmer of competence appears.'],
  ['The Moon','Uncertainty, dreams, and hidden feelings.','The vibes are mysterious and slightly suspicious.'],
  ['The Sun','Joy, vitality, and welcome clarity.','You are contractually obliged to have a nice moment.'],
  ['Judgement','Reflection, awakening, and big decisions.','Your annual performance review is with the universe.'],
  ['The World','Completion, achievement, and new horizons.','Quest completed. Side quests remain.']
].map(([name,meaning,flavour],index)=>({id:index+1,name,meaning,flavour,image:`./assets/cards/${String(index).padStart(2,'0')}-${name.toLowerCase().replaceAll(' ','-')}.webp`}));

const $ = id => document.getElementById(id);
const params = new URLSearchParams(window.location.search);
const rawId = params.get('id');
const boundId = rawId !== null && /^(0?[1-9]|1\d|2[0-2])$/.test(rawId) ? Number(rawId) : null;
const boundCard = boundId === null ? null : CARDS[boundId-1];

const brisbaneParts = new Intl.DateTimeFormat('en-CA', {timeZone:'Australia/Brisbane',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const part = type => brisbaneParts.find(item=>item.type===type).value;
const dateKey = `${part('year')}-${part('month')}-${part('day')}`;
const readingMoment = new Date(`${dateKey}T12:00:00+10:00`);
$('reading-date').textContent = `BRISBANE TIME // ${dateKey}`;

function hashString(value){let hash=2166136261;for(let i=0;i<value.length;i++)hash=Math.imul(hash^value.charCodeAt(i),16777619);return hash>>>0;}
function seededRandom(seed){let state=seed>>>0;return ()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};}
function dailyDeck(key){const deck=CARDS.map((_,index)=>index);const random=seededRandom(hashString(`tarot-chain-v2|${key}`));for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}return deck;}

// The base card and its direction are shared by every visitor for the Brisbane date.
const dailyCard = CARDS[dailyDeck(dateKey)[0]];
const isReversed = hashString(`tarot-chain-direction-v1|${dateKey}`)%2===1;

const MOON_PHASES = [
  ['New Moon','moon-new.svg','Beginnings are quiet here. Set an intention before demanding an outcome.'],
  ['Waxing Crescent','moon-waxing-crescent.svg','Momentum is gathering. Protect a small beginning and give it room to grow.'],
  ['First Quarter','moon-first-quarter.svg','Pressure asks for action. A decision matters more than perfect certainty.'],
  ['Waxing Gibbous','moon-waxing-gibbous.svg','Refine what is already underway. Adjustment now supports a stronger result.'],
  ['Full Moon','moon-full.svg','What was hidden is easier to see. Emotion and consequence both reach a peak.'],
  ['Waning Gibbous','moon-waning-gibbous.svg','Understanding follows intensity. Share what was learned and keep what is useful.'],
  ['Last Quarter','moon-last-quarter.svg','Release and correction take priority. Make space by ending what no longer serves.'],
  ['Waning Crescent','moon-waning-crescent.svg','Rest, closure, and reflection prepare the ground for another beginning.']
];

function getMoonPhase(moment){
  const lunarCycle=29.53058867;
  const knownNewMoon=Date.UTC(2000,0,6,18,14);
  const age=(((moment.getTime()-knownNewMoon)/86400000)%lunarCycle+lunarCycle)%lunarCycle;
  const index=Math.floor((age+lunarCycle/16)/(lunarCycle/8))%8;
  const [name,file,description]=MOON_PHASES[index];
  return {name,icon:`./assets/icons/${file}`,description};
}

const ZODIAC = {
  capricorn:['Capricorn','zodiac-capricorn.svg','Structure, endurance, and practical ambition shape the day.'],
  aquarius:['Aquarius','zodiac-aquarius.svg','Independent thought, community, and unconventional solutions come forward.'],
  pisces:['Pisces','zodiac-pisces.svg','Intuition, imagination, and emotional permeability colour the day.'],
  aries:['Aries','zodiac-aries.svg','Initiative, urgency, and direct action add heat to the reading.'],
  taurus:['Taurus','zodiac-taurus.svg','Patience, stability, and material needs ask to be respected.'],
  gemini:['Gemini','zodiac-gemini.svg','Curiosity, exchange, and competing perspectives keep the signal moving.'],
  cancer:['Cancer','zodiac-cancer.svg','Protection, memory, and belonging bring attention inward.'],
  leo:['Leo','zodiac-leo.svg','Expression, courage, and visibility encourage a wholehearted response.'],
  virgo:['Virgo','zodiac-virgo.svg','Discernment, service, and careful refinement favour useful action.'],
  libra:['Libra','zodiac-libra.svg','Balance, relationship, and fairness ask every side to be considered.'],
  scorpio:['Scorpio','zodiac-scorpio.svg','Depth, secrecy, and transformation intensify what lies beneath the surface.'],
  sagittarius:['Sagittarius','zodiac-sagittarius.svg','Exploration, conviction, and a wider perspective pull the reading outward.']
};

function getZodiac(month,day){
  const md=month*100+day;
  const key=md>=1222||md<120?'capricorn':md>=1122?'sagittarius':md>=1023?'scorpio':md>=923?'libra':md>=823?'virgo':md>=723?'leo':md>=621?'cancer':md>=521?'gemini':md>=420?'taurus':md>=321?'aries':md>=219?'pisces':'aquarius';
  const [name,file,description]=ZODIAC[key];
  return {name,icon:`./assets/icons/${file}`,description};
}

const PLANETARY_DAYS = [
  ['Sunday · Sun','day-sun.svg','The Sun favours vitality, identity, confidence, and being seen.'],
  ['Monday · Moon','day-mon.svg','The Moon favours intuition, emotion, memory, and matters of home.'],
  ['Tuesday · Mars','day-tue.svg','Mars favours courage and decisive movement, while warning against needless conflict.'],
  ['Wednesday · Mercury','day-wed.svg','Mercury favours communication, learning, movement, and clever adaptation.'],
  ['Thursday · Jupiter','day-thu.svg','Jupiter favours growth, opportunity, generosity, and a broader view.'],
  ['Friday · Venus','day-fri.svg','Venus favours connection, pleasure, creativity, and considered harmony.'],
  ['Saturday · Saturn','day-sat.svg','Saturn favours discipline, boundaries, responsibility, and durable progress.']
];

function getPlanetaryDay(moment){const [name,file,description]=PLANETARY_DAYS[moment.getUTCDay()];return {name,icon:`./assets/icons/${file}`,description};}

const moon = getMoonPhase(readingMoment);
const zodiac = getZodiac(Number(part('month')),Number(part('day')));
const planet = getPlanetaryDay(readingMoment);
const direction = isReversed
  ? {name:'Reversed',icon:'./assets/icons/direction-reversed.svg',description:'The card is reversed. Its energy may be internal, delayed, blocked, or asking to be reconsidered rather than expressed directly.'}
  : {name:'Upright',icon:'./assets/icons/direction-upright.svg',description:'The card is upright. Its central themes are available for direct expression and conscious action.'};
const identity = boundCard
  ? {name:`Bound · ${boundCard.name}`,icon:'./assets/icons/bound.svg',description:`Your permanent Arcana is ${boundCard.name}. ${boundCard.meaning} It acts as the personal lens through which today’s shared card is received.`}
  : {name:'Unbound',icon:'./assets/icons/unbound.svg',description:'You carry no fixed Arcana into this reading. Today’s card stands without a permanent archetype, reflecting openness, adaptability, and a path that is not yet defined.'};

const modifiers = {identity,direction,moon,zodiac,planet};
for(const [key,value] of Object.entries(modifiers)){
  const icon=$(key+'-icon');
  icon.src=value.icon;
  icon.alt=value.name;
  icon.closest('button').title=value.name;
}

function numberLabel(card){return `${String(card.id-1).padStart(2,'0')} / XXII`;}
function displayCard(card){
  $('daily-image').src=card.image;
  $('daily-image').alt=`Artwork for ${card.name}${isReversed?' reversed':''}`;
  $('daily-number').textContent=numberLabel(card);
  $('daily-name').textContent=card.name;
  $('daily-description').textContent=card.meaning;
  $('daily-flavour').textContent=card.flavour;
  $('card-revealed').classList.toggle('is-reversed',isReversed);
}

function updateSynthesis(){
  const expression=isReversed?'arrives inwardly or through resistance':'can be approached directly';
  const identityText=boundCard
    ? `Your bound ${boundCard.name} places this message through a lasting theme of ${boundCard.meaning.toLowerCase()}`
    : 'With no Arcana bound to you, the card arrives without a permanent archetype shaping its message.';
  $('reading-lead').textContent=`${dailyCard.name} // ${direction.name}`;
  $('reading-text').textContent=`Today, ${dailyCard.name} speaks of ${dailyCard.meaning.toLowerCase()} In its ${direction.name.toLowerCase()} position, that energy ${expression}. ${identityText} The ${moon.name} adds its own condition: ${moon.description} Under ${zodiac.name} and the influence of ${planet.name}, consider what can be acted upon now and what should be allowed to unfold.`;
  const themes=[dailyCard.name,direction.name,moon.name,zodiac.name,planet.name.split(' · ')[1]];
  $('reading-keywords').replaceChildren(...themes.map(theme=>{const span=document.createElement('span');span.textContent=theme;return span;}));
}

if(boundCard){
  $('identity-note').textContent=`KEYCHAIN ${String(boundId).padStart(2,'0')} / 22 // BOUND TO ${boundCard.name.toUpperCase()}`;
}else{
  $('identity-note').textContent='GUEST READING // UNBOUND';
}

$('reveal-button').addEventListener('click',()=>{
  displayCard(dailyCard);
  updateSynthesis();
  $('reading-prompt').hidden=true;
  $('reading-content').hidden=false;
  requestAnimationFrame(()=>$('reading-content').classList.add('is-revealed'));
  $('card-back').hidden=true;
  $('card-revealed').hidden=false;
  $('card-revealed').classList.add('is-revealing');
  window.setTimeout(()=>$('card-revealed').classList.remove('is-revealing'),750);
  $('daily-details').hidden=false;
  $('reveal-button').hidden=true;
  $('draw-hint').textContent='This shared card and its conditions remain fixed until tomorrow.';
});

const modifierButtons=[...document.querySelectorAll('.modifier-tab')];
let activeModifier=null;
let pinnedModifier=null;
const mobileQuery=window.matchMedia('(max-width: 760px)');
const hoverQuery=window.matchMedia('(hover: hover) and (pointer: fine)');

function syncScrim(){
  const open=mobileQuery.matches&&(document.body.classList.contains('reading-open')||document.body.classList.contains('modifier-open'));
  $('drawer-scrim').hidden=!open;
}

function closeReading(){document.body.classList.remove('reading-open');$('reading-toggle').setAttribute('aria-expanded','false');syncScrim();}
function closeModifier(){
  activeModifier=null;pinnedModifier=null;
  $('modifier-shell').classList.remove('is-open');
  document.body.classList.remove('modifier-open');
  $('modifier-detail').hidden=true;
  modifierButtons.forEach(button=>{button.classList.remove('is-active');button.setAttribute('aria-expanded','false');});
  syncScrim();
}

function openModifier(key,pin=false){
  const value=modifiers[key];
  activeModifier=key;
  if(pin)pinnedModifier=key;
  $('modifier-kicker').textContent=`0${Object.keys(modifiers).indexOf(key)+3} / CONDITION`;
  $('modifier-title').textContent=value.name;
  $('modifier-description').textContent=value.description;
  $('modifier-detail-image').src=value.icon;
  $('modifier-detail-image').alt='';
  $('modifier-detail').hidden=false;
  $('modifier-shell').classList.add('is-open');
  document.body.classList.add('modifier-open');
  if(mobileQuery.matches)closeReading();
  modifierButtons.forEach(button=>{const selected=button.dataset.modifier===key;button.classList.toggle('is-active',selected);button.setAttribute('aria-expanded',String(selected));});
  syncScrim();
}

modifierButtons.forEach(button=>{
  const key=button.dataset.modifier;
  button.addEventListener('click',()=>{if(pinnedModifier===key){closeModifier();}else{openModifier(key,true);}});
  button.addEventListener('mouseenter',()=>{if(hoverQuery.matches&&!pinnedModifier)openModifier(key);});
});

$('modifier-shell').addEventListener('mouseleave',()=>{if(hoverQuery.matches&&!pinnedModifier)closeModifier();});
$('modifier-close').addEventListener('click',closeModifier);
$('reading-toggle').addEventListener('click',()=>{
  const opening=!document.body.classList.contains('reading-open');
  closeModifier();
  document.body.classList.toggle('reading-open',opening);
  $('reading-toggle').setAttribute('aria-expanded',String(opening));
  syncScrim();
});
$('reading-close').addEventListener('click',closeReading);
$('drawer-scrim').addEventListener('click',()=>{closeReading();closeModifier();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeReading();closeModifier();}});
mobileQuery.addEventListener('change',()=>{closeReading();closeModifier();});

const resizer=$('panel-resizer');
const workspace=$('reading-workspace');
const readingPanel=$('reading-panel');
const READING_WIDTH_KEY='tarot-chain-reading-width';

function readingWidthBounds(){
  const available=workspace.getBoundingClientRect().width;
  const rail=$('modifier-shell').offsetWidth||68;
  const min=230;
  const max=Math.max(min,Math.min(available*.55,available-rail-319));
  return {min,max};
}

function setReadingWidth(width,persist=false){
  const {min,max}=readingWidthBounds();
  const next=Math.round(Math.min(max,Math.max(min,width)));
  workspace.style.setProperty('--reading-width',`${next}px`);
  resizer.setAttribute('aria-valuemin',String(Math.round(min)));
  resizer.setAttribute('aria-valuemax',String(Math.round(max)));
  resizer.setAttribute('aria-valuenow',String(next));
  if(persist){try{localStorage.setItem(READING_WIDTH_KEY,String(next));}catch{}}
}

let restoredReadingWidth=false;
try{
  const savedWidth=Number(localStorage.getItem(READING_WIDTH_KEY));
  if(Number.isFinite(savedWidth)&&savedWidth>0){setReadingWidth(savedWidth);restoredReadingWidth=true;}
}catch{}
if(!restoredReadingWidth)requestAnimationFrame(()=>setReadingWidth(readingPanel.getBoundingClientRect().width));

resizer.addEventListener('pointerdown',event=>{
  if(event.button!==0||mobileQuery.matches)return;
  event.preventDefault();
  resizer.setPointerCapture(event.pointerId);
  document.body.classList.add('is-resizing');
});

resizer.addEventListener('pointermove',event=>{
  if(!resizer.hasPointerCapture(event.pointerId))return;
  const rect=workspace.getBoundingClientRect();
  setReadingWidth(event.clientX-rect.left);
});

function finishResize(event){
  if(resizer.hasPointerCapture(event.pointerId))resizer.releasePointerCapture(event.pointerId);
  document.body.classList.remove('is-resizing');
  setReadingWidth(readingPanel.getBoundingClientRect().width,true);
}

resizer.addEventListener('pointerup',finishResize);
resizer.addEventListener('pointercancel',finishResize);
resizer.addEventListener('keydown',event=>{
  if(mobileQuery.matches)return;
  const {min,max}=readingWidthBounds();
  const current=readingPanel.getBoundingClientRect().width;
  const step=event.shiftKey?48:16;
  let next=null;
  if(event.key==='ArrowLeft')next=current-step;
  if(event.key==='ArrowRight')next=current+step;
  if(event.key==='Home')next=min;
  if(event.key==='End')next=max;
  if(next===null)return;
  event.preventDefault();
  setReadingWidth(next,true);
});
resizer.addEventListener('dblclick',()=>{
  workspace.style.removeProperty('--reading-width');
  try{localStorage.removeItem(READING_WIDTH_KEY);}catch{}
  requestAnimationFrame(()=>setReadingWidth(readingPanel.getBoundingClientRect().width));
});
window.addEventListener('resize',()=>{if(!mobileQuery.matches)setReadingWidth(readingPanel.getBoundingClientRect().width);});
