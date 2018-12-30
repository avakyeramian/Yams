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
		
		//console.log(yams_array);
		
		createTableYams();
			
		/* -- fonctions -- */
		
		/* 
			Fait un tableau pour le Yams pour un joueur 
		*/
		function createTableYams() {
			var yams_table = document.createElement("table");
			yams_table.setAttribute("id","yams_table");
			
			for(var item in yams_array){
				var row = yams_table.insertRow();
				var combi = row.insertCell(0);
				var joueur = row.insertCell(1);
				combi.innerHTML = yams_array[item].name;
				
				if( (yams_array[item].name!="Somme") && (yams_array[item].name!="Bonus") && (yams_array[item].name!="Total") ){
					var input = document.createElement("input");
					input.setAttribute("type","number");
					input.setAttribute("min",yams_array[item].min);
					input.setAttribute("max",yams_array[item].max);
					input.setAttribute("step",yams_array[item].step);
					joueur.append(input);
				}

			}
			
			var header = yams_table.createTHead();
			var row_header = header.insertRow(0);
			var joueurs_header = row_header.insertCell(0);
			var joueur1_header = row_header.insertCell(1);
			joueurs_header.innerHTML = "Joueurs";
			joueur1_header.innerHTML = "Joueurs 1";
			
			yams_app.append(yams_table);
		}
		

		/* 
			MAJ Somme, Bonus et Total
		*/
		function updateTotals(){
			
		}
		
		/* 
			Ajoute un joueur
		*/
		function addPlayer(){
			
		}
	}
}