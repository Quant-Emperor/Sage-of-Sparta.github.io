

// JS 
  
JSC.fetch('./data/usa_stocks/us_sector_Auto-Tires-Trucks.csv').then( 
  function(response) { 
    if (response.ok) { 
      response.text().then(function(text) { 
        var parsedData = JSC.csv2Json(text); 
        parsedData.headerCol = true; 
        parsedData.columns = [ 
          { value: '{%time:date g}' }, 
          { value: '%PeakPeriod' }, 
          { value: '%PeakDirection' }, 
          { value: '%UpcrossPeriod' }, 
          { value: '%SignificantWaveHeight' }, 
          { value: '%SeaTemperature' } 
        ]; 
        JSC.Grid( 
          'gridDiv', 
          parsedData 
        ).then(function(grid) {}); 
      }); 
    } else { 
      console.error('Problem loading csv data.'); 
    } 
  } 
); 