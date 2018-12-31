window.onload = content;


function content()
{
    
    //  Avak Yeramian
    //
    //  GNU GENERAL PUBLIC LICENSE Version 3
    //
    //  The GNU General Public License is a free, copyleft license for software and other kinds of works.
	//
    //  The licenses for most software and other practical works are designed to take away your freedom to share and change the works.
    //  By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.
    
    /* -- useless/20 -- */
    
    var document = window.document;
    var alert = window.alert;
    var console = window.console;
    var body = document.body;
    var navigator = window.navigator;
	
	/* -- find id="yams" -- */
	
	var yams_app = document.getElementById("Yams");
	
	if(yams_app){
				
        /* -- yams array -- */

        var les1 = {name:"Les 1", min:0, max:5, step:1};
        var les2 = {name:"Les 2", min:0, max:10, step:2};
        var les3 = {name:"Les 3", min:0, max:15, step:3};
        var les4 = {name:"Les 4", min:0, max:20, step:4};
        var les5 = {name:"Les 5", min:0, max:25, step:5};
        var les6 = {name:"Les 6", min:0, max:30, step:6};
        var somme = {name:"Somme"};
        var bonus = {name:"Bonus"};
        var brelan = {name:"Brelan", min:0, max:30, step:1};
        var carré = {name:"Carré", min:0, max:30, step:1};
        var full = {name:"Full", min:0, max:25, step:25};
        var petiteSuite = {name:"Petite Suite", min:0, max:30, step:30};
        var grandeSuite = {name:"Grande Suite", min:0, max:40, step:40};
        var leYams = {name:"Yams", min:0, max:50, step:50};
        var chance = {name:"Chance", min:0, max:30, step:1};
        var total = {name:"Total"};

        var yams_array = [les1,les2,les3,les4,les5,les6,somme,bonus,brelan,carré,full,petiteSuite,grandeSuite,leYams,chance,total]; 

        createPlayerInput();
        createTableYams();
	}
    
    /* -- fonctions -- */


    /* 
        MAJ Somme, Bonus et Total pour le joueur num
    */
    function updateTotal(hash){
        var yams_table = document.getElementById("yams_table");
        if(yams_table){
            var num_col = getColByHash(hash);
            
            var somme=0,bonus=0,total=0;
            var somme_div = yams_table.getElementsByClassName("Somme")[num_col-1];
            var bonus_div = yams_table.getElementsByClassName("Bonus")[num_col-1];
            var total_div = yams_table.getElementsByClassName("Total")[num_col-1];

            for(var item in yams_array){
                var row = yams_table.rows[parseInt(item)+1];
                var valeur = row.cells[num_col];
                if( (yams_array[item].name!="Somme") && (yams_array[item].name!="Bonus") && (yams_array[item].name!="Total") ){
                    if(["Les 1", "Les 2","Les 3", "Les 4","Les 5", "Les 6"].indexOf(yams_array[item].name) >= 0){
                        somme = parseInt(valeur.firstChild.value) + somme;

                    }else{
                        total = parseInt(valeur.firstChild.value) + total;
                    }
                }                    
            }

            if(somme>=63){ bonus = 37 }else{ bonus = 0}

            total = total + somme + bonus;

            somme_div.innerHTML = somme;
            bonus_div.innerHTML = bonus;
            total_div.innerHTML = total;
        }
    }

    /* 
        Ajoute un joueur
    */
    function addPlayer(jacky){
        var yams_table = document.getElementById("yams_table");
        if(yams_table){
            var num_joueur = yams_table.rows[1].cells.length;
            
            var hash = derpyHash(jacky,num_joueur);
            
            for(var item in yams_array){
                var row = yams_table.rows[parseInt(item)+1];
                var valeur = row.insertCell(num_joueur);
                valeur.setAttribute("class","td_input");
                if( (yams_array[item].name!="Somme") && (yams_array[item].name!="Bonus") && (yams_array[item].name!="Total") ){
                    var input = document.createElement("input");
                    input.setAttribute("type","number");
                    input.setAttribute("min",yams_array[item].min);
                    input.setAttribute("max",yams_array[item].max);
                    input.setAttribute("step",yams_array[item].step);
                    input.setAttribute("value","0");
                    valeur.append(input);
                    input.onchange = function(){updateTotal(hash)};
                }else{
                    var init = document.createElement("div");
                    init.setAttribute("class",yams_array[item].name);
                    init.innerHTML = 0;
                    valeur.append(init);
                }
            }

            var joueur_header = yams_table.rows[0].insertCell(num_joueur);
            joueur_header.setAttribute("id",hash);
            joueur_header.innerHTML = jacky;
            
            var boutton_rem = document.createElement("button");
            boutton_rem.setAttribute("class","boutton_rem");
            boutton_rem.innerHTML = "-";
            boutton_rem.onclick = function(){
                remPlayer(hash);
            }
            joueur_header.append(boutton_rem);
        }            
    }
    
    /* 
        Suprime un joueur
    */
    function remPlayer(hash){
        var yams_table = document.getElementById("yams_table");
        if(yams_table){
            var num_col = getColByHash(hash);
            
            for(var row in yams_table.rows){
                if(yams_table.rows[row].cells){
                    yams_table.rows[row].cells[num_col].remove();               
                }

            }
        }
    }
    
    /*
        Recupère la colone d'un joueur par son hash
    */
    function getColByHash(hash) {
        var header = document.getElementById(hash);
        var col = header.cellIndex;
        return col;
    }

    /*
        Affiche le bouton/input pour créer un joueur
    */
    function createPlayerInput() {
        var div_add = document.createElement("div");

        var input_add = document.createElement("input");
        input_add.setAttribute("type","text");
        input_add.setAttribute("placeholder","Ajouter un joueur");
        input_add.setAttribute("maxlength","22");
        input_add.setAttribute("size","28");
        input_add.onkeyup = function(event){
            if (event.key === "Enter") {
                var new_player = event.target.value;
                if(new_player!=""){
                    addPlayer(new_player);
                    event.target.value = "";
                }else{
                    addPlayer(" ");
                    event.target.value = "";
                }
            }
        };
        div_add.append(input_add);
        
        var boutton_add = document.createElement("button");
        boutton_add.setAttribute("class","boutton_add");
        boutton_add.innerHTML = "+";
        boutton_add.onclick = function(event){
            var new_player = event.target.parentElement.firstChild.value;
            if(new_player!=""){
                addPlayer(new_player);
                event.target.value = "";
            }else{
                addPlayer(" ");
                event.target.value = "";
            }
        }
        div_add.append(boutton_add);
        
        yams_app.append(div_add);
    }

    /* 
        Fait un tableau pour le Yams pour un joueur 
    */
    function createTableYams() {
        var div_overflow = document.createElement("div");
        div_overflow.setAttribute("class","overflow");
        
        var yams_table = document.createElement("table");
        yams_table.setAttribute("id","yams_table");

        for(var item in yams_array){
            var row = yams_table.insertRow();
            var combi = row.insertCell(0);
            combi.innerHTML = yams_array[item].name;
        }

        var header = yams_table.createTHead();
        var row_header = header.insertRow(0);
        var joueurs_header = row_header.insertCell(0);
        joueurs_header.innerHTML = "Joueurs";

        div_overflow.append(yams_table);
        yams_app.append(div_overflow);
        
        addPlayer("Robert");
        addPlayer("Didier");
    }
    
    
    /*
        La pire fonction de hachage
    */
    function derpyHash(booo,num){
        var hash = parseInt(asciiToHexa(booo)) + Math.ceil((Math.PI*621*num)/(Math.E*0.0001));
        return hash;
    }
    
    
    /*
        convertir du ascii en "hexa"
    */
    function asciiToHexa(str) {
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n ++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }
}