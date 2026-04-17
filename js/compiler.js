const GENERIC_CARDS = [
    { id: '1',  label: 'INT',   type: 't-type',     cat: 'tipo' },
    { id: '2',  label: 'FLOAT', type: 't-type',     cat: 'tipo' },
    { id: '3',  label: 'BOOL',  type: 't-type',     cat: 'tipo' },
    { id: '4',  label: 'STR',   type: 't-type',     cat: 'tipo' },
    { id: '5',  label: 'PRINT', type: 't-io',       cat: 'e/s' },
    { id: '6',  label: 'INPUT', type: 't-io',       cat: 'e/s' },
    { id: '7',  label: '=',     type: 't-op',       cat: 'op' },
    { id: '8',  label: '+',     type: 't-op',       cat: 'op' },
    { id: '9',  label: '-',     type: 't-op',       cat: 'op' },
    { id: '10', label: '*',     type: 't-op',       cat: 'op' },
    { id: '11', label: '/',     type: 't-op',       cat: 'op' },
    { id: '12', label: 'FOR',   type: 't-ctrl',     cat: 'ctrl' },
    { id: '13', label: 'WHILE', type: 't-ctrl',     cat: 'ctrl' },
    { id: '14', label: 'IF',    type: 't-logic',     cat: 'lógica' },
    { id: '15', label: 'ELIF',  type: 't-logic',     cat: 'lógica' },
    { id: '16', label: 'ELSE',  type: 't-logic',     cat: 'lógica' },
    { id: '17', label: 'AND',   type: 't-opCond',    cat: 'opCond' },
    { id: '18', label: 'OR',    type: 't-opCond',    cat: 'opCond' },
    { id: '(',  label: '(',     type: 't-paren',    cat: 'op' },
    { id: ')',  label: ')',     type: 't-paren',    cat: 'op' },
];

const CHALLENGES = [
    {
        id: 'ola',
        name: 'Diga Olá',
        desc: 'Obtenha o nome do usuário e escreva "Olá, <usuário>"',
        specific: [
            { id: 'A1', label: 'A1 - nome', type: 't-var', display: 'A1 (nome)' },
            { id: 'B1', label: 'B1 - "Olá, "', type: 't-val', display: 'B1 ("Olá, ")' },
        ],
        solution: [
            ['A1', '4'],
            ['A1', '7', '6'],
            ['5', 'B1', 'A1'],
        ],
        indented: [false, false, false],
    },
    {
        id: 'media',
        name: 'Média Simples',
        desc: 'Calcule a média aritmética de 2 valores informados pelo usuário e escreva o resultado',
        specific: [
            { id: 'A1', label: 'A1 - valor1', type: 't-var', display: 'A1 (valor1)' },
            { id: 'A2', label: 'A2 - valor2', type: 't-var', display: 'A2 (valor2)' },
            { id: 'A3', label: 'A3 - media', type: 't-var', display: 'A3 (media)' },
            { id: 'B1', label: 'B1 - 2', type: 't-val', display: 'B1 (2)' },
        ],
        solution: [
            ['A1', '2'],
            ['A2', '2'],
            ['A1', '7', '6'],
            ['A2', '7', '6'],
            ['A3', '2'],
            ['A3', '7', '(', 'A1', '8', 'A2', ')', '11', 'B1'],
            ['5', 'A3'],
        ],
        indented: [false, false, false, false, false, false, false],
    },
    {
        id: 'contagem',
        name: 'Contagem Regressiva',
        desc: 'Conte de 10 até 1 usando um laço de repetição',
        specific: [
            { id: 'A1', label: 'A1 - cont', type: 't-var', display: 'A1 (cont)' },
            { id: 'B1', label: 'B1 - 10', type: 't-val', display: 'B1 (10)' },
            { id: 'B2', label: 'B2 - 1', type: 't-val', display: 'B2 (1)' },
            { id: 'C1', label: 'C1 - cont >= 1', type: 't-cond', display: 'C1 (cont >= 1)' },
        ],
        solution: [
            ['A1', '1'],
            ['A1', '7', 'B1'],
            ['13', 'C1'],
            ['5', 'A1'],
            ['A1', '7', 'A1', '9', 'B2'],
        ],
        indented: [false, false, false, true, true],
    },
];

function renderPalette() {
    if (!currentChallenge) return;
    const body = document.getElementById('palette-body');
    body.innerHTML = '';

    const cats = {};
    GENERIC_CARDS.forEach(c => {
        if (!cats[c.cat]) cats[c.cat] = [];
        cats[c.cat].push(c);
    });

    const catLabels = { 
        tipo: 'tipos', 
        'e/s': 'entrada / saída', 
        op: 'operadores', 
        ctrl: 'controle', 
        lógica: 'lógica', 
        opCond: 'condição' 
    };

    // Função auxiliar para criar o elemento da carta (chip)
    const createCardChip = (c) => {
        const span = document.createElement('span');
        
        // Adiciona as classes básicas
        span.classList.add('card-chip', c.type);
        
        // Verifica se está selecionado
        if (selectedCard && selectedCard.id === c.id) {
            span.classList.add('selected-to-place');
        }

        // Configurações de texto e atributos (Protege contra "<")
        span.textContent = c.label; 
        span.title = c.display || ''; // Atributo title (tooltip)
        span.setAttribute('data-id', c.id);
        
        // Estilos inline que você já usava
        span.style.lineHeight = '1.2';
        span.style.textAlign = 'center';
        span.style.whiteSpace = 'pre';

        // Evento de clique
        span.onclick = () => cardClicked(c.id);

        return span;
    };

    // Função para criar uma seção da paleta
    const createSection = (title, cards) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'palette-section';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'palette-section-title';
        titleDiv.textContent = `// ${title}`;

        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'palette-cards';

        cards.forEach(c => {
            cardsContainer.appendChild(createCardChip(c));
        });

        sectionDiv.appendChild(titleDiv);
        sectionDiv.appendChild(cardsContainer);
        return sectionDiv;
    };

    // 1. Renderiza a seção específica do desafio
    const specificSection = createSection('cartas do desafio', currentChallenge.specific);
    body.appendChild(specificSection);

    // 2. Renderiza as categorias genéricas
    Object.keys(cats).forEach(cat => {
        const title = catLabels[cat] || cat;
        const genericSection = createSection(title, cats[cat]);
        body.appendChild(genericSection);
    });
}

function selectChallenge(id) {
    currentChallenge = CHALLENGES.find(c => c.id === id);
    lines = [];
    selectedCard = null;
    // document.getElementById('result-box').style.display = 'none';

    document.querySelectorAll('.challenge-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-id="${id}"]`).classList.add('active');

    // info box
    document.getElementById('ci-title').textContent = currentChallenge.name;
    document.getElementById('ci-desc').textContent = currentChallenge.desc;

    renderPalette();
    // renderBuild();
}

let currentChallenge = null;
let lines = [];

document.addEventListener('DOMContentLoaded', function () {
    const list = document.getElementById('challenges-list');

    CHALLENGES.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'challenge-btn';

        btn.setAttribute('data-id', c.id);

        btn.onclick = () => selectChallenge(c.id);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'ch-name';
        nameDiv.textContent = c.name;

        const descDiv = document.createElement('div');
        descDiv.className = 'ch-desc';
        descDiv.textContent = c.desc;

        btn.appendChild(nameDiv);
        btn.appendChild(descDiv);
        list.appendChild(btn);
    });
});