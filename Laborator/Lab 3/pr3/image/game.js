var imageList = [
    '../../extra/berinde.jpg',
    '../../extra/blaga.jpg',
    '../../extra/bufny.jpg',
    '../../extra/gabi.jpg',
    '../../extra/istvan.jpg',
    '../../extra/modoi.jpg',
]

var game = {
    "mistakes" : 0,
    "mistakeText" : undefined,
    "completed" : 0,
    "tableWidth" : 4,
    "tableHeight" : 3,
    "mode" : "image",
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
        let configuration = this.prepareShuffle();
        this.table = new Array(this.tableHeight)
        for (i = 0; i < this.tableHeight; i++) {
            this.table[i] = new Array(this.tableWidth);

            for (j = 0; j < this.tableWidth; j++) {
                this.table[i][j] = gameElement.create(this.mode, configuration.shift());
                this.hideElementAfterTimeout(this.table, i, j);
            }
        }

        let mistakeText = document.createElement('p');
        mistakeText.setAttribute("id", "game-mistake-text");
        document.getElementById('game-grid').parentElement.appendChild(mistakeText);
    },

    "hideElementAfterTimeout" : function(table, i, j) {
        setTimeout(() => gameElement.hide(table[i][j]), 2000);
    },

    "updateStatus" : function(isProgress) {
        console.log('Progressing');
        if (isProgress) {
            this.completed += 2;
            if (this.completed == this.tableHeight * this.tableWidth) {
                alert('Felicitari! Ati terminat jocul.\nGreseli: ' + this.mistakes);
            }
        } else {
            this.mistakes++;
            document.getElementById('game-mistake-text').innerHTML = "Greseli: " + this.mistakes;
        }
    }
};

var gameElement = {
    "selected" : undefined,
    "mode" : undefined,

    "create" : function(mode, input) {
        let grid = document.getElementById('game-grid');
        let container = document.createElement('div');
        let content;
    
        switch(mode) {
            case "text": content = makeText(input); break;
            case "image": content = makeImage(input); break;
            default: break;
        }

        container.onclick = gameElement.onClick;
        container.appendChild(content);
        grid.appendChild(container);
    
        return container;
    },

    "onClick" : function() {
        console.log('Works');

        let ge = gameElement;
        let clicked = event.target;
        gameElement.show(clicked);
        clicked.onclick = undefined;

        if (ge.selected) {
            if (ge.contentEqual(clicked, ge.selected)) {
                // solved;
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
        c1 = a.children[0];
        c2 = b.children[0];
        switch(game.mode) {
        case "text":    return c1.innerHTML == c2.innerHTML;
        case "image":   return c1.src == c2.src;
        };
    },

    "cancelSelections" : function(e1, e2) {
        setTimeout(() => {
            gameElement.hide(e1);
            gameElement.hide(e2);
            e2.onclick = gameElement.onClick;
            e1.onclick = gameElement.onClick;
            
        }, 2000);
    },

    "show" : function(element) {
        element.children[0].style.display = "table-cell";
    },

    "hide" : function(element) {
        element.children[0].style.display = "none";
    }
}

function makeText(input) {
    let text = document.createElement('p');
    text.innerHTML = input;
    return text;
}

function makeImage(url) {
    let image = document.createElement('img');
    image.src = url;
    return image;
}
