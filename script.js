window.onload = init;

function init() {
  choixMenu();
  inscription();
  connexion();
  profil();
  jouer();
}

///////////////////////
// Selection du menu //
///////////////////////

function choixMenu() {
  const sections = ["accueil", "inscription", "connexion", "profil", "jouer"];

  document.getElementById("menuAccueil").addEventListener("click", function () {
    afficherSection("accueil");
  });

  document
    .getElementById("menuInscription")
    .addEventListener("click", function () {
      afficherSection("inscription");
    });

  document
    .getElementById("menuConnexion")
    .addEventListener("click", function () {
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
  // Check longueur Nom
  document.getElementById("inscriptNom").addEventListener("input", function () {
    if (this.value.length <= 2) {
      this.style.borderColor = "red";
      this.style.borderWidth = "3px";
    } else {
      this.style.borderColor = "yellowgreen";
      this.style.borderWidth = "3px";
    }
  });

  //   Check format Email
  document.getElementById("inscriptEmail").addEventListener("input", function () {
      let emailInput = this.value;
      let isOK = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]{2,}.[a-zA-Z]{2,}$/.test(emailInput);
      if (!isOK) {
        this.style.borderColor = "red";
        this.style.borderWidth = "3px";
      } else {
        this.style.borderColor = "yellowgreen";
        this.style.borderWidth = "3px";
      }
    });

  // Check Mot de passe
  document.getElementById("inscriptPassword").addEventListener("input", function () {
      let passwordInput = this.value;

      let pwdLongueur = checkLongueur(passwordInput);
      let pwdMinuscules = checkMinuscules(passwordInput);
      let pwdMajuscules = checkMajuscules(passwordInput);
      let pwdChiffres = checkChiffres(passwordInput);

      if (pwdLongueur >= 6 && pwdMinuscules && pwdMajuscules && pwdChiffres) {
        document.getElementById("inscriptPassword").style.borderColor = "yellowgreen"
        document.getElementById("inscriptPassword").style.borderWidth = "3px";

      } else {
        document.getElementById("inscriptPassword").style.borderColor = "red"
        document.getElementById("inscriptPassword").style.borderWidth = "3px";
      }


      function checkLongueur(passwordInput) {
        
        if (passwordInput.length < 6) {
            document.getElementById("caracteres").style.color ="red";
        } else {
            document.getElementById("caracteres").style.color ="yellowgreen";
        }
        return passwordInput.length
      }

      function checkMinuscules(passwordInput) {
        let test = /[a-z]+/.test(passwordInput);
        if (!test) {
            document.getElementById("minuscules").style.color ="red";
        } else {
            document.getElementById("minuscules").style.color ="yellowgreen";
        }
        return test
      }

      function checkMajuscules(passwordInput) {
        let test = /[A-Z]+/.test(passwordInput);
        if (!test) {
            document.getElementById("majuscules").style.color ="red";
        } else {
            document.getElementById("majuscules").style.color ="yellowgreen";
        }
        return test

      }

      function checkChiffres(passwordInput) {
        let test = /[0-9]+/.test(passwordInput);
        if (!test) {
            document.getElementById("chiffres").style.color ="red";
        } else {
            document.getElementById("chiffres").style.color ="yellowgreen";
        }
        return test

      }
    });

    // Verification mot de passe
    document.getElementById("inscriptConfirmPassword").addEventListener("input", function () {
    let passwordInput = document.getElementById("inscriptPassword").value;
    let inscriptConfirmPassword = this.value;
    if (passwordInput != inscriptConfirmPassword) {
        document.getElementById("pwdDifferents").style.visibility = "visible";
        document.getElementById("pwdDifferents").innerText = "Les mots de passe sont différents"        
        document.getElementById("pwdDifferents").style.color = "red" 
        document.getElementById("inscriptConfirmPassword").style.borderColor = "red"
        document.getElementById("inscriptConfirmPassword").style.borderWidth = "3px";
       
    } else {
        document.getElementById("pwdDifferents").style.color = "yellowgreen"        
        document.getElementById("pwdDifferents").innerText = "Les mots de passe correspondent"        
        document.getElementById("inscriptConfirmPassword").style.borderColor = "yellowgreen"
        document.getElementById("inscriptConfirmPassword").style.borderWidth = "3px";

    }
    })
 
}


////////////////////////////////////////////
// Sauvegarde profil dans le localstorage //
////////////////////////////////////////////

document.getElementById("")


///////////////
// Connexion //
///////////////

function connexion() {}



////////////
// Profil //
////////////

function profil() {}


///////////
// Jouer //
///////////

function jouer() {
  let memorySelect = document.getElementById("memorySelect").value;
  console.log(memorySelect);
}
