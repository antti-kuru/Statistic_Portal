const header = document.getElementById("chart-header")
const fileInput = document.getElementById("file-input")
const submitFile = document.getElementById("dragData")
const predictData = document.getElementById("addBirthData")
const estimateData = document.getElementById("add-data")
const exportFamilyButton = document.getElementById("export-familyData")
const exportBirthButton = document.getElementById("export-birthData")
const exportPopButton = document.getElementById("export-popData")
const container = document.getElementById("container")
const navigation = document.getElementById("navigation")
const notSelectedContainer = document.getElementById("not-selected")
const selectedContainer = document.getElementById("selected")
const draggables = document.querySelectorAll(".draggable")
const dragContainers = document.querySelectorAll(".drag-container")
const updateButton = document.getElementById("update-button")

const selectedMunicipality = localStorage.getItem("selectedMunicipality")


/* DATA QUERIES */

const fetchData = async (munCode, dataCode) => {
    const JsonQuery = {
        "query": [
            {
                "code": "Vuosi",
                "selection": {
                    "filter": "item",
                    "values": [
                        "2000", "2001", "2002", "2003", "2004", "2005",
                        "2006", "2007", "2008", "2009", "2010", "2011",
                        "2012", "2013", "2014", "2015", "2016", "2017",
                        "2018", "2019", "2020", "2021"
                    ]
                }
            },
            {
                "code": "Alue",
                "selection": {
                    "filter": "item",
                    "values": [munCode]
                }
            },
            {
                "code": "Tiedot",
                "selection": {
                    "filter": "item",
                    "values": [dataCode]
                }
            }
        ],
        "response": {
            "format": "json-stat2"
        }
    }

    const res = await fetch("https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(JsonQuery)
    })
    if (!res.ok) {
        return;
    }
    const data = await res.json();
    return data;
};



const fetchPopulationPredictionsData = async (munCode, gender) => {
    const JsonQuery = {
        "query": [
          {
            "code": "Alue",
            "selection": {
              "filter": "item",
              "values": 
                [munCode]

            }
          },
          {
            "code": "Sukupuoli",
            "selection": {
              "filter": "item",
              "values": [gender]
            }
          },
          {
            "code": "Tiedot",
            "selection": {
              "filter": "item",
              "values": [
                "vaesto_e21"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      }
      const res = await fetch("https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaenn/statfin_vaenn_pxt_139g.px", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(JsonQuery)
    })
    if (!res.ok) {
        return
    }
    const data = await res.json();
    return data
}

const fetchFamilyData = async (munCode, kids) => {
    const JsonQuery = {
        "query": [
            {
                "code": "Vuosi",
                "selection": {
                    "filter": "item",
                    "values": [
                        "2000", "2001", "2002", "2003", "2004", "2005",
                        "2006", "2007", "2008", "2009", "2010", "2011",
                        "2012", "2013", "2014", "2015", "2016", "2017",
                        "2018", "2019", "2020", "2021"
                    ]
                }
            },
          {
            "code": "Alue",
            "selection": {
              "filter": "item",
              "values":
              [munCode]
            }
          },
          {
            "code": "Perhetyyppi",
            "selection": {
              "filter": "item",
              "values": [
                "SSS"
              ]
            }
          },
          {
            "code": "Lasten lukumäärä",
            "selection": {
              "filter": "item",
              "values": 
              [kids]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      }
    const res = await fetch("https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/perh/statfin_perh_pxt_12c4.px", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(JsonQuery)
    })
    if (!res.ok) {
        return
    }
    const data = await res.json();
    return data
} 

/* HEADER CREATION METHOD */

const createHeader = (munName) => {
    const h1 = document.createElement("h1")
    h1.innerText = "Additional charts regarding selected municipality " + munName
    header.appendChild(h1)
}


/* CHART CREATION METHODS */


// Chart 1

const defaultFamilyChart = async (labels, noU18, name) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                name: "No U18 kids",
                values: noU18,
                chartType: "line"
            },
        ]
    }

    const familyChart = new frappe.Chart("#chart3", {
        title: "Number of kids in families in " + name,
        data: chartData,
        type: "line",
        height: 450,
        
    })
}


const updateFamilyChart = async (labels, datasets, name) => {
    const chartData = {
        labels: labels,
        datasets: datasets
    }

    const familyChart = new frappe.Chart("#chart3", {
        title: "Number of kids in families in " + name,
        data: chartData,
        type: "line",
        height: 450,
        
    })
    exportFamilyButton.addEventListener("click", () => {
        familyChart.export()

    })
}

// Chart 2

const createBarChart = async (labels, birthValues, deathValues, name) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                name: "Births",
                values: birthValues,
                chartType: "bar"
            },
            {
                name: "Deaths", 
                values: deathValues,
                chartType: "bar"
            }
        ]
    }

    const chart = new frappe.Chart("#chart", {
        title: "Birth and Death Numbers in " + name,
        data: chartData,
        type: "bar",
        height: 450,
        colors: ['#63d0ff','#363636']
       
    })

    predictData.addEventListener("click", () => {
        /* We use the technique from week6 homework to calculate the future estimations based on calculating the mean value of the delta of every data point
        //For example, with the values of [5, 2, 4, -1] the next data point would be: 
        ((2−5)+(4−2)+((−1)−4))/3+(−1)=(2−3−5)/3−1=(−6)/3−1=−3   =>  [5, 2, 4, -1, -3] */
        let birthDeltaArray = []
        let deathDeltaArray = []
        for (let i = 1; i < birthValues.length; i++) {
            const birthDelta = birthValues[i] - birthValues[i - 1]
            const deathDelta = deathValues[i] - deathValues[i - 1]
            birthDeltaArray.push(birthDelta)
            deathDeltaArray.push(deathDelta)
        }
        let birthDeltaSum = 0
        let deathDeltaSum = 0
        for (let i = 0; i < birthDeltaArray.length; i++) {
            birthDeltaSum += birthDeltaArray[i]
            deathDeltaSum += deathDeltaArray[i]
        }
        birthDeltaSum = Math.round(birthDeltaSum / birthDeltaArray.length)
        deathDeltaSum = Math.round(deathDeltaSum / deathDeltaArray.length)
        //last element on the current list
        const last = birthDeltaArray.length

        birthDeltaSum = birthDeltaSum + birthValues[last - 1]
        deathDeltaSum = deathDeltaSum + deathValues[last - 1]

        birthValues.push(birthDeltaSum)
        deathValues.push(deathDeltaSum)

        // add one year to the labels
        labels.push(`${parseInt(labels[labels.length - 1]) + 1}`)
        // update the chart with new labels and values
        createBarChart(labels, birthValues, deathValues, name)
    })


    exportPopButton.addEventListener("click", () => {
        // Downloading the chart as SVG, found this from frappe's documentation
        chart.export()
    })
    
}

// Chart 3
const createLineChart = async (labels, menPop, womPop, name) => {

    const chartData = {
        labels: labels,
        datasets: [
            {
                name: "Men",
                values: menPop,
                chartType: "line"
            },
            {
                name: "Women",
                values:womPop,
                chartType: "line"
            }
        ]
    }
    console.log(chartData)
    const chart = new frappe.Chart("#chart2", {
        title: "Predicted population in " + name,
        data: chartData,
        type: "line",
        height: 450,
        colors: ['#63d0ff','#363636']
    })


    estimateData.addEventListener("click", () => {
        // Same method to calculate future estimations as above
        let menDeltaArray = []
        let womDeltaArray = []
        for (let i = 1; i < menPop.length; i++) {
            const menDelta = menPop[i] - menPop[i - 1]
            const womDelta = womPop[i] - womPop[i - 1]
            menDeltaArray.push(menDelta)
            womDeltaArray.push(womDelta)
        }
        let menDeltaSum = 0
        let womDeltaSum = 0
        for (let i = 0; i < menDeltaArray.length; i++) {
            menDeltaSum += menDeltaArray[i]
            womDeltaSum += womDeltaArray[i]
        }
        menDeltaSum = Math.round(menDeltaSum / menDeltaArray.length)
        womDeltaSum = Math.round(womDeltaSum / womDeltaArray.length)
        //last element on the current list
        const last = menDeltaArray.length

        menDeltaSum = menDeltaSum + menPop[last - 1]
        womDeltaSum = womDeltaSum + womPop[last - 1]

        menPop.push(menDeltaSum)
        womPop.push(womDeltaSum)

        labels.push(`${parseInt(labels[labels.length - 1]) + 1}`)
        createLineChart(labels, menPop, womPop, name)
    })


    exportPopButton.addEventListener("click", () => {
        chart.export()
    })

}

// Chart 4

const createNewChart = async (labels, data, dataName, name) => {
    data = [data]
    console.log(labels)
    console.log(data)
    const chartData = {
        labels: labels,
        datasets: [
            {
            name: dataName,
            values: data,
            chartType: "bar",
            }
        ]
    }

    let newChart = document.createElement("div")
    newChart.id = "newChart"
    container.appendChild(newChart)
    const chart = new frappe.Chart("#newChart", {
        title: dataName + " " + name,
        data: chartData,
        type: "bar",
        height: 450,
        colors: ['#63d0ff']
    })
}

    
// METHOD THAT ORGANIZES THE FUNCTIONALITY (DATA FETCHES & CHART CREATIONS & DRAG'n'DROP)

const handleRequest = async (munCode) => {
        
    // data fetches for chart 1 (number of kids in families)

    const noU18Kids = await fetchFamilyData(munCode, "a18_0")
    const oneU18Kid = await fetchFamilyData(munCode, "a18_1")
    const twoU18Kids = await fetchFamilyData(munCode, "a18_2")
    const threeU18Kids = await fetchFamilyData(munCode, "a18_3")
    const fourOrMoreU18Kids = await fetchFamilyData(munCode, "a18_4-")
    const noU7Kids = await fetchFamilyData(munCode, "a7_0")
    const oneU7Kid = await fetchFamilyData(munCode, "a7_1")
    const twoU7Kids = await fetchFamilyData(munCode, "a7_2")
    const threeOrMoreU7Kids = await fetchFamilyData(munCode, "a7_3-")


    // data fetches for chart 2 (birth and death)
    const birthData = await fetchData(munCode, "vm01")
    const deathData = await fetchData(munCode, "vm11")

    // data fetches for chart 3 (predicted population)
    const menPopulationData = await fetchPopulationPredictionsData(munCode, "1")
    const womPopulationData = await fetchPopulationPredictionsData(munCode, "2")



    // creating chart elements for chart 1
    const noU18KidsData = noU18Kids.value
    const oneU18KidData = oneU18Kid.value
    const twoU18KidsData = twoU18Kids.value
    const threeU18KidsData = threeU18Kids.value
    const fourOrMoreU18KidsData = fourOrMoreU18Kids.value
    const noU7KidsData = noU7Kids.value
    const oneU7KidData = oneU7Kid.value
    const twoU7KidsData = twoU7Kids.value
    const threeOrMoreU7KidsData = threeOrMoreU7Kids.value

    const familyLabels = Object.values(noU18Kids.dimension.Vuosi.category.label)


    // creating chart elements for chart 2
    const area = munCode
    const labels = Object.values(birthData.dimension.Vuosi.category.label)
    const birthValues = birthData.value
    const deathValues = deathData.value
    
    // this municipality name is used in headers
    const munName = birthData.dimension.Alue.category.label[area]


    // creating chart elements for chart 3
    const popPredLabels = Object.values(menPopulationData.dimension.Vuosi.category.label)

    const menPopValues = menPopulationData.value
    const womPopValues = womPopulationData.value

    
    // creating header
    createHeader(munName)

    // creating the charts

    // chart 1
    defaultFamilyChart(familyLabels, noU18KidsData, munName)
    
    // chart 2
    createBarChart(labels, birthValues, deathValues, munName)

    // chart 3
    createLineChart(popPredLabels, menPopValues, womPopValues, munName)
   
    
    /*  DRAG'n'DROP FUNCTIONALITY 

    This could have probably been made in own function but I found it easiest to do it in this handleRequest as all the datavalues are already here

    I have created defaultFamilyChart, which contains only data for families with no U18 kids */

    
    let selectedDatasets = []
    selectedDatasets.push({
        name: "No U18 kids",
        values: noU18KidsData,
        chartType: "line"})




    const addSelectedData = (id) => {
        let datasetName = ''
        let datasetValues = []
    
        // Define dataset properties based on the dragged item's id
        if (id == 0) {
            datasetName = "No U18 kids"
            datasetValues = noU18KidsData
        } else if (id == 1) {
            datasetName = "One U18 kid"
            datasetValues = oneU18KidData
        } else if (id == 2) {
            datasetName = "Two U18 kids"
            datasetValues = twoU18KidsData
        }else if (id == 3) {
            datasetName = "Three U18 kids"
            datasetValues = threeU18KidsData
        }else if (id == 4) {
            datasetName = "Four or more U18 kids"
            datasetValues = fourOrMoreU18KidsData
        }else if (id == 5) {
            datasetName = "No U7 kids"
            datasetValues = noU7KidsData
        }else if (id == 6) {
            datasetName = "One U7 kid"
            datasetValues = oneU7KidData
        }else if (id == 7) {
            datasetName = "Two U7 kids"
            datasetValues = twoU7KidsData
        }else if (id == 8) {
            datasetName = "Three or more U7 kids"
            datasetValues = threeOrMoreU7KidsData
        }
    
        // Check if the dataset is already in the selectedDatasets
        const datasetExists = selectedDatasets.some(dataset => dataset.name === datasetName)

        if (!datasetExists) {
            selectedDatasets.push({
                name: datasetName,
                values: datasetValues,
                chartType: "line"
            })
       
        // Update the chart with the new selectedDatasets
        updateFamilyChart(familyLabels, selectedDatasets, munName)
    }
    }
    const removeSelectedData = (id) => {
        let datasetName = '';
    
        // Define dataset properties based on the dragged item's id
        if (id == 0) {
            datasetName = "No U18 kids"
        } else if (id == 1) {
            datasetName = "One U18 kid"
        } else if (id == 2) {
            datasetName = "Two U18 kids"
        } else if (id == 3) {
            datasetName = "Three U18 kids"
        } else if (id == 4) {
            datasetName = "Four or more U18 kids"
        } else if (id == 5) {
            datasetName = "No U7 kids"
        } else if (id == 6) {
            datasetName = "One U7 kid"
        } else if (id == 7) {
            datasetName = "Two U7 kids"
        } else if (id == 8) {
            datasetName = "Three or more U7 kids"
        }
    
        // Remove the dataset from selectedDatasets by filtering it out
        selectedDatasets = selectedDatasets.filter(dataset => dataset.name !== datasetName)
    
        // Update the chart with the new dataset after removal
        updateFamilyChart(familyLabels, selectedDatasets, munName)
    }




    /* We use draggable elements which enable the user to define which data is shown
    I used methods from https://www.youtube.com/watch?v=jfYWwQrtzzY&ab_channel=WebDevSimplified */

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", () => {
            draggable.classList.add("dragging")
        })
    
        draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging")
        })
    })
    
    // When the draggable item is put to the container "not selected" and the update button is pressed, the item is removed from the chart
    notSelectedContainer.addEventListener("dragover", (e) => {
        e.preventDefault()
        const draggable = document.querySelector(".dragging")
        notSelectedContainer.appendChild(draggable)
        updateButton.addEventListener("click", () => {
            removeSelectedData(draggable.id) // Update chart when button is clicked by removing items that are dragged out
        })
    
    })
    // When the draggable item is put to the container "selected" and the update button is pressed, the item is added to the chart 
    selectedContainer.addEventListener("dragover", (e) => {
        e.preventDefault()
        const draggable = document.querySelector(".dragging")
        selectedContainer.appendChild(draggable)
        updateButton.addEventListener("click", () => {
            addSelectedData(draggable.id) // Update chart when button is clicked by adding itemss that are dragged in
        })
    })

    
}


/*This method allows user to drop a JSON file and chart is created from it
I found it hard to download a right type of JSON file from statfin which is Dataset so I made this work for the week 5 homework
downloadable files */

const makeChartFromImport = (munCode) => {
    submitFile.addEventListener("click", () => {
        const file = fileInput.files[0]
    
        if (file) {

            // Here we check that is the file valid (not 100% sure does this work in all cases but at least in the ones I tried it worked)
            if (file.type !== "application/json") {
                alert("Invalid file type. Please upload a JSON file.")
                return
            }


            //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
            //we use fileReader to read the dropped file
            const reader = new FileReader()
    
            reader.readAsText(file)
    
            reader.onerror = function () {
                console.log(reader.error)
            }
            reader.onload = function (e) {
                try {
                console.log(munCode)
                const data = JSON.parse(e.target.result)
                console.log(data)

                let index
                let dataName
                let munName
                if (data.dataset.dimension.Tuloalue) {
                    index = data.dataset.dimension.Tuloalue.category.index[munCode]
                    dataName = data.dataset.dimension.Tuloalue.label
                    munName = data.dataset.dimension.Tuloalue.category.label[munCode]
                } else {
                    index = data.dataset.dimension.Lähtöalue.category.index[munCode]
                    dataName = data.dataset.dimension.Lähtöalue.label
                    munName = data.dataset.dimension.Lähtöalue.category.label[munCode]
                }
                const values = data.dataset.value[index]
                const labels = Object.values(data.dataset.dimension.Vuosi.category.label)
                
                createNewChart(labels, values, dataName, munName)
            } catch (error) {
                alert("There is error reading the file, try another file")
                console.log(error)
            }

            }
        }  
    })
}




// this checks that we have gotten a municipality from the index.html file
if (selectedMunicipality) {
    handleRequest(selectedMunicipality)
    makeChartFromImport(selectedMunicipality)
}

