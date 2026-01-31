const toggleTheme = document.getElementById('toggle-theme');
const billInput = document.getElementById('bill');
const customTip = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const perPerson = document.getElementById('per-person');
const reset = document.getElementById('reset');
const tipBtns = document.querySelectorAll('.tip-btn');

let selectedTip = 5;

tipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedTip = parseFloat(btn.innerText.replace("%", ""));
        customTip.value = "";
        calculate();
    })
});

customTip.addEventListener("input", () => {
    selectedTip = parseFloat(customTip.value);
    calculate();
});

[billInput, peopleInput].forEach(input => {
    input.addEventListener("input", calculate);
});

reset.addEventListener("click", () => {
    billInput.value = "";
    people.value = "";
    customTip.value = "";
    selectedTip = 5;
    updateUI(0, 0, 0);
});

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    toggleTheme.textContent = document.body.classList.contains("light") ? "🌙 Toggle Theme" : "☀️ Toggle Theme";
});

function calculate() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);
    if (!bill | bill <= 0 || !people || people <= 0) {
        updateUI(0,0,0);
        return;
    }

    const tip = bill * (selectedTip / 100);
    const total = bill + tip;
    const per = total / people;

    updateUI(tip, total, per);
}

function updateUI(tip, total, per) {
    tipAmount.innerText = tip.toFixed(2);
    totalAmount.innerText = total.toFixed(2);
    perPerson.innerText = per.toFixed(2);
}