let display = document.querySelector('.display h1');
let control = document.querySelector('.control');

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const signs = ['+', '-', 'X', '/', '%'];

let a = '';
let b = '';
let sign = '';

let finish = false;

const InputState = { A: 'a', B: 'b', Eq: 'eq', Zero: 'zero' };

let onInput = InputState.Zero;

function clear() {
    a = '';
    b = '';
    finish = false;
    sign = '';
    display.textContent = 0;
    onInput = InputState.Zero;
}

control.addEventListener('click', e => {
    if (!e.target.classList.contains('btn')) return;
    if (e.target.classList.contains('ac')) {
        clear();
        return;
    }
    
    console.log(a, sign, b);
    
    let key = e.target.textContent;

    display.textContent = '';

    if (digits.includes(key)) {
        if (b === '' && sign === '') {
            onInput = InputState.A;
            a += key;
            display.textContent = a;
        }
        else if (b !== '' && a !== '' && finish) {
            b = key;
            finish = false;
            display.textContent = b;
        }
        else {
            onInput = InputState.B;
            b += key;
            display.textContent = b;
        }
        return;
    }
    if (signs.includes(key)) {
        sign = key;
        display.textContent = sign;
        return;
    }

    if (key === '+/-') {
        switch (onInput) {
            case InputState.A:
            case InputState.Eq:
                a = -(a);
                display.textContent = a;
                break;
            case InputState.B:
                b = -(b);
                display.textContent = b;
                break;
            case InputState.Zero:
                display.textContent = 0;
                break;
        }
    }

    if (key === '√') {
        switch (onInput) {
            case InputState.A:
            case InputState.Eq:
                a = Math.sqrt(+a);
                display.textContent = a;
                break;
            case InputState.B:
                b = Math.sqrt(+b);
                display.textContent = b;
                break;
            case InputState.Zero:
                display.textContent = 0;
                break;
        }
    }

    if (key === '=') {

        if (onInput === InputState.Zero) {
            display.textContent = '0';
            return;
        }

        switch(sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = (+a) - (+b);
                break;
            case 'X':
                a = (+a) * (+b)
                break;
            case '/':
                a = (+a) / (+b);
                break;
            case '%':
                a = a / 100 * b;
                break;
        }
        onInput = InputState.Eq;
        display.textContent = a;
        finish = true;
    }
});