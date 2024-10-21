const slider = document.getElementById("input")
const output = document.getElementById("demo")
output.textContent = slider.value

const fetchVehicleData = async () => {   
    const vehichleQuery = {
        "query": [
          {
            "code": "Maakunta",
            "selection": {
              "filter": "item",
              "values": [
                "MA1",
                "MK01",
                "MK02",
                "MK04",
                "MK05",
                "MK06",
                "MK07",
                "MK08",
                "MK09",
                "MK10",
                "MK11",
                "MK12",
                "MK13",
                "MK14",
                "MK15",
                "MK16",
                "MK17",
                "MK18",
                "MK19",
                "MKTT",
                "MKUU"
              ]
            }
          },
          {
            "code": "Ajoneuvoluokka",
            "selection": {
              "filter": "item",
              "values": [
                "01"
              ]
            }
          },
          {
            "code": "Liikennekäyttö",
            "selection": {
              "filter": "item",
              "values": [
                "0"
              ]
            }
          },
          {
            "code": "Vuosi",
            "selection": {
              "filter": "item",
              "values": [
                "2023"
              ]
            }
          },
          {
            "code": "Museoajoneuvo",
            "selection": {
              "filter": "item",
              "values": [
                "0"
              ]
            }
          },
          {
            "code": "Tiedot",
            "selection": {
              "filter": "item",
              "values": [
                "keskika"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      }

        const res = await fetch ("https://statfin.stat.fi:443/PxWeb/api/v1/fi/StatFin/mkan/statfin_mkan_pxt_11id.px", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(vehichleQuery)
        })
        if (!res.ok) {
            return
        }
        const data = await res.json()
        return data
    }

const fetchSalaryData = async () => {
    const salaryQuery = {
        "query": [
          {
            "code": "Maakunta",
            "selection": {
              "filter": "item",
              "values": [
                "SSS",
                "MK01",
                "MK02",
                "MK04",
                "MK05",
                "MK06",
                "MK07",
                "MK08",
                "MK09",
                "MK10",
                "MK11",
                "MK12",
                "MK13",
                "MK14",
                "MK15",
                "MK16",
                "MK17",
                "MK18",
                "MK19",
                "MK21",
                "X"
              ]
            }
          },
          {
            "code": "Työnantajasektori",
            "selection": {
              "filter": "item",
              "values": [
                "SSS"
              ]
            }
          },
          {
            "code": "Sukupuoli",
            "selection": {
              "filter": "item",
              "values": [
                "SSS"
              ]
            }
          },
          {
            "code": "Tiedot",
            "selection": {
              "filter": "item",
              "values": [
                "pra_kkpalkka_ka"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      }
      const res = await fetch ("https://statfin.stat.fi:443/PxWeb/api/v1/fi/StatFin/pra/statfin_pra_pxt_14kj.px", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(salaryQuery)
    })
    if (!res.ok) {
        return
    }
    const data = await res.json()
    return data
    
}


const fetchApartmentPriceData = async () => {
    const apartmentQuery = {
        "query": [
          {
            "code": "Vuosi",
            "selection": {
              "filter": "item",
              "values": [
                "2023"
              ]
            }
          },
          {
            "code": "Talotyyppi",
            "selection": {
              "filter": "item",
              "values": [
                "0"
              ]
            }
          },
          {
            "code": "Tiedot",
            "selection": {
              "filter": "item",
              "values": [
                "keskihinta_aritm_nw"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      }
      const res = await fetch ("https://statfin.stat.fi:443/PxWeb/api/v1/fi/StatFin/ashi/statfin_ashi_pxt_13mx.px", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(apartmentQuery)
    })
    if (!res.ok) {
        return
    }
    const data = await res.json()
    return data

}

const fetchEmploymentData = async (dataCode, year) => {
    const JsonQuery = {
        "query": [
          {
            "code": "Alue",
            "selection": {
              "filter": "item",
              "values": [
                "SSS",
                "KU020",
                "KU005",
                "KU009",
                "KU010",
                "KU016",
                "KU018",
                "KU019",
                "KU035",
                "KU043",
                "KU046",
                "KU047",
                "KU049",
                "KU050",
                "KU051",
                "KU052",
                "KU060",
                "KU061",
                "KU062",
                "KU065",
                "KU069",
                "KU071",
                "KU072",
                "KU074",
                "KU075",
                "KU076",
                "KU077",
                "KU078",
                "KU079",
                "KU081",
                "KU082",
                "KU086",
                "KU111",
                "KU090",
                "KU091",
                "KU097",
                "KU098",
                "KU102",
                "KU103",
                "KU105",
                "KU106",
                "KU108",
                "KU109",
                "KU139",
                "KU140",
                "KU142",
                "KU143",
                "KU145",
                "KU146",
                "KU153",
                "KU148",
                "KU149",
                "KU151",
                "KU152",
                "KU165",
                "KU167",
                "KU169",
                "KU170",
                "KU171",
                "KU172",
                "KU176",
                "KU177",
                "KU178",
                "KU179",
                "KU181",
                "KU182",
                "KU186",
                "KU202",
                "KU204",
                "KU205",
                "KU208",
                "KU211",
                "KU213",
                "KU214",
                "KU216",
                "KU217",
                "KU218",
                "KU224",
                "KU226",
                "KU230",
                "KU231",
                "KU232",
                "KU233",
                "KU235",
                "KU236",
                "KU239",
                "KU240",
                "KU320",
                "KU241",
                "KU322",
                "KU244",
                "KU245",
                "KU249",
                "KU250",
                "KU256",
                "KU257",
                "KU260",
                "KU261",
                "KU263",
                "KU265",
                "KU271",
                "KU272",
                "KU273",
                "KU275",
                "KU276",
                "KU280",
                "KU284",
                "KU285",
                "KU286",
                "KU287",
                "KU288",
                "KU290",
                "KU291",
                "KU295",
                "KU297",
                "KU300",
                "KU301",
                "KU304",
                "KU305",
                "KU312",
                "KU316",
                "KU317",
                "KU318",
                "KU398",
                "KU399",
                "KU400",
                "KU407",
                "KU402",
                "KU403",
                "KU405",
                "KU408",
                "KU410",
                "KU416",
                "KU417",
                "KU418",
                "KU420",
                "KU421",
                "KU422",
                "KU423",
                "KU425",
                "KU426",
                "KU444",
                "KU430",
                "KU433",
                "KU434",
                "KU435",
                "KU436",
                "KU438",
                "KU440",
                "KU441",
                "KU475",
                "KU478",
                "KU480",
                "KU481",
                "KU483",
                "KU484",
                "KU489",
                "KU491",
                "KU494",
                "KU495",
                "KU498",
                "KU499",
                "KU500",
                "KU503",
                "KU504",
                "KU505",
                "KU508",
                "KU507",
                "KU529",
                "KU531",
                "KU535",
                "KU536",
                "KU538",
                "KU541",
                "KU543",
                "KU545",
                "KU560",
                "KU561",
                "KU562",
                "KU563",
                "KU564",
                "KU309",
                "KU576",
                "KU577",
                "KU578",
                "KU445",
                "KU580",
                "KU581",
                "KU599",
                "KU583",
                "KU854",
                "KU584",
                "KU588",
                "KU592",
                "KU593",
                "KU595",
                "KU598",
                "KU601",
                "KU604",
                "KU607",
                "KU608",
                "KU609",
                "KU611",
                "KU638",
                "KU614",
                "KU615",
                "KU616",
                "KU619",
                "KU620",
                "KU623",
                "KU624",
                "KU625",
                "KU626",
                "KU630",
                "KU631",
                "KU635",
                "KU636",
                "KU678",
                "KU710",
                "KU680",
                "KU681",
                "KU683",
                "KU684",
                "KU686",
                "KU687",
                "KU689",
                "KU691",
                "KU694",
                "KU697",
                "KU698",
                "KU700",
                "KU702",
                "KU704",
                "KU707",
                "KU729",
                "KU732",
                "KU734",
                "KU736",
                "KU790",
                "KU738",
                "KU739",
                "KU740",
                "KU742",
                "KU743",
                "KU746",
                "KU747",
                "KU748",
                "KU791",
                "KU749",
                "KU751",
                "KU753",
                "KU755",
                "KU758",
                "KU759",
                "KU761",
                "KU762",
                "KU765",
                "KU766",
                "KU768",
                "KU771",
                "KU777",
                "KU778",
                "KU781",
                "KU783",
                "KU831",
                "KU832",
                "KU833",
                "KU834",
                "KU837",
                "KU844",
                "KU845",
                "KU846",
                "KU848",
                "KU849",
                "KU850",
                "KU851",
                "KU853",
                "KU857",
                "KU858",
                "KU859",
                "KU886",
                "KU887",
                "KU889",
                "KU890",
                "KU892",
                "KU893",
                "KU895",
                "KU785",
                "KU905",
                "KU908",
                "KU092",
                "KU915",
                "KU918",
                "KU921",
                "KU922",
                "KU924",
                "KU925",
                "KU927",
                "KU931",
                "KU934",
                "KU935",
                "KU936",
                "KU941",
                "KU946",
                "KU976",
                "KU977",
                "KU980",
                "KU981",
                "KU989",
                "KU992"
              ]
            }
          },
          {
            "code": "Pääasiallinen toiminta",
            "selection": {
              "filter": "item",
              "values": [dataCode]
            }
          },
          {
            "code": "Sukupuoli",
            "selection": {
              "filter": "item",
              "values": [
                "SSS"
              ]
            }
          },
          {
            "code": "Ikä",
            "selection": {
              "filter": "item",
              "values": [
                "18-64"
              ]
            }
          },
          {
            "code": "Vuosi",
            "selection": {
              "filter": "item",
              "values": 
              [year]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      }
      const res = await fetch ("https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/tyokay/statfin_tyokay_pxt_115b.px", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(JsonQuery)
    })
    if (!res.ok) {
        return
    }
    const data = await res.json()
    return data
}

// CREATING GLOBAL VARIABLES CAN BE DANGEROUS BUT IT MADE UPDATING THE MAP AND LAYER WHERE THE SLIDER IS CONNECTED MUCH EASIER
let map 
let employmentLayer

const initializeMap = (munData, regionsData, vehAgeData, apartmentPriceData, salaryData, emData, unemData) => {
    map = L.map('map', {
        minZoom: 3
    })

    // Initialize the base layers
    

    regVehGJSON = L.geoJSON(regionsData, {
        onEachFeature: (feature, layer) => getRegVehFeature(feature, layer, vehAgeData, salaryData),
        style: (feature) => vehStyle(feature, vehAgeData),
        weight: 2
    }).addTo(map)

    munApartGJSON = L.geoJSON(munData, {
        onEachFeature: (feature, layer) => getmunApartFeature(feature, layer, apartmentPriceData),
        style: (feature) => apartStyle(feature, apartmentPriceData),
    }).addTo(map)

    employmentLayer = L.geoJSON(munData, {
        onEachFeature: (feature, layer) => getEmploymentFeature(feature, layer, emData, unemData),
        style: (feature) => empStyle(feature, emData, unemData)
    }).addTo(map)

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "@ OpenStreetMap"
    }).addTo(map)

    let overlayMaps = {
        "Vehicle Age (Regions) 2023": regVehGJSON,
        "Apartment square price (2022)": munApartGJSON,
        "Employment ratio (18-64 years old)": employmentLayer
    }

    L.control.layers(overlayMaps).addTo(map)

    map.fitBounds(regVehGJSON.getBounds())
}

// Function to update the employment and unemployment layers
const updateMapData = async (munData, selectedYear) => {
    // Fetch new employment and unemployment data with the slider value year 
    const employmentData = await fetchEmploymentData("11", selectedYear)
    const unEmploymentData = await fetchEmploymentData("12", selectedYear)

    // Clear previous employment layer (here the global varibale is needed to access the employmentLayer)
    if (employmentLayer) {
        map.removeLayer(employmentLayer)
    }

    // Create a new employment layer with updated data
    employmentLayer = L.geoJSON(munData, {
        onEachFeature: (feature, layer) => getEmploymentFeature(feature, layer, employmentData, unEmploymentData),
        style: (feature) => empStyle(feature, employmentData, unEmploymentData)
    }).addTo(map)
}

// Main function to fetch data and initialize the map
const fetchData = async () => {
    // Fetch municipalities and regions data
    const munURL = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
    const response = await fetch(munURL)
    const munData = await response.json()

    const regionsURL = "https://geo.stat.fi/geoserver/tilastointialueet/wfs?request=GetFeature&service=WFS&version=2.0.0&outputFormat=json&typeNames=tilastointialueet:maakunta4500k&srsName=EPSG:4326";
    const regRes = await fetch(regionsURL)
    const regionsData = await regRes.json()

    // fetch other data
    const vehAgeData = await fetchVehicleData()
    const apartmentPriceData = await fetchApartmentPriceData()
    const salaryData = await fetchSalaryData()

    /* The slider is used to display employment data from selected year in the slider */
    // Initialize the map with default year (which is set to 2022)
    const defaultYear = slider.value

    let employmentData = await fetchEmploymentData("11", defaultYear)
    let unEmploymentData = await fetchEmploymentData("12", defaultYear)
    
    initializeMap(munData, regionsData, vehAgeData, apartmentPriceData, salaryData, employmentData, unEmploymentData)

    // Update the map data when the slider changes
    slider.addEventListener("input", async (e) => {
        const selectedYear = e.target.value
        output.textContent = selectedYear // Update displayed year
        await updateMapData(munData, selectedYear) // Update map with new data
    })
}

// Vehicle age data for regions
const getRegVehFeature = (feature, layer, vehAgeData, salaryData) => {
    //console.log(feature.properties.nimi)
    let regID = "MK" + feature.properties.maakunta

    const index = vehAgeData.dimension.Maakunta.category.index[regID]
    
    vehAge = vehAgeData.value[index]
    avgSalary = salaryData.value[index]
    //console.log(avgSalary)


    layer.bindPopup(`
        <ul>
            <li> Name: ${feature.properties.nimi} </li>
            <li> Average vehicle age: ${vehAge} y </li>
            <li> Average salary: ${avgSalary} €/month </li>

        </ul>
        
        `)

    layer.bindTooltip(feature.properties.nimi)
}

const vehStyle = (feature, vehAgeData) => {
    if (!feature.properties.name) return
    let regID = "MK" + feature.properties.maakunta
   
    const index = vehAgeData.dimension.Maakunta.category.index[regID]
    vehAge = vehAgeData.value[index]
    
    const hue = defineVeh (vehAge)
    return {
        color: `hsl(${hue}, 75%, 50%)`, fillOpacity: 0.5
    }
}

const defineVeh = (vehAge) => {
  /* Here we define the map colour for regions based on the average vehicle age in years. The younger the average is, the brighter green
    is visualised on top of the region */

    // if there is no data for the municipality (which is the case in some places) we set the hue value to null
    if (vehAge === null || vehAge === undefined) {
        return null 
    }
    if (vehAge < 11) {
        return 120
    } else if (vehAge < 13.5) {
        return 90
    } else if (vehAge < 13.6) {
        return 75
    } else if (vehAge < 14) {
        return 60
    } else if (vehAge < 14.3) {
        return 45
    } else if (vehAge < 15) {
        return 30
    } else {
        return 15
    }
}



// Apartment square price for municipalities
const getmunApartFeature = (feature, layer, apartData) => {
    
    let munID = feature.properties.kunta
    let index = apartData.dimension.Kunta.category.index[munID]
    let avgPrice = apartData.value[index]

    //console.log(munID)
    if (avgPrice === null || avgPrice === undefined) {
        layer.bindPopup(`
            <ul>
                <li> Name: ${feature.properties.name} </li>
                <li> Avg apartment square price (€/m^2): no data </li
               
    
            </ul>
            <a href="charts.html" id="navigation"> See additional charts </a>
            `)
    
        layer.bindTooltip(feature.properties.name)

    } else {
    layer.bindPopup(`
        <ul>
            <li> Name: ${feature.properties.name} </li>
            <li> Avg apartment square price (€/m^2): ${avgPrice} € </li
        </ul>

        <a href="charts.html" id="navigation"> See additional charts </a>
        `)

    // this was gotten with help of chatGPT, I wondered how I can pass the right municipalityID to the chart page
    layer.on('popupopen', () => {
        localStorage.setItem("selectedMunicipality", "KU" + munID)
    })
    }
    layer.bindTooltip(feature.properties.name)

}

const apartStyle = (feature, apartData) => {
    let munID = feature.properties.kunta
    let index = apartData.dimension.Kunta.category.index[munID]
    let avgPrice = apartData.value[index]
    const hue = defineApart (avgPrice)
    return {
        color: `hsl(${hue}, 75%, 50%)`, fillOpacity: 0.5
    }
    
}
const defineApart = (avgPrice) => {
  /* Here we define the color for the average price, the smaller price is visualised with brighter greener color */
    if (avgPrice === null || avgPrice === undefined) {
        return null
    }
    if (avgPrice < 700) {
        return 120
    } else if (avgPrice < 1200) {
        return 105
   
    } else if (avgPrice < 2000) {
        return 75
    } else if (avgPrice < 3000) {
        return 45
    } else if (avgPrice < 4000) {
        return 30
    } else if (avgPrice < 5000) {
        return 15
    } else {
        return 0
    }
}



const getEmploymentFeature = (feature, layer, emData, unemData) => {

    const munID = "KU" + feature.properties.kunta

    let index = emData.dimension.Alue.category.index[munID]

    let emTotal = emData.value[index]
    let unemTotal = unemData.value[index]

    layer.bindPopup(`
        <ul> 
        
        <li> Name: ${feature.properties.name} </li>
        <li> Employed: ${emTotal} </li>
        <li> Unemployed: ${unemTotal} </li>
        </ul>
        <a href="charts.html" id="navigation"> See additional charts </a>
        `)

    layer.on('popupopen', () => {
        localStorage.setItem("selectedMunicipality", munID)
    })
    layer.bindTooltip(feature.properties.name)

}



const empStyle = (feature, emData, unemData) => {
    const munID = "KU" + feature.properties.kunta

    let index = emData.dimension.Alue.category.index[munID]

    let emTotal = emData.value[index]
    let unemTotal = unemData.value[index]
   
    let employmentRatio = emTotal / unemTotal

    let hue = defineEmpRatio(employmentRatio)

    return{
        color: `hsl(${hue}, 75%, 50%)`, fillOpacity: 0.5
    }

}

const defineEmpRatio = (empRatio) => {
  /* Here we define the brightness and colour for the employment rate. If the rate is high (more employed compared to unemployed)
     the color is more bright greenish */
    if (empRatio > 15){
        return 120
    } else if(empRatio > 11) {
        return 90
    } else if (empRatio > 7) {
        return 60
    } else if( empRatio > 5){
        return 30
    } else {
        return 0
    }

}

fetchData()