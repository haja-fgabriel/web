var lastClicked;

var leftPicker = {
    "reference" : "",
    "clickNumbers" : 0,
    "onClick" : function() {
        if (lastClicked != this)
            this.clickNumbers = 0;
        this.clickNumbers++;
        if (this.clickNumbers == 2) {
            this.clickNumbers = 0;
            leftPicker.moveOption(this);
        }
        lastClicked = this;
    },
    "moveOption" : function(ref) {
        for (i = 0; i < ref.children.length; i++) {
            if (ref.children[i].selected == true) {
                rightPicker.reference.insertBefore(ref.children[i], 
                    rightPicker.reference.children[i]);
                break;
            }
        }
    }
};

var rightPicker = {
    "reference" : "",
    "clickNumbers" : 0,
    "onClick" : function() {
        if (lastClicked != this)
            this.clickNumbers = 0;
        this.clickNumbers++;
        if (this.clickNumbers == 2) {
            this.clickNumbers = 0;
            rightPicker.moveOption(this);
        }
        lastClicked = this;
    },
    "moveOption" : function(ref) {
        for (i = 0; i < ref.children.length; i++) {
            if (ref.children[i].selected == true) {
                leftPicker.reference.insertBefore(ref.children[i],
                    leftPicker.reference.children[i]);
                break;
            }
        }
    }
};


function onLoad() {
    leftPicker.reference = document.getElementsByClassName("player-picker")[0];
    rightPicker.reference = document.getElementsByClassName("player-picker")[1];
    // debugger;

    leftPicker.reference.addEventListener("click", leftPicker.onClick);
    rightPicker.reference.addEventListener("click", rightPicker.onClick);
}