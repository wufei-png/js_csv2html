var margin = {top: 20, right: 20, bottom: 20, left: 20},
	width = 500 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom,
	radius = width/2;
  // .range(["#BBDEFB","#98CAF9","#64B5F6","#42A5F5","#2196F3","#1E88E5","#1976D2"]);
var color = d3.scaleOrdinal()
	.range(["#BBDEFB","#98CAF9","#64B5F6","#42A5F5"]);
  var arc = d3.arc()
	.outerRadius( radius - 10)
	.innerRadius(0);

var labelArc = d3.arc()
	.outerRadius(radius - 50)
	.innerRadius(radius - 50)
  var pie = d3.pie()
	.sort(null)
	.value(function(d) { 
	//console.log(d[1]);
	return d.value; });
  var svg = d3.select("body")
	.append("svg")
	.attr("width",width)
	.attr("height",height)
	.append("g")
	.attr("transform","translate("+ width/2 +"," + height/2 +")");
  var data = [
    {
        "index": 'u20',
        "value": 2
    },
    {
        "index": '20to35',
        "value": 25
    },
    {
        "index": '35to55',
        "value": 48
    },
    {
        "index": 'm55',
        "value": 25
    }
  ]

  var g = svg.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		.attr("class","arc");
    g.append("path")
		.attr("d",arc)
		.style("fill",function(d) {
			return color(d.data.index);
		})
		.transition()
		.ease(d3.easeLinear)
		.duration(2000)
		.attrTween("d",pieTween);
    g.append("text")
		.transition()
		.ease(d3.easeLinear)
		.duration(2000)
		.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
		.attr("dy",".35em")
		.text(function(d){ 
		console.log(d);
		return d.data.index;});
    function pieTween(b){
		b.innerRadius = 0;
		var i = d3.interpolate({startAngle:0,endAngle:0},b);
		return function(t) {return arc(i(t));};
	}

