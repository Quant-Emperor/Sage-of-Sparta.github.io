


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
    
    var nyse_json = response[0];
    var nasdaq_json = response[1];
    var screen = response[2];
    var screen_symbol = "";

    

    let data = [];

    nyse_json.forEach((val, idx) => { 

      screen_symbol = screen.filter(x => (x.symbol === nyse_json[idx]["symbol"]));

      if (screen_symbol.length > 0) {

        if ((nyse_json[idx]["price"] < nyse_json[idx]["open"]) && (nyse_json[idx]["price"] >= nyse_json[idx]["previousClose"] )&&(screen_symbol[0].symbol === nyse_json[idx]["symbol"]) ) {
          data.push({symbol: nyse_json[idx]["symbol"], name: nyse_json[idx]["name"], price: nyse_json[idx]["price"], change: nyse_json[idx]["change"], changesPercentage: nyse_json[idx]["changesPercentage"], beta: screen_symbol[0].beta});
        }
      }

    });
    nasdaq_json.forEach((val, idx) => {

      screen_symbol = screen.filter(x => (x.symbol === nasdaq_json[idx]["symbol"]));

      if (screen_symbol.length > 0) {

        if ((nasdaq_json[idx]["price"] < nasdaq_json[idx]["open"]) && (nasdaq_json[idx]["price"] >= nasdaq_json[idx]["previousClose"] ) &&(screen_symbol[0].symbol === nasdaq_json[idx]["symbol"])) {
          data.push({symbol: nasdaq_json[idx]["symbol"], name: nasdaq_json[idx]["name"], price: nasdaq_json[idx]["price"], change: nasdaq_json[idx]["change"], changesPercentage: nasdaq_json[idx]["changesPercentage"], beta: screen_symbol[0].beta});
        }
      }

    });
    //console.log(nyse)

    //datagrid(data);
    //loaddatatable(data);
      $(document).ready(function() {
      
      //console.log(data);
      var column_list = [
        { title: "symbol"},
        { title: "name"},
        { title: "price"},
        { title: "change"},
        { title: "changesPercentage"},
        { title: "beta"},

      ];

      var data_val = data.map(el => Object.values(el));

          var dataTables = $('#table').DataTable ({
              retrieve: true,
              paging: false,
              data:data_val,
              columns : column_list
          });
          //dataTables.rows.add(data).draw();
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