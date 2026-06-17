// AUDIO
const audio = {
    success: new Audio('audio/success.mp3'),
    error:   new Audio('audio/error.mp3'),
};

function playSound(type) {
    const s = audio[type];
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(() => {});
}


// EFEITOS VISUAIS
function launchConfetti() {
    const colors = ['#3fb950', '#58a6ff', '#f78166', '#ffa657', '#d2a8ff'];
    
    for (let i = 0; i < 80; i++) {
        const el = document.createElement('div');
        el.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}vw;
            width: ${6 + Math.random() * 6}px;
            height: ${6 + Math.random() * 6}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${1.5 + Math.random() * 1.5}s ease-in forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }
}

function shakeScreen() {
    document.body.style.animation = 'shake 0.5s ease';
    document.body.addEventListener('animationend', () => {
        document.body.style.animation = '';
    }, { once: true });
}

(function injectCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes shake {
            0%,100% { transform: translateX(0); }
            15%     { transform: translateX(-8px); }
            30%     { transform: translateX(8px); }
            45%     { transform: translateX(-6px); }
            60%     { transform: translateX(6px); }
            75%     { transform: translateX(-3px); }
            90%     { transform: translateX(3px); }
        }
    `;
    document.head.appendChild(style);
})();


// DIFICULDADE
const DIFFICULTY_BUGS   = { easy: 2, medium: 3, hard: 4 };
const DIFFICULTY_LABEL  = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };


// DATA
const GENERIC_CARDS = [
    { id: '1',  label: 'INT',   type: 't-type'   },
    { id: '2',  label: 'FLOAT', type: 't-type' },
    { id: '3',  label: 'BOOL',  type: 't-type'  },
    { id: '4',  label: 'STR',   type: 't-type'   },
    { id: '5',  label: 'PRINT', type: 't-io'    },
    { id: '6',  label: 'INPUT', type: 't-io'    },
    { id: '7',  label: '=',     type: 't-op'    },
    { id: '8',  label: '+',     type: 't-op'    },
    { id: '9',  label: '-',     type: 't-op'    },
    { id: '10', label: '*',     type: 't-op'    },
    { id: '11', label: '/',     type: 't-op'    },
    { id: '12', label: 'FOR',   type: 't-ctrl'  },
    { id: '13', label: 'WHILE', type: 't-ctrl'  },
    { id: '14', label: 'IF',    type: 't-logic'  },
    { id: '15', label: 'ELIF',  type: 't-logic'  },
    { id: '16', label: 'ELSE',  type: 't-logic'  },
    { id: '17', label: 'AND',   type: 't-opCond' },
    { id: '18', label: 'OR',    type: 't-opCond' },
    { id: '(',  label: '(',     type: 't-paren' },
    { id: ')',  label: ')',     type: 't-paren' },
];

const CHALLENGES = [
    {
        id: 'ola',
        name: 'Diga Olá',
        difficulty: 'easy',
        desc: 'Obtenha o nome do usuário e escreva "Olá, <usuário>"',
        specific: [
            { id: 'A1', label: 'A1', sublabel: 'nome',     type: 't-var' },
            { id: 'B1', label: 'B1', sublabel: '"Olá, "',  type: 't-val' },
        ],
        solution: [
            { cards: ['A1', '4'],        indent: 0 },
            { cards: ['A1', '7', '6'],   indent: 0 },
            { cards: ['5', 'B1', 'A1'],  indent: 0 },
        ],
    },
    {
        id: 'media',
        name: 'Média Simples',
        difficulty: 'easy',
        desc: 'Calcule a média aritmética de 2 valores informados pelo usuário e escreva o resultado',
        specific: [
            { id: 'A1', label: 'A1', sublabel: 'valor1', type: 't-var' },
            { id: 'A2', label: 'A2', sublabel: 'valor2', type: 't-var' },
            { id: 'A3', label: 'A3', sublabel: 'media',  type: 't-var' },
            { id: 'B1', label: 'B1', sublabel: '2',      type: 't-val' },
        ],
        solution: [
            { cards: ['A1', '2'],                                           indent: 0 },
            { cards: ['A2', '2'],                                           indent: 0 },
            { cards: ['A1', '7', '6'],                                      indent: 0 },
            { cards: ['A2', '7', '6'],                                      indent: 0 },
            { cards: ['A3', '2'],                                           indent: 0 },
            { cards: ['A3', '7', '(', 'A1', '8', 'A2', ')', '11', 'B1'],    indent: 0 },
            { cards: ['5', 'A3'],                                           indent: 0 },
        ],
    },
    {
        id: 'contagem',
        name: 'Contagem Regressiva',
        difficulty: 'medium',
        desc: 'Conte de 10 até 1 usando um laço de repetição',
        specific: [
            { id: 'A1', label: 'A1', sublabel: 'cont',     type: 't-var'  },
            { id: 'B1', label: 'B1', sublabel: '10',       type: 't-val'  },
            { id: 'B2', label: 'B2', sublabel: '1',        type: 't-val'  },
            { id: 'C1', label: 'C1', sublabel: 'cont >= 1',type: 't-cond' },
        ],
        solution: [
            { cards: ['A1', '1'],                   indent: 0 },
            { cards: ['A1', '7', 'B1'],             indent: 0 },
            { cards: ['13', 'C1'],                  indent: 0 },
            { cards: ['5', 'A1'],                   indent: 1 },
            { cards: ['A1', '7', 'A1', '9', 'B2'],  indent: 1 },
        ],
    },
    {
        id: 'correcao_provas',
        name: 'Correção de Provas',
        difficulty: 'hard',
        desc: 'Calcule a média de 3 alunos e informe se cada um foi aprovado ou reprovado (média 7.0)',
        specific: [
            { id: 'A1', label: 'A1', sublabel: 'media',             type: 't-var'  },
            { id: 'B1', label: 'B1', sublabel: '3',                 type: 't-val'  },
            { id: 'B2', label: 'B2', sublabel: '"Aprovado"',        type: 't-val'  },
            { id: 'B3', label: 'B3', sublabel: '"Reprovado"',       type: 't-val'  },
            { id: 'C1', label: 'C1', sublabel: 'media >= 7.0',      type: 't-cond' },
            { id: 'F2', label: 'F2', sublabel: 'media_simples()',   type: 't-func' },
        ],
        solution: [
            { cards: ['A1', '2'],       indent: 0 },
            { cards: ['12', 'B1'],      indent: 0 },
            { cards: ['A1', '7', 'F2'], indent: 1 },
            { cards: ['14', 'C1'],      indent: 1 },
            { cards: ['5', 'B2'],       indent: 2 },
            { cards: ['16'],            indent: 1 },
            { cards: ['5', 'B3'],       indent: 2 },
        ],
    },
];

let currentChallenge = null;


// INICIALIZAÇÃO
(function init() {
    const sidebar  = document.getElementById('challenge-list');
    const selectEl = document.getElementById('challenge-select');

    sidebar.innerHTML = CHALLENGES.map(c => `
        <button class="challenge-btn" data-id="${c.id}" onclick="selectChallenge('${c.id}')">
            <div class="ch-title">
                <div class="ch-name">${c.name}</div>
                <img class="ch-difficulty" src="images/${c.difficulty}.png" alt="Dificuldade: ${DIFFICULTY_LABEL[c.difficulty]}" />
            </div>
            <div class="ch-desc">${c.desc}</div>
        </button>
    `).join('');

    selectEl.innerHTML = '<option value="">-- selecione um desafio --</option>' +
        CHALLENGES.map(c => `<option value="${c.id}" class="${c.difficulty}">
            ${c.name}
        </option>`).join('');

    selectEl.onchange = () => { if (selectEl.value) selectChallenge(selectEl.value); };
})();


// SELECIONAR DESAFIO
function selectChallenge(id) {
    const emptyState = document.getElementById('textarea-empty-state');
    if (emptyState) emptyState.style.display = 'none';
    
    currentChallenge = CHALLENGES.find(c => c.id === id);

    document.querySelectorAll('.challenge-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`[data-id="${id}"]`);
    if (btn) btn.classList.add('active');

    const sel = document.getElementById('challenge-select');
    if (sel) sel.value = id;

    code = document.getElementById('code-input');
    code.placeholder = "Digite a sequência de cartas.\nEx: A1 2\n    A1 7 6\n    5 B1 A1";
    code.value = '';
    hideResult();

    const info = document.getElementById('challenge-info');
    info.style.display = 'block';
    document.getElementById('ci-name').textContent = currentChallenge.name;
    document.getElementById('ci-desc').textContent = currentChallenge.desc;

    const img = document.getElementById('ci-difficulty');
    img.src = `images/${currentChallenge.difficulty}.png`;
    img.alt = `Dificuldade: ${DIFFICULTY_LABEL[currentChallenge.difficulty]}`;

    const sc = document.getElementById('ci-specific-cards');
    sc.innerHTML = currentChallenge.specific.map(c => `
        <span class="card-chip ${c.type}" title="${c.id} = ${c.sublabel}">
            [${c.label}] ${c.sublabel}
        </span>
    `).join('');
}


// ANALISAR O INPUT
// Os símbolos "|" iniciais definem o nível de indentação:
//   "A1 2"      → indent 0
//   "| A1 7"    → indent 1
//   "| | 5 B2"  → indent 2
function parseInput() {
    const raw = document.getElementById('code-input').value;

    return raw.split('\n')
        .map(line => {
            const tokens = line.trim().split(/\s+/).filter(Boolean);
            let indent = 0;
            while (tokens.length > 0 && tokens[0] === '|') {
                indent++;
                tokens.shift();
            }
            return { indent, cards: tokens };
        })
        .filter(line => line.cards.length > 0);
}

function clearInput() {
    document.getElementById('code-input').value = '';
}

// CARTAS NO HTML
function getCardDef(id) {
    const g = GENERIC_CARDS.find(c => c.id === id);
    if (g) return g;
    if (currentChallenge) {
        const s = currentChallenge.specific.find(c => c.id === id);
        if (s) return s;
    }
    
    return { id, label: id, type: 't-paren' };
}

function renderChip(cardId) {
    const c = getCardDef(cardId);
    return `<span class="card-chip ${c.type}">${c.label}</span>`;
}


// MODAL DE CONFIRMAÇÃO
const INDENT_COLORS = ['#58a6ff', '#3fb950', '#ffa657'];

function openConfirmModal(parsedLines) {
    const body = document.getElementById('modal-preview');

    body.innerHTML = parsedLines.map((line, i) => {
        // const paddingLeft  = line.indent * 1.5;
        // const borderColor  = line.indent > 0 ? INDENT_COLORS[(line.indent - 1) % INDENT_COLORS.length] : 'transparent';

        // const indentStyle  = line.indent > 0
        //     ? `padding-left:${paddingLeft}rem;border-left:2px solid ${borderColor};margin-left:0.5rem`
        //     : '';

        // const chips = line.cards.map(renderChip).join(' ');
        // return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;${indentStyle}">
        //     <span style="color:var(--text2);font-size:11px;width:18px;flex-shrink:0">${i + 1}</span>
        //     <div style="display:flex;flex-wrap:wrap;gap:3px;">${chips}</div>
        // </div>`;
        const borderColor = line.indent > 0 ? INDENT_COLORS[(line.indent - 1) % INDENT_COLORS.length] : 'transparent';
        const chipsIndent = line.indent > 0
            ? `margin-left:${line.indent * 1.2}rem; border-left:2px solid ${borderColor}; padding-left:0.5rem`
            : '';
        const chips = line.cards.map(renderChip).join(' ');
        return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="color:var(--text2);font-size:11px;width:18px;flex-shrink:0;">${i + 1}</span>
            <div style="display:flex;flex-wrap:wrap;gap:3px;${chipsIndent}">${chips}</div>
        </div>`;
    }).join('');

    document.getElementById('compile-modal').style.display = 'inline-block';
}

function closeModal() {
    document.getElementById('compile-modal').style.display = 'none';
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('compile-modal');
    if (e.target === modal) closeModal();
});


// COMPILAR
function preCompile() {
    if (!currentChallenge) {
        showResultModal('partial', '⚠ nenhum desafio selecionado', 'Selecione um desafio antes de compilar.');
        return;
    }

    const parsed = parseInput();
    if (parsed.length === 0) {
        showResultModal('partial', '⚠ código vazio', 'Digite a sequência de cartas antes de compilar.');
        return;
    }
    openConfirmModal(parsed);
}

function confirmCompile() {
    closeModal();

    const parsed   = parseInput();
    console.log(parsed);
    const solution = currentChallenge.solution;
    const bugs      = DIFFICULTY_BUGS[currentChallenge.difficulty];
    const diffLabel = DIFFICULTY_LABEL[currentChallenge.difficulty];
    const bugMsg    = `Bugs Simples gerados:
                    <div class="generated-bugs">
                        +${bugs} <img src="images/bug.ico" alt="Bug Simples" />
                    </div>`;

    if (parsed.length !== solution.length) {
        playSound('error');
        shakeScreen();
        showResultModal('error',
            '✕ erro de compilação!',
            `Número de linhas incorreto.<br>Seu código tem ${parsed.length} linha(s), mas o algoritmo correto tem ${solution.length}.<br><br>${bugMsg}`
        );
        return;
    }

    const errors = [];
    parsed.forEach((line, i) => {
        const sol           = solution[i];
        const cardsMatch    = JSON.stringify(line.cards) === JSON.stringify(sol.cards);
        const indentMatch   = line.indent === sol.indent;

        if (!cardsMatch || !indentMatch) {
            let msg = `Linha ${i + 1}:`;
            if (!indentMatch) msg += ` indentação incorreta.`;
            if (!cardsMatch)  msg += ` sequência de cartas incorreta.`;
            errors.push(msg);
        }
    });

    if (errors.length === 0) {
        playSound('success');
        launchConfetti();
        showResultModal('success',
            '✓ compilado com sucesso!',
            `Algoritmo correto!<br>O módulo <strong>${currentChallenge.name}</strong> foi entregue.<br><br>Nenhum bug gerado.`
        );

    } else {
        playSound('error');
        shakeScreen();
        showResultModal('error',
            '✕ erro de compilação!',
            `${errors.join('<br>')}<br><br>${bugMsg}`
        );
    }
}


// MODAL DE RESULTADO
function showResultModal(type, title, detail) {
    const modal     = document.getElementById('result-modal');
    const box       = document.getElementById('result-modal-box');
    const titleEl   = document.getElementById('result-modal-title');
    const detailEl  = document.getElementById('result-modal-detail');

    box.className       = `result-modal-box ${type}`;
    titleEl.innerHTML   = title;
    detailEl.innerHTML  = detail;
    modal.style.display = 'flex';
}

function closeResultModal() {
    document.getElementById('result-modal').style.display = 'none';
}

function hideResult() {
    closeResultModal();
}


// PAINEL GUIA
function toggleGuide() {
    const panel = document.getElementById('guide-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}