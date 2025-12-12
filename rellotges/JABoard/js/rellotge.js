function actualitzaRellotge() {
    const ara = new Date();

    let hores = ara.getHours();
    const minuts = String(ara.getMinutes()).padStart(2, '0');
    const segons = String(ara.getSeconds()).padStart(2, '0');

    // Format 12h
    const sufix = hores >= 12 ? " PM" : " AM";
    hores = hores % 12 || 12;

    document.getElementById("rellotge").textContent =
        `${String(hores).padStart(2,'0')}:${minuts}:${segons}${sufix}`;

    const opcionsData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("data").textContent =
        ara.toLocaleDateString('ca-ES', opcionsData);

    actualitzaComptadors(ara);
}

function actualitzaComptadors(ara) {
    const nadal = new Date(ara.getFullYear(), 11, 25);
    if (ara > nadal) nadal.setFullYear(nadal.getFullYear() + 1);
    const diesNadal = Math.ceil((nadal - ara)/(1000*60*60*24));
    document.getElementById("comptadorNadal").textContent =
        `Falten ${diesNadal} dies fins a Nadal 🎄`;

    const santJoan = new Date(ara.getFullYear(), 5, 24);
    if (ara > santJoan) santJoan.setFullYear(santJoan.getFullYear() + 1);
    const diesSantJoan = Math.ceil((santJoan - ara)/(1000*60*60*24));
    document.getElementById("comptadorSantJoan").textContent =
        `Falten ${diesSantJoan} dies fins a Sant Joan ☀️`;
}

setInterval(actualitzaRellotge, 1000);
actualitzaRellotge();

