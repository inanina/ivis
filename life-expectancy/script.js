var bardata = [];
var countrynames = [];

d3.tsv('data.tsv', function(data) {
	
	for (key in data) {
		bardata.push(data[key].Expectancy)
		countrynames.push(data[key].Country)
	}
	
	/*bardata.sort(function compareNumbers(a,b) {
		return a -b;
	});*/ 
	
	var margin = { top: 30, right: 30, bottom: 40, left:50 }

	var height = 400 - margin.top - margin.bottom,
		width = 1200 - margin.left - margin.right,
		barWidth = 50,
		barOffset = 5;

	var tempColor;

	var yScale = d3.scale.linear()
			.domain([0, d3.max(bardata)])
			.range([0, height]);

	var xScale = d3.scale.ordinal()
			.domain(d3.range(0, bardata.length))
			.rangeBands([0, width], 0.1)

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
		.selectAll('rect').data(bardata)
		.enter().append('rect')
			.attr("fill", function(d) {
				if (d < 50) {
					return "#b71c1c";
				} else if (d < 60) {
					return "#e53935";
				} else if (d < 70) {
					return "#ffcc80";
				} else if (d < 80) {
					return "#a5d6a7";
				} else {
					return "#4caf50";
				}
			  })
			.attr('width', xScale.rangeBand())
			.attr('x', function(d,i) {
				return xScale(i);
			})
			.attr('height', 0)
			.attr('y', height)

		.on('mouseover', function(d) {

			tooltip.transition()
				.style('opacity', .9)

			tooltip.html(d)
				.style('left', (d3.event.pageX - 35) + 'px')
				.style('top',  (d3.event.pageY - 30) + 'px')


			tempColor = this.style.fill;
			d3.select(this)
				.style('opacity', .5)
				.style('fill', 'black')
		})

		.on('mouseout', function(d) {
			d3.select(this)
				.style('opacity', 1)
				.style('fill', tempColor)
		})

	myChart.transition()
		.attr('height', function(d) {
			return yScale(d);
		})
		.attr('y', function(d) {
			return height - yScale(d);
		})
		.delay(function(d, i) {
			return i * 20;
		})
		.duration(1000)
		.ease('elastic')

	var vGuideScale = d3.scale.linear()
		.domain([0, d3.max(bardata)])
		.range([height, 0])

	var vAxis = d3.svg.axis()
		.scale(vGuideScale)
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
		.orient('bottom')
        .tickValues(xScale.domain().filter(function(d, i) {
            return !(i % (bardata.length/5));
        }))

	var hGuide = d3.select('svg').append('g')
		hAxis(hGuide)
		hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
		hGuide.selectAll('path')
			.style({ fill: 'none', stroke: "#000"})
		hGuide.selectAll('line')
			.style({ stroke: "#000"})
})
