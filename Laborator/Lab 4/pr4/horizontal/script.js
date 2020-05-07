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
        let rows = $('tr:nth-child(n+2)');
        let sorted = new Array(rows.size());

        for (i = 0; i < rows.size(); i++) {
            sorted[i] = {};
            for (j = 0; j < sortableTable.parameters.length; j++) {
                let param = sortableTable.parameters[j];
                sorted[i][param] = $(rows[i].children[j]).text();
            }
        }

        sorted.sort(order == 'ascending' ?
        (a, b) => a[field].localeCompare(b[field]) :
        (a, b) => b[field].localeCompare(a[field]));

        for (i = 0; i < rows.size(); i++) {
            for (j = 0; j < sortableTable.parameters.length; j++) {        
                let param = sortableTable.parameters[j];
                $(rows[i].children[j]).text(sorted[i][param]);
            }
        }
    }
}


$(document).ready(function() {
    let params = $('.sorting-parameter');
    for (i = 0; i < params.size(); i++) {
        sortableTable.parameters.push($(params[i]).html());
    }

    //sortableTable.parameters = 
    $('th').attr("data-sorting-order", "none")
        .click(sortableTable.onColumnClick);
});