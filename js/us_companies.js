

// JS 
  
JSC.fetch('https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/usa_stocks/us_sector_Auto-Tires-Trucks.csv').then( 
  function(response) { 
    if (response.ok) { 
      response.text().then(function(text) { 
        var parsedData = JSC.csv2Json(text); 
        parsedData.headerCol = true; 
        parsedData.columns = [ 
          { value: 'Company Name' }, 
          { value: 'Ticker'}, 
          { value: 'Exchange' }, 
          { value: 'Sector' }, 
          { value: 'Industry' }, 
          { value: 'Market Cap (mil)' },
          { value: 'Month of Fiscal Yr End' },
          { value: 'P/E (Trailing 12 Months)' },
          { value: 'P/E (F1)' },
          { value: 'P/E (F2)' },
          { value: 'F0 Consensus Est' },
          { value: 'F1 Consensus Est' },
          { value: 'F2 Consensus Est' },
          { value: 'EPS Growth F1' },
          { value: 'EPS Growth F2' },
          { value: 'F1 PEG' },
          { value: 'F2 PEG' },



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

