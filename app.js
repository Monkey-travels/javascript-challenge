// from data.js
var tableData = data;

// Get table references or get all attributes tbody
// that I target
var tbody = d3.select("tbody");


function buildTable(data) {
    // First clear out any existing data
    tbody.html("");

    // Next loop through each object in the data
    // Append a row and cell for each value in the row

    data.forEach(function(dataRow) {
        // Append a row to the table body
        var row = tbody.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell

        Object.values(dataRow).forEach(function(val) {
            var cell = row.append("td");
            cell.text(val);
        })
    })
}


// Keep Track of all filters
var filters = {};

function filterTable() {
    // Set the filtereData to tableData
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that matches the filter values
    Object.entries(filters).forEach(function([key, value]) {
        filteredData = filteredData.filter((row) => row[key] === value);
    })

    buildTable(filteredData);
}

function updateFilters(){
    // Save the elements, values and id of the filter that was changed
    var changeElement = d3.select(this).select("input");
    var elementValue = changeElement.property("value");
    var filterId = changeElement.attr("id");

    // If a filter value was entered then add that filterId and value
    // to the filter list. Otherwise, clear that filter from the filter itselt


    if(elementValue) {
        filters[filterId] = elementValue;
    }
    else {
        delete filters[filterId];
    }

    // Call function to apply all filters and rebuild table
    // To do create a filterTable function
    filterTable()
}

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);


// Build the table when the page loads
buildTable(tableData);

