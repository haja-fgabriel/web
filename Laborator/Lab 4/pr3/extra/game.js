var imageList = [
    '../extra/berinde.jpg',
    '../extra/blaga.jpg',
    '../extra/bufny.jpg',
    '../extra/gabi.jpg',
    '../extra/istvan.jpg',
    '../extra/modoi.jpg',
]

var game = {
    "mistakes" : 0,
    "completed" : 0,
    "tableWidth" : 4,
    "tableHeight" : 3,
    "mode" : undefined,
    "table" : undefined,

    "appendToShufflingArray" : function(result, i) {
        switch(this.mode) { 
        case "text":    
            let x = Math.floor(Math.random() * 10 * i);
            result.push(x); 
            result.push(x); 
            break;
        case "image":  
            result.push(imageList[i]); 
            result.push(imageList[i]); 
            break;
        }
    },

    "prepareShuffle" : function() {
        let result = [];
        let size = this.tableWidth * this.tableHeight;
        let x = Math.floor(Math.random() * size);
        let i, j, aux;

        for (i = 0; i < size/2; i++) {
            this.appendToShufflingArray(result, i);
        }

        for (i = size - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i+1));
            aux = result[i];
            result[i] = result[j];
            result[j] = aux;
        }

        return result;
    },

    "load" : function() {
        this.mode = $('#game-grid').attr("data-game-type");

        let configuration = this.prepareShuffle();
        this.table = new Array(this.tableHeight);

        for (i = 0; i < this.tableHeight; i++) {
            this.table[i] = new Array(this.tableWidth);

            for (j = 0; j < this.tableWidth; j++) {
                this.table[i][j] = gameElement.create(this.mode, configuration.shift());
                
                ((elem) => setTimeout(() => 
                    $(elem).children().hide(), 2000)
                )(this.table[i][j]);
            }
        }

        $('#game-grid').parent().append(
            $('<p></p>').attr("id", "game-mistake-text")
        );
    },

    "updateStatus" : function(isProgress) {
        if (isProgress) {
            this.completed += 2;
            if (this.completed == this.tableHeight * this.tableWidth) {
                alert('Felicitari! Ati terminat jocul.\nGreseli: ' + this.mistakes);
            }
        } else {
            this.mistakes++;
            $('#game-mistake-text').html("Greseli: " + this.mistakes);
        }
    }
};

var gameElement = {
    "selected" : undefined,

    "create" : function(mode, input) {
        let element = $('<div></div>')
            .append(
                mode == "text" ?
                    $('<p></p>').text(input) :
                    $('<img></img>').attr("src", input)
            )
            .click(gameElement.onClick);
        $("#game-grid").append(element);
        return element;
    },

    "onClick" : function() {
        let ge = gameElement;
        
        let clicked = $(this);
        clicked.off('click')
            .children().show();

        if (ge.selected) {
            if (ge.contentEqual(clicked, ge.selected)) {
                // found matches
                game.updateStatus(true);

            } else {
                ge.cancelSelections(ge.selected, clicked);
                game.updateStatus(false);
            }
            ge.selected = undefined;
        }
        else 
            ge.selected = clicked;
        
    },

    "contentEqual" : function(a, b) {
        c1 = $(a).children();
        c2 = $(b).children();
        return game.mode == "text" ?
            $(c1).html() == $(c2).html() :
            $(c1).attr("src") == $(c2).attr("src");
    },

    "cancelSelections" : function(e1, e2) {
        setTimeout(() => {
            $(e1).click(gameElement.onClick)
                .children().hide();
            $(e2).click(gameElement.onClick)
                .children().hide();
        }, 2000);
    }
}