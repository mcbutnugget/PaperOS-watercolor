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
async function install(){
await POSH.say("please wait while your copy of paperOS get's installed...");
await POSH.FileSys.createFolder("p/sys","assets")
await POSH.say("p/sys/assets");
await POSH.FileSys.createFolder("p/sys/assets","PaperOS_bootLogo");
await POSH.say("p/sys/assets/PaperOS_bootLogo");
await POSH.FileSys.createFolder("p/sys/assets","PaperOS_keyAssets");
await POSH.say("p/sys/PaperOS_keyAssets");
await POSH.FileSys.createFolder("p/sys/assets/PaperOS_keyAssets","fonts");
await POSH.say("p/sys/assets/PaperOS_keyAssets/fonts");
await POSH.FileSys.createFile("p/sys/assets/PaperOS_keyAssets/fonts","paper8-mono.ttf");
//puts the binary from 'paper8-mono.ttf' to the paper8-mono.ttf inside of paperOS
readBinary("/fonts/paper8-mono.ttf").then(binaryData => {
        //const decoder = new TextDecoder();
        //const outputBinary = decoder.decode(binaryData);
        //console.log('Binary data:', outputBinary);
        // Handle the binary data as needed
        POSH.FileSys.writeFile("p/sys/assets/PaperOS_keyAssets/fonts/paper8-mono.ttf",  binaryData);
})
.catch(error => {
        console.error('Error reading the file:', error);
        // Handle the error case as needed
        POSH.FileSys.writeFile("p/sys/assets/PaperOS_keyAssets/fonts/paper8-mono.ttf",  "");
});    
await POSH.say("p/sys/assets/PaperOS_keyAssets/fonts/paper8-mono.ttf");
await POSH.FileSys.createFile("p/sys/assets/PaperOS_bootLogo","00.png");
await readBinary("/images/bootImages/00.png").then(binaryData => {
        //const decoder = new TextDecoder();
        //const outputBinary = decoder.decode(binaryData);
        //console.log('Binary data:', outputBinary);
        // Handle the binary data as needed
        POSH.FileSys.writeFile("p/sys/assets/PaperOS_bootLogo/00.png",  binaryData);
})
.catch(error => {
        console.error('Error reading the file:', error);
        // Handle the error case as needed
        POSH.FileSys.writeFile("p/sys/assets/PaperOS_bootLogo/00.png",  "");
}); 
await POSH.say("p/sys/assets/PaperOS_bootLogo/00.png");
await POSH.FileSys.createFolder("p/sys","paperOS");
await POSH.say("p/sys/paperOS");
await POSH.FileSys.createFolder("p/sys/paperOS","Pcard");
await POSH.say("p/sys/paperOS/Pcard");
await POSH.FileSys.createFolder("p/sys/paperOS","styles");
await POSH.say("p/sys/paperOS/styles");
await POSH.FileSys.createFolder("p/sys/paperOS","prgmExec");
await POSH.say("p/sys/paperOS/prgmExec");
await POSH.FileSys.createFolder("p/sys/paperOS","prgmData");
await POSH.say("p/sys/paperOS/prgmData");
await POSH.FileSys.createFile("p/sys/paperOS/paperOSLib.js");
await POSH.say("p/sys/paperOS/paperOSLib.js");


POSH.say("installed! welcome to the paperOS community!");
await POSH.pause(1000);
eval(POSH.FileSys.readFile("p/sys/boot/initializePaperOS.js"));
await POSH.FileSys.deleteFile("p/sys","installPaperOS.js");
}
install();