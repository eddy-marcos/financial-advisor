import React, { useRef, useEffect} from 'react';
import * as d3 from "d3";
import { unCamelCase, uppercaseFirstLetter } from '../utils.js';

const PieGraph = (props) => {
  // get props data
  const height = props.height;
  const width = props.width;
  const innerRadius = props.innerRadius;
  const outerRadius = props.outerRadius;
  const colors = props.colors;
  const defaultText = props.defaultText;
  let shouldDisplayDefault = props.shouldDisplayDefault;
  let data = props.data;
  
  // Compute the position of each group on the pie
  let pie = d3.pie()
    .value(function(d) { return d.value });

  let filteredData = d3.entries(
      data
    ).filter(category => {
      return category.value;
    });

  let dataReady = pie(filteredData);
  const svgRef = useRef();
  let arcGenerator = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  useEffect(() => {     
    d3.select(".circle-wrapper").remove();
    let svg = d3.select(svgRef.current)
    /* Force uniform scaling.
    Align the <min-x> of the element's viewBox with the smallest X value of the viewport.
    Align the <min-y> of the element's viewBox with the smallest Y value of the viewport. */
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${height} ${width}`)
      .classed("svg-content", true)
      .append("g")
        .attr("class","circle-wrapper")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    
    let centeredText = svg.append("text")
        .attr("x", "0")
        .attr("y", "-1.2em")
        .style("text-anchor", "middle")
        .attr("class", "font")
        .attr("fill", "#000")
    centeredText
      .append("tspan")
        .attr("x", "0")
        .attr("dy", "1.2em")
        .html("INVESTMENT")
    centeredText
      .append("tspan")
        .attr("x", "0")
        .attr("dy", "1.2em")
        .html("PORTFOLIO")

    let g = svg.selectAll("circle")
      .data(dataReady)
      .enter()
      .append('g')
        .attr("class", "arc");
      
    g.append("path")
        .attr("d", arcGenerator)
        .attr("fill", function(d, i){
          return colors[i]
        });
    g
      .on('mouseenter', function(d) {
        d3.select(this).style("opacity", "0.85");
        if (!shouldDisplayDefault ) {
          d3.select(this).select('text')
            .text(function(d){
                return d.data.value + "%";
            })
        }
      })
      .on('mouseleave', function(d) {
        d3.select(this).style("opacity", "1");
        if (!shouldDisplayDefault ) {
          d3.select(this).select('text')
            .text(function(d){
                return uppercaseFirstLetter(unCamelCase(d.data.key));
            })
        }
      })
      .append("text")
        .attr("transform", function(d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .attr("fill", "#fff")
        .classed('font', true)
        .text(function(d,i) { 
          return shouldDisplayDefault 
            ? defaultText 
            : uppercaseFirstLetter(unCamelCase(d.data.key)); 
        });
        
  }, [props.data, svgRef])

  return (
    <div className="donut-container">
      <svg ref={svgRef} ></svg>
    </div>
  )
}

export default PieGraph;