
var data, series, chart; 

fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		let series = csvToSeries(text);
		renderChart(series);
	})
	.catch(function (error) {
		//Something went wrong
		console.log(error);
	}); 

// Load CSV data and convert to JSON 
JSC.fetch( 
	'https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/ism_pmi.csv'
  ) 
	.then(function(response) { 
	  return response.text(); 
	}) 
	.then(function(text) { 
	  series = csvToSeries2(text); 
	  renderCharts(series); 
	}); 



function csvToSeries2(text) {
	const lifeExp = 'ISM_Manufacturing_Index';
	let dataAsJson = JSC.csv2Json(text);
	let white = [], black = [];
	dataAsJson.forEach(function (row) {
		//add either to Black, White arrays, or discard.
		
		black.push({x: row.Date, y: row[lifeExp]});

	});
	return [
		{name: 'Black', points: black},
	];
}


function csvToSeries(text) {
	const lifeExp = 'average_life_expectancy';
	let dataAsJson = JSC.csv2Json(text);
	let white = [], black = [];
	dataAsJson.forEach(function (row) {
		//add either to Black, White arrays, or discard.
		if (row.sex === 'Both Sexes') {
			if (row.race === 'Black') {
				black.push({x: row.year, y: row[lifeExp]});
			} else if (row.race === 'White') {
				white.push({x: row.year, y: row[lifeExp]});
			}
		}
	});
	return [
		{name: 'Black', points: black},
		{name: 'White', points: white},
	];
}



function renderChart(series) {
	JSC.Chart('chartDiv', {
		title_label_text: 'Life Expectancy in the United States',
		annotations: [{
			label_text: 'Source: National Center for Health Statistics',
			position: 'bottom left'
		}],
		legend_visible: true,
		xAxis_crosshair_enabled: true,
		defaultSeries_firstPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
		series: series
	});
}


function renderCharts(series) { 
	chart = JSC.chart('chartDiv2', { 
	  debug: true, 
	  title_label_text: 
		'ISM Manufacturing Index PMI', 
	  animation: false, 
	  legend_template: '%icon %name', 
	  defaultPoint_marker_type: 'none', 
	  yAxis: { label_text: 'Number' }, 
	  xAxis: { 
		formatString: 'd', 
		label_text: 'Date', 
		scale_minInterval: 1 
	  }, 
	  series: series, 
	  toolbar_items_label: { 
		type: 'label', 
		label_text: 
		  '<chart scale width=500 min=1940 max=2022 interval=5>', 
		boxVisible: false, 
		position: 'bottom', 
		itemsBox: { 
		  visible: true, 
		  boxVisible: false
		}, 
		items_slider: { 
		  type: 'range', 
		  width: 500, 
		  value: [1940, 2022], 
		  min: 1940, 
		  max: 2022, 
		  events_change: applyZoom 
		} 
	  } 
	}); 
  } 
	
	
  //function getSeries() { 
	
	 // Group entries by age_group, map year and birth_numbers to point x,y values. 
	 
//	return JSC.nest() 
//	  .key('Date')  
//	  .rollup('ISM_Manufacturing_Index') 
//	  .series(data); 
 // } 
	
  function toDateNum(d) { 
	return new Date(d).getTime(); 
  } 
	
  function applyZoom(range) { 
	chart.axes('x').zoom(range); 
  } 




// JS 
  

  
/*
function renderChart2(series) {
	JSC.Chart('chartDiv2', {
		title_label_text: 'ISM PMI',
		annotations: [{
			label_text: 'Source: National Center for Health Statistics',
			position: 'bottom left'
		}],
		legend_visible: false,
		xAxis_crosshair_enabled: true,
		xAxis: { crosshair_enabled: true, scale: { type: "time" } },

		series: series
	});
} 


function renderCharts() { 
  chart = JSC.chart('chartDiv', { 
    debug: true, 
    title_label_text: 
      'Births to Unmarried Women by Age Group', 
    animation: false, 
    legend_template: '%icon %name', 
    defaultPoint_marker_type: 'none', 
    yAxis: { label_text: 'Number of births' }, 
    xAxis: { 
      formatString: 'd', 
      label_text: 'Year', 
      scale_minInterval: 1 
    }, 
    series: getSeries(), 
    toolbar_items_label: { 
      type: 'label', 
      label_text: 
        '<chart scale width=500 min=1940 max=2015 interval=15>', 
      boxVisible: false, 
      position: 'bottom', 
      itemsBox: { 
        visible: true, 
        boxVisible: false
      }, 
      items_slider: { 
        type: 'range', 
        width: 500, 
        value: [1940, 2015], 
        min: 1940, 
        max: 2015, 
        events_change: applyZoom 
      } 
    } 
  }); 
} 
  
function getSeries() { 
  
   // Group entries by age_group, map year and birth_numbers to point x,y values. 
   
  return JSC.nest() 
    .key('age_group') 
    .key('year') 
    .rollup('birth_number') 
    .series(data); 
} 
  
function toDateNum(d) { 
  return new Date(d).getTime(); 
} 
  
function applyZoom(range) { 
  chart.axes('x').zoom(range); 
} 
*/