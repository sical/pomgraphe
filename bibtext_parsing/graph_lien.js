if (document.body)
{
var width = (window.innerWidth);
var height = (window.innerHeight);
height = height - 200;
width = width * 0.65;
} 

var auteur = "";
var auteur_other ;
var year ;
var tab_auteur = [] ;
var selected_node ;

var to_select = new Set();

var slider = document.getElementById("myRange");
var output = document.getElementById("myRange");
var force_2 = -90;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  force_2 = this.value;
  force.charge(force_2);
  force.start();

} 



function recherche(nForm) { // fonction pour le bouton de recherche
    auteur = $('#auteur').val();
    //$('#auteur').css("display", "none");
    d3.selectAll(".node[name_node='"+auteur+"']").attr("class","node sel");
    d3.selectAll(".link[source='"+auteur+"']").attr("class","link link2").attr("opacity",1);
    d3.selectAll(".link[target='"+auteur+"']").attr("class","link link2").attr("opacity",1);
    d3.zoomTransform(".node[name_node='"+auteur+"']");
}

function affiche_liste(){ // affiche la liste des articles écrits
    document.getElementById('other').innerHTML = "";
    let set_tab_article = new Set();
    d3.selectAll(".link[source='"+auteur_other+"']").attr("source",function(d){
        for(let i = 0 ; i < d.titles.length;i++){
            set_tab_article.add(d.titles[i]);
        }
    })
    d3.selectAll(".link[target='"+auteur_other+"']").attr("source",function(d){
        for(let i = 0 ; i < d.titles.length;i++){
            set_tab_article.add(d.titles[i]);
        }
    })
    for(let item of set_tab_article){
        document.getElementById('other').innerHTML += "<tr>" + item + "</tr>" + "<br>";
    }
}

function select(name){
    if (name == "sical"){
        affiche_select("sical");
    }
    if(name == "sma"){
        affiche_select("SMA");
    }
    if(name == "Tweak"){
        affiche_select("Tweak");
    }
    if(name == "IMAGINE"){
        affiche_select("IMAGINE");
    }
    if(name == "DM2L"){
        affiche_select("DM2L");
    }
    if(name == "BD"){
        affiche_select("BD");
    }
    if(name == "GOAL"){
        affiche_select("GOAL");
    }
    if(name == "DRIM"){
        affiche_select("DRIM");
    }
    if (name == "SOC"){
        affiche_select("SOC");
    }
    if(name == "M2DisCo"){
        affiche_select("M2DisCo");
    }
    if(name == "GeoMod"){
        affiche_select("GeoMod");
    }
    if(name == "Beagle"){
        affiche_select("Beagle");
    }
    if(name == "R3AM"){
        affiche_select("R3AM");
    }
    if(name == "SAARA"){
        affiche_select("SAARA");
    }
}

function affiche_select(name_equipe){ // permet le filtre par équipe
    var team_sical;
    var to_keep_link;
    var to_keep_node;
    team_sical=d3.selectAll(".node[name_team='"+name_equipe+"']")[0].map(node => node.getAttribute("name_node"));
    to_keep_link = d3.selectAll(".link").filter(function(link){
        return team_sical.includes(link.source.id) || team_sical.includes(link.target.id);
    })
    to_keep_node = team_sical.concat(to_keep_link.map(function(link){
        var tab = [];
        for(var i = 0 ; i < to_keep_link.size();i++){
            if (team_sical.includes(link[i].getAttribute("target"))){
                if (!team_sical.includes(link[i].getAttribute("source"))){
                    tab.push(link[i].getAttribute("source"));
                }
            } else {
                if (team_sical.includes(link[i].getAttribute("source"))){
                    tab.push(link[i].getAttribute("target"));
                }
            } 
        }
        return tab;
    })[0]);
    d3.selectAll(".node").filter(node => !to_keep_node.includes(node.id)).remove();
    d3.selectAll(".link").filter(function(link){
        for(var i = 0 ; i < to_keep_link.size();i++){
            if(to_keep_link[0][i].getAttribute("source")== link.source.id && to_keep_link[0][i].getAttribute("target")== link.target.id){
                return false;
            }
        }
        return true;
    }).remove();

}

function sort_year(form){ // filtre pour les dates
    year = $('#datetimepicker1').val();
}


document.querySelector("select").addEventListener("change", function (){ // opacité des liens en fonction de la date de la derniére collaboration
    year=this.value;
    d3.selectAll(".link[last='"+year+"']").attr("class","link link2").attr("opacity",1);
}, false);

function delete_cookie( name ) {
    document.cookie = name + 'ppkcookie2=encore un autre test; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=/';
  }

function clear(){ //permet de remettre a zero
    document.location.reload(true);
}

$(function(){ // pour l'auto-complétion
    $("#auteur").autocomplete({
        source:tab_auteur
    });
});


 var force = d3.layout.force()
    .linkDistance(60)
    .size([width, height]);


var svg = d3.select("#chartline1").append("svg") //zoom du graphe
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
      }))
    .append("g");

var color = d3.scale.category10();
var color2  = d3.scale.category20();
var color3 = d3.scale.category20b();


d3.json("bibtext_parsing/data.json", function(error, graph) { // debut de la construction du graphe
  if (error) throw error;

  var nodeById = d3.map();

  graph.nodes.forEach(function(node) {
    nodeById.set(node.id, node);
  });

  graph.links.forEach(function(link) {
    link.source = nodeById.get(link.source);
    link.target = nodeById.get(link.target);
  });

  force
      .nodes(graph.nodes)
      .links(graph.links)
      

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .attr("last",function(d){return d.lastColaboration;})
      .attr("source",function(d){return d.source.id;})
      .attr("target",function(d){return d.target.id;})
      .attr("stroke-width", function(d){return d.nbLinks;})
      .attr("opacity",function(d){
            if( d.lastColaboration >= 2017 ){
                return 1;
            }
            if (d.lastColaboration >= 2014) {
                return 0.5;
            }
            if (d.lastColaboration <= 2010 ){
                return 0.2;
            }
            });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("name_node",function(d){tab_auteur.push(d.id) ;return d.id;})
      .attr("name_team",function(d){return d.group;})
      .attr("r", 6)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("click",function(d){
          auteur_other = d.id;
          document.getElementById('name_click').innerHTML = d.id;
          document.getElementById('last_collaboration_click').innerHTML = d.lastColaboration;
          document.getElementById('team_clic').innerHTML = d.group;
          affiche_liste();
          
          if (selected_node != d.id){
              to_select = new Set();
              selected_node = d.id;
              d3.selectAll(".node").attr("class", "node");
          } else {
            to_select.add(d.id);

            d3.selectAll(".link").filter(function(l){
                if (to_select.has(l.source.id) | to_select.has(l.target.id)){
                    return true;
                }
            }).map(function(l){
                for (let i = 0; i < l.length; i++){
                    if (to_select.has(l[i].__data__.source.id)){
                        to_select.add(l[i].__data__.target.id);
                    } else {
                        to_select.add(l[i].__data__.source.id);
                    }
                }
                
            })
          }
          d3.selectAll(".node").filter(function(n){return to_select.has(n.id)}).attr("class","node sel");

      })
      .attr("fill",function(d){
          if(auteur == d.id){ 
              return color3(d);
          }else{
              if(d.group == "sical"){
                return d3.rgb("blue");
              }
              if(d.group == "SMA"){
                  return d3.rgb("red");
              }
              if(d.group == "Tweak"){
                  return d3.rgb("SeaGreen");
              }
              if(d.group == "IMAGINE"){
                  return d3.rgb("Magenta");
              }
              if(d.group == "DM2L"){
                  return d3.rgb("Sienna");
              }
              if(d.group == "BD"){
                  return d3.rgb("YellowGreen");
              }
              if(d.group == "GOAL"){
                  return d3.rgb("Aqua");
              }
              if(d.group == "DRIM"){
                  return d3.rgb("DarkGoldenrod");
              }
              if(d.group == "SOC"){
                  return d3.rgb("SkyBlue");
              }
              if(d.group == "M2DisCo"){
                  return d3.rgb("Yellow");
              }
              if(d.group == "GeoMod"){
                  return d3.rgb("RosyBrown");
              }
              if(d.group == "Beagle"){
                  return d3.rgb("MediumSlateBlue");
              }
              if(d.group == "R3AM"){
                  return d3.rgb("Salmon");
              }
              if(d.group == "SAARA"){
                  return d3.rgb("Teal");
              }
          return d3.rgb("orange");}
        })
      .style("fill", function(d) { return d.id; })
      .attr("r",function(d){
          if(d.group != "no team"){
            return 10;
        }else{
            return 5;
          }
      })
      .call(force.drag);
  node.append("title")
      .text(function (d) { return d.id;});

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });


    console.log('stqrting')

   
  force.start();
  for (let i = 0; i<50; i++) {
    force.tick(); 
    console.log(i);
  }
  force.stop();
  });

  function mouseover() { // évenemtent pour la souris
      d3.select(this).transition()
          .duration(750)
          .attr("r",15);
  }
//6
  function mouseout() {
      d3.select(this).transition()
          .duration(750)
          .attr("r", function(d){
              if(d.group == "no team"){
                  return 6;
              }else{
                  return 10;
              }
          });
  }
 
});
