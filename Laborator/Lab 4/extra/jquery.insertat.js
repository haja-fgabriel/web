/*
 *  Avem nevoie de aceasta functie deoarece jQuery nu o are gata implementata,
 *  in timp ce libraria de DOM din JavaScript o are.
 */
jQuery.fn.insertAt = function(index, element) {
    var lastIndex = this.children().size();
    if (index < 0) {
        index = Math.max(0, lastIndex + 1 + index);
    }
    this.append(element);
    if (index < lastIndex) {
        this.children().eq(index).before(this.children().last());
    }
    return this;
}