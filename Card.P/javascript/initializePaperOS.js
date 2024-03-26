
function readDisk(filepath) {
    return fetch(filepath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Read file as text
        })
        .then(data => {
            return data; // Return the fetched data
        })
        .catch(error => {
            console.error('Error reading the file:', error);
            return null; // Return null in case of an error
        });
  }
function readBinary(filepath) {
      return fetch(filepath)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.arrayBuffer(); // Read file as binary data
          })
          .then(buffer => {
              return buffer; // Return the fetched binary data
          })
          .catch(error => {
              console.error('Error reading the file:', error);
              return null; // Return null in case of an error
          });
  }
  function stringToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str).buffer;
}

async function start(){
    //document.body.requestFullscreen();
    var arrayBuffer = POSH.FileSys.readFile("p/sys/assets/PaperOS_bootLogo/00.png");
    //console.log(POSH.FileSys.readFile("p/sys/assets/PaperOS_bootLogo/00.png"));

    console.log(arrayBuffer)

    const blob = new Blob([arrayBuffer], { type: 'image/png' }); // Change the type as per your image type

    // Create a data URL from the Blob
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById("console").innerHTML = "<img draggable='false' src='"+imageUrl+"' style='position: absolute; top: 50%; left: 50%; transform: translate(-55%, -50%); width:600px; height:160px;'/>";
    await POSH.pause(3000);
    eval(POSH.FileSys.readFile("p/sys/paperOS/paperOSLib.js"))

}
start();
