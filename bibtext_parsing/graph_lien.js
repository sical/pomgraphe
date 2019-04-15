var width = 700,
    height = 700;

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
    .charge(-200)
    .linkDistance(40)
    .size([width, height]);

var svg = d3.select("#chartline1").append("svg")
    .attr("width", width)
    .attr("height", height);

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
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 6)
      .on("click", mouseover)
      .on("mouseout", mouseout)
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