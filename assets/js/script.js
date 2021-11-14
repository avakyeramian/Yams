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
		var coupsAvance = {name:"[Coups d'avance]", min:0, max:50, step:1};
        var total = {name:"Total"};

        var yams_array = [les1,les2,les3,les4,les5,les6,somme,bonus,brelan,carré,full,petiteSuite,grandeSuite,leYams,chance,coupsAvance,total]; 

        createPlayerInput();
        
        var yamsScores = getYamsScores();

        if(Object.keys(yamsScores).length>0){
            //réafficher les scores
            createTableYams(); 
            for(var player in yamsScores){
                addPlayer(player,yamsScores[player]);
                updateTotal(player);
            }
        }else{
            //console.log("Nouveau tableau des scores");
            setYamsScores(yamsScores)
        }
        
	}
    
    /* -- fonctions -- */
    
    /* 
        Récuperer les scores venant du localStorage "en cache"
    */
    function getYamsScores(){
        //console.log("Récupereration du tableau des scores");
        var yamsScores;
        var yamsScores_json = localStorage.getItem("yamsScores");
        var yamsScores_parsed = JSON.parse(yamsScores_json);
        if(yamsScores_parsed!==null){
            yamsScores = yamsScores_parsed;
        }
        else{
            yamsScores = {};
        }

        return yamsScores;
    }
    
    
    /* 
        Mise a jour des scores vers le localStorage "en cache"
    */
    function setYamsScores(yamsScores){
        //console.log("Mise a jour du tableau des scores");
        var yamsScores_json = JSON.stringify(yamsScores);
        localStorage.setItem("yamsScores",yamsScores_json);
    }

    /* 
        MAJ Somme, Bonus et Total pour le joueur num
    */
    function updateTotal(player){
        var yams_table = document.getElementById("yams_table");
        if(yams_table){
            var num_col = getColByPlayer(player);
            
            var yamsScores = getYamsScores();
            
            var somme=0,bonus=0,total=0;
            var somme_div = yams_table.getElementsByClassName("Somme")[num_col-1];
            var bonus_div = yams_table.getElementsByClassName("Bonus")[num_col-1];
            var total_div = yams_table.getElementsByClassName("Total")[num_col-1];

            for(var item in yams_array){
                var row = yams_table.rows[parseInt(item)+1];
                var valeur = row.cells[num_col];
                var val_input;
                if( (yams_array[item].name!="Somme") && (yams_array[item].name!="Bonus") && (yams_array[item].name!="Total") && (yams_array[item].name!="[Coups d'avance]") ){
                    val_input = parseInt(valeur.firstChild.value);
                    
                    //console.log(yams_array[item].name+" : "+val_input);
                    var combi = yams_array[item].name;
                    
                    if(typeof yamsScores[player] === 'undefined'){
                        yamsScores[player] = {};
                    }
                    
                    yamsScores[player][combi] = val_input;

                    if(isNaN(val_input)) val_input = 0;
                    
                    if(["Les 1", "Les 2","Les 3", "Les 4","Les 5", "Les 6"].indexOf(yams_array[item].name) >= 0){
                        somme = val_input + somme;

                    }else{
                        total = val_input + total;
                    }
                }                    
            }
            
            setYamsScores(yamsScores);

            if(somme>=63){ bonus = 37 }else{ bonus = 0}

            total = total + somme + bonus;

            somme_div.value = somme;
            bonus_div.value = bonus;
            total_div.value = total;
        }
    }

    /* 
        Ajoute un joueur
    */
    function addPlayer(player,score){
        var yams_table = document.getElementById("yams_table");
        if(yams_table){
            var num_joueur = yams_table.rows[1].cells.length;
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
                    if(score!==null){
                        if(score[yams_array[item].name]!==null){
                            input.setAttribute("value",score[yams_array[item].name]);
                        }
                    }
                    valeur.append(input);
                    input.onchange = function(){updateTotal(player)};
                }else{
                    var init = document.createElement("input");
                    init.setAttribute("type","number");
                    init.setAttribute("disabled","true");
                    init.setAttribute("class",yams_array[item].name);
                    init.innerHTML = 0;
                    valeur.append(init);
                }
            }

            var joueur_header = yams_table.rows[0].insertCell(num_joueur);
            joueur_header.setAttribute("id",player);
            joueur_header.innerHTML = player;
            
            var boutton_rem = document.createElement("button");
            boutton_rem.setAttribute("class","boutton_rem");
            boutton_rem.innerHTML = "-";
            boutton_rem.onclick = function(){
                remPlayer(player);
            }
            joueur_header.append(boutton_rem);
            
            updateTotal(player);
        }            
    }
    
    /* 
        Suprime un joueur
    */
    function remPlayer(player){
        var yams_table = document.getElementById("yams_table");
        if(yams_table){
            var num_col = getColByPlayer(player);
            
            for(var row in yams_table.rows){
                if(yams_table.rows[row].cells){
                    yams_table.rows[row].cells[num_col].remove();               
                }
            }
            
            var nb_joueurs = yams_table.rows[1].cells.length-1;
            if(nb_joueurs<=0){
                yams_table.remove();
            }
        }
        var yamsScores = getYamsScores();
        delete yamsScores[player];
        setYamsScores(yamsScores);
    }
    
    /*
        Recupère la colone d'un joueur par son player
    */
    function getColByPlayer(player) {
        var header = document.getElementById(player);
        var col = header.cellIndex;
        return col;
    }

    /*
        Affiche le bouton/input pour créer un joueur
    */
    function createPlayerInput() {    
        var div_add = document.createElement("div");
        div_add.setAttribute("class","add_input");

        var input_add = document.createElement("input");
        input_add.setAttribute("type","text");
        input_add.setAttribute("placeholder","Ajouter un joueur");
        input_add.setAttribute("maxlength","22");
        input_add.setAttribute("size","28");
        input_add.onkeyup = function(event){
            if (event.key === "Enter") {
                if(!(document.getElementById("yams_table"))){
                    createTableYams(); 
                }
                var yams_table = document.getElementById("yams_table");
                var num_joueur = yams_table.rows[1].cells.length;
                var new_player = event.target.value;
                if(new_player!=""){
                    addPlayer(new_player+ "_" + num_joueur,null);
                    event.target.value = "";
                }else{
                    addPlayer("Jackie"+ "_" + num_joueur,null);
                    event.target.value = "";
                }
            }
        };
        div_add.append(input_add);
        
        var boutton_add = document.createElement("button");
        boutton_add.setAttribute("class","boutton_add");
        boutton_add.innerHTML = "+";
        boutton_add.onclick = function(event){
            if(!(document.getElementById("yams_table"))){
                createTableYams();   
            }
            var yams_table = document.getElementById("yams_table");
            var num_joueur = yams_table.rows[1].cells.length;
            var new_player = event.target.parentElement.firstChild.value;
            if(new_player!=""){
                addPlayer(new_player+ "_" + num_joueur,null);
                event.target.parentElement.firstChild.value = "";
            }else{
                addPlayer("Jackie"+ "_" + num_joueur,null);
                event.target.parentElement.firstChild.value = "";
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
            combi.setAttribute("class","combi");
        }

        var header = yams_table.createTHead();
        var row_header = header.insertRow(0);
        var joueurs_header = row_header.insertCell(0);
        joueurs_header.innerHTML = "Joueurs";

        div_overflow.append(yams_table);
        yams_app.append(div_overflow);
        
        clearButton()
    }
    
    /* 
        Bouton pour effacer les scores du localStorage "en cache" et rafraichi la page
    */
    function clearButton(){
        var button_clear = document.createElement("button");
        button_clear.setAttribute("id","button_clear");
        button_clear.innerHTML = "Effacer les scores ❌"
        button_clear.onclick = function(){
            setYamsScores({});
            location.reload(); 
        }
                
        yams_app.append(button_clear);
    }
}