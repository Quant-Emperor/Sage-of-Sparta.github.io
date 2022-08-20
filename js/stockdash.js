


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
    var hist_price_2 = response[5].historical;

    let pe = [], stockadjcloseprice = [], 
    stockadjcloseprice2 = [], peg = [], epsestimate = [], quarterlyepsestimate = [], pairscloseprice = [],
    ebitdaavgest = [], estimatedRevenueAvg=[], estimatedSgaExpenseAvg = [];


    ratios.forEach((val, idx) => {
      pe.push({x: ratios[idx]["date"], y: ratios[idx]["priceEarningsRatio"]});
      peg.push({x: ratios[idx]["date"], y: ratios[idx]["priceEarningsToGrowthRatio"]});
    });

    hist_price_2.forEach((val, idx) => {
      stockadjcloseprice2.push({x: hist_price_2[idx]["date"], y: hist_price_2[idx]["adjClose"]});
    });


    hist_price.forEach((val, idx) => {
      stockadjcloseprice.push({x: hist_price[idx]["date"], y: hist_price[idx]["adjClose"]});



      date_row = hist_price_2.filter(x => (x.date === hist_price[idx]["date"]));

      if (date_row.length > 0) {

        //console.log(date_row);
        pairscloseprice.push({x: date_row[0]["date"], y: hist_price[idx]["adjClose"]/date_row[0]["adjClose"]});
      }


    });


    eps_est.forEach((val, idx) => {
      epsestimate.push({x: eps_est[idx]["date"], y: eps_est[idx]["estimatedEpsAvg"]});

      if (Date.parse(eps_est[idx]["date"]) > Date.parse(2017)) {
        ebitdaavgest.push({x: 'EST EBITDA AVG', y: eps_est[idx]["date"], z: eps_est[idx]["estimatedEbitdaAvg"]});
estimatedRevenueAvg
        estimatedRevenueAvg.push({x: 'EST REVENUE AVG', y: eps_est[idx]["date"], z: eps_est[idx]["estimatedRevenueAvg"]});
        estimatedSgaExpenseAvg.push({x: 'EST EXPENSE AVG', y: eps_est[idx]["date"], z: eps_est[idx]["estimatedSgaExpenseAvg"]});
      }

    });

    quarterly_eps_est.forEach((val, idx) => {
      quarterlyepsestimate.push({x: quarterly_eps_est[idx]["date"], y: quarterly_eps_est[idx]["estimatedEpsAvg"]});
    });

    //hist_price_2.forEach((val, idx) => {
      
    //});
    var x = document.getElementById("frm1");
    var ticker = x.elements[0].value


    var data_series = [
      {name: ticker.concat(' PE'), points: pe,type:'line',yAxis: 'leftAxis'},
    ];

    renderChart(data_series,'epschartdiv','EPS','red');



    var data_series = [
      {name: ticker.concat(' Stock Close'), points: stockadjcloseprice,type:'line',yAxis: 'leftAxis'},
      //{name: 'PEG', points: peg,type:'line',yAxis: 'rightAxis'},
    ];

    var y = document.getElementById("frm2");
    var ticker2 = y.elements[0].value

    renderChart(data_series,'stockchartdiv','Stock Price','green');

    var data_series = [
      {name: ticker2.concat(' Stock Close'), points: stockadjcloseprice2,type:'line',yAxis: 'leftAxis'},
      //{name: 'PEG', points: peg,type:'line',yAxis: 'rightAxis'},

    ];

    renderChart(data_series,'stock2chartdiv','Stock Price','yellow');


    var data_series = [
      {name: ticker.concat('/',ticker2,' Stock Pairs Close'), points: pairscloseprice,type:'line',yAxis: 'leftAxis'},
      //{name: 'PEG', points: peg,type:'line',yAxis: 'rightAxis'},

    ];

    renderChart(data_series,'stockchartdiv2','Stock Price','pink');

    var data_series = [
      {name: ticker.concat(' PEG'), points: peg,type:'line',yAxis: 'leftAxis'},

    ];

    renderChart(data_series,'pegchartdiv','PEG','black');

    var data_series = [
      {name: ticker.concat(' Annual EPS Estimates'), points: epsestimate,type:'line',yAxis: 'leftAxis'},

    ];

    renderChart(data_series,'epsestchartdiv','EPS EST','purple');

    var data_series = [
      {name: ticker.concat(' Quarterly EPS Estimates'), points: quarterlyepsestimate,type:'column',yAxis: 'leftAxis'},

    ];

    renderChart(data_series,'quartepsestchartdiv','QUART EPS EST','blue');

    var data_series = [
      {name: 'EST EBITDA AVG', points: ebitdaavgest}
    ];
    renderHeatMap2(data_series,'heatmapDiv','EST EBITDA AVG',true);

    var data_series = [
      {name: 'EST REVENUE AVG', points: estimatedRevenueAvg}
    ];
    renderHeatMap2(data_series,'heatmapDiv2','EST REVENUE AVG',false);

    var data_series = [
      {name: 'EST EXPENSE AVG', points: estimatedSgaExpenseAvg}
    ];
    renderHeatMap2(data_series,'heatmapDiv3','EST EXPENSE AVG',false);



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


function renderChart(series,jscchartname,title,colorvar) {

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
      legendEntry_icon_name: 'circle',
      color: colorvar,
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


function renderHeatMap2(series,jscchartname,title,dispy) {
    var chart = JSC.chart(jscchartname, { 
    //debug: true, 
    type: 'heatmap', 
    toolbar_visible: false, 
    //title_label_text: title, 
    palette: { 
      colors: ['red','yellow','green',], 
      pointValue: '{%zValue}'
    }, 
    defaultPoint: { 
      tooltip: 
        '<b>%yValue</b><br> %xValue</b><br> %zValue', 
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
          visible: dispy, 
          //scale_type: 'time',
        },

        xAxis: {
          visible: true, 
          position: 'top',
        },
  legend: { 
        visible: false, 
      }, 
      series: series,
  }); 
}
