


var colors = JSC.getPalette(0);


// const urls = [
//   "https://www.quandl.com/api/v3/datasets/ISM/MAN_PMI?start_date=1948-01-01&end_date=2021-07-01&api_key=hQqbsfakqXiqavyb4SV9",
//   "https://www.quandl.com/api/v3/datasets/ISM/MAN_NEWORDERS?start_date=1948-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
// ]

// const fetchData = async () => {
//   try {
//     const response = await Promise.all(
//       urls.map(url => fetch(url).then(res => res.json()))
//     )
    
//     var series = response[0].dataset.data
//     console.log(series)
//     var series = response[1].dataset.data
//     console.log(series)
    
//   } catch (error) {
//     console.log("Error", error)
//   }
// }
// fetchData()


function fetch_ISM_MAN_PMI(callback) {
    fetch('https://www.quandl.com/api/v3/datasets/ISM/MAN_PMI?start_date=2000-01-01&end_date=2021-07-01&api_key=hQqbsfakqXiqavyb4SV9')
       .then(response => response.json())
       .then(json => callback(null, json.dataset))
       .catch(error => callback(error, null))
}

fetch_ISM_MAN_PMI((error, ISM_MAN_PMI) => {
    if (error) 
        console.log(error)
    else 
       // console.log(ISM_MAN_EMPL.data)
      var series = csvToSeries2(ISM_MAN_PMI.data)
      renderChart2(series);
});



function csvToSeries2(text) {
  const ism_y = 'PMI';
  const date_x = 'Date';
  const new_order_y = 'New_Orders';
  let dataAsJson = text;
  let PMI = [], areaPMI = [], newOrder =[];
  
  dataAsJson.forEach(function (row) {
    //add either to Black, White arrays, or discard.
    PMI.push({x: Date.parse(row[0]), y: row[1]});
    areaPMI.push({x: Date.parse(row[0]), y: row[1]-50});
    newOrder.push({x: Date.parse(row[0]), y: row[1]})

  });
  return [
    {name: 'PMI', points: PMI,type:'line',yAxis: 'leftAxis'},
    {name: 'newOrder', points: PMI,yAxis: 'leftAxis'},
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



