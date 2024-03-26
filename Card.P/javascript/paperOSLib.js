window.paperOS = {
    card: class{
        titlebar = false;
        xpos;
        ypos;
        width;
        height;
        resizable = false;
        draggable = false;
        backgroundCol;
        backgroundImg = "none";
        inside = {};

        constructor(){
            this.element = document.createElement("p-card");
            this.element.titlebar = this.titlebar;
            this.element.style.left = this.xpos;
            this.element.style.top = this.ypos;
            this.element.style.width = this.width;
            this.element.style.height = this.height;
            this.element.resizable = this.resizable;
            this.element.draggable = this.draggable;
            this.element.backgroundCol = this.backgroundCol;
        }
        
    },
    text: class{
        text = "";
        size = "10pt";
        font = "p/assets/PaperOS_keyAssets/fonts/noto-sans.ttf";
    }
}

var x = new paperOS.card();
//creates a window with titlebar settings and stuff
x.title = true;
x.xpos = 50;
x.ypos = 40;
x.width = 400;
x.height = 250;
x.resizable = true;
x.draggable = true;
//creates a button (which is actually a window) with no titlebar settings and is just a window styled like a button,
x.inside.button = new paperOS.card();
//set's where the button is to x.inside.button. which is the window
var button = x.inside.button;
//set's the background color to transparent
button.backgroundCol = "transparent";
//set's the background image to the location of p/sys/assets/images/button1.png
button.backgroundImg = "p/sys/assets/PaperOS_keyAssets/images/button1.png";
//creates a thing inside of there called "text" with "hello world!" inside of it instead of another window.
button.inside.text = new paperOS.text();
var buttonText = button.inside.text;
buttonText.text = "hello world!";
buttonText.size = "20pt";
buttonText.font = "p/sys/assets/PaperOS_keyAssets/fonts/paper8-mono.ttf";
