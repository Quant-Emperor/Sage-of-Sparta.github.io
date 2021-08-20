

renderHeatMap('','chartDiv4','');

function renderHeatMap(series,jscchartname,title) {
    var chart = JSC.chart(jscchartname, { 
    debug: true, 
    type: 'heatmap', 
    toolbar_visible: false, 
    title_label_text: 
      'Call Response Time (Minutes)', 
    legend_title_label_text: 'Minutes', 
    palette: { 
      colors: ['green', 'yellow', 'red'], 
      pointValue: '{%zValue}'
    }, 
    defaultPoint: { 
      tooltip: 
        '<b>%xValue</b> %yValue<br/>Response time: %zValuemin', 
      label_text: '%zValue', 
      outline_width: 0 
    }, 
    series: [ 
      { 
        name: 'Call Response Time.', 
        points: [ 
          { x: 'Josh', y: 'Monday', z: 1 }, 
          { x: 'Josh', y: 'Tuesday', z: 6 }, 
          { x: 'Josh', y: 'Wednesday', z: 3 }, 
          { x: 'Josh', y: 'Thursday', z: 2 }, 
          { x: 'Josh', y: 'Friday', z: 5 }, 
          { x: 'Josh', y: 'Saturday', z: 1 }, 
          { x: 'Greg', y: 'Monday', z: 4 }, 
          { x: 'Greg', y: 'Tuesday', z: 6 }, 
          { x: 'Greg', y: 'Wednesday', z: 1 }, 
          { x: 'Greg', y: 'Thursday', z: 8 }, 
          { x: 'Greg', y: 'Friday', z: 6 }, 
          { x: 'Greg', y: 'Saturday', z: 1 }, 
          { x: 'Molly', y: 'Monday', z: 2 }, 
          { x: 'Molly', y: 'Tuesday', z: 2 }, 
          { x: 'Molly', y: 'Wednesday', z: 3 }, 
          { x: 'Molly', y: 'Thursday', z: 1 }, 
          { x: 'Molly', y: 'Friday', z: 2 }, 
          { x: 'Molly', y: 'Saturday', z: 2 } 
        ] 
      } 
    ] 
  }); 
}
