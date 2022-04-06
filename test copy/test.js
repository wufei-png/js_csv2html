

// set the dimensions and margins of the graphv
var show_heatmap=()=>{
const margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 450 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;
	var block_chart3 = d3.select("body").append("svg").attr("id",'heatmap').attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);
// append the svg object to the body of the page
const svg = d3.select("#heatmap")
.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Labels of row and columns
const myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

const myVars = [];
myVars.push("v2");
myVars.push("v3");
console.log("myVars",myVars);
//USA	SA	EU	MEA	ASIA 
// Build X scales and axis:
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myGroups)
  .padding(0.01);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))

// Build X scales and axis:
const y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y));

// Build color scale
const myColor = d3.scaleLinear()
  .range(["white", "#69b3a2"])
  .domain([1,100])

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv").then( function(data) {

  svg.selectAll()
      .data(data, function(d) {return d.group+':'+d.variable;})
      .join("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )

})
}
show_heatmap();
