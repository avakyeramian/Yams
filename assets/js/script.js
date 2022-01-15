//  Avak Yeramian
//
//  GNU GENERAL PUBLIC LICENSE Version 3
//
//  The GNU General Public License is a free, copyleft license for software and other kinds of 
//  works.
//  The licenses for most software and other practical works are designed to take away your 
//  freedom to share and change the works.
//  By contrast, the GNU General Public License is intended to guarantee your freedom to share 
//  and change all versions of a program--to make sure it remains free software for all its 
//  users. We, the Free Software Foundation, use the GNU General Public License for most of our
//  software; it applies also to any other work released this way by its authors. You can apply
//  it to your programs, too.


const content = () => {

    const div_yamsApp = document.getElementById("Yams");
    var countID = 0;

    /**
     * Shortcut function to create dom element more quickly.
     *
     * @param {String} type : tagName HTML
     * @param {JSON} dicoAtt : {"attributeName":"attributeValue",..}
     * @param {String} text : setting the value of innerHTML
     * @returns {Object} : HTML element
     */
    function elemCreate(type, dicoAtt, text) {
        var dom = document.createElement(type);
        for (var key in Object.keys(dicoAtt)) {
            dom.setAttribute(
                Object.keys(dicoAtt)[key], dicoAtt[Object.keys(dicoAtt)[key]]); //piece of shit
        }
        dom.innerHTML = text;
        return dom;
    }

    /**
     * Creation du joueur en JSON.
     *
     * @param {String} nomDuJoueur : Nom du joueur pour la partie de Yams
     * @returns {JSON} : joueur
     */
    const creerNouveauJoueur = (nomDuJoueur) => {

        let timestamp = Date.now();
        let id = window.btoa(encodeURIComponent(timestamp + "_" + nomDuJoueur + "_" + countID));
        countID++;

        let json_joueur = {
            "id": id,
            "nom": nomDuJoueur,
            "score": {
                "les1": "",
                "les2": "",
                "les3": "",
                "les4": "",
                "les5": "",
                "les6": "",
                "somme": "",
                "bonus": "",
                "brelan": "",
                "carré": "",
                "full": "",
                "petiteSuite": "",
                "grandeSuite": "",
                "leYams": "",
                "chance": "",
                "coupsAvance": "",
                "coupsAvanceMax": "",
                "total": ""
            }
        };

        return json_joueur;
    };

    const sauvegarderPartie = (partie) => {
        localStorage.setItem("partieYams", JSON.stringify(partie));
    }

    const restaurerPartie = () => {
        return JSON.parse(localStorage.getItem("partieYams"));
    }

    const domNouvellePartie = () => {

        let div_nouvellePartie = elemCreate("div", {
            "id": "div_nouvellePartie"
        }, "");

        let input_ajoutJoueur = elemCreate("input", {
            "id": "input_ajoutJoueur",
            "type": "text",
            "placeholder": "Ajouter un joueur",
            "maxlength": "22",
            "size": "28"
        }, "");

        const ajouteUnJoueur = () => {
            let json_partie = restaurerPartie();
            let input_ajoutJoueur = document.getElementById("input_ajoutJoueur");
            if (input_ajoutJoueur.value !== "") {
                let joueurNouveau = creerNouveauJoueur(input_ajoutJoueur.value);
                json_partie.joueurs.push(joueurNouveau);
                sauvegarderPartie(json_partie);
                input_ajoutJoueur.value = "";
            }
            actualiseListeDesJoueurs();
        }

        input_ajoutJoueur.onkeyup = (evt) => {
            if (evt.key === "Enter") {
                ajouteUnJoueur();
            }
        }

        div_nouvellePartie.append(input_ajoutJoueur);

        let button_ajoutJoueur = elemCreate("button", {
            "id": "button_ajoutJoueur"
        }, "+");
        let ol_listeDesJoueurs = elemCreate("ol", {
            "id": "ol_listeDesJoueurs"
        }, "");

        const actualiseListeDesJoueurs = () => {
            let ol_listeDesJoueurs = document.getElementById("ol_listeDesJoueurs");
            ol_listeDesJoueurs.innerHTML = "";
            let json_partie = restaurerPartie();
            for (var ordre in json_partie.joueurs) {
                json_joueurTemp = json_partie.joueurs[ordre];
                let li_joueurTemp = elemCreate("li", {
                    "id": json_joueurTemp.id
                }, json_joueurTemp.nom);

                let button_supprimer = elemCreate("button", {}, "🗑️");
                button_supprimer.ondblclick = (evt) => {
                    let id_aSupprimer = evt.target.parentElement.id;
                    let json_partie = restaurerPartie();
                    for (var ordre in json_partie.joueurs) {
                        json_joueurTemp = json_partie.joueurs[ordre];
                        if (json_joueurTemp.id === id_aSupprimer) {
                            json_partie.joueurs.splice(ordre, 1);
                        }
                    }
                    sauvegarderPartie(json_partie);
                    actualiseListeDesJoueurs();
                };

                li_joueurTemp.prepend(button_supprimer);

                let button_remonter = elemCreate("button", {}, "⬆️");
                button_remonter.onclick = (evt) => {
                    let id_aRemonter = evt.target.parentElement.id;
                    let json_partie = restaurerPartie();
                    for (var ordre in json_partie.joueurs) {
                        json_joueurTemp = json_partie.joueurs[ordre];
                        if (json_joueurTemp.id === id_aRemonter) {
                            if (ordre > 0) {
                                json_partie.joueurs[parseInt(ordre)] = 
                                    json_partie.joueurs[parseInt(ordre)-1];
                                json_partie.joueurs[parseInt(ordre)-1] = json_joueurTemp;
                            }
                            json_partie.joueurs
                            id_aRemonter = 0;
                        }
                    }
                    sauvegarderPartie(json_partie);
                    actualiseListeDesJoueurs();
                }
                li_joueurTemp.prepend(button_remonter);

                let button_descendre = elemCreate("button", {}, "⬇️");
                button_descendre.onclick = (evt) => {
                    let id_aDescendre = evt.target.parentElement.id;
                    let json_partie = restaurerPartie();
                    for (var ordre in json_partie.joueurs) {
                        json_joueurTemp = json_partie.joueurs[ordre];
                        if (json_joueurTemp.id === id_aDescendre) {                           
                            if (ordre < json_partie.joueurs.length - 1) {
                                json_partie.joueurs[parseInt(ordre)] =
                                    json_partie.joueurs[parseInt(ordre) + 1];
                                json_partie.joueurs[parseInt(ordre)+1] = json_joueurTemp;
                            }
                            json_partie.joueurs
                            id_aDescendre = 0;
                        }
                    }
                    sauvegarderPartie(json_partie);
                    actualiseListeDesJoueurs();
                }
                li_joueurTemp.prepend(button_descendre);

                ol_listeDesJoueurs.append(li_joueurTemp);
            }
        };

        button_ajoutJoueur.onclick = () => {
            ajouteUnJoueur();
        }

        div_nouvellePartie.append(button_ajoutJoueur);

        div_nouvellePartie.append(ol_listeDesJoueurs);

        let div_coupsAvance = elemCreate("div", {
            "id": "div_coupsAvance"
        }, "");

        let input_checkboxCoupsAvance = elemCreate("input", {
            "id": "input_checkboxCoupsAvance",
            "name": "input_checkboxCoupsAvance",
            "type": "checkbox",
            "value": "input_checkboxCoupsAvance"
        },"");

        input_checkboxCoupsAvance.onclick = (evt) => {
            let json_partie = restaurerPartie();
            json_partie.coupsAvance = evt.target.checked;
            sauvegarderPartie(json_partie);
        }

        let label_checkboxCoupsAvance = elemCreate("label", {
            "for": "input_checkboxCoupsAvance"
        }, "Coups d'avance");

        input_checkboxCoupsAvance.checked = restaurerPartie().coupsAvance;

        const regleCoupsAvance = () => {

        }

        div_coupsAvance.append(input_checkboxCoupsAvance);
        div_coupsAvance.append(label_checkboxCoupsAvance);
        div_nouvellePartie.append(div_coupsAvance);

        let div_boutonsResetCommencer = elemCreate("div", {
            "id": "div_boutonsResetCommencer"
        }, "");

        let button_resetJoueurs = elemCreate("button", {
            "id": "button_resetJoueur",
        }, "Reset ❌");
        button_resetJoueurs.ondblclick = () => {
            nouvellePartie();
            let input_checkboxCoupsAvance = document.getElementById("input_checkboxCoupsAvance");
            input_checkboxCoupsAvance.checked = restaurerPartie().coupsAvance;
            actualiseListeDesJoueurs();
        }
        div_boutonsResetCommencer.append(button_resetJoueurs);

        let button_commencerPartie = elemCreate("button", {
                "id": "button_commencerPartie"
            },
            "🎲 Commencer ▶️");

        button_commencerPartie.onclick = () => {
            let json_partie = restaurerPartie();

            if (json_partie.joueurs.length > 0) {
                json_partie.etat = "enCours";
                sauvegarderPartie(json_partie);
                let div_nouvellePartie = document.getElementById("div_nouvellePartie");
                div_nouvellePartie.remove();
            }
        }
        
        div_boutonsResetCommencer.append(button_commencerPartie);

        div_nouvellePartie.append(div_boutonsResetCommencer);

        div_yamsApp.append(div_nouvellePartie);

        actualiseListeDesJoueurs();
    };


    const nouvellePartie = () => {
        let rnd_3xbase10 = Math.floor(Math.random() * 10) +
            Math.floor(Math.random() * 10) +
            Math.floor(Math.random() * 10);

        let id_partie = window.btoa(encodeURIComponent(Date.now() + "_" + rnd_3xbase10));
        let dateCourante = new Date();
        let json_nouvellePartie = {
            "id": id_partie,
            "date": dateCourante.toISOString().replace("T", " ").slice(0, 19),
            "coupsAvance" : true,
            "joueurs": [],
            "etat": "config"
        };
        sauvegarderPartie(json_nouvellePartie);
    }

    if (!localStorage.getItem("partieYams")) {
        nouvellePartie();
        domNouvellePartie();
    } else {
        let json_partie = restaurerPartie();
        if (json_partie.etat === "config") {
            domNouvellePartie();
        } else {

        }
    }

}

window.onload = content;

/*
function content() {
 

    if (yams_app) {

        var les1 = {
            name: "Les 1",
            min: 0,
            max: 5,
            step: 1
        };
        var les2 = {
            name: "Les 2",
            min: 0,
            max: 10,
            step: 2
        };
        var les3 = {
            name: "Les 3",
            min: 0,
            max: 15,
            step: 3
        };
        var les4 = {
            name: "Les 4",
            min: 0,
            max: 20,
            step: 4
        };
        var les5 = {
            name: "Les 5",
            min: 0,
            max: 25,
            step: 5
        };
        var les6 = {
            name: "Les 6",
            min: 0,
            max: 30,
            step: 6
        };
        var somme = {
            name: "Somme"
        };
        var bonus = {
            name: "Bonus"
        };
        var brelan = {
            name: "Brelan",
            min: 0,
            max: 30,
            step: 1
        };
        var carré = {
            name: "Carré",
            min: 0,
            max: 30,
            step: 1
        };
        var full = {
            name: "Full",
            min: 0,
            max: 25,
            step: 25
        };
        var petiteSuite = {
            name: "Petite Suite",
            min: 0,
            max: 30,
            step: 30
        };
        var grandeSuite = {
            name: "Grande Suite",
            min: 0,
            max: 40,
            step: 40
        };
        var leYams = {
            name: "Yams",
            min: 0,
            max: 50,
            step: 50
        };
        var chance = {
            name: "Chance",
            min: 0,
            max: 30,
            step: 1
        };
        var coupsAvance = {
            name: "[Coups d'avance]",
            min: 0,
            max: 50,
            step: 1
        };
        var total = {
            name: "Total"
        };

        var yams_array = [les1, les2, les3, les4, les5, les6, somme, bonus, brelan, carré, full, petiteSuite, grandeSuite, leYams, chance, coupsAvance, total];

        createPlayerInput();

        var yamsScores = getYamsScores();

        if (Object.keys(yamsScores).length > 0) {
            //réafficher les scores
            createTableYams();
            for (var player in yamsScores) {
                addPlayer(player, yamsScores[player]);
                updateTotal(player);
            }
        } else {
            //console.log("Nouveau tableau des scores");
            setYamsScores(yamsScores)
        }

    }

    function getYamsScores() {
        //console.log("Récupereration du tableau des scores");
        var yamsScores;
        var yamsScores_json = localStorage.getItem("yamsScores");
        var yamsScores_parsed = JSON.parse(yamsScores_json);
        if (yamsScores_parsed !== null) {
            yamsScores = yamsScores_parsed;
        } else {
            yamsScores = {};
        }

        return yamsScores;
    }


    function setYamsScores(yamsScores) {
        //console.log("Mise a jour du tableau des scores");
        var yamsScores_json = JSON.stringify(yamsScores);
        localStorage.setItem("yamsScores", yamsScores_json);
    }

    function updateTotal(player) {
        var yams_table = document.getElementById("yams_table");
        if (yams_table) {
            var num_col = getColByPlayer(player);

            var yamsScores = getYamsScores();

            var somme = 0,
                bonus = 0,
                total = 0;
            var somme_div = yams_table.getElementsByClassName("Somme")[num_col - 1];
            var bonus_div = yams_table.getElementsByClassName("Bonus")[num_col - 1];
            var total_div = yams_table.getElementsByClassName("Total")[num_col - 1];

            for (var item in yams_array) {
                var row = yams_table.rows[parseInt(item) + 1];
                var valeur = row.cells[num_col];
                var val_input;
                if ((yams_array[item].name != "Somme") && (yams_array[item].name != "Bonus") && (yams_array[item].name != "Total") && (yams_array[item].name != "[Coups d'avance]")) {
                    val_input = parseInt(valeur.firstChild.value);

                    //console.log(yams_array[item].name+" : "+val_input);
                    var combi = yams_array[item].name;

                    if (typeof yamsScores[player] === 'undefined') {
                        yamsScores[player] = {};
                    }

                    yamsScores[player][combi] = val_input;

                    if (isNaN(val_input)) val_input = 0;

                    if (["Les 1", "Les 2", "Les 3", "Les 4", "Les 5", "Les 6"].indexOf(yams_array[item].name) >= 0) {
                        somme = val_input + somme;

                    } else {
                        total = val_input + total;
                    }
                }
            }

            setYamsScores(yamsScores);

            if (somme >= 63) {
                bonus = 37
            } else {
                bonus = 0
            }

            total = total + somme + bonus;

            somme_div.value = somme;
            bonus_div.value = bonus;
            total_div.value = total;
        }
    }

    function addPlayer(player, score) {
        var yams_table = document.getElementById("yams_table");
        if (yams_table) {
            var num_joueur = yams_table.rows[1].cells.length;
            for (var item in yams_array) {
                var row = yams_table.rows[parseInt(item) + 1];
                var valeur = row.insertCell(num_joueur);
                valeur.setAttribute("class", "td_input");
                if ((yams_array[item].name != "Somme") && (yams_array[item].name != "Bonus") && (yams_array[item].name != "Total")) {
                    var input = document.createElement("input");
                    input.setAttribute("type", "number");
                    input.setAttribute("min", yams_array[item].min);
                    input.setAttribute("max", yams_array[item].max);
                    input.setAttribute("step", yams_array[item].step);
                    if (score !== null) {
                        if (score[yams_array[item].name] !== null) {
                            input.setAttribute("value", score[yams_array[item].name]);
                        }
                    }
                    valeur.append(input);
                    input.onchange = function () {
                        updateTotal(player)
                    };
                } else {
                    var init = document.createElement("input");
                    init.setAttribute("type", "number");
                    init.setAttribute("disabled", "true");
                    init.setAttribute("class", yams_array[item].name);
                    init.innerHTML = 0;
                    valeur.append(init);
                }
            }

            var joueur_header = yams_table.rows[0].insertCell(num_joueur);
            joueur_header.setAttribute("id", player);
            joueur_header.innerHTML = player;

            var boutton_rem = document.createElement("button");
            boutton_rem.setAttribute("class", "boutton_rem");
            boutton_rem.innerHTML = "-";
            boutton_rem.onclick = function () {
                remPlayer(player);
            }
            joueur_header.append(boutton_rem);

            updateTotal(player);
        }
    }

    function remPlayer(player) {
        var yams_table = document.getElementById("yams_table");
        if (yams_table) {
            var num_col = getColByPlayer(player);

            for (var row in yams_table.rows) {
                if (yams_table.rows[row].cells) {
                    yams_table.rows[row].cells[num_col].remove();
                }
            }

            var nb_joueurs = yams_table.rows[1].cells.length - 1;
            if (nb_joueurs <= 0) {
                yams_table.remove();
            }
        }
        var yamsScores = getYamsScores();
        delete yamsScores[player];
        setYamsScores(yamsScores);
    }

    function getColByPlayer(player) {
        var header = document.getElementById(player);
        var col = header.cellIndex;
        return col;
    }

    function createTableYams() {
        var div_overflow = document.createElement("div");
        div_overflow.setAttribute("class", "overflow");

        var yams_table = document.createElement("table");
        yams_table.setAttribute("id", "yams_table");

        for (var item in yams_array) {
            var row = yams_table.insertRow();
            var combi = row.insertCell(0);
            combi.innerHTML = yams_array[item].name;
            combi.setAttribute("class", "combi");
        }

        var header = yams_table.createTHead();
        var row_header = header.insertRow(0);
        var joueurs_header = row_header.insertCell(0);
        joueurs_header.innerHTML = "Joueurs";

        div_overflow.append(yams_table);
        yams_app.append(div_overflow);

        clearButton()
    }

    function clearButton() {
        var button_clear = document.createElement("button");
        button_clear.setAttribute("id", "button_clear");
        button_clear.innerHTML = "Effacer les scores ❌"
        button_clear.onclick = function () {
            setYamsScores({});
            location.reload();
        }

        yams_app.append(button_clear);
    }
}

*/