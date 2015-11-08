
// constants
var standardRadius = 20;

    
var input;
function key_up (e) {
   // listen for the ENTER key 
    if (e.keyCode == 13) {  
        input = document.getElementById("initial-input-box").value;   
        get_movie(input);
        document.getElementById("input_id").value = "";
    }
}

function get_movie(title) {
    // get the data
    // parse the data
    // build the graph

}

function mouseover() {
  d3.select(this).select("circle").transition()
      .duration(250)
      .attr("r", standardRadius * 1.5);
}

function mouseout() {
  d3.select(this).select("circle").transition()
      .duration(250)
      .attr("r", standardRadius);
}

//Constants for the SVG
var width = window.innerWidth - 40,
    height = window.innerHeight - 40;

//Set up the colour scale
var color = d3.scale.category20();

//Set up the force layout
var force = d3.layout.force()
    .charge(-400)
    .linkDistance(standardRadius * 4)
    .size([width, height]);

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

//Creates the graph data structure out of the json data
force.nodes(graph.nodes)
    .links(graph.links)
    .start();


//Create all the line svgs but without locations yet
var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke-width", 2)
    .attr("stroke", "black")


//Do the same with the circles for the nodes - no 
var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .style("fill", function (d) {
        return color(d.group);
    })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag)

node.append("circle").attr("r", standardRadius)


//Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
force.on("tick", function () {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
        return d.source.y;
    })
        .attr("x2", function (d) {
        return d.target.x;
    })
        .attr("y2", function (d) {
        return d.target.y;
    });

    node.attr("cx", function (d) {
        return d.x;
    })
        .attr("cy", function (d) {
        return d.y;
    });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});
