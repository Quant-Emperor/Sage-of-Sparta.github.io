


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
    

    var vol_data = await JSC.fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/average_volumes.csv")
        .then(response => response.text())
        .then(text => {
          let  data = JSC.csv2Json(text);
          let vol_data = [];

          //data.forEach((val,idx) => {
          //  vol_data.push({Ticker: val['Ticker']});
          //});
          //console.log(data);
          return(data);
        });



    //console.log(vol_data);



    var nyse_json = response[0];
    var nasdaq_json = response[1];
    var screen = response[2];
    var screen_symbol = "";

    

    let data = [], data2 = [];

    nyse_json.forEach((val, idx) => { 

      screen_symbol = screen.filter(x => (x.symbol === nyse_json[idx]["symbol"]));

      if (screen_symbol.length > 0) {

        if ((nyse_json[idx]["price"] < nyse_json[idx]["open"]) && (nyse_json[idx]["price"] >= nyse_json[idx]["previousClose"] )&&(screen_symbol[0].symbol === nyse_json[idx]["symbol"]) ) {
          data.push({symbol: nyse_json[idx]["symbol"], name: nyse_json[idx]["name"], price: nyse_json[idx]["price"], change: nyse_json[idx]["change"], changesPercentage: nyse_json[idx]["changesPercentage"], beta: screen_symbol[0].beta});
        }
      }

      screen_symbol = vol_data.filter(x => (x.Ticker === nyse_json[idx]["symbol"]));
      if (screen_symbol.length > 0) {
        //console.log(screen_symbol);
        data2.push({symbol: nyse_json[idx]["symbol"], name: nyse_json[idx]["name"], premarket_vol: nyse_json[idx]["volume"]/screen_symbol[0]["average_open_vol"], intraday_vol: nyse_json[idx]["volume"]/screen_symbol[0]["average_vol"], close_vol: nyse_json[idx]["volume"]/screen_symbol[0]["average_close_vol"]});
      }

    });
    nasdaq_json.forEach((val, idx) => {

      screen_symbol = screen.filter(x => (x.symbol === nasdaq_json[idx]["symbol"]));

      if (screen_symbol.length > 0) {

        if ((nasdaq_json[idx]["price"] < nasdaq_json[idx]["open"]) && (nasdaq_json[idx]["price"] >= nasdaq_json[idx]["previousClose"] ) &&(screen_symbol[0].symbol === nasdaq_json[idx]["symbol"])) {
          data.push({symbol: nasdaq_json[idx]["symbol"], name: nasdaq_json[idx]["name"], price: nasdaq_json[idx]["price"], change: nasdaq_json[idx]["change"], changesPercentage: nasdaq_json[idx]["changesPercentage"], beta: screen_symbol[0].beta});
        }
      }

      screen_symbol = vol_data.filter(x => (x.Ticker === nasdaq_json[idx]["symbol"]));
      if (screen_symbol.length > 0) {
        //console.log(screen_symbol);
        data2.push({symbol: nasdaq_json[idx]["symbol"], name: nasdaq_json[idx]["name"], premarket_vol: nasdaq_json[idx]["volume"]/screen_symbol[0]["average_open_vol"], intraday_vol: nasdaq_json[idx]["volume"]/screen_symbol[0]["average_vol"], close_vol: nasdaq_json[idx]["volume"]/screen_symbol[0]["average_close_vol"]});
      }


    });

      $(document).ready(function() {
      
      //console.log(data);
      var column_list = [
        { title: "Ticker"},
        { title: "Name"},
        { title: "Price", "render": function(price){
                                                   return parseFloat(price).toFixed(2);
                                                 }},
        { title: "Change", "render": function(change){
                                                   return parseFloat(change).toFixed(4);
                                                 }},
        { title: "Change %", "render": function(changesPercentage){
                                                   return parseFloat(changesPercentage).toFixed(4);
                                                 }},
        { title: "Beta", "render": function(beta){
                                                   return parseFloat(beta).toFixed(2);
                                                 }},

      ];

      var data_val = data.map(el => Object.values(el));

          var dataTables = $('#table').DataTable ({
              retrieve: true,
              //paging: false,
              data:data_val,
              pageLength: 5,
              columns : column_list
          });


      var column_list2 = [
        { title: "Ticker"},
        { title: "Name"},
        { title: "Pre-market Volume %", "render": function(premarket_vol){
                                                   return parseFloat(premarket_vol).toFixed(2);
                                                 }},
        { title: "Intraday Volume %", "render": function(intraday_vol){
                                                   return parseFloat(intraday_vol).toFixed(2);
                                                 }},
        { title: "Close Volume %", "render": function(close_vol){
                                                   return parseFloat(close_vol).toFixed(2);
                                                 }},
      ];

      var data_val2 = data2.map(el => Object.values(el));

          var dataTables2 = $('#table2').DataTable ({
              retrieve: true,
              //paging: false,
              data:data_val2,
              pageLength: 5,
              columns : column_list2,
              dom: 'Bfrtip',
              buttons: [
                  {
                      text: 'My button',
                      action: function ( e, dt, node, config ) {
                          alert( 'Button activated' );
                      }
                  }
              ]
          });         
          
  });



  } catch (error) {
    console.log("Error", error)
  }
}


function datagrid(data) {
  var grid = new JSC.Grid('grid', { 
    data: data, 
    headerCol: true, 
    columns: [ 
      { 
        header: 'Symbol', 
        value: '%symbol'
      }
    ] 
  }); 
}


function loaddatatable(data) {
 
    //var aDemoItems  = oResults.lDemographicItems; //
    //var jsonString = JSON.stringify(aDemoItems  ) //for testing
     
   //Load  datatable
    var oTblReport = $("#table")
 
    oTblReport.DataTable ({
        "data" : data,
        "columns" : [
            { "data" : "symbol" },
        ]
    });
}