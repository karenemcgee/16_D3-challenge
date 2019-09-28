var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g");

d3.csv("assets/js/data.csv")
    .then(function(healthData) {

        healthData.forEach(function(d) {
            d.poverty = +d.poverty;
            d.healthcare = +d.healthcare;
        });

        console.log(healthData);

        var xLinearScale = d3.scaleLinear().range([0, width]);
        var yLinearScale = d3.scaleLinear().range([height, 0]);

        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Configure axes
        var xMin = d3.min(healthData, function(d) {
            return d.healthcare;
        });

        var xMax = d3.max(healthData, function(d) {
            return d.healthcare;
        });

        var yMin = d3.min(healthData, function(d) {
            return d.poverty;
        });

        var yMax = d3.max(healthData, function(d) {
            return d.poverty;
        });

        console.log(xMin);
        console.log(xMax);
        console.log(yMin);
        console.log(yMax);

        xLinearScale.domain([xMin, xMax]);
        yLinearScale.domain([yMin, yMax]);

        // Append axes
        chartGroup.append("g")
                  .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

        chartGroup.append("g").call(leftAxis);

        // Circles
        chartGroup.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", function(data, index) {
                return xLinearScale(data.poverty)
            })
            .attr("cy", function(data, index) {
                return yLinearScale(data.healthcare)
            })
            .attr("r", "15")
            .attr("fill", "lightblue");

        // //
        // var circlesGroup = chartGroup.selectAll("circle")
        // .data(healthData)
        // .enter()
        // .append("circle")
        // .attr("cx", d => xLinearScale(d.healthcare +1.5))
        // .attr("cy", d => yLinearScale(d.poverty +0.3))
        // .attr("r", "12")
        // .attr("fill", "blue")
        // .attr("opacity", .5)
        // //

        // Abbreviations in Circles
        chartGroup.append("text")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .selectAll("tspan")
            .data(healthData)
            .enter()
            .append("tspan")
            .attr("x", function(data) {
                return xLinearScale(data.poverty - 0);
                })
            .attr("y", function(data) {
                return yLinearScale(data.healthcare - 0.2);
                })
            .text(function(data) {
                return data.abbr
                });

        // Axis Labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0-margin.left + 40)
            .attr("x", 0 - height/2)
            .attr("dy","1em")
            .attr("class", "axis-text")
            .text("Lacks Healthcare (%)");

        chartGroup.append("text")
            .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")")
            .attr("class", "axis-text")
            .text("In Poverty (%)");
        })
    .catch(function(error){
     // handle error   
        })

// d3.csv("assets/js/data.csv", function(error, data) {
//     if (error) throw error;

