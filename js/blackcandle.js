


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

    //console.log(ratios);

    let data = [];


    nyse_json.forEach((val, idx) => { 
      if ((nyse_json[idx]["price"] < nyse_json[idx]["open"]) && (nyse_json[idx]["close"] >= nyse_json[idx]["previousClose"] ) ) {
        data.push({symbol: nyse_json[idx]["symbol"]});
      }

    });
    nasdaq_json.forEach((val, idx) => {
      if ((nasdaq_json[idx]["price"] < nasdaq_json[idx]["open"]) && (nasdaq_json[idx]["close"] >= nasdaq_json[idx]["previousClose"] ) ) {
        data.push({symbol: nasdaq_json[idx]["symbol"]});
      }
    });
    //console.log(nyse)

    datagrid(data);

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