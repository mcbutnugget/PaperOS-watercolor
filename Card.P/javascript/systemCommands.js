
window.POSH = {
    FileSys:{
        //files
        readFile:function(path){
            const pathElements = path.replace(/\\$|\/$/, "").split(/\\|\//);
            let currentLocation = window.computator;
          
            for (const element of pathElements) {
              if (element === "..") {
                currentLocation = currentLocation[0][1]; // Go back one level
              } else {
                const item = currentLocation.find((item) => item[0] === element);
          
                if (!item) {
                 // $('#shellData').append(`<h4 class = 'error'>File "${element}" in path "${path}" does not exist.</h4>`);
                  return null;
                }
          
                if (Array.isArray(item[1])) {
                  // If it's a folder, update the current location
                  currentLocation = item[1];
                } else {
                  // It's a file, check if it's the last element in the path
                  if (element === pathElements[pathElements.length - 1]) {
                    return item[1]; // Return the file data
                  } else {
                  //  $('#shellData').append(`<h4 class = 'error'>File "${element}" in path "${path}" is not a folder.</h4>`);
                    return null;
                  }
                }
              }
            }
        },
        createFile:function(path,fileName){
            if(this.readFile(path+"/"+fileName)!=null){
                this.writeFile(path+"/"+fileName,"");
            }else if(!/\/|\\|\*|\?|\||\"|\>|\<|\:/.test(fileName)){
                const pathElements = path.replace(/\\$|\/$/, "").split(/\\|\//);
                let currentLocation = window.computator;
              
                for (const element of pathElements) {
                  const folder = currentLocation.find((item) => item[0] === element && Array.isArray(item[1]));
                  if (!folder) {
              
                    $('#shellData').append(`<h4 class = 'error'>folder "${path}" does not exist or is not a folder, try a different folder or create a new one.</h4>`);
                    return;
                  }
                  currentLocation = folder[1];
                }
              
                currentLocation.push([fileName, ``]);
                  sortNestedLists(window.computator);
            }else{
                console.error("cannot create folder with '/ \\ \" * > < : or ?");
                return null;
            }
        },
        deleteFile:function(path, fileName){
            const pathElements = path.replace(/\\$|\/$/, "").split(/\\|\//);
            let currentLocation = window.computator;
          
            for (const element of pathElements) {
              const folder = currentLocation.find((item) => item[0] === element && Array.isArray(item[1]));
              if (!folder) {
                console.error(`Folder "${element}" in path "${path}" does not exist.`);
                return;
              }
              currentLocation = folder[1];
            }
          
            const index = currentLocation.findIndex((item) => item[0] === fileName && !Array.isArray(item[1]));
            if (index !== -1) {
              currentLocation.splice(index, 1);
            } else {
              console.error(`File "${fileName}" in path "${path}" does not exist.`);
            }
              sortNestedLists(window.computator);
        },
        writeFile:function(path,data){
            const pathElements = path.replace(/\\$|\/$/, "").split(/\\|\//);
            let currentLocation = computator;
          
            for (const element of pathElements) {
              if (element === "..") {
                currentLocation = currentLocation[0][1]; // Go back one level
              } else {
                const item = currentLocation.find((item) => item[0] === element);
          
                if (!item) {
                  console.error(`File "${element}" in path "${path}" does not exist.`);
                  return;
                }
          
                if (Array.isArray(item[1])) {
                  // If it's a folder, update the current location
                  currentLocation = item[1];
                } else {
                  // It's a file, check if it's the last element in the path
                  if (element === pathElements[pathElements.length - 1]) {
                    item[1] = data; // Update the file content
                    localStorage.setItem("computator", JSON.stringify(computator)); // Save the updated computator to localStorage
                    return;
                  } else {
                    return;
                  }
                }
              }
            }
          
            console.error(`Path "${path}" does not point to a file.`);
        },
        //folders
        readFolder:function(path){
            const pathElements = path.replace(/\\$|\/$/, "").split(/\\|\//);
            let currentLocation = window.computator;
            for (const element of pathElements) {
                const folder = currentLocation.find((item) => item[0] === element && Array.isArray(item[1]));
                if (!folder) {
                    return null;
                }
            currentLocation = folder[1];
        }
      
        return currentLocation;
        },
        createFolder:function(path, folderName){
            console.log(this.readFolder(path.replace(/\\$|\/$/, "")+"/"+folderName));
            if(this.readFolder(path.replace(/\\$|\/$/, "")+"/"+folderName)!=null){
                console.error("cannot create "+folderName+" folder, allready exists");
            }else if(!/\/|\\|\*|\?|\||\"|\>|\<|\:/.test(folderName)){
            const pathElements = path.replace(/\\$|\/$/, "").split(/\\|\//);
            let currentLocation = window.computator;
          
            for (const element of pathElements) {
              const folder = currentLocation.find((item) => item[0] === element && Array.isArray(item[1]));
              if (!folder) {
                console.error(`Folder "${element}" in path "${path}" does not exist.`);
                return;
              }
              currentLocation = folder[1];
            }
          
            const newFolder = [folderName, [["..", []]]];
            currentLocation.push(newFolder);
            sortNestedLists(window.computator);
        }else{
            console.error("cannot create folder with '/ \\ \" * > < : or ?");
            return null;
        }
        },
        deleteFolder:function(path, folderName){
            const pathElements = path.replace(/\\$|\/$/, "").split(/\\|\//)
            let currentLocation = window.computator;
          
            for (const element of pathElements) {
              const folder = currentLocation.find((item) => item[0] === element && Array.isArray(item[1]));
              if (!folder) {
                console.error(`Folder "${element}" in path "${path}" does not exist.`);
                return;
              }
              currentLocation = folder[1];
            }
          
            const index = currentLocation.findIndex((item) => item[0] === folderName && Array.isArray(item[1]));
            if (index !== -1) {
              currentLocation.splice(index, 1);
            } else {
              console.error(`Folder "${folderName}" in path "${path}" does not exist.`);
            }
              sortNestedLists(window.computator);
        }
    },

    say:function(text, x, y) {
        var formattedText = String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\n/g, '<br>');
    
        var content = "<h4 class='user_disp'>" + formattedText + "</h4>";
    
        if (y !== undefined) {
            content = "<h4 class='user_disp' style = 'left:0; top:0; position: absolute;'>" +
                      "\n".repeat(Math.max(0, y)) +
                      " ".repeat(Math.max(0, x)) +
                      formattedText +
                      "</h4>";
        } else {
            content += "<br>";
        }
    
        $('#console').append(content);
    },
        clear:function(){
            document.getElementById("console").innerHTML = "";
        },
        pause:async function pause(amount) {
      return new Promise((resolve) => {
        forPause = setInterval(resolve, amount);
      });
    },
        setColor: function(object, color, allText) {
            if (object && object === "text") {
              if (color) {
                var userDisps = document.getElementsByClassName("user_disp");
                var startIndex = allText ? 0 : userDisps.length - 1;
          
                for (var i = startIndex; i < userDisps.length; i++) {
                  userDisps[i].style.color = color;
                }
              } else {
                $('#console').append("<br><h4 class='error'>ERR:color has not been set</h4>");
              }
            } else if (object && object === "background") {
              if (color) {
                document.querySelector("body").style.backgroundColor = color;
              } else {
                $('#console').append("<br><h4 class='error'>ERR:color has not been set</h4>");
              }
            }
          },
          Graphics:{
            enableGraphicsMode:function(){
            $('#console').append("<canvas id='graphics'width="+$(document).width()+" height="+$(document).height()+"></canvas><br>");
            disp=document.getElementById("graphics");
            graphx=disp.getContext("2d");
          },
          drawRect:function(x,y,w,h,color,lineW){
            graphx.beginPath();
            if(lineW){
              graphx.lineWidth=lineW;
            }
            if(color){
              graphx.strokeStyle = color;
            }else{
              graphx.strokeStyle = "#00ff00";
            }
            graphx.rect(x,y,w,h);
            graphx.stroke();
          },
          drawPolygon: function(xArr, yArr, numVertices, fill, border, rotationAngle, rotationCenterX, rotationCenterY) {
            if (numVertices < 3) {
              POSH.say("A polygon must have at least 3 vertices.");
              return;
            }
          
            rotationAngle = rotationAngle || 0;
          
            
            rotationCenterX = rotationCenterX || xArr.reduce((acc, cur) => acc + cur, 0) / numVertices;
            rotationCenterY = rotationCenterY || yArr.reduce((acc, cur) => acc + cur, 0) / numVertices;
          
            window.rotatedXArr = [];
            window.rotatedYArr = [];
            for (let i = 0; i < numVertices; i++) {
              window.x = xArr[i];
              window.y = yArr[i];
              window.rotatedX =
                rotationCenterX +
                (x - rotationCenterX) * Math.cos(rotationAngle) -
                (y - rotationCenterY) * Math.sin(rotationAngle);
              window.rotatedY =
                rotationCenterY +
                (x - rotationCenterX) * Math.sin(rotationAngle) +
                (y - rotationCenterY) * Math.cos(rotationAngle);
              rotatedXArr.push(rotatedX);
              rotatedYArr.push(rotatedY);
            }
          
            graphx.beginPath();
            graphx.moveTo(rotatedXArr[0], rotatedYArr[0]);
          
            for (let i = 1; i < numVertices; i++) {
              graphx.lineTo(rotatedXArr[i], rotatedYArr[i]);
            }
          
            graphx.closePath();
          
            graphx.fillStyle = fill;
            graphx.fill();
          
            graphx.strokeStyle = border;
            graphx.lineWidth = 2;
            graphx.stroke();
          }
        },Mouse:{
          X:function(){
            var x;
            document.addEventListener("mousemove",(event) =>{
              x = event.pageX;
            });
            return x;
          },
          Y:function(event){
            return event.clientY;
          },
          click:function(event){
            return event.button;
          }
        },
        Beep:function(freq, duration, vol, typeOf) {
      var context = new(window.AudioContext || window.webkitAudioContext);
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.linearRampToValueAtTime(1, context.currentTime + 0.002);
      oscillator.connect(gain);
      oscillator.frequency.value = freq;
      oscillator.type = typeOf;
      gain.connect(context.destination);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration * .001);
      oscillator.onended = () => context.close();
    }
  }