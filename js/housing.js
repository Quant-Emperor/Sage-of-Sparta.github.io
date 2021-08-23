


var colors = JSC.getPalette(0);

JSC.fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/usa_building.csv")
  .then(response => response.text())
  .then(text => {
    let data = JSC.csv2Json(text);
    let building_permits = [], housing_starts = [],completions=[];

    data.forEach((val,idx) => {
      //Date  building_permits  housing_starts  completions

      building_permits.push({x: val['Date'], y: checkNaNReturnNumber(val['building_permits'])});
      housing_starts.push({x: val['Date'], y: checkNaNReturnNumber(val['housing_starts'])});
      completions.push({x: val['Date'], y: checkNaNReturnNumber(val['completions'])});

    });

    var data_series = [
      {name: 'Building Permits', points: building_permits,yAxis: 'leftAxis'},
      {name: 'Housing Starts', points: housing_starts,yAxis: 'leftAxis'},
      {name: 'Completions', points: completions,yAxis: 'leftAxis'}, 
    ];

    renderChart3(data_series,'chartDivHOUSING','Building Permits - Housing Starts - Completions');

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
        scale_zoomLimit: { 
          unit: 'hour', 
          multiplier: 5 
        },
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


