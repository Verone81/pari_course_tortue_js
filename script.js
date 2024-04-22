// Déclaration des constantes pour le canvas et son contexte
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Dimensions du canvas
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Chargement des images de fond et des tortues
const image_fond = new Image();
image_fond.src = 'fond.jpg';

const tortue_1_img = new Image();
tortue_1_img.src = 'tortue1.png';

const tortue_2_img = new Image();
tortue_2_img.src = 'tortue2.png';

const tortue_3_img = new Image();
tortue_3_img.src = 'tortue3.png';

// Position initiale des tortues
let v1 = 0;
let v2 = 0;
let v3 = 0;

// Vitesse de déplacement des tortues
const vitesse = [getRandomInt(1, 5), getRandomInt(1, 3), getRandomInt(1, 8)];

// Facteur de vitesse pour l'accélération
const acceleration = 0.3;

// Variable pour indiquer si la course a commencé
let courseCommencee = false;


// Chargement des images avant de démarrer la boucle principale
Promise.all([image_fond, tortue_1_img, tortue_2_img, tortue_3_img]).then(() => {
    mainLoop();
})

// Boucle principale du jeu
function mainLoop() {
    // Vérifier si toutes les images sont chargées
    if (!image_fond.complete || !tortue_1_img.complete || !tortue_2_img.complete || !tortue_3_img.complete) {
        // Attendre que toutes les images soient chargées
        requestAnimationFrame(mainLoop);
        return;
    }

    // Effacer l'écran
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Dessiner le fond
    ctx.drawImage(image_fond, 0, 0, WIDTH, HEIGHT);

    // Dessiner les tortues
    ctx.drawImage(tortue_1_img, v1, 50, 60, 60);
    ctx.drawImage(tortue_2_img, v2, 150, 60, 60);
    ctx.drawImage(tortue_3_img, v3, 250, 60, 60);

    // Mettre à jour les positions des tortues avec les vitesses modifiées
    v1 += vitesse[0];
    v2 += vitesse[1];
    v3 += vitesse[2];

    // Appliquer l'accélération à la tortue sélectionnée
    if (tortue_a_accelerer !== null) {
        vitesse[tortue_a_accelerer] += acceleration;
    }

    // Si une tortue atteint la fin de l'écran
    if (v1 >= WIDTH || v2 >= WIDTH || v3 >= WIDTH) {
        // Afficher le gagnant
        if (v1 >= WIDTH) {
            console.log("La tortue 1 a gagné!");
        } else if (v2 >= WIDTH) {
            console.log("La tortue 2 a gagné!");
        } else if (v3 >= WIDTH) {
            console.log("La tortue 3 a gagné!");
        }

        // Arrêter la boucle de jeu
        return;
    }

    // Continuer la boucle principale
    requestAnimationFrame(mainLoop);
}

// Gestion des événements
document.addEventListener('keydown', function(event) {
    // Si la touche appuyée est "P" et la course n'a pas encore commencé
    if ((event.key === 'p' || event.key === 'P') && !courseCommencee) {
        // Démarrez la course
        courseCommencee = true;
        // Appeler la boucle principale pour démarrer le jeu
        mainLoop();
    }
});

// Fonction utilitaire pour générer un entier aléatoire dans une plage donnée
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
