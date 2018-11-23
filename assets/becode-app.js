/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 

Your name :     
Date :  
Contact information : 

What does this script do ? 
...

*/

// Your scripting goes here...

/* Init variables récupération data tableaux html */
// Tableau 1
let table1 = document.getElementById('table1');
let tableOneData = [];

// Tableau 2
let table2 = document.getElementById('table2');
let tableTwoData = [];

/* Fonction pour insérer un élément DOM avant un autre */
let insertBefore = (element, referenceNode) => {
    referenceNode.parentNode.insertBefore(element, referenceNode);
}

/* Récupération données tableaux sous forme d'array d'objet */
// Tableau 1
let getData1 = () => {
    let propArray = ["country", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"];
    for (let i = 2; i < table1.rows.length; i++) {
        let cellsData = table1.rows.item(i).cells;
        // console.log(cellsData.length);
        for (let j = 2; j < cellsData.length; j++) {
            if (cellsData.item(j).innerHTML != ':') {
                let pays = {};
                // console.log(cellsData.item(j));
                // console.log(cellsData.item(j).innerHTML);
                let nomPays = cellsData.item(1).innerHTML;
                if (nomPays.indexOf('(') >= 0) {
                    nomPays = nomPays.substring(0, nomPays.indexOf('('));
                }
                // console.log(nomPays);
                pays[`${propArray[0]}`] = nomPays;
                pays.year = propArray[j - 1]
                pays.number = parseFloat(cellsData.item(j).innerHTML.replace(",", "."));
                // console.log(pays.number);
                tableOneData.push(pays);
            }
        }
    }
    // console.log(tableOneData);
}

getData1();

// Tableau 2
let getData2 = () => {
    let propArray = ["country", "2007-09", "2010-12"]
    for (let i = 1; i < table2.rows.length; i++) {
        let cellsData = table2.rows.item(i).cells;
        // console.log(cellsData.length);
        for (let j = 2; j < cellsData.length; j++) {
            let pays = {};
            // console.log(cellsData.item(j));
            pays[`${propArray[0]}`] = cellsData.item(1).innerHTML;
            pays.year = propArray[j - 1];
            pays.number = parseFloat(cellsData.item(j).innerHTML.replace(",", "."));
            // console.log(pays);
            tableTwoData.push(pays);
        }
    }
    // console.log(tableTwoData);
}

getData2();

/* Création des graphiques */
// Tableau 1
let countries = []; //Contient liste de tous les pays pour les afficher ...
for (let i = 0; i < tableOneData.length; i += 11) { // ... Grâce à cette boucle
    let str = tableOneData[i]['country'];
    if (str.indexOf('(') >= 0) {
        str = str.substring(0, str.indexOf('(')); // Enlève les parenthèses dans le nom si présentes
    }
    // console.log(str);
    countries.push(`${str}`);
}

let chartOne = document.createElement("div");
insertBefore(chartOne, table1);
let drawChartOne = () => {
    let svg = dimple.newSvg(chartOne, "100%", 520);
    let data = tableOneData;
    let stChart = new dimple.chart(svg, data);
    stChart.data = dimple.filterData(data, 'country', countries);
    let x = stChart.addCategoryAxis('x', 'year');
    let y = stChart.addMeasureAxis('y', 'number');
    stChart.addSeries('country', dimple.plot.line); // Trace ligne
    stChart.addSeries('country', dimple.plot.scatter); // place point à l'endroit exact
    stChart.setBounds(30, 10, 670, "93%"); // Ajuste taille graphique par rapport taille svg
    let legend = stChart.addLegend(685, 10, 120, "100%", "right"); // Ajoute la légende
    stChart.draw();

/*     // Filtrer données par légende
    // Rendre légende indépendante
    stChart.legends = [];
    // Ajouter titre
    svg.selectAll("title")
        .data(["Nombre de crime en millier par année par pays", "Cliquer sur un pays dans la légende pour le cacher/l'afficher"])
        .enter()
        .append("text")
        .attr('x', 30)
        .attr('y', function (d, i) {return 10 + i * 14;})
        .style('font-family', 'sans-serif')
        .style('font-size', '12px')
        .style('color', 'Black')
        .text(function (d) {return d; });
    // Liste de pays  valeur unique
    let filterValues = dimple.getUniqueValues(tableOneData, "country");
    // Récuperer tous rectangles légende
    legend.shapes.selectAll('rect')
    legend.on("click", function (e) {
        let hide = false;
        let newFilters = [];
    }) */
}
chartOne.addEventListener('load', drawChartOne());

// Tableau 2
let countries2 = [];
for (let i = 0; i < tableTwoData.length; i += 2) {
    countries2.push(tableTwoData[i]['country']);
}
// console.log(countries2);

let chartTwo = document.createElement("div");
insertBefore(chartTwo, table2);
let drawChartTwo = () => {
    let svg = dimple.newSvg(chartTwo, "100%", 520);
    let data = tableTwoData;
    let ndChart = new dimple.chart(svg, data);
    ndChart.data = dimple.filterData(data, 'country', countries2);
    let x = ndChart.addCategoryAxis('x', 'year');
    let y = ndChart.addMeasureAxis('y', 'number');
    ndChart.addSeries('country', dimple.plot.line);
    ndChart.addSeries('country', dimple.plot.scatter);
    ndChart.setBounds(30, 10, 670, "93%");
    ndChart.addLegend(685, 10, 120, "100%", "right");
    ndChart.draw();
}
chartTwo.addEventListener('load', drawChartTwo());

/* Remote data */
// Initialisation éléments graph remote data
let chartThree = document.createElement('div');
insertBefore(chartThree, bodyContent);
let remoteData = [];
let svg = dimple.newSvg(chartThree, "100%", 520);
let data = remoteData
let rdChart = new dimple.chart(svg, data);
let x = rdChart.addCategoryAxis('x', 'x');
let y = rdChart.addMeasureAxis('y', 'y');
y.overrideMin = -25;
y.overrideMax = 25;
rdChart.addSeries(null, dimple.plot.line);

// Requète ajax
let loadDoc = (callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    }
    xhttp.open("GET", "https://inside.becode.org/api/v1/data/random.json", true);
    xhttp.send();
}
// organise data et dessine graph si requète réussie
let n = 0;
let remoteGraph = (xhttp) => {
    while (n < 10) {
        let rData = JSON.parse(xhttp.responseText);
        for (let i = 0; i < rData.length; i++) {
            remoteData.push({x: rData[i][0]+n*10, y: rData[i][1]})
        }
        n++
        console.log(remoteData);
        let drawChartThree = () => {
            data = remoteData;
            rdChart.draw();    
        }
        drawChartThree();
    }
    //clearInterval(interval);
}
interval = setInterval(loadDoc, 1000, remoteGraph);