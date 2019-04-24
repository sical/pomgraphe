var width = 1250,
    height = 1100;
var auteur = "";
var year ;

var tab_auteur = [] ;

function recherche(nForm) {
    auteur = $('#auteur').val();
    d3.selectAll(".node[name_node='"+auteur+"']").attr("class","node sel");
    d3.selectAll(".link[source='"+auteur+"']").attr("class","link link2").attr("opacity",1);
    d3.selectAll(".link[target='"+auteur+"']").attr("class","link link2").attr("opacity",1);
}

function sort_year(form){
    year = $('#datetimepicker1').val();
}

document.querySelector("select").addEventListener("change", function (){
    year=this.value;
    d3.selectAll(".link[last='"+year+"']").attr("class","link link2").attr("opacity",1);
}, false);

function delete_cookie( name ) {
    document.cookie = name + 'ppkcookie2=encore un autre test; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=/';
  }

function clear(){
    document.location.reload(true);
}

$(function(){
    $("#auteur").autocomplete({
        source:tab_auteur
    });
});

// window.addEventListener('resize', function(event){
//     redraw();
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
      .attr("last",function(d){return d.lastColaboration;})
      .attr("source",function(d){return d.source.id;})
      .attr("target",function(d){return d.target.id;})
      .attr("stroke-width", function(d){return d.nbLinks/3;})
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
      .attr("r", 6)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .attr("fill",function(d){
          if(auteur == d.id){
            //   document.getElementById('auteur_name').innerHTML = auteur + " et la derniére collaboration: " + d.lastColaboration ;
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
      d3.select(this).transition()
          .duration(750)
          .attr("r",15);
  }

  function mouseout() {
      d3.select(this).transition()
          .duration(750)
          .attr("r", 6);
  }
 
});
// delete_cookie(auteur);