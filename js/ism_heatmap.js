


var colors = JSC.getPalette(0);

JSC.fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/ism.csv")
  .then(response => response.text())
  .then(text => {
    let data = JSC.csv2Json(text);
    let PMI = [], newOrder = [], manEmpl = [], manProd = [], manDeliv = [], manInvent = [],manCustInv = [], manPrices = [], manBacklog = [], manExports=[], manImports=[];
    data.forEach((val,idx) => {

      if (val['Date'] > Date.parse(2020)) {

        var datey = new Date(val['Date']);
        const month = datey.toLocaleString('default', { month: 'short' });
        const year = datey.getFullYear();
        PMI.push({x: 'PMI', y: month + " " + year.toString(), z: val['MAN_PMI']});
        newOrder.push({x: 'New Orders', y: month + " " + year.toString(), z: val['MAN_NEWORDERS']});
      }

    });
    
    var data_series = [
      {name: 'PMI', points: PMI}
    ];
    renderHeatMap2(data_series,'chartDiv5','PMI');

    var data_series = [
      {name: 'New Orders', points: newOrder}
    ];
    renderHeatMap2(data_series,'chartDiv6','New Orders');



  });



//renderHeatMap('','chartDiv4','');

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


function renderHeatMap2(series,jscchartname,title) {
    var chart = JSC.chart(jscchartname, { 
    //debug: true, 
    type: 'heatmap', 
    toolbar_visible: false, 
    title_label_text: title, 
    palette: { 
      colors: ['red','yellow','green',], 
      pointValue: '{%zValue}'
    }, 
    defaultPoint: { 
      //tooltip: 
      //  '<b>%yValue</b> %xValue</b> %zValue', 
      label_text: '%zValue', 
      outline_width: 0 
    }, 
    defaultAxis: { 
      defaultTick: { 
        line_visible: false, 
        gridLine_visible: false
      }, 
      line_visible: false
    }, 

    //yAxis_scale_type: 'time', 
    yAxis: {
          scale_minorInterval: { unit: 'month', multiplier: 1 },
          formatString: 'd',
          visible: false, 
          //scale_type: 'time',
        },

        xAxis: {
          visible: false, 
        },
  legend: { 
        visible: false, 
      }, 
      series: series,
  }); 
}