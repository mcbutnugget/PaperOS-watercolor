class card extends HTMLElement {
    constructor() {
        super();
        // Your initialization code goes here
        if (this.titlebar === 'true') {
            const titleBar = $('<div class = "titlebar">'+this.name+'<div class="controls" style="float:right;"><button class="windowButton minimize"><span class="material-symbols-rounded">minimize</span></button>'+(this.resizable ? '<button class="windowButton fullscreen"><span class="material-symbols-rounded">fullscreen</span></button>' : '')+'<button class="windowButton close"><span class="material-symbols-rounded">close</span></button></div></div>');
            

            // Append the name bar to the custom card
            $(this).append(titleBar);

            titleBar.css({
                'background-color':'rgb(99,99,122)',
                'position':'absolute',
                'width':'100%',
                'height':'9mm',
                'top':'0'
            });
            $(document).on('mousedown', '.titlebar', function (e) {
                e.preventDefault();
                const handle = $(this);
                const initialX = e.clientX;
                const initialY = e.clientY;
                const initialLeft = parseFloat(handle.closest('p-card').css('left'));
                const initialTop = parseFloat(handle.closest('p-card').css('top'));
            
                $(document).on('mousemove', function (e) {
                    const deltaX = e.clientX - initialX;
                    const deltaY = e.clientY - initialY;
            
                    // Update the position of the draggable element
                    handle.closest('p-card').css('left', initialLeft + deltaX + 'px');
                    handle.closest('p-card').css('top', initialTop + deltaY + 'px');
                });
            
                $(document).on('mouseup', function () {
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                });
            });
        }
        if(this.width){
            this.style.width = this.width;
        }
        if(this.height){
            this.style.height = this.height;
        }
        if(this.Xpos){
            this.style.x = this.Xpos;
        }
        if(this.Ypos){
            this.style.y = this.Ypos;
        }
        if (this.getAttribute('resizable') === 'true') {
            // Create resizable handles in all corners and edges
            const handles = $(
                '<div class="resize-handle top-left"></div>' +
                '<div class="resize-handle top-right"></div>' +
                '<div class="resize-handle bottom-left"></div>' +
                '<div class="resize-handle bottom-right"></div>' +
                '<div class="resize-handle top"></div>' +
                '<div class="resize-handle bottom"></div>' +
                '<div class="resize-handle left"></div>' +
                '<div class="resize-handle right"></div>'
            );

            $(this).append(handles);

            handles.css({
                'position': 'absolute',
                'width': '100%',
                'height': '100%',
                'background-color': 'transperent',
                'z-index': '1000'
            });

            $('.resize-handle.top-left').css({ 'top': '0', 'left': '0', 'cursor': 'nwse-resize', 'height':'10px', 'width':'10px' });
            $('.resize-handle.top-right').css({ 'top': '0', 'right': '0', 'cursor': 'nesw-resize', 'height':'10px', 'width':'10px' });
            $('.resize-handle.bottom-left').css({ 'bottom': '0', 'left': '0', 'cursor': 'nesw-resize', 'height':'10px', 'width':'10px' });
            $('.resize-handle.bottom-right').css({ 'bottom': '0', 'right': '0', 'cursor': 'nwse-resize', 'height':'10px', 'width':'10px' });
            $('.resize-handle.top').css({ 'top': '0', 'left': '50%', 'transform': 'translateX(-50%)', 'cursor': 'ns-resize', 'height': '5px', 'z-index':String(this.style.zIndex) });
            $('.resize-handle.bottom').css({ 'bottom': '0', 'left': '50%', 'transform': 'translateX(-50%)', 'cursor': 'ns-resize', 'height': '5px', 'z-index':String(this.style.zIndex) });
            $('.resize-handle.left').css({ 'top': '50%', 'left': '0', 'transform': 'translateY(-50%)', 'cursor': 'ew-resize', 'width': '5px', 'z-index':String(this.style.zIndex) });
            $('.resize-handle.right').css({ 'top': '50%', 'right': '0', 'transform': 'translateY(-50%)', 'cursor': 'ew-resize', 'width': '5px', 'z-index':String(this.style.zIndex) });
        }
        $(document).on('mousedown', '.resize-handle', function (e) {
            e.preventDefault();
            const handle = $(this);
            const initialX = e.clientX;
            const initialY = e.clientY;
            const initialWidth = $(this).closest('p-card').width();
            const initialHeight = $(this).closest('p-card').height();
    
            $(document).on('mousemove', function (e) {
                const deltaX = e.clientX - initialX;
                const deltaY = e.clientY - initialY;
                //console.log(initialWidth);
                if (handle.hasClass('top')) {
                    if(Number(String($(handle).closest('p-card').css('height')).replace("px",""))+initialHeight - deltaY-101<=101){
                        $(handle).closest('p-card').css('height', 101 + 'px');
                        $(handle).closest('p-card').css('top', $(handle).closest('p-card').css('top') + 'px');
                    }else{
                        $(handle).closest('p-card').css('height', initialHeight - deltaY + 'px');
                        $(handle).closest('p-card').css('top', initialY + deltaY + 'px');
                    }
                } else if (handle.hasClass('bottom')) {
                    if(Number(String($(handle).closest('p-card').css('height')).replace("px",""))+initialHeight + deltaY-101<=101){
                        $(handle).closest('p-card').css('height', 101 + 'px');
                    }else{
                        $(handle).closest('p-card').css('height', initialHeight + deltaY + 'px');
                    }
                }
                if (handle.hasClass('left')) {
                    if(Number(String($(handle).closest('p-card').css('width')).replace("px",""))+initialWidth - deltaX-101<=101){
                        $(handle).closest('p-card').css('width', 101 + 'px');
                        $(handle).closest('p-card').css('left', $(handle).closest('p-card').css('width') + 'px');
                    }else{
                        $(handle).closest('p-card').css('width', initialWidth - deltaX + 'px');
                        $(handle).closest('p-card').css('left', initialX + deltaX + 'px');
                    }
                } else if (handle.hasClass('right')) {
                    if(Number(String($(handle).closest('p-card').css('width')).replace("px",""))+initialWidth + deltaX-101<=101){
                        $(handle).closest('p-card').css('width', 101 + 'px');
                    }else{
                        $(handle).closest('p-card').css('width', initialWidth + deltaX + 'px');
                    }
                }

                if(handle.hasClass('bottom-right')){
                    if(Number(String($(handle).closest('p-card').css('height')).replace("px",""))+initialHeight + deltaY-101<=101){
                        $(handle).closest('p-card').css('height', 101 + 'px');
                    }else{
                        $(handle).closest('p-card').css('height', initialHeight + deltaY + 'px');
                    }
                    if(Number(String($(handle).closest('p-card').css('width')).replace("px",""))+initialWidth + deltaX-101<=101){
                        $(handle).closest('p-card').css('width', 101 + 'px');
                    }else{
                        $(handle).closest('p-card').css('width', initialWidth + deltaX + 'px');
                    }
                }
                if(handle.hasClass('bottom-left')){
                    if(Number(String($(handle).closest('p-card').css('height')).replace("px",""))+initialHeight + deltaY-101<=101){
                        $(handle).closest('p-card').css('height', 101 + 'px');
                    }else{
                        $(handle).closest('p-card').css('height', initialHeight + deltaY + 'px');
                    }
                    if(Number(String($(handle).closest('p-card').css('width')).replace("px",""))+initialWidth - deltaX-101<=101){
                        $(handle).closest('p-card').css('width', 101 + 'px');
                        $(handle).closest('p-card').css('left', $(handle).closest('p-card').css('width') + 'px');
                    }else{
                        $(handle).closest('p-card').css('width', initialWidth - deltaX + 'px');
                        $(handle).closest('p-card').css('left', initialX + deltaX + 'px');
                    }
                }
                if(handle.hasClass('top-right')){
                    if(Number(String($(handle).closest('p-card').css('height')).replace("px",""))+initialHeight - deltaY-101<=101){
                        $(handle).closest('p-card').css('height', 101 + 'px');
                        $(handle).closest('p-card').css('top', $(handle).closest('p-card').css('top') + 'px');
                    }else{
                        $(handle).closest('p-card').css('height', initialHeight - deltaY + 'px');
                        $(handle).closest('p-card').css('top', initialY + deltaY + 'px');
                    }
                    if(Number(String($(handle).closest('p-card').css('width')).replace("px",""))+initialWidth + deltaX-101<=101){
                        $(handle).closest('p-card').css('width', 101 + 'px');
                    }else{
                        $(handle).closest('p-card').css('width', initialWidth + deltaX + 'px');
                    }
                }
                if(handle.hasClass('top-left')){
                    if(Number(String($(handle).closest('p-card').css('height')).replace("px",""))+initialHeight - deltaY-101<=101){
                        $(handle).closest('p-card').css('height', 101 + 'px');
                        $(handle).closest('p-card').css('top', $(handle).closest('p-card').css('top') + 'px');
                    }else{
                        $(handle).closest('p-card').css('height', initialHeight - deltaY + 'px');
                        $(handle).closest('p-card').css('top', initialY + deltaY + 'px');
                    }
                    if(Number(String($(handle).closest('p-card').css('width')).replace("px",""))+initialWidth - deltaX-101<=101){
                        $(handle).closest('p-card').css('width', 101 + 'px');
                        $(handle).closest('p-card').css('left', $(handle).closest('p-card').css('width') + 'px');
                    }else{
                        $(handle).closest('p-card').css('width', initialWidth - deltaX + 'px');
                        $(handle).closest('p-card').css('left', initialX + deltaX + 'px');
                    }
                }
            });
    
            $(document).on('mouseup', function () {
                $(document).off('mousemove');
                $(document).off('mouseup');
            });
        });
    }

    get titlebar() {
        return this.getAttribute('titlebar');
    }

    set titlebar(value) {
        this.setAttribute('titlebar', value);
    }
    get width() {
        return this.getAttribute('width');
    }
    set width(value) {
        this.setAttribute('width', value);
    }
    get height() {
        return this.getAttribute('height');
    }

    set height(value) {
        this.setAttribute('height', value);
    }
    get Xpos() {
        return this.getAttribute('x-pos');
    }

    set Xpos(value) {
        this.setAttribute('x-pos', value);
    }
    get Ypos() {
        return this.getAttribute('y-pos');
    }

    set Ypos(value) {
        this.setAttribute('y-pos', value);
    }
    get name() {
        return this.getAttribute('name');
    }

    set name(value) {
        this.setAttribute('name', value);
    }
    get resizable() {
        return this.getAttribute('resizable');
    }

    set resizable(value) {
        this.setAttribute('resizable', value);
    }
}
customElements.define("p-card", card);
var data = {
    tools:{
        resizable:false,
        minimizable:false,
        draggable:false,
        fullscreen:false,
        logo:false,
        name:false
    },
    display:{
        bgcol:"rgba(255,255,255,1)",
        transform:{
            xpos:0,
            ypos:0,
            zind:0,
            width:500,
            height:250
        }
}

}

