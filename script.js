window.onload = init;

function init() {
  choixMenu();
  inscription();
  connexion();
  profil();
  jouer();
}

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
    // let tableauDeJeu = new Array(parseInt(this.value));

  });


  // Enregistrement profil et creation du tableau de jeu rempli

  document.getElementById("validationProfil").addEventListener("click", function () {
    let themeChoisi = document.getElementById("memorySelect").value;
    let tailleChoisie = document.getElementById("tailleMemory").value;

    // fixer la taille du tableau de jeu
    let tableauDeJeu = new Array(tailleChoisie * 2)

    // choisir nombre aleatoire pour selectionner un animal dans tableauxAnimaux
    let retourTemp = generationTableauxComplets();

    let tabThemeChoisi = retourTemp[0];
    let nombreImages = retourTemp[1];


    for (let index = 0; index < nombreImages; index++) {
      let indexRandom = indexAleatoire(nombreImages);
      let imageRandom = tabThemeChoisi[indexRandom];
      let indexFinalTableauDeJeu;
      let casesVides = []

      for (let boucle = 0; boucle < tableauDeJeu.length; boucle++) {
        if (tableauDeJeu[i] == null) {
          casesVides.push(i);
        }
      }
      if (casesVides.length > 0) {
        let indexAleatoire = indicesVides[Math.floor(Math.random() * indicesVides.length)];
      
        console.log("Index vide choisi :", indexAleatoire);
      
        // Par exemple, on y met une valeur
        tableauDeJeu[indexAleatoire] = imageRandom;
      } else {
        console.log("Aucune case vide !");
      }
      }
    }
    console.log(tableauDeJeu);




    // enregistré le contenu de l'index random dans le tableau à une place random
    // une deuxieme fois pour doubler l'image




    // Generation nombre pour 
    function indexAleatoire(max) {
      return Math.floor(Math.random() * max)
    }

  });



}

///////////
// Jouer //
///////////

function jouer() {

}
