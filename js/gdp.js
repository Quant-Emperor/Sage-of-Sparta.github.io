


var colors = JSC.getPalette(0);

JSC.fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/gdp.csv")
  .then(response => response.text())
  .then(text => {
    let data = JSC.csv2Json(text);
    let usa_gdp = [];


    data.forEach((val,idx) => {

      usa_gdp.push({x: val['year'], y: checkNaNReturnNumber(val['USA_gdp'])});

    });

    var data_series = [
      {name: 'USA GDP', points: usa_gdp,type:'line',yAxis: 'leftAxis',type:'line'},
    ];


    renderChart(data_series,'chartDivGDP','World GDP');

  });


function checkNaNReturnNumber(x) {
  if (isNaN(x)) {
    return 0;
  }
  if (x === -50) {
    return 0;
  }

  return Number(x);
}


function renderChart(series,jscchartname,title) {
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
        legendEntry_icon_name: 'circle'
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
            radius: 3,
            margin_left: 30,
            outline: { color: '#FFFFFF', width: 3 },
            defaultEntry: {
              iconWidth: 10,
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


  chart.axes('x').zoom([Date.parse(2000),Date.parse(2020)]); 
}





function applyZoom(range) { 
  
  chart.axes('x').zoom(range); 
} 


