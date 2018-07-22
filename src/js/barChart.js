//import jQuery by URL

// barChart.js
var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];


$.getJSON("Data/first.json", function(json) {
       console.log(json); // this will show the info it in firebug console
       console.log("Printed JSON?");
       dataArray = JSON.parse(json);
       consule.log(dataArray);
});

//working
// var stringData = $.ajax({
//         url: "data.csv",
//         async: false
// }).responseText;
      
// //Split values of string data
// var stringArray = stringData.split(",");
// alert("Data Loaded: " + stringData); // working


// Bar Graph
var svg = d3.select("body").append("svg")// svg element where all shapes are placed
        .attr("height","100%")
        .attr("width","100%");

svg.selectAll("rect")
        .data(dataArray) // for each piece of data
        .enter().append("rect") //make a rectangle
                .attr("height", function(d, i) {return(d * 10)})
                .attr("width","40")
                .attr("x", function(d, i) {return (i * 60) + 25;}) // shift x values over using the data point and index built into array operations
                .attr("y", function(d, i) {return 400 - (d * 10)})  // modify size and shape of rects
                .attr("fill", "blue");


svg.selectAll("text")
        .data(dataArray)
        .enter().append("text")
        .text(function(d) {return d})
                .attr("class", "text")
                .attr("x", function(d, i) {return (i * 60) + 36})
                .attr("y", function(d, i) {return 415 - (d * 10)});


// csv(url, function(err, data) {
// console.log(data);
// })

console.log("End js");