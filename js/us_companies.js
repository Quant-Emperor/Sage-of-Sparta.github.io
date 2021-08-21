

// JS 
  
JSC.fetch('https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/usa_stocks/us_sector_Auto-Tires-Trucks.csv').then( 
  function(response) { 
    if (response.ok) { 
      response.text().then(function(text) { 
        var parsedData = JSC.csv2Json(text); 
        parsedData.headerCol = true; 
        parsedData.columns = [ 
          { value: '%Ticker' }, 
          { value: '%Exchange' }, 
          { value: '%Sector' }, 
          { value: '%Industry' }, 
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





//,,,,,,Month of Fiscal Yr End,P/E (Trailing 12 Months),P/E (F1),P/E (F2),F0 Consensus Est.,F1 Consensus Est.,F2 Consensus Est.,EPS Growth F1,EPS Growth F2,F1 PEG,F2 PEG,PEG Ratio