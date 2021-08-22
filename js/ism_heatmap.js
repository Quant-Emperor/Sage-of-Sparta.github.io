


var colors = JSC.getPalette(0);

JSC.fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/ism.csv")
  .then(response => response.text())
  .then(text => {
    let data = JSC.csv2Json(text);
    let PMI = [], newOrder = [], manEmpl = [], manProd = [], manDeliv = [], manInvent = [],manCustInv = [], manPrices = [], manBacklog = [], manExports=[], manImports=[];
    data.forEach((val,idx) => {

      if (val['Date'] > Date.parse(2020)) {

        var datey = new Date(val['Date']);
        const month = datey.toLocaleString('default', { month: 'short' });
        const year = datey.getFullYear();
        
        var disp_date = month + " " + year.toString()
        PMI.push({x: 'PMI', y: disp_date, z: val['MAN_PMI']});
        newOrder.push({x: 'New Orders', y: disp_date, z: val['MAN_NEWORDERS']});       
        manProd.push({x: 'Production', y: disp_date, z: val['MAN_PROD']});
        manEmpl.push({x: 'Employment', y: disp_date, z: val['MAN_EMPL']});
        manDeliv.push({x: 'Deliveries', y: disp_date, z: val['MAN_DELIV']});
        manInvent.push({x: 'Inventories', y: disp_date, z: val['MAN_INVENT']});
        manCustInv.push({x: 'Cust Inv', y: disp_date, z: val['MAN_CUSTINV']});
        manPrices.push({x: 'Prices', y: disp_date, z: val['MAN_PRICES']});   
        manBacklog.push({x: 'Order Backlog', y: disp_date, z: val['MAN_BACKLOG']});
        manExports.push({x: 'Exports', y: disp_date, z: val['MAN_EXPORTS']});
        manImports.push({x: 'Imports', y: disp_date, z: val['MAN_IMPORTS']});
      }
    });
    
    var data_series = [
      {name: 'PMI', points: PMI}
    ];
    renderHeatMap2(data_series,'chartDiv5','PMI',true);

    var data_series = [
      {name: 'New Orders', points: newOrder}
    ];
    renderHeatMap2(data_series,'chartDiv6','New Orders',false);

    var data_series = [
      {name: 'Production', points: manProd}
    ];
    renderHeatMap2(data_series,'chartDiv7','Production',false);

    var data_series = [
      {name: 'Employment', points: manEmpl}
    ];
    renderHeatMap2(data_series,'chartDiv8','Employment',false);

    var data_series = [
      {name: 'Deliveries', points: manDeliv}
    ];
    renderHeatMap2(data_series,'chartDiv9','Deliveries',false);

    var data_series = [
      {name: 'Inventories', points: manInvent}
    ];
    renderHeatMap2(data_series,'chartDiv10','Inventories',false);

   var data_series = [
      {name: 'Customer Inventories', points: manCustInv}
    ];
    renderHeatMap2(data_series,'chartDiv11','Customer Inventories',false);

   var data_series = [
      {name: 'Prices', points: manPrices}
    ];
    renderHeatMap2(data_series,'chartDiv12','Prices',false);

   var data_series = [
      {name: 'Order Backlog', points: manBacklog}
    ];
    renderHeatMap2(data_series,'chartDiv13','Order Backlog',false);

   var data_series = [
      {name: 'Exports', points: manExports}
    ];
    renderHeatMap2(data_series,'chartDiv14','Exports',false);

   var data_series = [
      {name: 'Imports', points: manImports}
    ];
    renderHeatMap2(data_series,'chartDiv15','Imports',false);
  });


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