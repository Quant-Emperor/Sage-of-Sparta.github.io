


var colors = JSC.getPalette(0);

JSC.fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/ism.csv")
  .then(response => response.text())
  .then(text => {
    let data = JSC.csv2Json(text);
    let PMI = [], areaPMI = [], newOrder = [], manEmpl = [], manProd = [], manDeliv = [], manInvent = [],manCustInv = [], manPrices = [], manBacklog = [], manExports=[], manImports=[],
    NMI = [], areaNMI = [], nonmanBusAct = [], nonmannewOrder = [], nonmanEmpl = [], nonmanDeliv=[], nonmanInvent=[],nonmanInvsent=[],nonmanBacklog=[],nonmanPrices=[],nonmanImports=[],nonmanExports=[];

    data.forEach((val,idx) => {

      PMI.push({x: val['Date'], y: val['MAN_PMI']});
      newOrder.push({x: val['Date'], y: val['MAN_NEWORDERS']});
      manEmpl.push({x: val['Date'], y: val['MAN_EMPL']});
      manProd.push({x: val['Date'], y: val['MAN_PROD']});
      manDeliv.push({x: val['Date'], y: val['MAN_DELIV']});
      manInvent.push({x: val['Date'], y: val['MAN_INVENT']});
      areaPMI.push({x: val['Date'], y: val['MAN_PMI']-50});
      
      manCustInv.push({x: val['Date'], y: checkNaNReturnNumber(val['MAN_CUSTINV'])});
      manPrices.push({x: val['Date'], y: checkNaNReturnNumber(val['MAN_PRICES'])});   
      manBacklog.push({x: val['Date'], y: checkNaNReturnNumber(val['MAN_BACKLOG'])});
      manExports.push({x: val['Date'], y: checkNaNReturnNumber(val['MAN_EXPORTS'])});
      manImports.push({x: val['Date'], y: checkNaNReturnNumber(val['MAN_IMPORTS'])});


      NMI.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_NMI'])});
      areaNMI.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_NMI']-50)});
      nonmanBusAct.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_BUSACT'])});
      nonmannewOrder.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_NEWORD'])});  
        
      nonmanEmpl.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_EMPL'])});  
      nonmanDeliv.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_DELIV'])});  
      nonmanInvent.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_INVENT'])});  
      nonmanInvsent.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_INVSENT'])});  
      nonmanBacklog.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_BACKLOG'])});  
      nonmanPrices.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_PRICES'])});  
      nonmanImports.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_IMPORTS'])});  
      nonmanExports.push({x: val['Date'], y: checkNaNReturnNumber(val['NONMAN_EXPORTS'])});  

    });

    var data_series = [
      {name: 'PMI', points: PMI,type:'line',yAxis: 'leftAxis',type:'line'},
      {name: 'New Orders', points: newOrder,yAxis: 'leftAxis'},
      {name: 'Employment', points: manEmpl,yAxis: 'leftAxis',color:colors[21]},
      {name: 'Production', points: manProd,yAxis: 'leftAxis'},
      {name: 'Supplier Deliveries', points: manDeliv,yAxis: 'leftAxis'},
      {name: 'Inventories', points: manInvent,yAxis: 'leftAxis'},
      {name: '', points: areaPMI,type:'area',yAxis: 'rightAxis',color:colors[15]},
    ];

    var data_series2 = [
      {name: 'PMI', points: PMI,type:'line',yAxis: 'leftAxis'},
      {name: 'Customer Inventories', points: manCustInv,type:'line',yAxis: 'leftAxis'},
      {name: 'Prices', points: manPrices,yAxis: 'leftAxis',color:colors[15]},
      {name: 'Backlog of Orders', points: manBacklog,yAxis: 'leftAxis'},
      {name: 'New Export Orders', points: manExports,yAxis: 'leftAxis'},
      {name: 'Imports', points: manImports,yAxis: 'leftAxis'},
    ];

    var data_series3 = [
      {name: 'ISM Services PMI', points: NMI,type:'line',yAxis: 'leftAxis'},
      {name: 'ISM Services PMI Business Activity', points: nonmanBusAct,type:'line',yAxis: 'leftAxis'},
      {name: 'ISM Services PMI New Orders', points: nonmannewOrder,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI Employment', points: nonmanEmpl,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI Supplier Deliveries', points: nonmanDeliv,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI Inventories', points: nonmanInvent,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI Inventory Sentiment', points: nonmanInvsent,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI Backlog of Orders', points: nonmanBacklog,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI Prices', points: nonmanPrices,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI Imports', points: nonmanImports,type:'line',yAxis: 'leftAxis'},  
      {name: 'ISM Services PMI New Export Orders', points: nonmanExports,type:'line',yAxis: 'leftAxis'},  
      {name: '', points: areaNMI,type:'area',yAxis: 'rightAxis',color:colors[15]},
    ];

    renderChart(data_series,'chartDiv2','ISM Manufacturing Index');
    renderChart2(data_series2,'chartDiv3','ISM Manufacturing Index');

    renderChart(data_series3,'chartDiv4','ISM Services PMI Index');
   // renderChart2(data_series2,'chartDiv5','ISM Manufacturing Index');

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



const urls = [
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_PMI?start_date=1948-01-01&end_date=2021-07-01&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_NEWORDERS?start_date=1948-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_EMPL?start_date=1948-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_PROD?start_date=1948-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_DELIV?start_date=1948-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_INVENT?start_date=1948-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  //"https://www.quandl.com/api/v3/datasets/ISM/MAN_CUSTINV?start_date=1989-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
]

const fetchData = async () => {
  try {
    const response = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    )
    
    var ism_pmi_data = response[0].dataset.data;
    var man_new_orders = response[1].dataset.data;
    var man_empl = response[2].dataset.data;
    var man_prod = response[3].dataset.data;
    var man_deliv = response[4].dataset.data;
    var man_invent = response[5].dataset.data;

    let PMI = [], areaPMI = [], newOrder = [], manEmpl = [], manProd = [], manDeliv = [], manInvent = [];

    ism_pmi_data.forEach((val, idx) => {
      PMI.push({x: Date.parse(ism_pmi_data[idx][0]), y: ism_pmi_data[idx][1]});
      newOrder.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_new_orders[idx][1]});
      manEmpl.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_empl[idx][1]});
      manProd.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_prod[idx][1]});
      manDeliv.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_deliv[idx][1]});
      manInvent.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_invent[idx][1]});
      areaPMI.push({x: Date.parse(ism_pmi_data[idx][0]), y: ism_pmi_data[idx][1]-50});

    });

    var data_series = [
      {name: 'PMI', points: PMI,type:'line',yAxis: 'leftAxis'},
      {name: 'New Orders', points: newOrder,yAxis: 'leftAxis'},
      {name: 'Employment', points: manEmpl,yAxis: 'leftAxis',color:colors[21]},
      {name: 'Production', points: manProd,yAxis: 'leftAxis'},
      {name: 'Deliveries', points: manDeliv,yAxis: 'leftAxis'},
      {name: 'Inventories', points: manInvent,yAxis: 'leftAxis'},

      {name: '', points: areaPMI,type:'area',yAxis: 'rightAxis',color:colors[15]},
    ];

    renderChart(data_series,'chartDiv2','ISM Manufacturing Index');
    //renderChart(data_series,'chartDiv3','Clowns');
    
    const fs = require('fs');
    const data = JSON.stringify(ism_pmi_data);
    fs.writeFile('user.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

    
  } catch (error) {
    console.log("Error", error)
  }
}
//fetchData()


const man_urls2 = [
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_CUSTINV?start_date=2000-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_PRICES?start_date=2000-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_BACKLOG?start_date=2000-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_EXPORTS?start_date=2000-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_IMPORTS?start_date=2000-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",

]

const fetchData2 = async () => {
  try {
    const response2 = await Promise.all(
      man_urls2.map(url => fetch(url).then(res => res.json()))
    )
    
    var man_custinv = response2[0].dataset.data;
    var man_prices = response2[1].dataset.data;
    var man_backlog = response2[2].dataset.data;
    var man_exports = response2[3].dataset.data;
    var man_imports = response2[4].dataset.data;
    //var man_invent = response[5].dataset.data;

    let manCustInv = [], manPrices = [], manBacklog = [], manExports=[], manImports=[];

    man_custinv.forEach((val, idx) => {
      manCustInv.push({x: Date.parse(man_custinv[idx][0]), y: man_custinv[idx][1]});
      manPrices.push({x: Date.parse(man_custinv[idx][0]), y: man_prices[idx][1]});
      manBacklog.push({x: Date.parse(man_custinv[idx][0]), y: man_backlog[idx][1]});
      manExports.push({x: Date.parse(man_custinv[idx][0]), y: man_exports[idx][1]});
      manImports.push({x: Date.parse(man_custinv[idx][0]), y: man_imports[idx][1]});


    });

    var data_series = [
      {name: 'ISM Manufacturing Customer Inventories', points: manCustInv,type:'line',yAxis: 'leftAxis'},
      {name: 'ISM Manufacturing Prices', points: manPrices,yAxis: 'leftAxis'},
      {name: 'ISM Manufacturing Backlog of Orders', points: manBacklog,yAxis: 'leftAxis'},
      {name: 'ISM Manufacturing New Export Orders', points: manExports,yAxis: 'leftAxis'},
      {name: 'ISM Manufacturing Imports', points: manImports,yAxis: 'leftAxis'},

    ];

    renderChart2(data_series,'chartDiv3','ISM Manufacturing Index');
    
  } catch (error) {
    console.log("Error", error)
  }
}



//var delayInMilliseconds = 1000; //1 second

//setTimeout(function() {
//  fetchData2()
//}, delayInMilliseconds);




function renderChart2(series,jscchartname,title) {
  JSC.Chart(jscchartname, {
    title_label_text: title,
    yAxis: [
      {
        id: 'leftAxis',
        defaultTick_label_color: colors[15],
        label_text: 'Index',
        defaultTick_enabled: true,
      }
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
            position: 'right top',
            fill: '#f7f7f0',
            boxVisible: false,
            corners: 'round',
            radius: 5,
            margin_left: 30,
            outline: { color: '#FFFFFF', width: 3 },
            defaultEntry: {
              iconWidth: 25,
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
}









function renderChart(series,jscchartname,title) {
  JSC.Chart(jscchartname, {
    title_label_text: title,
    yAxis: [
      {
        id: 'leftAxis',
        defaultTick_label_color: colors[15],
        label_text: 'Index',
        defaultTick_enabled: true,

        scale: {
          /*Define an axis range of 0-100*/
          //range: [30, 70]
          range: { min: 20, max: 90, padding: 0.1 }
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
          range: { min: -30, max: 40, padding: 0.1 }
        }

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

    axisToZoom: 'x', 
      /*X Axis Time Zoom limit*/
      xAxis: { 
        scale_zoomLimit: { 
          unit: 'hour', 
          multiplier: 5 
        },
        label_text: 'Date',
        defaultTick_label_color: colors[14]

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
            position: 'right top',
            fill: '#f7f7f0',
            boxVisible: false,
            corners: 'round',
            radius: 5,
            margin_left: 30,
            outline: { color: '#FFFFFF', width: 3 },
            defaultEntry: {
              iconWidth: 25,
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
      series: series
  });
}

function applyZoom(range) { 
  chart.axes('x').zoom(range); 
} 



