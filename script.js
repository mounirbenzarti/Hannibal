// Données historiques
const steps = [
    {
        id: 1,
        titre: "Le Départ : Carthagène",
        date: "218 av. J.-C.",
        desc: "Hannibal quitte Qart Hadasht (Carthagène) en Espagne. Il rassemble 90 000 fantassins, 12 000 cavaliers et 37 éléphants.",
        coords: [37.6, -0.98]
    },
    {
        id: 2,
        titre: "Traversée du Rhône",
        date: "Septembre 218 av. J.-C.",
        desc: "Une manœuvre complexe pour faire traverser le fleuve aux éléphants tout en repoussant les tribus gauloises hostiles.",
        coords: [43.9, 4.8]
    },
    {
        id: 3,
        titre: "Traversée des Alpes",
        date: "Octobre 218 av. J.-C.",
        desc: "L'exploit impossible. Malgré le froid, les avalanches et les attaques, l'armée débouche en Italie, surprenant totalement Rome.",
        coords: [45.1, 6.8]
    },
    {
        id: 4,
        titre: "Bataille de la Trébie",
        date: "Décembre 218 av. J.-C.",
        desc: "Première grande victoire en Italie. Hannibal utilise une embuscade matinale pour geler et massacrer les légionnaires romains.",
        coords: [45.0, 9.6]
    },
    {
        id: 5,
        titre: "Lac Trasimène",
        date: "217 av. J.-C.",
        desc: "La plus grande embuscade de l'histoire. L'armée romaine est poussée dans le lac et anéantie dans le brouillard.",
        coords: [43.14, 12.1]
    },
    {
        id: 6,
        titre: "Cannes (Cannae)",
        date: "216 av. J.-C.",
        desc: "Le chef-d'œuvre tactique. En infériorité numérique, Hannibal encercle l'armée romaine. 50 000 Romains meurent en un jour.",
        coords: [41.3, 16.1]
    },
    {
        id: 7,
        titre: "Zama (La Fin)",
        date: "202 av. J.-C.",
        desc: "Rappelé en Afrique, Hannibal affronte Scipion l'Africain. Les Carthaginois sont vaincus. Carthage capitule.",
        coords: [36.1, 9.2]
    }
];

// Initialisation de la carte (Centrée sur la méditerranée)
const map = L.map('map').setView([41.9, 12.5], 5);

// Ajout du fond de carte (Style clair pour contraste)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Tracer la ligne du parcours
const latlngs = steps.map(step => step.coords);
const polyline = L.polyline(latlngs, {color: '#8b0000', weight: 4, dashArray: '10, 10'}).addTo(map);

// Gestion des marqueurs et de l'interface
const timelineContainer = document.getElementById('timeline-container');
const titleEl = document.getElementById('step-title');
const dateEl = document.getElementById('step-date');
const descEl = document.getElementById('step-desc');
const markers = {};

steps.forEach((step, index) => {
    // 1. Créer les éléments de la timeline
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `<strong>${step.date}</strong><br>${step.titre}`;
    div.onclick = () => updateView(index);
    timelineContainer.appendChild(div);

    // 2. Créer les marqueurs sur la carte
    const marker = L.marker(step.coords).addTo(map);
    marker.bindPopup(`<b>${step.titre}</b><br>${step.date}`);
    marker.on('click', () => updateView(index));
    markers[index] = marker;
});

// Fonction de mise à jour lors du clic
function updateView(index) {
    const step = steps[index];

    // Mise à jour du texte
    titleEl.innerText = step.titre;
    dateEl.innerText = step.date;
    descEl.innerText = step.desc;

    // Mise à jour de la carte (Zoom fluide)
    map.flyTo(step.coords, 8, {
        duration: 1.5
    });

    // Gestion de la classe CSS "active"
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(i => i.classList.remove('active'));
    items[index].classList.add('active');

    // Ouvrir le popup du marqueur
    markers[index].openPopup();
}
