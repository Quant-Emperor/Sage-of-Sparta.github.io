


var colors = JSC.getPalette(0);

JSC.fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/umcsi.csv")
  .then(response => response.text())
  .then(text => {
    let data = JSC.csv2Json(text);
    let umcsi = [], current = [],expected=[];

    data.forEach((val,idx) => {
      //Date  UMCSI Current Index Expected Index
      umcsi.push({x: val['Date'], y: checkNaNReturnNumber(val['UMCSI'])});
      current.push({x: val['Date'], y: checkNaNReturnNumber(val['Current Index'])});
      expected.push({x: val['Date'], y: checkNaNReturnNumber(val['Expected Index'])});

    });

    var data_series = [
      {name: 'UMCSI', points: umcsi,yAxis: 'leftAxis'},
      {name: 'Current Conditions', points: current,yAxis: 'leftAxis'},
      {name: 'Expected Conditions', points: expected,yAxis: 'leftAxis'}, 
    ];

    renderChart3(data_series,'chartDivUMCSI','University of Michigan Consumer Sentiment Index');

  });


function checkNaNReturnNumber(x) {
  if (isNaN(x)) {
    return 0;
  }

  return Number(x);
}


function renderChart3(series,jscchartname,title) {
  var chart = JSC.Chart(jscchartname, {
    //title_label_text: title,
    yAxis: [
      {
        id: 'leftAxis',
        defaultTick_label_color: colors[15],
        label_text: 'Index',
        defaultTick_enabled: true,
      }
    ],
    chartArea: { 
        //fill: colors[19]
        fill: '#FFFFFF'
      },
    legend_visible: true,
    xAxis_crosshair_enabled: true,
    xAxis: { 
      crosshair_enabled: true, 
      scale: { type: "time" } 
    },
    defaultSeries: { 
        line_width: 1.5, 
        legendEntry_icon_name: 'circle',
        defaultPoint_marker_visible: false, 
      }, 

    axisToZoom: 'x', 
      /*X Axis Time Zoom limit*/
      xAxis: { 
        //scale_zoomLimit: { 
        //  unit: 'hour', 
        //  multiplier: 5 
        //},
        label_text: 'Date',
        defaultTick_label_color: colors[15]

      }, 
      annotations: [ 
        { 
          position: 'inside top', 
          margin: 5, 
          label_text: 
            'Click-Drag the chart area to zoom.'
        } 
      ], 

            legend: {
            position: 'top',
            template: '%icon %name', 

            fill: '#FFFFFF',
            boxVisible: false,
            corners: 'round',
            radius: 2,
            margin_left: 30,
            outline: { color: '#FFFFFF', width: 3 },
            defaultEntry: {
              iconWidth: 17,
              padding: 4,
              style: {
                color: '#3A5254',
                fontSize: '10pt',
                fontStyle: 'italic',
                fontFamily: 'Arial',
                fontWeight: 'normal',
              },
              states: {
                hover_style: { color: '#FF5254' },
                hidden_style: { color: '#c2bec1' },
              },
            },
          },
      xAxis_scale_type: 'time', 
      series: series
  });
  chart.axes('x').zoom([Date.parse(1979),Date.parse(2022)]); 
}





function applyZoom(range) { 
  
  chart.axes('x').zoom(range); 
} 


