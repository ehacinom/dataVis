$(document).ready(function () {
  let loader = function () {
    var showData = $('#show-data');
    var dataArray;
    $.getJSON('Data/drugdeaths.json', function (data) {
      console.log(data.meta.view.columns[15]);

      // var items = data.items.map(function (item) {
      //   return item.key + ': ' + item.value;
      // });

      // showData.empty();

      // if (items.length) {
      //   var content = '<li>' + items.join('</li><li>') + '</li>';
      //   var list = $('<ul />').html(content);
      //   showData.append(list);
      // }



      // Get numerical data into array
      const items = data.meta.view.columns.map(function (col, i) {
        if (col.name == "Age") {
          console.log("found city at ", i);
          dataArray = col.cachedContents.top.map( function(elem) {
            return elem.item;
          })
        }

        return col.name;
      });

      // Display column names
      showData.empty();

      if (items.length) {
        const content = '<li>' + items.join('</li><li>') + '</li>';
        const list = $('<ul />').html(content);
        showData.append(list);
      }

      console.log(dataArray);

      // Bar Graph
      const widthPadding = 20;
      const widthFactor = 40;
      const graphWidth = 1000;
      const graphHeight = 500;
      const heightFactor = graphHeight / 100;
      const barSpacingRatio = 1;
      var c10 = d3.scale.category10();
      var svg = d3.select(".graph").append("svg")// svg element where all shapes are placed
              .attr("height", graphHeight + 20)//"100%")
              .attr("width", "100%");
     
      
      svg.selectAll("rect") // draw bar graph rectangles
              .data(dataArray) // for each piece of data
              .enter().append("rect") //make a rectangle
                      .attr("height", function(d, i) {
                        return(d * heightFactor)
                      })
                      .attr("width", (widthFactor * barSpacingRatio).toString())
                      .attr("x", function(d, i) {return (i * widthFactor) + widthPadding }) // shift x values over using the data point and index built into array operations
                      .attr("y", function(d, i) {return graphHeight - (d * heightFactor)})  // modify size and shape of rects
                      //.attr("fill", "pink");
                      .style("fill", function(d){ return c10(d) }); // color based on data value
      svg.selectAll("text") // label data with value
              .data(dataArray)
              .enter().append("text")
              .text(function(d) {return d})
                      .attr("class", "text")
                      .attr("x", function(d, i) {return (i * widthFactor) + widthPadding + (widthFactor * barSpacingRatio) / 3 })
                      .attr("y", function(d, i) {
                        return graphHeight + 15 - (d * heightFactor)});
      
      svg.append("text") // x axis lable
              .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", graphWidth / 2)
              .attr("y", graphHeight + heightFactor * 3)
              .text("Case");


      svg.append("text") // y axis label
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("y", 0)
              .attr("x", - graphHeight / 2)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("Age at Drug-Related Death");
    });

    showData.text('Loading the JSON file.');
  };
  loader();
});