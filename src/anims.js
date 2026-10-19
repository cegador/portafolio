import React from 'react';

export function buildAnims() {
    const E = React.createElement, C = 'currentColor';
    const fb = o => Object.assign({ transformBox: 'fill-box' }, o);
    const svg = kids => E('svg', { viewBox: '0 0 200 96', 'aria-hidden': true, style: { display: 'block', width: '100%', maxWidth: 220, height: 'auto', overflow: 'visible' } }, kids);
    const st = (o = {}) => Object.assign({ fill: 'none', stroke: C, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }, o);
    const motion = (d, dur, begin) => [
      E('animateMotion', { key: 'm', path: d, dur, begin, repeatCount: 'indefinite' }),
      E('animate', { key: 'o', attributeName: 'opacity', values: '0;1;1;0', keyTimes: '0;0.1;0.85;1', dur, begin, repeatCount: 'indefinite' })];
    const pk = (k, d, dur, begin, hollow) => E('rect', { key: k, x: -4, y: -4, width: 8, height: 8, rx: 2, opacity: 0, fill: hollow ? 'none' : C, stroke: hollow ? C : 'none', strokeWidth: 1.5 }, motion(d, dur, begin));
    const dot = (k, d, dur, begin) => E('circle', { key: k, r: 2.5, fill: C, opacity: 0 }, motion(d, dur, begin));
    const belt = (k, x, y, w) => [
      E('rect', { key: k + 'b', x, y, width: w, height: 10, rx: 5, ...st({ strokeOpacity: 0.5 }) }),
      E('path', { key: k + 'd', d: 'M' + (x + 6) + ' ' + (y + 5) + ' H' + (x + w - 6), ...st({ strokeDasharray: '3 5', strokeOpacity: 0.6 }), style: { animation: 'es-belt .6s linear infinite' } })];
    const robot = (k, x, y, w, hh) => E('g', { key: k }, [
      E('rect', { key: 'h', x, y, width: w, height: hh, rx: hh * 0.3, ...st() }),
      ...[0.34, 0.66].map((p, i) => E('circle', { key: 'e' + i, cx: x + w * p, cy: y + hh * 0.5, r: Math.max(1.6, hh * 0.09), fill: C, style: fb({ transformOrigin: '50% 50%', animation: 'es-blink 3.2s ease-in-out infinite', animationDelay: (k.length * 0.3) + 's' }) })),
      E('path', { key: 'a', d: 'M' + (x + w / 2) + ' ' + y + ' v-6', ...st() }),
      E('circle', { key: 'ad', cx: x + w / 2, cy: y - 8, r: 2, fill: C, style: { animation: 'es-node 1.6s ease-in-out infinite' } })]);

    const informes = svg([
      E('ellipse', { key: 'dbt', cx: 22, cy: 26, rx: 14, ry: 5, ...st() }),
      E('path', { key: 'db', d: 'M8 26 v26 a14 5 0 0 0 28 0 v-26 M8 39 a14 5 0 0 0 28 0', ...st() }),
      ...belt('b', 40, 66, 104),
      ...[0, 1, 2].map(k => pk('p' + k, 'M30 50 Q40 60 52 61 H146', '2.4s', (k * 0.8) + 's')),
      E('g', { key: 'pg', style: fb({ animation: 'es-print 2.4s ease-out infinite' }) }, [
        E('rect', { key: 'r', x: 158, y: 20, width: 22, height: 28, rx: 2, ...st({ fill: '#00000000' }) }),
        E('path', { key: 'l', d: 'M162 27 h10 M162 33 h14 M162 39 h12', ...st({ strokeOpacity: 0.6 }) })]),
      E('rect', { key: 'pr', x: 148, y: 46, width: 44, height: 30, rx: 6, ...st() }),
      E('path', { key: 'sl', d: 'M156 46 H184', ...st({ strokeWidth: 3 }) }),
      E('circle', { key: 'led', cx: 184, cy: 60, r: 2.5, fill: C, style: { animation: 'es-node 1.2s ease-in-out infinite' } })]);

    const calidad = svg([
      ...belt('b', 4, 66, 192),
      E('path', { key: 'g', d: 'M90 66 V24 a6 6 0 0 1 6 -6 H120 a6 6 0 0 1 6 6 V66', ...st() }),
      E('text', { key: 't', x: 108, y: 34, textAnchor: 'middle', fill: C, style: { font: '500 9px "IBM Plex Mono",monospace', letterSpacing: '.08em' } }, 'PY'),
      E('path', { key: 'beam', d: 'M96 38 H120', ...st({ strokeWidth: 2 }), style: fb({ animation: 'es-beam 1.6s ease-in-out infinite' }) }),
      E('path', { key: 'bin', d: 'M164 8 H192 M168 8 l2 20 h16 l2 -20', ...st() }),
      ...[0, 1, 2].map(k => pk('ok' + k, 'M0 61 H200', '3s', (k * 1) + 's')),
      pk('bad', 'M0 61 H108 Q118 40 160 22 L178 18', '3s', '1.5s', true)]);

    const nodes = [[10, 14], [16, 48], [10, 82], [48, 26], [48, 72]];
    const alertas = svg([
      ...nodes.map(([x, y], i) => E('path', { key: 'e' + i, d: 'M' + x + ' ' + y + ' L82 48', ...st({ strokeOpacity: 0.3, strokeWidth: 1 }) })),
      E('path', { key: 'hm', d: 'M82 48 H118', ...st({ strokeOpacity: 0.3, strokeWidth: 1 }) }),
      ...nodes.map(([x, y], i) => E('circle', { key: 'n' + i, cx: x, cy: y, r: 4, ...st() })),
      E('circle', { key: 'hub', cx: 82, cy: 48, r: 6, fill: C }),
      ...nodes.map(([x, y], i) => dot('d' + i, 'M' + x + ' ' + y + ' L82 48 L118 48', '2s', (i * 0.4) + 's')),
      E('rect', { key: 'mon', x: 118, y: 18, width: 74, height: 52, rx: 6, ...st() }),
      E('path', { key: 'std', d: 'M155 70 v8 M143 80 h24', ...st() }),
      E('path', { key: 'ln', d: 'M124 56 L134 53 L142 57 L150 51 L158 55 L164 28 L170 55 L178 52 L186 54', ...st({ strokeDasharray: 120 }), style: { animation: 'es-draw 3.6s ease-out infinite' } }),
      E('circle', { key: 'al', cx: 164, cy: 28, r: 3.5, fill: C, style: fb({ transformOrigin: '50% 50%', animation: 'es-pulse 1.2s ease-in-out infinite' }) })]);

    const L = [[16, [18, 48, 78]], [66, [12, 36, 60, 84]], [116, [30, 66]], [170, [48]]];
    const edges = [];
    L.forEach(([x1, ys], li) => { if (li < 3) ys.forEach(y1 => L[li + 1][1].forEach(y2 => edges.push(E('path', { key: 'e' + li + '-' + y1 + '-' + y2, d: 'M' + x1 + ' ' + y1 + ' L' + L[li + 1][0] + ' ' + y2, ...st({ strokeOpacity: 0.22, strokeWidth: 1 }) })))); });
    const routes = [[0, 1, 0], [1, 2, 1], [2, 3, 1], [1, 0, 0], [0, 2, 1], [2, 1, 0]];
    const red = svg([
      ...edges,
      ...routes.map(([a, b, c], k) => dot('r' + k, 'M16 ' + L[0][1][a] + ' L66 ' + L[1][1][b] + ' L116 ' + L[2][1][c] + ' L170 48', '2.4s', (k * 0.4) + 's')),
      ...L.flatMap(([x, ys], li) => ys.map(y => E('circle', { key: 'n' + li + '-' + y, cx: x, cy: y, r: li === 3 ? 9 : 5, fill: li === 3 ? 'none' : C, stroke: C, strokeWidth: 1.5, style: li === 3 ? undefined : { animation: 'es-node 2.4s ease-in-out infinite', animationDelay: (li * 0.5) + 's', opacity: 0.35 } }))),
      E('text', { key: 't', x: 170, y: 51, textAnchor: 'middle', fill: C, style: { font: '500 8px "IBM Plex Mono",monospace' } }, '₿')]);

    const tareas = svg([
      robot('rb', 12, 30, 46, 38),
      E('path', { key: 'arm', d: 'M58 56 H74', ...st() }),
      ...[0, 1, 2].map(k => dot('d' + k, 'M74 56 H110', '1.2s', (k * 0.4) + 's')),
      E('rect', { key: 'doc', x: 112, y: 8, width: 76, height: 80, rx: 6, ...st() }),
      ...[[20, 52], [32, 60], [44, 40], [56, 56], [68, 30]].map(([y, w], k) => E('rect', { key: 'l' + k, x: 122, y, width: w, height: 5, rx: 2.5, fill: C, fillOpacity: k === 0 ? 1 : 0.45, style: fb({ transformOrigin: '0% 50%', animation: 'es-type 5s ease-out infinite', animationDelay: (k * 0.5) + 's', transform: 'scaleX(0)' }) }))]);

    const ag = [16, 48, 80];
    const chat = svg([
      E('path', { key: 'u', d: 'M6 36 h26 a6 6 0 0 1 6 6 v8 a6 6 0 0 1 -6 6 h-18 l-6 6 v-6 a6 6 0 0 1 -2 -4 v-10 a6 6 0 0 1 6 -6 z', ...st() }),
      E('path', { key: 'uc', d: 'M38 48 H70', ...st({ strokeOpacity: 0.3, strokeWidth: 1 }) }),
      ...ag.map((y, i) => E('path', { key: 'c' + i, d: 'M102 48 L150 ' + y, ...st({ strokeOpacity: 0.3, strokeWidth: 1 }) })),
      robot('orq', 70, 36, 32, 26),
      ...ag.map((y, i) => robot('a' + i + 'xx', 150, y - 9, 26, 18)),
      dot('in', 'M38 48 H70', '1s', '0s'),
      ...ag.map((y, i) => dot('go' + i, 'M102 48 L150 ' + y + ' L102 48', '2s', (0.6 + i * 0.7) + 's')),
      dot('out', 'M70 48 H38', '1s', '2.6s')]);

    const cols = ['R', 'A', 'C', 'I'], cx = [64, 98, 132, 166];
    const raci = svg([
      ...cols.map((c, i) => E('text', { key: 't' + c, x: cx[i], y: 14, textAnchor: 'middle', fill: C, style: { font: '500 11px "IBM Plex Mono",monospace' } }, c)),
      ...[0, 1, 2].map(j => E('rect', { key: 'p' + j, x: 8, y: 26 + j * 22, width: 34, height: 6, rx: 3, fill: C, fillOpacity: 0.45 })),
      ...[0, 1, 2].flatMap(j => cx.map((x, i) => E('rect', { key: 'c' + j + i, x: x - 12, y: 20 + j * 22, width: 24, height: 18, rx: 4, ...st({ strokeOpacity: 0.35, strokeWidth: 1 }) }))),
      ...[[0, 0], [0, 1], [1, 2], [1, 0], [2, 3], [2, 1]].map(([j, i], k) => E('circle', { key: 'm' + k, cx: cx[i], cy: 29 + j * 22, r: 5, fill: C, style: { animation: 'es-ok 4s linear infinite', animationDelay: (k * 0.35 - 2) + 's', opacity: 0 } }))]);
    const lx = [10, 74, 138];
    const linear = svg([
      ...lx.map((x, i) => E('g', { key: 'col' + i }, [
        E('rect', { key: 'b', x, y: 4, width: 54, height: 88, rx: 6, ...st({ strokeOpacity: 0.35, strokeWidth: 1 }) }),
        E('rect', { key: 'h', x: x + 8, y: 12, width: i === 2 ? 22 : 30, height: 4, rx: 2, fill: C, fillOpacity: 0.6 }),
        E('rect', { key: 'k', x: x + 6, y: 58, width: 42, height: 14, rx: 3, fill: C, fillOpacity: 0.25 })])),
      E('g', { key: 'mv', opacity: 0 }, [E('rect', { key: 'r', x: -21, y: -7, width: 42, height: 14, rx: 3, fill: C }),
        E('animateMotion', { key: 'm', path: 'M37 34 L37 34 L101 34 L101 34 L165 34 L165 34', keyTimes: '0;0.15;0.4;0.55;0.8;1', keyPoints: '0;0;0.5;0.5;1;1', calcMode: 'linear', dur: '4s', repeatCount: 'indefinite' }),
        E('animate', { key: 'o', attributeName: 'opacity', values: '0;1;1;0', keyTimes: '0;0.08;0.9;1', dur: '4s', repeatCount: 'indefinite' })])]);
    const docs = svg([
      robot('dr', 10, 34, 40, 32),
      ...[0, 1, 2].map(k => dot('d' + k, 'M52 50 H82', '1.2s', (k * 0.4) + 's')),
      E('rect', { key: 'doc', x: 84, y: 6, width: 106, height: 84, rx: 6, ...st() }),
      ...[0, 1, 2, 3].flatMap(k => [
        E('rect', { key: 'b' + k, x: 94, y: 16 + k * 18, width: 10, height: 10, rx: 2, ...st({ strokeWidth: 1.2 }) }),
        E('path', { key: 'k' + k, d: 'M96 ' + (21 + k * 18) + 'l2.5 2.5 4-5', ...st({ strokeWidth: 1.6 }), style: { animation: 'es-ok 4s linear infinite', animationDelay: (k * 0.5 - 2.2) + 's', opacity: 0 } }),
        E('rect', { key: 'l' + k, x: 112, y: 19 + k * 18, width: [64, 50, 58, 40][k], height: 4, rx: 2, fill: C, fillOpacity: 0.5, style: fb({ transformOrigin: '0% 50%', animation: 'es-type 4s ease-out infinite', animationDelay: (k * 0.5) + 's', transform: 'scaleX(0)' }) })])]);
    const mainC = [16, 48, 152, 184], brC = [[78, 22], [104, 22], [128, 22]];
    const git = svg([
      E('rect', { key: 'spec', x: 6, y: 62, width: 40, height: 28, rx: 4, ...st({ strokeWidth: 1.2 }) }),
      E('path', { key: 'sl', d: 'M12 70 h22 M12 76 h28 M12 82 h16', ...st({ strokeOpacity: 0.6, strokeWidth: 1.2 }) }),
      E('path', { key: 'main', d: 'M16 56 H184', ...st({ strokeOpacity: 0.5 }) }),
      E('path', { key: 'br', d: 'M48 56 C60 56 62 22 78 22 H128 C144 22 144 56 152 56', ...st({ strokeOpacity: 0.5 }) }),
      ...mainC.map((x, k) => E('circle', { key: 'm' + k, cx: x, cy: 56, r: 5, fill: C, style: { animation: 'es-node 3s ease-in-out infinite', animationDelay: (k * 0.5) + 's', opacity: 0.35 } })),
      ...brC.map(([x, y], k) => E('circle', { key: 'b' + k, cx: x, cy: y, r: 5, fill: '#dcdaf0', stroke: C, strokeWidth: 1.5, style: { animation: 'es-ok 3s linear infinite', animationDelay: (k * 0.3 - 1.8) + 's', opacity: 0 } })),
      dot('pk', 'M16 56 H48 C60 56 62 22 78 22 H128 C144 22 144 56 152 56 H184', '3s', '0s')]);
    const bars = [[0, 30], [1, 46], [2, 22], [3, 56], [4, 38]];
    const bi = svg([
      robot('bir', 8, 34, 40, 32),
      ...[0, 1, 2].map(k => dot('d' + k, 'M50 50 H82', '1.2s', (k * 0.4) + 's')),
      E('rect', { key: 'scr', x: 84, y: 6, width: 108, height: 84, rx: 6, ...st() }),
      E('rect', { key: 'kpi', x: 94, y: 14, width: 26, height: 12, rx: 3, fill: C, fillOpacity: 0.4 }),
      E('rect', { key: 'kpi2', x: 126, y: 14, width: 26, height: 12, rx: 3, fill: C, fillOpacity: 0.4 }),
      E('path', { key: 'ax', d: 'M94 82 H182', ...st({ strokeOpacity: 0.4, strokeWidth: 1 }) }),
      ...bars.map(([k, v]) => E('rect', { key: 'b' + k, x: 98 + k * 17, y: 80 - v * 0.9, width: 11, height: v * 0.9, rx: 2, fill: C, fillOpacity: k === 3 ? 1 : 0.5, style: fb({ transformOrigin: '50% 100%', animation: 'es-grow 3s ease-in-out infinite', animationDelay: (k * 0.2) + 's' }) }))]);
    return { animBI: bi, animGit: git, animRaci: raci, animLinear: linear, animDocs: docs, anim70h: informes, animCalidad: calidad, animAlertas: alertas, animRed: red, animTareas: tareas, animChat: chat };
  }
