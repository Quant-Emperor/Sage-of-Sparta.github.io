



// JS 
  
var foo;


foo = fetch("https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/usa_stocks/us_sector_Auto-Tires-Trucks.csv")
	  .then(response => response.text()); 
	    



console.log(foo);