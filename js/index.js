


var colors = JSC.getPalette(0);


const urls = [
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_PMI?start_date=1989-01-01&end_date=2021-07-01&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_NEWORDERS?start_date=1989-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_EMPL?start_date=1989-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_PROD?start_date=1989-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  "https://www.quandl.com/api/v3/datasets/ISM/MAN_DELIV?start_date=1989-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
  //"https://www.quandl.com/api/v3/datasets/ISM/MAN_INVENT?start_date=1989-01-01&end_date=2021-07-01&column_index=5&api_key=hQqbsfakqXiqavyb4SV9",
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
    //var man_invent = response[5].dataset.data;
    //var man_custinv = response[6].dataset.data;

    let PMI = [], areaPMI = [], newOrder = [], manEmpl = [], manProd = [], manDeliv = [], manInvent = [], manCustInv = [];

    ism_pmi_data.forEach((val, idx) => {
      PMI.push({x: Date.parse(ism_pmi_data[idx][0]), y: ism_pmi_data[idx][1]});
      newOrder.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_new_orders[idx][1]});
      manEmpl.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_empl[idx][1]});
      manProd.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_prod[idx][1]});
      manDeliv.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_deliv[idx][1]});
     // manInvent.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_invent[idx][1]});
     // manCustInv.push({x: Date.parse(ism_pmi_data[idx][0]), y: man_custinv[idx][1]});
      areaPMI.push({x: Date.parse(ism_pmi_data[idx][0]), y: ism_pmi_data[idx][1]-50});

    });



    var data_series = [
      {name: 'Manufacturing PMI', points: PMI,type:'line',yAxis: 'leftAxis'},
      {name: 'Manufacturing New Orders', points: newOrder,yAxis: 'leftAxis'},
      {name: 'Manufacturing Employment', points: manEmpl,yAxis: 'leftAxis',color:colors[21]},
      {name: 'Manufacturing Production', points: manProd,yAxis: 'leftAxis'},
      {name: 'Manufacturing Deliveries', points: manDeliv,yAxis: 'leftAxis'},
     // {name: 'Manufacturing Inventories', points: manInvent,yAxis: 'leftAxis'},
     // {name: 'Manufacturing Customers Inventories', points: manCustInv,yAxis: 'leftAxis'},
      {name: 'PMI Area', points: areaPMI,type:'area',yAxis: 'rightAxis',color:colors[15]},
    ];

    renderChart2(data_series);

    
  } catch (error) {
    console.log("Error", error)
  }
}
fetchData()







// function fetch_ISM_MAN_PMI(callback) {
//     fetch('https://www.quandl.com/api/v3/datasets/ISM/MAN_PMI?start_date=1948-01-01&end_date=2021-07-01&api_key=hQqbsfakqXiqavyb4SV9')
//        .then(response => response.json())
//        .then(json => callback(null, json.dataset))
//        .catch(error => callback(error, null))
// }

// fetch_ISM_MAN_PMI((error, ISM_MAN_PMI) => {
//     if (error) 
//         console.log(error)
//     else 
//        // console.log(ISM_MAN_EMPL.data)
//       var series = csvToSeries2(ISM_MAN_PMI.data)
//       renderChart2(series);
// });



// function csvToSeries2(text) {
//   const ism_y = 'PMI';
//   const date_x = 'Date';
//   const new_order_y = 'New_Orders';
//   let dataAsJson = text;
//   let PMI = [], areaPMI = [], newOrder =[];
  
//   dataAsJson.forEach(function (row) {
//     //add either to Black, White arrays, or discard.
//     PMI.push({x: Date.parse(row[0]), y: row[1]});
//     areaPMI.push({x: Date.parse(row[0]), y: row[1]-50});
//     newOrder.push({x: Date.parse(row[0]), y: row[1]})

//   });
//   return [
//     {name: 'PMI', points: PMI,type:'line',yAxis: 'leftAxis'},
//     {name: 'newOrder', points: PMI,yAxis: 'leftAxis'},
//     {name: 'areaPMI', points: areaPMI,type:'area',yAxis: 'rightAxis',color:colors[15]},
//   ];
// }


function renderChart2(series) {
  JSC.Chart('chartDiv2', {
    title_label_text: 'ISM Manufacturing Index',
    yAxis: [
      {
        id: 'leftAxis',
        defaultTick_label_color: colors[15],
        label_text: 'PMI',
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



