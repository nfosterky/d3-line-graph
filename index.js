var frequency = 100,
    dataX = [],
    svg, line;

// Get data stream, at an interval add datapoint to set
function startTracking () {
  setInterval(function() {
    // get acceleration
    var accl = Math.random() * 10;  // generate random value between 0 and 10

    dataX.push(accl)
  }, frequency);
}
startTracking();

// Set up container
function setUpGraph () {
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
  line = d3.svg.line()
  .x(function(d, i) { return x(i); })
  .y(function(d, i) { return y(d); });

  svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add x axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  // add y axis
  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);
}
setUpGraph();

// TODO: instead of redrawing all points each update, shift points left & append
function drawChart () {
  setInterval(function() {
    var numValues = 50,
        sliceDataX;

    if (dataX.length > numValues) {
      // Get last x data points
      sliceDataX = dataX.slice(dataX.length - numValues);
      d3.selectAll(".line").remove();

    } else {
      sliceDataX= dataX;
    }

    // draw graph
    svg.append("path")
    .datum(sliceDataX)
    .attr("class", "line")
    .attr("d", line);
  }, frequency);
}
drawChart();
