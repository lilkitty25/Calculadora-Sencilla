const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const resultInput = document.getElementById('result');
const toggleBtn = document.getElementById('toggle-button');

let activeInput = num1Input; 
let operacionActual = '';
let simboloActual = '';

// Al hacer clic, enfocamos el input
num1Input.onclick = () => setActive(num1Input);
num2Input.onclick = () => setActive(num2Input);

function setActive(el) {
    activeInput = el;
    num1Input.style.borderColor = "#333";
    num2Input.style.borderColor = "#333";
    el.style.borderColor = "#ff9800";
}

// Lógica de entrada de dígitos y decimales
function addDigit(digit) {
    if (digit === '.') {
        // Evitar múltiples puntos decimales
        if (activeInput.value.includes('.')) return;
        if (activeInput.value === '') activeInput.value = '0';
    }
    activeInput.value += digit;
}

function deleteLast() {
    activeInput.value = activeInput.value.slice(0, -1);
}

// Teclado Visual
document.querySelectorAll('.key').forEach(key => {
    key.onclick = () => {
        if (key.classList.contains('del-key')) {
            deleteLast();
        } else {
            addDigit(key.innerText);
        }
    };
});

// Selección de operación
document.querySelectorAll('.op-btn').forEach(btn => {
    btn.onclick = () => {
        operacionActual = btn.getAttribute('data-op');
        simboloActual = btn.getAttribute('data-sym');
        
        document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Saltamos al segundo número automáticamente
        setActive(num2Input);
    };
});

// Cálculo
function calculate() {
    const n1 = parseFloat(num1Input.value);
    const n2 = parseFloat(num2Input.value);
    
    if (isNaN(n1) || isNaN(n2) || !operacionActual) return;

    let res = 0;
    switch (operacionActual) {
        case '+': res = n1 + n2; break;
        case '-': res = n1 - n2; break;
        case '*': res = n1 * n2; break;
        case '/': res = n2 !== 0 ? n1 / n2 : "Error"; break;
    }
    
    // Redondear a 2 decimales si no es entero
    const finalRes = Number.isInteger(res) ? res : res.toFixed(2);
    resultInput.value = `${n1} ${simboloActual} ${n2} = ${finalRes}`;
}

document.getElementById('equal').onclick = calculate;

// Soporte para Teclado Físico
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') addDigit(e.key);
    if (e.key === '.' || e.key === ',') addDigit('.');
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearAll();
    if (e.key === 'Enter') calculate();
    
    // Operadores
    if (e.key === '+') document.querySelector('[data-op="+"]').click();
    if (e.key === '-') document.querySelector('[data-op="-"]').click();
    if (e.key === '*') document.querySelector('[data-op="*"]').click();
    if (e.key === '/') {
        e.preventDefault(); // Evita el buscador del navegador
        document.querySelector('[data-op="/"]').click();
    }
});

function clearAll() {
    num1Input.value = "";
    num2Input.value = "";
    resultInput.value = "";
    operacionActual = "";
    setActive(num1Input);
    document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('selected'));
}

document.getElementById('clear-btn').onclick = clearAll;

// Toggle Estilo
let modoSimbolos = true;
toggleBtn.onclick = () => {
    modoSimbolos = !modoSimbolos;
    document.querySelectorAll('.sym').forEach(s => s.style.display = modoSimbolos ? "inline-block" : "none");
    document.querySelectorAll('.txt').forEach(t => t.style.display = modoSimbolos ? "none" : "inline-block");
    toggleBtn.innerText = modoSimbolos ? "Cambiar a Texto 📝" : "Cambiar a Símbolos ➕";
};

// Inicio
setActive(num1Input);