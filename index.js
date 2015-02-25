var container = document.getElementById('numbers'),
    frequency = 100,
    data = [];

// Get data stream, at an interval add datapoint to set
setInterval(function() {

  // generate a random value between 0 and 10
  var accl = Math.random() * 10;

  data.push(accl)
}, frequency);

// Initialize d3
var chart = d3.select(container);

// Set up container
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, 50])      // used for axis
    .range([0, width]);   // range of values

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var y = d3.scale.linear()
    .domain([0, 10])
    .range([height, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

//  create line function x(i) scales i to x-axis
var line = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

var svg = d3.select("#chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

// add y axis
svg.append("g")
.attr("class", "y axis")
.call(yAxis);




// ? Moving pointer for start of data set
// ? When data set > 50, pointer moves upon each addition item
// Get last 50 data points

function drawChart () {
  var numValues = 50,
      sliceData;

  // var divs = chart.selectAll("div"),

  if (data.length > numValues) {
    sliceData = data.slice(data.length - numValues);
    d3.selectAll(".line").remove();

    // divs.data(sliceData)
    // .text(function (d) { return d; });

  } else {
    sliceData = data;

    // divs.data(sliceData)
    // .enter()
    // .append("div")
    // .text(function(d) { return d; });
  }

  // draw graph
  svg.append("path")
  .datum(sliceData)
  .attr("class", "line")
  .attr("d", line);
}

// On interval redraw graph
setInterval(drawChart, frequency);
