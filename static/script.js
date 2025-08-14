let userPoints = 25000;
let ownedBenefits = [];

function updateUI() {
    document.getElementById('points').textContent = userPoints;
    const ownedList = document.getElementById('owned-list');
    ownedList.innerHTML = '';
    ownedBenefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        ownedList.appendChild(li);
    });

    document.querySelectorAll('.benefit-card button').forEach(button => {
        const card = button.parentElement;
        const price = parseInt(card.dataset.price);
        button.disabled = (userPoints < price);
    });
}

function fetchData() {
    fetch('/api/points')
        .then(response => response.json())
        .then(data => {
            userPoints = data.points;
            ownedBenefits = data.owned;
            updateUI();
        });
}

function buyBenefit(button) {
    const card = button.parentElement;
    const name = card.dataset.name;

    fetch('/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Покупка успешна: ${name}! Остаток баллов: ${data.points}`);
                userPoints = data.points;
                ownedBenefits = data.owned;
                updateUI();
            } else {
                alert(data.message);
            }
        });
}

function showTooltip() {
    const balance = document.querySelector('.balance');
    const tooltip = balance.querySelector('.tooltip');
    tooltip.classList.toggle('active');
    if (tooltip.classList.contains('active')) {
        setTimeout(() => {
            tooltip.classList.remove('active');
        }, 3000);
    }
}

fetchData();