/* life sections */
/* year, week, what, css-class */
var timeline = [
	[0, 1, "Kindheit", "childhood"],
	[6, 9, "Volksschule in Mazedonien", "primary"],
	[12, 8, "Sekundarschule", "secundary"],
	[16, 8, "Lehre", "highschool"],
	[20, 1, "Arbeit", "work"],
	[21, 11, "Studium Informatik", "it"],
	[23, 11, "Studium iCompetence", "icomp"],
	[24, 44, "Undefiniert", "undef"]];
		
/* create data */
var data = [];
let t = 0;
let desc = timeline[t][2];
let css = timeline[t][3];
for (let year = 0; year <= 90; year++) {
	for (let week = 0; week < 52; week++) {
		data.push([]);
		data[year * 52 + week].push(year);
		data[year * 52 + week].push(week + 1);
		if (t < timeline.length - 1 && year >= timeline[t+1][0] && week >= timeline[t+1][1] - 1) {
			t++;
			desc = timeline[t][2];
			css = timeline[t][3];
		}
		data[year * 52 + week].push(desc);
		data[year * 52 + week].push(css);
	}
}

var margin = { top: 50, right: 30, bottom: 30, left:50 }

var height = 1450 - margin.top - margin.bottom,
	width = 1000 - margin.left - margin.right,
	barWidth = 50,
	barOffset = 5;

var tempColor;

var yScale = d3.scale.linear()
		.domain([0, 90])
		.range([5, 91 * 15 - 10]);

var xScale = d3.scale.ordinal()
		.domain([1, 52])
		.range([5, 52 * 15 - 10]);

var tooltip = d3.select('body').append('div')
		.style('position', 'absolute')
		.style('padding', '0 10px')
		.style('background', 'white')
		.style('opacity', 0)
		
var myChart = d3.select('#chart').append('svg')
	.style('background', 'white')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')	
	
var rectangles = myChart.selectAll("rect").data(data).enter().append("rect");
	
var rectangleAttributes = rectangles
	.attr("x", d => (d[1] - 1) * 15)
	.attr("y", d => d[0] * 15)
	.attr("width", 10)
	.attr("height", 10)
	.attr("class", d => d[3])
	.on('mouseover', function(d) {
		tooltip
            .style("display", "block")
			.transition().style('opacity', .9)
		tooltip.html(d)
			.style('left', (d3.event.pageX + 5) + 'px')
			.style('top',  (d3.event.pageY - 65) + 'px')
		tooltip.html('<strong>' + d[2] + '</strong>' + '<br/>Jahr ' + d[0] + '<br/>Woche ' + d[1]);
		tempColor = this.style.fill;
		d3.select(this)
			.style('opacity', .5)
			.style('fill', 'black')
	})
	.on('mouseout', function(d) {
		d3.select(this)
			.style('opacity', 1)
			.style('fill', tempColor)
		tooltip
            .style("display", "none");
	})


var vAxis = d3.svg.axis()
	.scale(yScale)
	.orient('left')
	.ticks(10)

var vGuide = d3.select('svg').append('g')
	vAxis(vGuide)
	vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
	vGuide.selectAll('path')
		.style({ fill: 'none', stroke: "#000"})
	vGuide.selectAll('line')
		.style({ stroke: "#000"})

var hAxis = d3.svg.axis()
	.scale(xScale)
	.orient('top')
	.ticks(5.2)

var hGuide = d3.select('svg').append('g')
	hAxis(hGuide)
	hGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
	hGuide.selectAll('path')
		.style({ fill: 'none', stroke: "#000"})
	hGuide.selectAll('line')
		.style({ stroke: "#000"})
