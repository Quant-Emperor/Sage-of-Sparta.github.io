


var colors = JSC.getPalette(0);

fetch('https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/ism_pmi.csv')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    let series = csvToSeries2(text);
    renderChart2(series);
  })
  .catch(function (error) {
    //Something went wrong
    console.log(error);
  }); 

function csvToSeries2(text) {
  const ism_y = 'ISM_Manufacturing_Index';
  const date_x = 'Date';
  const new_order_y = 'New_Orders';
  let dataAsJson = JSC.csv2Json(text);
  let PMI = [], areaPMI = [], newOrder =[];
  dataAsJson.forEach(function (row) {
    //add either to Black, White arrays, or discard.
    PMI.push({x: row[date_x], y: row[ism_y]});
    areaPMI.push({x: row[date_x], y: row[ism_y]-50});
    newOrder.push({x: row[date_x], y: row[new_order_y]})

  });
  return [
    {name: 'PMI', points: PMI},
    {name: 'newOrder', points: newOrder,yAxis: 'leftAxis'},
    {name: 'areaPMI', points: areaPMI,type:'area',yAxis: 'rightAxis',color:colors[15]},
  ];
}


function renderChart2(series) {
  JSC.Chart('chartDiv2', {
    title_label_text: 'ISM Manufacturing Index',
    yAxis: [
      {
        id: 'leftAxis',
        defaultTick_label_color: colors[15],
        label_text: 'PMI',
      },
      {
        id: 'rightAxis',
        defaultTick_label_color: colors[15],

        orientation: 'right',
      },
    ],
    chartArea: { 
        fill: colors[19]
      },
    legend_visible: true,
    xAxis_crosshair_enabled: true,
    xAxis: { 
      crosshair_enabled: true, 
      scale: { type: "time" } 
    },
    defaultTooltip: { 
    combined: true, 
    /* For a list of possible tokens, visit Point List Tokens section here: 
     * https://jscharting.com/tutorials/js-chart-labels/token-reference/ 
     */
    label_text: '%xValue<hr>%points'
    }, 
    defaultSeries: { 
    defaultPoint_tooltip: 
      '%icon <span style="width:70px">%seriesName</span> %yValue', 
    opacity: 0.7 
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
      xAxis_scale_type: 'time', 
      series: series



  });
}

function applyZoom(range) { 
  chart.axes('x').zoom(range); 
} 



