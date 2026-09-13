const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const clone = (value) => JSON.parse(JSON.stringify(value));
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const card = (id, name, type, ap, data) => ({ id, name, type, ap, ...data });

const commonCards = {
  strike: card('strike', '星紋斬', '攻擊', 1, { damage: 82, energyGain: 12, icon: '✦', color: '#6da6ff', desc: '造成傷害，獲得 12 星能。' }),
  guard: card('guard', '相位護壁', '防禦', 1, { block: 92, icon: '◈', color: '#63d7ff', desc: '獲得 92 點護盾。' }),
  focus: card('focus', '星脈共鳴', '戰術', 0, { energyGain: 22, draw: 1, icon: '◇', color: '#a783ff', desc: '獲得 22 星能，抽 1 張牌。' })
};

const fighters = [
  {
    id: 'azure', name: '蒼凜', title: '無限界的觀測者', image: 'assets/azure.webp', color: '#67c8ff', hp: 1260, power: 96, guard: 82, speed: 84,
    passive: '觀測演算：每回合第一張防禦牌額外獲得 24 護盾。', desc: '在攻防之間精準切換，穩定累積星能後以墜星終結戰局。',
    cards: [
      commonCards.strike, commonCards.strike, commonCards.strike, commonCards.guard, commonCards.guard, commonCards.focus,
      card('azure-shift', '界域偏轉', '防禦', 1, { block: 118, energyGain: 8, icon: '⬡', color: '#59e0ff', desc: '獲得 118 護盾與 8 星能。' }),
      card('azure-ray', '虛空折射', '攻擊', 2, { damage: 178, vuln: 1, icon: '⟡', color: '#6c8eff', desc: '造成高傷害，施加 1 層破綻。' }),
      card('azure-draw', '全域觀測', '戰術', 1, { draw: 2, energyGain: 16, icon: '◎', color: '#8bdcff', desc: '抽 2 張牌，獲得 16 星能。' }),
      card('azure-ult', '無垠・蒼星墜落', '終結', 3, { damage: 365, energyCost: 80, stun: 1, ultimate: true, icon: '✵', color: '#ffe596', desc: '消耗 80 星能。造成巨額傷害並暈眩敵人。' })
    ]
  },
  {
    id: 'ember', name: '燼羅', title: '災炎的霸者', image: 'assets/ember.webp', color: '#ff6a67', hp: 1390, power: 108, guard: 68, speed: 72,
    passive: '不滅餘燼：對灼燒敵人造成的傷害提高 18%。', desc: '用灼燒與爆發壓縮敵人的生存空間，適合喜歡強攻的玩家。',
    cards: [
      card('ember-slash', '裂焰斬', '攻擊', 1, { damage: 92, energyGain: 10, icon: '╱', color: '#ff765e', desc: '造成傷害，獲得 10 星能。' }),
      card('ember-slash', '裂焰斬', '攻擊', 1, { damage: 92, energyGain: 10, icon: '╱', color: '#ff765e', desc: '造成傷害，獲得 10 星能。' }),
      card('ember-slash', '裂焰斬', '攻擊', 1, { damage: 92, energyGain: 10, icon: '╱', color: '#ff765e', desc: '造成傷害，獲得 10 星能。' }),
      commonCards.guard, commonCards.guard, commonCards.focus,
      card('ember-burn', '災火刻印', '異常', 1, { damage: 40, burn: 3, icon: '♨', color: '#ff8a4c', desc: '造成傷害，施加 3 層灼燒。' }),
      card('ember-combo', '赤獄連破', '攻擊', 2, { damage: 205, burnBonus: true, icon: '炎', color: '#ff4b55', desc: '造成高傷害；敵人灼燒時額外增傷。' }),
      card('ember-rage', '焚血戰意', '戰術', 1, { strength: 18, selfDamage: 45, energyGain: 25, icon: '▲', color: '#ffad5f', desc: '失去 45 生命，本場攻擊提高並獲得 25 星能。' }),
      card('ember-ult', '炎界・天火葬送', '終結', 3, { damage: 405, energyCost: 85, burn: 2, ultimate: true, icon: '✹', color: '#ffe08a', desc: '消耗 85 星能。造成極高傷害並施加灼燒。' })
    ]
  },
  {
    id: 'lunar', name: '月璃', title: '星律的演算師', image: 'assets/lunar.webp', color: '#b08dff', hp: 1120, power: 88, guard: 67, speed: 108,
    passive: '月相輪轉：每使用 3 張牌，自動抽 1 張牌。', desc: '高速抽牌、低費連鎖，以更多操作換取最靈活的回合。',
    cards: [
      card('lunar-string', '星弦', '攻擊', 1, { damage: 72, energyGain: 15, drawChance: .35, icon: '⌁', color: '#b79cff', desc: '造成傷害，獲得 15 星能；可能抽牌。' }),
      card('lunar-string', '星弦', '攻擊', 1, { damage: 72, energyGain: 15, drawChance: .35, icon: '⌁', color: '#b79cff', desc: '造成傷害，獲得 15 星能；可能抽牌。' }),
      card('lunar-string', '星弦', '攻擊', 1, { damage: 72, energyGain: 15, drawChance: .35, icon: '⌁', color: '#b79cff', desc: '造成傷害，獲得 15 星能；可能抽牌。' }),
      card('lunar-veil', '月影帷幕', '防禦', 1, { block: 78, draw: 1, icon: '☾', color: '#8ea4ff', desc: '獲得 78 護盾，抽 1 張牌。' }),
      card('lunar-veil', '月影帷幕', '防禦', 1, { block: 78, draw: 1, icon: '☾', color: '#8ea4ff', desc: '獲得 78 護盾，抽 1 張牌。' }),
      commonCards.focus,
      card('lunar-zero', '零時演算', '戰術', 0, { draw: 2, icon: '∞', color: '#d0baff', desc: '不消耗行動點，抽 2 張牌。' }),
      card('lunar-orbit', '十二星軌', '攻擊', 2, { damage: 158, hits: 2, icon: '✧', color: '#916cff', desc: '連續攻擊 2 次。' }),
      card('lunar-rewind', '月輪回溯', '回復', 1, { heal: 105, energyGain: 14, icon: '◔', color: '#d7c7ff', desc: '恢復 105 生命，獲得 14 星能。' }),
      card('lunar-ult', '天穹・星律演算', '終結', 3, { damage: 330, draw: 2, energyCost: 75, ultimate: true, icon: '✺', color: '#ffe89e', desc: '消耗 75 星能。造成巨額傷害並抽 2 張牌。' })
    ]
  },
  {
    id: 'jade', name: '青珞', title: '守界的靈契者', image: 'assets/jade.webp', color: '#6bf0ba', hp: 1510, power: 78, guard: 108, speed: 65,
    passive: '翠玉靈契：回合結束時，保留 35% 未消耗護盾。', desc: '以治療和大型護盾化解敵人進攻，步調穩定、容錯率最高。',
    cards: [
      card('jade-hit', '翠靈擊', '攻擊', 1, { damage: 72, energyGain: 13, icon: '❈', color: '#67e5ae', desc: '造成傷害，獲得 13 星能。' }),
      card('jade-hit', '翠靈擊', '攻擊', 1, { damage: 72, energyGain: 13, icon: '❈', color: '#67e5ae', desc: '造成傷害，獲得 13 星能。' }),
      card('jade-hit', '翠靈擊', '攻擊', 1, { damage: 72, energyGain: 13, icon: '❈', color: '#67e5ae', desc: '造成傷害，獲得 13 星能。' }),
      card('jade-wall', '青玉障', '防禦', 1, { block: 132, icon: '⬡', color: '#6effbd', desc: '獲得 132 點護盾。' }),
      card('jade-wall', '青玉障', '防禦', 1, { block: 132, icon: '⬡', color: '#6effbd', desc: '獲得 132 點護盾。' }),
      commonCards.focus,
      card('jade-heal', '返生律', '回復', 1, { heal: 145, energyGain: 10, icon: '✚', color: '#9dffd0', desc: '恢復 145 生命，獲得 10 星能。' }),
      card('jade-thorns', '玉棘反響', '防禦', 2, { block: 168, thorns: 48, icon: '✤', color: '#55dca3', desc: '獲得大量護盾；敵人下次攻擊受到反傷。' }),
      card('jade-seal', '封界鎖鏈', '異常', 2, { damage: 112, weak: 1, icon: '⌘', color: '#8fffd1', desc: '造成傷害，使敵人下次攻擊弱化。' }),
      card('jade-ult', '萬象・翠玉封界', '終結', 3, { damage: 255, block: 190, energyCost: 80, ultimate: true, icon: '❉', color: '#ffe99f', desc: '消耗 80 星能。造成傷害並獲得巨大護盾。' })
    ]
  }
];

const supports = [
  { id: 'rei', name: '零夜', title: '戰術干涉', icon: '✦', color: '#75dcff', desc: '第 3 回合開始時，獲得 2 行動點與 25 星能。', type: 'energy' },
  { id: 'mio', name: '澪', title: '緊急治療', icon: '❈', color: '#72f0b4', desc: '生命首次低於 35% 時，立即恢復 220 生命。', type: 'heal' },
  { id: 'kai', name: '凱', title: '破陣增幅', icon: '◆', color: '#ffc16e', desc: '第一次使用終結牌時，傷害提高 30%。', type: 'burst' }
];

const enemyBase = { name: '獄骸', hp: 1780, maxHp: 1780, block: 0, burn: 0, vulnerable: 0, weak: 0, stunned: 0, strength: 0 };
const enemyMoves = [
  { name: '黑棘撕裂', icon: '⚔', damage: 116, text: '攻擊 116' },
  { name: '災厄震波', icon: '✹', damage: 168, text: '強攻 168' },
  { name: '腐蝕吐息', icon: '♨', damage: 78, burn: 2, text: '攻擊 78＋灼燒' },
  { name: '骸骨屏障', icon: '⬡', block: 125, strength: 8, text: '護盾 125＋強化' },
  { name: '終末崩落', icon: '☄', damage: 235, text: '致命攻擊 235' }
];

let selectedFighter = null;
let selectedSupport = null;
let player, enemy, drawPile, discardPile, hand, currentIntent;
let round = 1, ap = 3, battleOver = false, busy = false, cardsPlayed = 0, totalDamage = 0, supportUsed = false, defendedThisTurn = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showScreen(id) {
  $$('.screen').forEach((screen) => screen.classList.remove('active'));
  $('#' + id).classList.add('active');
  window.scrollTo(0, 0);
}

function renderFighters() {
  $('#fighterGrid').innerHTML = fighters.map((fighter) => `
    <article class="fighter-card ${selectedFighter?.id === fighter.id ? 'selected' : ''}" data-id="${fighter.id}" style="--accent:${fighter.color}">
      <img src="${fighter.image}" alt="${fighter.name}">
      <div class="fighter-copy"><small>${fighter.title}</small><h3>${fighter.name}</h3><p>${fighter.desc}</p>
        <div class="stats"><span><b>${fighter.power}</b>攻擊</span><span><b>${fighter.guard}</b>防禦</span><span><b>${fighter.speed}</b>速度</span></div>
        <div class="passive"><i>被動</i>｜${fighter.passive}</div>
      </div>
    </article>`).join('');
  $$('.fighter-card').forEach((node) => node.onclick = () => {
    selectedFighter = fighters.find((fighter) => fighter.id === node.dataset.id);
    $('#selectedFighterName').textContent = `${selectedFighter.name}｜${selectedFighter.title}`;
    $('#toSupportBtn').disabled = false;
    renderFighters();
  });
}

function renderSupports() {
  $('#supportGrid').innerHTML = supports.map((support) => `
    <article class="support-card glass ${selectedSupport?.id === support.id ? 'selected' : ''}" data-id="${support.id}" style="--accent:${support.color}">
      <div class="sigil">${support.icon}</div><h3>${support.name}</h3><small>${support.title}</small><p>${support.desc}</p>
    </article>`).join('');
  $$('.support-card').forEach((node) => node.onclick = () => {
    selectedSupport = supports.find((support) => support.id === node.dataset.id);
    $('#selectedSupportName').textContent = `${selectedSupport.name}｜${selectedSupport.title}`;
    renderSupports();
  });
}

function chooseIntent() {
  if (round % 5 === 0) return clone(enemyMoves[4]);
  if (enemy.hp / enemy.maxHp < .45 && round % 3 === 0) return clone(enemyMoves[1]);
  const pool = round < 3 ? [enemyMoves[0], enemyMoves[2], enemyMoves[3]] : enemyMoves.slice(0, 4);
  return clone(pool[Math.floor(Math.random() * pool.length)]);
}

function startBattle() {
  if (!selectedFighter) return;
  player = { ...clone(selectedFighter), maxHp: selectedFighter.hp, energy: 25, block: 0, burn: 0, vulnerable: 0, weak: 0, strength: 0, thorns: 0, played: 0 };
  enemy = clone(enemyBase);
  drawPile = shuffle(clone(selectedFighter.cards)); discardPile = []; hand = [];
  round = 1; ap = 3; battleOver = false; busy = false; cardsPlayed = 0; totalDamage = 0; supportUsed = false; defendedThisTurn = false;
  $('#playerPortrait').src = player.image; $('#resultPortrait').src = player.image;
  $('#playerName').textContent = player.name; $('#playerTitle').textContent = player.title;
  $('#battleLog').innerHTML = '';
  addLog(`${player.name} 與獄骸進入第七觀測界域。`, 'system');
  if (selectedSupport) addLog(`${selectedSupport.name} 已締結支援契約。`, 'system');
  currentIntent = chooseIntent();
  drawTo(5); renderBattle(); showScreen('battleScreen');
}

function drawOne() {
  if (!drawPile.length) {
    if (!discardPile.length) return;
    drawPile = shuffle(discardPile.splice(0));
    addLog('棄牌堆重新洗入牌庫。', 'system');
  }
  if (hand.length < 8) hand.push(drawPile.pop());
}
function drawTo(amount) { while (hand.length < amount && (drawPile.length || discardPile.length)) drawOne(); }

function renderBattle() {
  $('#roundNum').textContent = round;
  $('#apValue').textContent = ap;
  $('#deckCount').textContent = drawPile.length;
  $('#discardCount').textContent = discardPile.length;
  $('#playerHpText').textContent = `${Math.ceil(player.hp)} / ${player.maxHp}`;
  $('#enemyHpText').textContent = `${Math.ceil(enemy.hp)} / ${enemy.maxHp}`;
  $('#playerEnergyText').textContent = `${Math.floor(player.energy)} / 100`;
  $('#playerHpBar').style.width = `${clamp(player.hp / player.maxHp * 100, 0, 100)}%`;
  $('#enemyHpBar').style.width = `${clamp(enemy.hp / enemy.maxHp * 100, 0, 100)}%`;
  $('#playerEnergyBar').style.width = `${clamp(player.energy, 0, 100)}%`;
  $('#intentName').textContent = `${currentIntent.icon} ${currentIntent.name}`;
  $('#intentValue').textContent = currentIntent.text;
  $('#turnLabel').textContent = busy ? '敵方行動' : '你的回合';
  $('#endTurnBtn').disabled = busy || battleOver;
  $('#playerStatus').textContent = player.burn ? `灼燒 ${player.burn}` : player.block ? `護盾 ${Math.ceil(player.block)}` : '正常';
  $('#enemyStatus').textContent = enemy.burn ? `灼燒 ${enemy.burn}` : enemy.block ? `護盾 ${Math.ceil(enemy.block)}` : '侵蝕';
  $('#playerBuffs').innerHTML = buffMarkup(player);
  $('#enemyBuffs').innerHTML = buffMarkup(enemy);
  $('#supportMini').innerHTML = selectedSupport ? `${selectedSupport.icon} 支援：<b style="color:${selectedSupport.color}">${selectedSupport.name}</b>${supportUsed ? '（已觸發）' : ''}` : '未締結支援契約';
  renderHand();
}

function buffMarkup(unit) {
  const buffs = [];
  if (unit.block) buffs.push(`護盾 ${Math.ceil(unit.block)}`);
  if (unit.burn) buffs.push(`灼燒 ${unit.burn}`);
  if (unit.vulnerable) buffs.push(`破綻 ${unit.vulnerable}`);
  if (unit.weak) buffs.push(`弱化 ${unit.weak}`);
  if (unit.strength) buffs.push(`攻擊 +${unit.strength}`);
  if (unit.thorns) buffs.push(`反響 ${unit.thorns}`);
  return buffs.map((text) => `<span>${text}</span>`).join('');
}

function renderHand() {
  $('#hand').innerHTML = hand.map((item, index) => {
    const noEnergy = (item.energyCost || 0) > player.energy;
    const disabled = busy || battleOver || item.ap > ap || noEnergy;
    const footer = item.energyCost ? `需要 ${item.energyCost} 星能` : item.energyGain ? `獲得 ${item.energyGain} 星能` : '立即生效';
    return `<article class="battle-card ${item.ultimate ? 'ultimate' : ''} ${disabled ? 'disabled' : ''}" data-index="${index}" style="--card:${item.color}">
      <span class="card-type">${item.type}</span><b class="card-cost">${item.ap}</b><div class="card-icon">${item.icon}</div><h4>${item.name}</h4><p>${item.desc}</p><footer>${footer}</footer>
    </article>`;
  }).join('');
  $$('.battle-card').forEach((node) => node.onclick = () => playCard(Number(node.dataset.index)));
}

function dealDamage(target, amount, source, bonus = false) {
  let damage = Math.round(amount);
  if (source === player) {
    damage += Math.round(player.power * .26) + player.strength;
    if (player.id === 'ember' && enemy.burn) damage = Math.round(damage * 1.18);
    if (bonus) damage = Math.round(damage * 1.3);
  } else {
    damage += enemy.strength;
    if (enemy.weak) damage = Math.round(damage * .72);
  }
  if (target.vulnerable) damage = Math.round(damage * 1.22);
  const absorbed = Math.min(target.block, damage);
  target.block -= absorbed;
  const actual = damage - absorbed;
  target.hp = clamp(target.hp - actual, 0, target.maxHp);
  if (source === player) totalDamage += actual;
  animateUnit(target === enemy ? '.enemy-unit .unit-art' : '.player-unit .unit-art', 'hit', actual || `盾-${absorbed}`);
  return { actual, absorbed };
}

function playCard(index) {
  if (busy || battleOver) return;
  const item = hand[index];
  if (!item || item.ap > ap) return toast('行動點不足');
  if ((item.energyCost || 0) > player.energy) return toast(`需要 ${item.energyCost} 星能`);
  ap -= item.ap;
  player.energy = clamp(player.energy - (item.energyCost || 0) + (item.energyGain || 0), 0, 100);
  const usedBurst = item.ultimate && selectedSupport?.type === 'burst' && !supportUsed;
  if (usedBurst) { supportUsed = true; addLog('凱發動破陣增幅：終結牌傷害提高 30%！', 'system'); }
  animateUnit('.player-unit .unit-art', 'cast', '');

  let dealt = 0;
  const hits = item.hits || 1;
  if (item.damage) for (let i = 0; i < hits; i++) dealt += dealDamage(enemy, item.damage, player, usedBurst).actual;
  if (item.block) {
    let value = item.block + Math.round(player.guard * .22);
    if (player.id === 'azure' && !defendedThisTurn) value += 24;
    player.block += value; defendedThisTurn = true;
  }
  if (item.heal) { player.hp = clamp(player.hp + item.heal, 0, player.maxHp); animateUnit('.player-unit .unit-art', 'heal', `+${item.heal}`); }
  if (item.selfDamage) player.hp = clamp(player.hp - item.selfDamage, 1, player.maxHp);
  if (item.burn) enemy.burn += item.burn;
  if (item.vuln) enemy.vulnerable += item.vuln;
  if (item.weak) enemy.weak += item.weak;
  if (item.stun) enemy.stunned += item.stun;
  if (item.strength) player.strength += item.strength;
  if (item.thorns) player.thorns = Math.max(player.thorns, item.thorns);
  if (item.draw) for (let i = 0; i < item.draw; i++) drawOne();
  if (item.drawChance && Math.random() < item.drawChance) drawOne();

  const played = hand.splice(index, 1)[0]; discardPile.push(played); cardsPlayed++; player.played++;
  if (player.id === 'lunar' && player.played % 3 === 0) { drawOne(); addLog('月相輪轉觸發：額外抽 1 張牌。', 'system'); }
  addLog(`${player.name} 使用「${item.name}」${dealt ? `，造成 ${dealt} 傷害` : ''}。`, 'player');
  if (checkEnd()) return;
  renderBattle();
}

function endPlayerTurn() {
  if (busy || battleOver) return;
  busy = true;
  discardPile.push(...hand.splice(0));
  renderBattle();
  setTimeout(enemyTurn, 520);
}

function enemyTurn() {
  if (enemy.stunned) {
    enemy.stunned--;
    addLog('獄骸受到界域束縛，本回合無法行動。', 'enemy');
  } else {
    if (currentIntent.damage) {
      const hit = dealDamage(player, currentIntent.damage, enemy);
      addLog(`獄骸使用「${currentIntent.name}」，造成 ${hit.actual} 傷害${hit.absorbed ? `，護盾吸收 ${hit.absorbed}` : ''}。`, 'enemy');
      if (player.thorns && hit.actual + hit.absorbed > 0) {
        const reflect = player.thorns; player.thorns = 0; enemy.hp = clamp(enemy.hp - reflect, 0, enemy.maxHp); totalDamage += reflect;
        animateUnit('.enemy-unit .unit-art', 'hit', reflect); addLog(`玉棘反響造成 ${reflect} 點反擊傷害。`, 'player');
      }
    }
    if (currentIntent.block) { enemy.block += currentIntent.block; addLog(`獄骸展開 ${currentIntent.block} 點骸骨屏障。`, 'enemy'); }
    if (currentIntent.burn) player.burn += currentIntent.burn;
    if (currentIntent.strength) enemy.strength += currentIntent.strength;
  }
  applyBurn(player, 'player');
  maybeHealSupport();
  if (checkEnd()) return;
  setTimeout(nextRound, 420);
}

function applyBurn(unit, side) {
  if (!unit.burn) return;
  const damage = 34 * unit.burn;
  unit.hp = clamp(unit.hp - damage, 0, unit.maxHp);
  unit.burn--;
  animateUnit(side === 'player' ? '.player-unit .unit-art' : '.enemy-unit .unit-art', 'hit', damage);
  addLog(`${unit.name} 受到 ${damage} 點灼燒傷害。`, side === 'player' ? 'enemy' : 'player');
}

function nextRound() {
  applyBurn(enemy, 'enemy');
  if (checkEnd()) return;
  if (player.id === 'jade') player.block = Math.round(player.block * .35); else player.block = 0;
  enemy.block = 0;
  if (player.vulnerable) player.vulnerable--;
  if (enemy.vulnerable) enemy.vulnerable--;
  if (player.weak) player.weak--;
  if (enemy.weak) enemy.weak--;
  round++; ap = 3; defendedThisTurn = false; player.energy = clamp(player.energy + 7, 0, 100);
  if (selectedSupport?.type === 'energy' && !supportUsed && round === 3) {
    ap += 2; player.energy = clamp(player.energy + 25, 0, 100); supportUsed = true;
    addLog('零夜發動戰術干涉：獲得 2 行動點與 25 星能！', 'system');
  }
  drawTo(5); currentIntent = chooseIntent(); busy = false; renderBattle();
}

function maybeHealSupport() {
  if (selectedSupport?.type === 'heal' && !supportUsed && player.hp / player.maxHp < .35 && player.hp > 0) {
    player.hp = clamp(player.hp + 220, 0, player.maxHp); supportUsed = true;
    animateUnit('.player-unit .unit-art', 'heal', '+220'); addLog('澪發動緊急治療：恢復 220 生命！', 'system');
  }
}

function animateUnit(selector, type, value) {
  const art = $(selector); const pop = art.querySelector('.damage-pop');
  art.classList.remove('hit', 'cast', 'heal'); void art.offsetWidth; art.classList.add(type);
  if (value !== '') pop.textContent = value;
  setTimeout(() => art.classList.remove(type), 720);
}

function addLog(text, type = 'system') {
  const row = document.createElement('div'); row.className = `log-entry ${type}`; row.textContent = text;
  $('#battleLog').prepend(row);
}

function toast(text) {
  $('#toast').textContent = text; $('#toast').classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => $('#toast').classList.remove('show'), 1500);
}

function checkEnd() {
  if (player.hp > 0 && enemy.hp > 0) return false;
  battleOver = true; busy = true; renderBattle();
  setTimeout(() => finishBattle(enemy.hp <= 0), 650);
  return true;
}

function finishBattle(win) {
  const rank = !win ? 'D' : round <= 5 ? 'S' : round <= 8 ? 'A' : 'B';
  $('#resultRank').textContent = rank;
  $('#resultTitle').textContent = win ? '界域淨化完成' : '契約者失去連結';
  $('#resultText').textContent = win ? `${player.name} 成功擊破天災級異相。你以卡牌順序與資源判斷改寫了這場決戰。` : '獄骸吞噬了星界牌陣。觀察敵方意圖、保留防禦牌，再重新挑戰。';
  $('#resultStats').innerHTML = `<div><b>${round}</b><span>戰鬥回合</span></div><div><b>${totalDamage}</b><span>總傷害</span></div><div><b>${cardsPlayed}</b><span>使用卡牌</span></div>`;
  showScreen('resultScreen');
}

$('#startBtn').onclick = () => { renderFighters(); showScreen('selectScreen'); };
$('#rulesBtn').onclick = () => { $('#rulesModal').classList.add('open'); $('#rulesModal').setAttribute('aria-hidden', 'false'); };
$('#closeRules').onclick = () => { $('#rulesModal').classList.remove('open'); $('#rulesModal').setAttribute('aria-hidden', 'true'); };
$('#rulesModal').onclick = (event) => { if (event.target.id === 'rulesModal') $('#closeRules').click(); };
$$('[data-back]').forEach((button) => button.onclick = () => showScreen(button.dataset.back));
$('#toSupportBtn').onclick = () => { selectedSupport = null; $('#selectedSupportName').textContent = '未選擇'; renderSupports(); showScreen('supportScreen'); };
$('#skipSupportBtn').onclick = () => { selectedSupport = null; $('#selectedSupportName').textContent = '無支援'; renderSupports(); };
$('#battleBtn').onclick = startBattle;
$('#endTurnBtn').onclick = endPlayerTurn;
$('#quitBtn').onclick = () => { battleOver = true; showScreen('startScreen'); };
$('#againBtn').onclick = startBattle;
$('#homeBtn').onclick = () => showScreen('startScreen');
$('#logToggle').onclick = () => $('#logPanel').classList.toggle('open');
$('#closeLog').onclick = () => $('#logPanel').classList.remove('open');

renderFighters();
