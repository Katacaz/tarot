'use strict';
// The card array's order is permanent: id=01 is The Fool, id=22 is The World.
// Replace descriptions and illustrations whenever you like; don't reorder after tags are written.
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
].map(([name,meaning,flavour],index)=>({id:index+1,name,meaning,flavour,image:`./assets/cards/${String(index).padStart(2,'0')}-${name.toLowerCase().replaceAll(' ','-')}.svg`}));

const $ = id => document.getElementById(id);
const params = new URLSearchParams(window.location.search);
const rawId = params.get('id');
const boundId = rawId !== null && /^(0?[1-9]|1\d|2[0-2])$/.test(rawId) ? Number(rawId) : null;

// Use one timezone so a travelling friend doesn't get a different deck.
const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Australia/Brisbane',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const part = type => today.find(p=>p.type===type).value;
const dateKey = `${part('year')}-${part('month')}-${part('day')}`;
$('reading-date').textContent = `BRISBANE TIME // ${dateKey}`;

function hashString(s){let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0;}
function seededRandom(seed){let state=seed>>>0;return ()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};}
function dailyDeck(key){const deck=CARDS.map((_,i)=>i);const random=seededRandom(hashString(`arcana-signal-v1|${key}`));for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}return deck;}
const deck = dailyDeck(dateKey);
// IDs 01-22 each get a different daily card. The unbound homepage has its own guest draw.
const drawIndex = boundId === null ? hashString(`guest|${dateKey}`)%22 : deck[boundId-1];
const dailyCard = CARDS[drawIndex];

function numberLabel(card){return `${String(card.id-1).padStart(2,'0')} / XXII`;}
function displayCard(card,prefix){$(prefix+'-image').src=card.image;$(prefix+'-image').alt=`Placeholder artwork for ${card.name}`;$(prefix+'-number').textContent=numberLabel(card);$(prefix+'-name').textContent=card.name;$(prefix+'-description').textContent=card.meaning;}

if(boundId !== null){
  $('bound-panel').hidden=false;
  displayCard(CARDS[boundId-1],'bound');
  $('identity-note').textContent=`KEYCHAIN ${String(boundId).padStart(2,'0')} / 22 // BOUND TO ${CARDS[boundId-1].name.toUpperCase()}`;
  $('daily-label').textContent='02 / DAILY READING';
}else{
  document.querySelector('.reading-layout').classList.add('single');
  $('identity-note').textContent='GUEST READING // NO BOUND ARCANA';
}

$('reveal-button').addEventListener('click',()=>{
  displayCard(dailyCard,'daily');
  $('daily-flavour').textContent=dailyCard.flavour;
  $('card-back').hidden=true;
  $('card-revealed').hidden=false;
  $('daily-details').hidden=false;
  $('reveal-button').hidden=true;
  $('draw-hint').textContent='The same card will appear if you return today.';
});
