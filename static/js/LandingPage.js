// Automatically populates the form with the Sesnor ID and Post Code so that
// the user do not have to enter it manually
function populateForm() {
    var sid = document.getElementById("id").innerHTML;
    var pc = document.getElementById("title").innerHTML;
    document.getElementById('sensorid').value = sid;
    document.getElementById('postcode').value = pc;
    console.log(document.getElementById('sensorid').value)
    /*if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }*/
  }

  function analyticsToggle() {
    var x = document.getElementById("analytics");
    
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  
  function myFunc() {
    console.log('myFunc');
    alert("The ontoggle event occured");
  }
  

  function drawAnalytics(data, parsed, ph10_data1, nh3_data1){
    console.log('drawAnalytics')
    console.log(data)
    
    // var data1 = JSON.parse('{{ data|tojson }}');
    var data1 = JSON.parse(data);
    const backgroundColorCode = ['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'];
    const borderColorCode = ['rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'];

    console.log(data1[0]);
    // document.getElementById("demo").innerHTML = data1[0].pollutant;        

    if(data1[0].pollutant === "All"){
    // var ph25 = JSON.parse('{{ parsed|tojson }}');
    var ph25 = JSON.parse(parsed);
    var ph25_data = [{t : new Date(ph25[0].t), y : ph25[0].y}]
    for(var i = 1; i < ph25.length; i++) {
      //var obj = json[i];
      ph25_data.push({t : new Date(ph25[i].t), y : ph25[i].y});
    }

    // var ph10 = JSON.parse('{{ ph10_data|tojson }}');
    var ph10 = JSON.parse(ph10_data1);
    var ph10_data = [{t : new Date(ph10[0].t), y : ph10[0].y}]
    for(var i = 1; i < ph10.length; i++) {
      //var obj = json[i];
      ph10_data.push({t : new Date(ph10[i].t), y : ph10[i].y});
    }

    // var nh3 = JSON.parse('{{ nh3_data|tojson }}');
    var nh3 = JSON.parse(nh3_data1);
    var nh3_data = [{t : new Date(nh3[0].t), y : nh3[0].y}]
    for(var i = 1; i < nh3.length; i++) {
      //var obj = json[i];
      nh3_data.push({t : new Date(nh3[i].t), y : nh3[i].y});
    }
    
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.height = 500;
  
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    // labels: [new Date("2015-3-15 13:3").toLocaleString(), new Date("2015-3-25 13:2").toLocaleString(), new Date("2015-4-25 14:12").toLocaleString()],
    datasets: [{
    label: 'PM.10',
    data: ph10_data,
    backgroundColor: backgroundColorCode[0], //['rgba(255, 99, 132, 0.2)'],
    borderColor: borderColorCode[0], // ['rgba(255,99,132,1)'],
    borderWidth: 1
    },
    {
    label: 'PM.25',
    data: ph25_data,
    backgroundColor: backgroundColorCode[1], //['rgba(54, 162, 235, 0.2)'],
    borderColor: borderColorCode[1], // ['rgba(54, 162, 235, 1)'],
    borderWidth: 1
    },
    {
    label: 'NH3',
    data: nh3_data,
    backgroundColor: backgroundColorCode[3], //['rgba(54, 162, 235, 0.2)'],
    borderColor: borderColorCode[3], // ['rgba(54, 162, 235, 1)'],
    borderWidth: 1
    }
    ]
    },
    options: {
    responsive: true,
    scales: {
    xAxes: [{
    type: 'time',
    labelString: 'Duration',
    time: {
        unit: 'day'
    }
    }],
    yAxes: [{
    labelString: 'Pollutant',
    }],
    }
    }
    });     
    }

  else
  {
    // var ph25 = JSON.parse('{{ parsed|tojson }}');
    var ph25 = JSON.parse(parsed);
    var ph25_data = [{t : new Date(ph25[0].t), y : ph25[0].y}]
    for(var i = 1; i < ph25.length; i++) {
      //var obj = json[i];
      ph25_data.push({t : new Date(ph25[i].t), y : ph25[i].y});
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.height = 500;
  
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    // labels: [new Date("2015-3-15 13:3").toLocaleString(), new Date("2015-3-25 13:2").toLocaleString(), new Date("2015-4-25 14:12").toLocaleString()],
    datasets: [{
    label: data1[0].pollutant,
    data: ph25_data,
    backgroundColor: backgroundColorCode[0], //['rgba(255, 99, 132, 0.2)'],
    borderColor: borderColorCode[0], // ['rgba(255,99,132,1)'],
    borderWidth: 1
    }
    ]
    },
    options: {
    responsive: true,
    scales: {
    xAxes: [{
    type: 'time',
    labelString: 'Duration',
    time: {
        unit: 'day'
    }
    }],
    yAxes: [{
    labelString: 'Pollutant',
    }],
    }
    }
    });
    }        
  }

  function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  function exportJson(el, data, parsed1) {
    var data1 = JSON.parse(data);
    console.log('ex : ', data1)
    if(data1[0].duration == "1 Day"){
      dur = "Day"
    }
    else if(data1[0].duration == "1 Week"){
      dur = "Week"
    }
    else{
      dur = "Month"
    }
    var parsed = "text/json;charset=utf-8," + encodeURIComponent(parsed1);
    // what to return in order to show download window?

    el.setAttribute("href", "data:"+parsed);
    // JSON file will be named in the format : 'data_' + sensor ID + '_' + duration + '.json'
    el.setAttribute("download", "data_"+data1[0].sensorid+"_"+dur+".json");
}

// JSON to CSV Converter
function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(el, data, parsed1) {
  // Convert Object to JSON
  // var jsonObject = JSON.stringify(items);
  
  var jsonObject = parsed1;
  // console.log('jsonObject : ', jsonObject)
  var array = typeof jsonObject != 'object' ? JSON.parse(jsonObject) : jsonObject;
  var csv = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        csv += line + '\r\n';
    }
  // console.log('csv : ', csv)
  var data1 = JSON.parse(data);
  if(data1[0].duration == "1 Day"){
    dur = "Day"
  }
  else if(data1[0].duration == "1 Week"){
    dur = "Week"
  }
  else{
    dur = "Month"
  }
  var exportedFilename = 'data_'+ data1[0].sensorid +'_'+dur+'.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}
