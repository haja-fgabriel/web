var sortableTable = {
    "parameters" : new Array(),
    "lastClicked" : undefined,

    "updateColumns" : function(clickedColumn) {
        let st = sortableTable;
        if (st.lastClicked != clickedColumn) 
            $(st.lastClicked).attr("data-sorting-order", "none");

        st.lastClicked = clickedColumn;

        $(clickedColumn).attr("data-sorting-order", (i, originalValue) => {
            return originalValue == 'ascending' ? 'descending' : 'ascending';
        }); 
    },

    "onColumnClick" : function() {       
        sortableTable.updateColumns(this);

        console.log($(this).attr("data-sorting-order"));
        sortableTable.sortRows($(this).attr("data-sorting-order"), $(this).text());
    },

    "sortRows" : function(order, field) {
        let rows = $('tr:nth-child(n+1)');
        let sorted = new Array($(rows[0].children).size() - 1);

        for (i = 1; i < $(rows[0].children).size(); i++) {
            sorted[i-1] = {};
            for (j = 0; j < sortableTable.parameters.length; j++) {
                let param = sortableTable.parameters[j];
                sorted[i-1][param] = $(rows[j].children[i]).text();
            }
        }

        sorted.sort(order == 'ascending' ?
        (a, b) => a[field].localeCompare(b[field]) :
        (a, b) => b[field].localeCompare(a[field]));

        for (i = 1; i < $(rows[0].children).size(); i++) {
            for (j = 0; j < sortableTable.parameters.length; j++) {        
                let param = sortableTable.parameters[j];
                $(rows[j].children[i]).text(sorted[i-1][param]);
            }
        }
    }
}


$(document).ready(function() {
    let params = $('.sorting-parameter');
    for (i = 0; i < params.size(); i++) {
        sortableTable.parameters.push($(params[i]).html());
    }

    $('th').attr("data-sorting-order", "none")
        .click(sortableTable.onColumnClick);
});