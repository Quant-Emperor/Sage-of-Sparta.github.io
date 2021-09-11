


var colors = JSC.getPalette(0);

function checkNaNReturnNumber(x) {
  if (isNaN(x)) {
    return 0;
  }
  if (x === -50) {
    return 0;
  }

  return Number(x);
}

const urls = [
  "https://financialmodelingprep.com/api/v3/ratios/AAPL?limit=40&apikey=c01b3c8e189822588988574a0c3957dd",
  "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=c01b3c8e189822588988574a0c3957dd",
]

const fetchData = async () => {
  try {
    const response = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    )
    
    var ratios = response[0];
    var hist_price = response[1].historical;

    console.log(ratios);

    let pe = [], stockadjcloseprice = [];


    ratios.forEach((val, idx) => {
      
      pe.push({x: ratios[idx]["date"], y: ratios[idx]["priceEarningsRatio"]});

    });

    
    hist_price.forEach((val, idx) => {
      
      stockadjcloseprice.push({x: hist_price[idx]["date"], y: hist_price[idx]["adjClose"]});

    });


    var data_series = [
      {name: 'PE', points: pe,type:'line',yAxis: 'leftAxis'},
    ];

    renderChart(data_series,'epschartdiv','EPS');

    var data_series = [
      {name: 'Stock Close', points: stockadjcloseprice,type:'line',yAxis: 'leftAxis'},
    ];


    renderChart(data_series,'stockchartdiv','Stock Price');
        
  } catch (error) {
    console.log("Error", error)
  }
}

fetchData();


function renderChart(series,jscchartname,title) {

var chart = JSC.Chart(jscchartname, {
    //title_label_text: title,
    yAxis: [
      {
        id: 'leftAxis',
        defaultTick_label_color: colors[15],
        label_text: 'Index',
        defaultTick_enabled: true,

        scale: {
          /*Define an axis range of 0-100*/
          //range: [30, 70]
          //range: { min: 20, max: 90, padding: 0.1 }
        }
      },
      {
        id: 'rightAxis',
        defaultTick_label_color: colors[15],
        defaultTick_enabled: true,
        orientation: 'right',

        scale: {
          /*Define an axis range of 0-100*/
          //range: [-20, 20]
          //range: { min: -30, max: 40, padding: 0.1 }
        }

      },
    ],

    chartArea: { 
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

        label_text: 'Date',
        defaultTick_label_color: colors[15],
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
      series: series,

  });

 //chart.axes('x').zoom([Date.parse(2000),Date.parse(2022)]); 

}



function applyZoom(range) { 
  
  chart.axes('x').zoom(range); 
} 


