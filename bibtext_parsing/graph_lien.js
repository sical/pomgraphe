var width = 1250,
    height = 1100;
var auteur = "";


function recherche(nForm) {
    auteur = $('#auteur').val();
    alert(auteur);
    d3.selectAll(".node[name_node='"+auteur+"']").attr("class","node sel");
}

function delete_cookie( name ) {
    document.cookie = name + 'ppkcookie2=encore un autre test; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=/';
  }

   var BLEABLEA = [
     {source: 'Romain Vuillemot', target: 'Richard Alligier', group: "1"},
     {source: 'Romain Vuillemot',target: 'Maxime Cordeil', group: "1"},
     {source: 'Romain Vuillemot',target: 'Steven M.Drucker', group: "1"},
     {source: 'Romain Vuillemot', target: 'Nathalie Henry Riche', group: "1"},
     {source: 'Romain Vuillemot',target:'Christophe Hurter', group: "1"}
   ];

    // var links = d3.json("test.json", function(error, json){
    //      if (error) {alert("generale")}
    //     // for (data in json){
    //     //     BLEABLEA.push(data);
    //     //     alert(BLEABLEA.length)
    //     // }
    // });

 var force = d3.layout.force()
    .charge(-90)
    .linkDistance(60)
    .size([width, height]);

var svg = d3.select("#chartline1").append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scale.category10();
var color2  = d3.scale.category20();
var color3 = d3.scale.category20b();

d3.json("bibtext_parsing/test.json", function(error, graph) {
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
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .attr("stroke-width", function(d){return d.nbLinks/3;})
      .attr("opacity",function(d){
          return d.lastColaboration;}); // Pour demain

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("name_node",function(d){return d.id;})
      .attr("r", 6)
      .on("click", mouseover)
      .on("mouseout", mouseout)
      .attr("fill",function(d){
          if(auteur == d.id){
            //   document.getElementById('auteur_name').innerHTML = auteur + " nombre de d'articles co-écrits: " + d.nbLinks +" et la derniére collaboration: " + d.lastColaboration ;
              return color3(d);
          }else{
          return color(d.group);}
        })
      .style("fill", function(d) { return d.id; })
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
    
  });

  function mouseover() {
    // document.getElementById("autheur").value = this;
      d3.select(this).select("circle").transition()
          .duration(750)
          .attr("r", 16);
  }

  function mouseout() {
      d3.select(this).select("circle").transition()
          .duration(750)
          .attr("r", 8);
  }
 
});
delete_cookie(auteur);