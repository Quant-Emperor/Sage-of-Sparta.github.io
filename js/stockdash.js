


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


async function fetchData(urlstrings) {
  try {
    const response = await Promise.all(
      urlstrings.map(url => fetch(url).then(res => res.json()))
    )
    
    var ratios = response[0];
    var hist_price = response[1].historical;
    var profile = response[2].profile;
    var eps_est = response[3];
    var quarterly_eps_est = response[4];

    //console.log(profile["symbol"]);

    let pe = [], stockadjcloseprice = [], peg = [], epsestimate = [], quarterlyepsestimate = [];


    ratios.forEach((val, idx) => {
      pe.push({x: ratios[idx]["date"], y: ratios[idx]["priceEarningsRatio"]});
      peg.push({x: ratios[idx]["date"], y: ratios[idx]["priceEarningsToGrowthRatio"]});


    });

    hist_price.forEach((val, idx) => {
      stockadjcloseprice.push({x: hist_price[idx]["date"], y: hist_price[idx]["adjClose"]});
    });

    eps_est.forEach((val, idx) => {
      epsestimate.push({x: eps_est[idx]["date"], y: eps_est[idx]["estimatedEpsAvg"]});
    });

    quarterly_eps_est.forEach((val, idx) => {
      quarterlyepsestimate.push({x: quarterly_eps_est[idx]["date"], y: quarterly_eps_est[idx]["estimatedEpsAvg"]});
    });

    var data_series = [
      {name: 'PE', points: pe,type:'line',yAxis: 'leftAxis'},
    ];

    renderChart(data_series,'epschartdiv','EPS');

    var data_series = [
      {name: 'Stock Close', points: stockadjcloseprice,type:'line',yAxis: 'leftAxis'},
      //{name: 'PEG', points: peg,type:'line',yAxis: 'rightAxis'},

    ];

    renderChart(data_series,'stockchartdiv','Stock Price');
    
    var data_series = [
      {name: 'PEG', points: peg,type:'line',yAxis: 'leftAxis'},

    ];

    renderChart(data_series,'pegchartdiv','PEG');

    var data_series = [
      {name: 'Annual EPS Estimates', points: epsestimate,type:'line',yAxis: 'leftAxis'},

    ];

    renderChart(data_series,'epsestchartdiv','EPS EST');

    var data_series = [
      {name: 'Quarterly EPS Estimates', points: quarterlyepsestimate,type:'column',yAxis: 'leftAxis'},

    ];

    renderChart(data_series,'quartepsestchartdiv','QUART EPS EST');



    var column_list = [
            { title: "Ticker", "data": "symbol" },
            { title: "Price", "data": "price" },
            { title: "Beta", "data": "beta" },
            { title: "volAvg", "data": "volAvg" },
            { title: "Link", "data": "website" 

            ,"render": function(data){
                       return '<a href="' + website + '">Click here</a>';
                     }
        },
        ];

      
     let data = [];

      //profile.forEach((val, idx) => { 

        //var dataset = [[profile["symbol"],profile["price"],profile["beta"],profile["volAvg"],profile["website"]],
        //              [profile["symbol"],profile["price"],profile["beta"],profile["volAvg"],profile["website"]]
        //]; 

var dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
];



      //  console.log(dataset);
        //console.log(jsonobj.articles[idx]);
      //});
      var data_val = data.map(el => Object.values(el));
      var table4 = $('#table4').DataTable();
      table4.destroy();

      var dataTables = $('#table4').DataTable ({
            data:dataSet,
            columns : [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
        });




  } catch (error) {
    console.log("Error", error)
  }
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


