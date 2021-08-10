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


fetch('https://raw.githubusercontent.com/Sage-of-Sparta/Sage-of-Sparta.github.io/master/data/ism_pmi.csv')
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		let series = csvToSeries2(text);
		renderChart2(series);
	})
	.catch(function (error) {
		//Something went wrong
		console.log(error);
	}); 



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


function csvToSeries2(text) {
	const ism_y = 'ISM_Manufacturing_Index';
	const date_x = 'Date';
	let dataAsJson = JSC.csv2Json(text);
	let black = [];
	dataAsJson.forEach(function (row) {
		//add either to Black, White arrays, or discard.
		black.push({x: row[date_x], y: row[ism_y]});

	});
	return [
		{name: 'Black', points: black},
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
		//defaultSeries_firstPoint_label_text: '<b>%seriesName</b>',
		//defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',

		series: series
	});
}
