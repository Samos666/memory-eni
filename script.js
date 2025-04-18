window.onload = init;

function init() {
  choixMenu();
  inscription();
  connexion();
  profil();
  jouer();
}

let tableauJouer;

/////////////////////////////////////////////
// Création des différents tableaux de jeu //
/////////////////////////////////////////////

function generationTableauxComplets() {
  let cheminTheme = document.getElementById("photoTheme").getAttribute("src")
  cheminTheme = cheminTheme.slice(0, cheminTheme.lastIndexOf("/"));
  let nombreImages;
  let extensionFichier;
  let tabThemeChoisi = [];

  switch (cheminTheme) {
    case "images/chiens":
      nombreImages = 23;
      extensionFichier = ".webp"
      break;

    case "images/dinosaures":
      nombreImages = 10;
      extensionFichier = ".jpg"
      break;

    case "images/legumes":
      nombreImages = 6;
      extensionFichier = ".svg"
      break;

    case "index/alphabet":
      nombreImages = 26;
      extensionFichier = ".png"
      break;

    default:
      break;
  }

  for (let index = 0; index < nombreImages; index++) {
    let i = index + 1;
    tabThemeChoisi[index] = cheminTheme + "/" + i + extensionFichier;
  }

  return [tabThemeChoisi, nombreImages];
}









///////////////////////
// Selection du menu //
///////////////////////

function choixMenu() {
  const sections = ["accueil", "inscription", "connexion", "profil", "jouer"];

  document.getElementById("menuAccueil").addEventListener("click", function () {
    afficherSection("accueil");
  });

  document.getElementById("menuInscription").addEventListener("click", function () {
    afficherSection("inscription");
  });

  document.getElementById("menuConnexion").addEventListener("click", function () {
    afficherSection("connexion");
  });

  document.getElementById("menuProfil").addEventListener("click", function () {
    afficherSection("profil");
  });

  document.getElementById("menuJouer").addEventListener("click", function () {
    afficherSection("jouer");
  });

  function afficherSection(menuSelection) {
    sections.forEach((id) => {
      document.getElementById(id).style.display = "none";
    });
    document.getElementById(menuSelection).style.display = "block";
  }
}

/////////////////
// Inscription //
/////////////////

function inscription() {

  // Retour visuel des champs
  document.getElementById("inscriptNom").addEventListener("input", testNom);
  document.getElementById("inscriptNom").addEventListener("input", checkProfil);
  document.getElementById("inscriptEmail").addEventListener("input", testEmail);
  document.getElementById("inscriptEmail").addEventListener("input", checkProfil);
  document.getElementById("inscriptPassword").addEventListener("input", testPassword)
  document.getElementById("inscriptPassword").addEventListener("input", checkProfil)
  document.getElementById("inscriptConfirmPassword").addEventListener("input", testConfirmPassword)
  document.getElementById("inscriptConfirmPassword").addEventListener("input", checkProfil)

  let estOkNom = testNom();
  let estOkEmail = testEmail();
  let estOkPassword = testPassword();
  let estOkConfirmPassword = testConfirmPassword();


  // Check longueur Nom
  function testNom() {
    let nom = document.getElementById("inscriptNom");
    let nomInput = nom.value
    if (nomInput.length <= 2) {
      nom.style.borderColor = "red";
      nom.style.borderWidth = "3px";
      return false;
    } else {
      nom.style.borderColor = "yellowgreen";
      nom.style.borderWidth = "3px";
      return true;
    }

  };


  // Check format Email
  function testEmail() {
    let email = document.getElementById("inscriptEmail")
    let emailInput = email.value;
    let isOK = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]{2,}.[a-zA-Z]{2,}$/.test(emailInput);
    if (!isOK) {
      email.style.borderColor = "red";
      email.style.borderWidth = "3px";
      return false;
    } else {
      email.style.borderColor = "yellowgreen";
      email.style.borderWidth = "3px";
      return true;
    }
  }


  // Check Mot de passe
  function testPassword() {
    let passwordInput = document.getElementById("inscriptPassword").value;

    let pwdLongueur = checkLongueur(passwordInput);
    let pwdMinuscules = checkMinuscules(passwordInput);
    let pwdMajuscules = checkMajuscules(passwordInput);
    let pwdChiffres = checkChiffres(passwordInput);

    if (pwdLongueur >= 6 && pwdMinuscules && pwdMajuscules && pwdChiffres) {
      document.getElementById("inscriptPassword").style.borderColor = "yellowgreen";
      document.getElementById("inscriptPassword").style.borderWidth = "3px";
      return true;
    } else {
      document.getElementById("inscriptPassword").style.borderColor = "red";
      document.getElementById("inscriptPassword").style.borderWidth = "3px";
      return false;
    }

    function checkLongueur(passwordInput) {
      if (passwordInput.length < 6) {
        document.getElementById("caracteres").style.color = "red";
      } else {
        document.getElementById("caracteres").style.color = "yellowgreen";
      }
      return passwordInput.length;
    }

    function checkMinuscules(passwordInput) {
      let test = /[a-z]+/.test(passwordInput);
      if (!test) {
        document.getElementById("minuscules").style.color = "red";
      } else {
        document.getElementById("minuscules").style.color = "yellowgreen";
      }
      return test;
    }

    function checkMajuscules(passwordInput) {
      let test = /[A-Z]+/.test(passwordInput);
      if (!test) {
        document.getElementById("majuscules").style.color = "red";
      } else {
        document.getElementById("majuscules").style.color = "yellowgreen";
      }
      return test;
    }

    function checkChiffres(passwordInput) {
      let test = /[0-9]+/.test(passwordInput);
      if (!test) {
        document.getElementById("chiffres").style.color = "red";
      } else {
        document.getElementById("chiffres").style.color = "yellowgreen";
      }
      return test;
    }
  }


  // Confirmation du mot de passe
  function testConfirmPassword() {
    let passwordInput = document.getElementById("inscriptPassword").value;
    let inscriptConfirmPassword = document.getElementById("inscriptConfirmPassword").value;
    if (passwordInput != inscriptConfirmPassword || inscriptConfirmPassword == "") {
      document.getElementById("pwdDifferents").style.visibility = "visible";
      document.getElementById("pwdDifferents").innerText = "Les mots de passe sont différents";
      document.getElementById("pwdDifferents").style.color = "red";
      document.getElementById("inscriptConfirmPassword").style.borderColor = "red";
      document.getElementById("inscriptConfirmPassword").style.borderWidth = "3px";
      return false;
    } else {
      document.getElementById("pwdDifferents").style.color = "yellowgreen";
      document.getElementById("pwdDifferents").innerText = "Les mots de passe correspondent";
      document.getElementById("inscriptConfirmPassword").style.borderColor = "yellowgreen";
      document.getElementById("inscriptConfirmPassword").style.borderWidth = "3px";
      return true;
    }
  }


  // Changer couleur bouton "Valider"
  function checkProfil() {
    estOkNom = testNom();
    estOkEmail = testEmail();
    estOkPassword = testPassword();
    estOkConfirmPassword = testConfirmPassword();

    if (estOkNom && estOkEmail && estOkPassword && estOkConfirmPassword) {
      document.getElementById("inscriptOk").disabled = false
      document.getElementById("inscriptOk").style.backgroundColor = "yellowgreen"
    } else {
      document.getElementById("inscriptOk").disabled = true
      document.getElementById("inscriptOk").style.backgroundColor = "grey"
    }
  }



  // Soumission du formulaire & sauvegarde localstorage
  document.getElementById("inscriptOk").addEventListener("click", localStorageSoumission)

  function localStorageSoumission() {
    localStorage.setItem("nom", document.getElementById("inscriptNom").value);
    localStorage.setItem("email", document.getElementById("inscriptEmail").value);
    localStorage.setItem("password", document.getElementById("inscriptPassword").value);

    // fetch('data.json')
    //   .then(response => response.json())
    //   .then(data => JSON(data))

    // function JSON(donneesJSON) {
    //   donneesJSON = [
    //     {
    //       "nom": document.getElementById("inscriptNom").value,
    //       "email": document.getElementById("inscriptEmail").value,
    //       "password":document.getElementById("inscriptPassword").value
    //     }
    //   ]
    //   localStorage.setItem("users", JSON.stringify(donneesJSON))
    //   let donneesLStorage = localStorage.setItem("users")
    //   console.log(JSON.parse(donneesLStorage));

  }



}





///////////////
// Connexion //
///////////////

function connexion() {
  let connexEmail = document.getElementById("connexEmail").value;
  let connexPassword = document.getElementById("connexPassword").value;

  if (connexEmail == localStorage.getItem("email") && connexPassword == localStorage.getItem("password")) {
    console.log("connexion OK");
  } else {
    console.log("Connexion false");

  }
}

////////////
// Profil //
////////////




function profil() {


  // Choix du theme

  document.getElementById("memorySelect").addEventListener("change", memorySelection)

  function memorySelection() {
    let memorySelect = document.getElementById("memorySelect").value;

    switch (memorySelect) {
      case "chiens":
        document.getElementById("photoTheme").setAttribute("src", "images/chiens/details_chiens.png");
        document.getElementById("photoTheme").setAttribute("alt", "Theme des chiens");
        break;

      case "dinosaures":
        document.getElementById("photoTheme").setAttribute("src", "images/dinosaures/detail_dinosaures.png");
        document.getElementById("photoTheme").setAttribute("alt", "Theme des dinosaures");
        break;

      case "legumes":
        document.getElementById("photoTheme").setAttribute("src", "images/legumes/detail_legumes.png");
        document.getElementById("photoTheme").setAttribute("alt", "Theme des légumes");
        break;

      case "animauxDomestiques":
        document.getElementById("photoTheme").setAttribute("src", "images/animauxdomestiques/detail_animaux_domestiques.png");
        document.getElementById("photoTheme").setAttribute("alt", "Theme des animaux domestiques");
        break;

      case "alphabet":
        document.getElementById("photoTheme").setAttribute("src", "images/alphabet/detail_alphabet.png");
        document.getElementById("photoTheme").setAttribute("alt", "Theme des lettres de l'alphabet");
        break;

      default:
        break;
    }
  };


  // Choix de la taille
  document.getElementById("tailleMemory").addEventListener("change", function () {
    let tailleMemory = parseInt(this.value);
  });


  // Enregistrement profil et creation du tableau de jeu rempli

  document.getElementById("validationProfil").addEventListener("click", validationProfil);

  function validationProfil() {
    //check le theme
    let themeChoisi = document.getElementById("memorySelect").value;

    //check le nb de paires
    let tailleChoisie = parseInt(document.getElementById("tailleMemory").value);

    //récup les images du theme choisi & le nombre d'images
    let retourTemp = generationTableauxComplets();
    let tabThemeChoisi = retourTemp[0];
    let nombreImages = retourTemp[1];

    if (tailleChoisie > nombreImages) {
      alert("La taille est trop grande pour le thème choisi. \n\nMerci de sélectionner une taille plus petite ou changer de thème");
      return;
    }

    //copie tableau d'images et le melange
    let copieTheme = [...tabThemeChoisi];
    melangerTableau(copieTheme);

    //choisis X images uniques
    let imagesChoisies = copieTheme.slice(0, tailleChoisie);

    let tableauDeJeuFinal = [];

    // mets 2 copies de chaque image
    for (let i = 0; i < imagesChoisies.length; i++) {
      tableauDeJeuFinal.push(imagesChoisies[i]);
      tableauDeJeuFinal.push(imagesChoisies[i]);
    }


    console.log("Avant mélange :", [...tableauDeJeuFinal]);

    melangerTableau(tableauDeJeuFinal);
    console.log("Après mélange :", tableauDeJeuFinal);

    // lancement de la fonction d'affichage de la partie

    tableauJouer = [...tableauDeJeuFinal]
    for (let i = 0; i < tableauJouer.length; i++) {
      tableauCache[i] = "images/question.svg";      
    }
    
    jouer(tableauDeJeuFinal)
    cacherCartes(tableauCache)

  }



  function indexAleatoire(max) {
    return Math.floor(Math.random() * max)
  }

  function melangerTableau(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Choisir un index aléatoire entre 0 et i
      const j = Math.floor(Math.random() * (i + 1));
      // Échanger array[i] avec array[j]
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}


///////////
// Jouer //
///////////

document.getElementById("menuJouer").addEventListener("click", function () {
  jouer(tableauDeJeuFinal);
});
document.getElementById("menuJouer").addEventListener("click", function () {
  cacherCartes(tableauCache);
});

function cacherCartes(tableauDeJeuFinal) {
  const plateau = document.getElementById("plateauJeu");

  // Ajoute chaque carte dans la grille
  src = "/images/question.svg"
  tableauCache.forEach((src) => {
    const image = document.createElement("img");
    image.src = src;
    image.style.width = "200px";
    image.style.margin = "5px";
    plateau.appendChild(image);
  });
}


function jouer(tableauDeJeuFinal) {
  const plateau = document.getElementById("plateauJeu");
  plateau.innerHTML = ""; // Vider le plateau

  // Ajoute chaque carte dans la grille
  tableauDeJeuFinal.forEach((src) => {
    const image = document.createElement("img");
    image.src = src;
    image.style.width = "200px";
    image.style.margin = "5px";
    plateau.appendChild(image);
  });
}




  //   for (let i = 0; i < compteur; i++) {
  //     // colonne 1
  //     image = document.createElement("img");
  //     image.src = tableauDeJeuFinal[i];
  //     document.getElementById("tabJeuColonne1").appendChild(image)
  //     // colonne 2
  //     image = document.createElement("img");
  //     image.src = tableauDeJeuFinal[i+4];
  //     document.getElementById("tabJeuColonne2").appendChild(image)
  //     // colonne 3
  //     image = document.createElement("img");
  //     image.src = tableauDeJeuFinal[i+5];
  //     document.getElementById("tabJeuColonne3").appendChild(image)
  //     // colonne 4
  //     image = document.createElement("img");
  //     image.src = tableauDeJeuFinal[i+6];
  //     document.getElementById("tabJeuColonne4").appendChild(image)

  // array.forEach(element => {

