// TODO rest of the code here

class ImageScroller {
    constructor(list, scrollInterval) {
        //console.log(list);
        this.list = list;
        this.scrollInterval = scrollInterval;
        this.initialize();
    }
    
    initialize() {
        this.imageCount = $(this.list).find('ol li').size();
        this.imageWidth = $(this.list).find('ol li img').width();
        console.log(this.imageWidth);
        
        this.currentItem = 0;
        this.automaticScroller = setInterval(() => this.scrollRight(), this.scrollInterval);
        $(this.list).find('.image-scroller-button[data-scroll-right]')
            .click(() => this.scrollRight(true));
        $(this.list).find('.image-scroller-button[data-scroll-left]')
            .click(() => this.scrollLeft(true));

        this.duplicateImagesHack();
    }

    duplicateImagesHack() {
        // HACK duplicate images 
        let ol = $(this.list).find('ol li');
        for (var i = 1; i <= 2 ; i++)
            for (var j = 0; j < this.imageCount; j++) {
                $(this.list).find('ol').append($("<li></li>")
                    .append($("<img></img>").attr('src', $(ol[j]).find('img').attr('src')))
                    .append($("<a></a>").html($(ol[j]).find('a').html())
                                                .attr('href', $(ol[j]).find('a').attr('href'))));
            }
    }

    scrollLeft() {
        clearInterval(this.automaticScroller);
        
        if (this.currentItem == 0) {
            let modified = '-=' + (this.imageCount * this.imageWidth) + 'px';
            $(this.list).find('ol').css({ left : modified }, { duration : 200 });
            this.currentItem += this.imageCount;
        }

        $(this.list).find('ol').animate({ left : '+=' + this.imageWidth + 'px' }, { duration : 200 });
        this.currentItem--;

        this.automaticScroller = setInterval(() => this.scrollRight(), this.scrollInterval);
    }
    
    scrollRight(forced) {
        if (forced)
            clearInterval(this.automaticScroller);
        
        if (this.currentItem == this.imageCount * 3 - 1) { 
            let modified = '+=' + (this.imageCount * this.imageWidth) + 'px';
            $(this.list).find('ol').css({ left: modified });
            this.currentItem -= this.imageCount;
        }
        
        $(this.list).find('ol').animate({ left: '-=' + this.imageWidth + 'px' }, { duration : 200 });
        this.currentItem++;
        
        if (forced)
            this.automaticScroller = setInterval(() => this.scrollRight(), this.scrollInterval);
    }
}


$(document).ready(function() {
    var x = new ImageScroller($('.image-scroller'), 3000);
});