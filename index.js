var container = document.getElementById('chart');
container.innerText = "We have loaded!";

var data = [];
// Get stream of data

// FAKE DATA!
// At an interval add a datapoint to the set
setInterval(function() {
  // generate a random value between 0 and 10
  var accl = Math.random() * 10;
  data.push(accl)
}, 100);

// Initialize d3
var chart = d3.select(container);

// Get container set up


// Adding data

// Maximum data points to show: 50 past | data | future
// ? Moving pointer for start of data set
// ? When data set > 50, pointer moves upon each addition item
// Get last 50 data points
// array.slice(array.length-50)
var sliceData;
function drawChart () {

  if (data.length > 50) {
    sliceData = data.slice(data.length - 50);

  } else {
    sliceData = data;
  }

  chart.selectAll("div").data(sliceData).enter().append("div")
      .text(function(d) {
        return d;
      });
}
// Redraw the graph on an interval
setInterval(drawChart, 500);
