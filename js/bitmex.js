


async function fetchData(urlstrings,id) {
  try {
    const response = await Promise.all(
      urlstrings.map(url => fetch(url).then(res => res.json()))
    )
    
    var data = response[0];

    //console.log(data["solana"]["usd"]);
    
    document.getElementById('frm1').elements['fprice'].value = data[id]["usd"];

//var x = document.getElementById("frm1");
  //            var ticker = x.elements[0].value

  } catch (error) {
    console.log("Error", error)
  }
}







