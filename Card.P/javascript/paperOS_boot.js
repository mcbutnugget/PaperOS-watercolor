function readDisk(filepath) {
  let fileData = null;
  let reader = new FileReader();

  reader.onload = function(event) {
    fileData = event.target.result;
  };

  if (filepath.endsWith('.bin') || filepath.endsWith('.png') || filepath.endsWith('.jpg') || filepath.endsWith('.jpeg')) {
    reader.readAsArrayBuffer(new Blob([new Uint8Array($.ajax({
      url: filepath,
      dataType: "text",
      async: false, // Make the request synchronous
      success: function (data) {
        // Assign the file data directly
        fileData = data;
      },
      error: function (xhr, status, error) {
        console.error('Error reading the file:', error);
        // Handle the error case as needed
      }
    }).responseText)]));
  } else {
    reader.readAsText(new Blob([new Uint8Array($.ajax({
      url: filepath,
      dataType: "text",
      async: false, // Make the request synchronous
      success: function (data) {
        // Assign the file data directly
        fileData = data;
      },
      error: function (xhr, status, error) {
        console.error('Error reading the file:', error);
        // Handle the error case as needed
      }
    }).responseText)]));
  }

  return fileData;
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
  function sortNestedLists(arr) {
    arr.sort((a, b) => {
        const aIsFolder = Array.isArray(a[1]);
        const bIsFolder = Array.isArray(b[1]);
        
        if (aIsFolder === bIsFolder) {
            return a[0].localeCompare(b[0]);
        } else if (aIsFolder) {
            return -1;
        } else {
            return 1;
        }
    });

    // Recursively sort inner lists
    for (const item of arr) {
        if (Array.isArray(item[1])) {
            sortNestedLists(item[1]);
        }
    }
}
if(!localStorage.getItem("computator")||localStorage.getItem("computator")=='[]'){
    window.computator = [
      ["p",[
      ["main",[
        ["..",[]]
      ]],
      ["sys",[
        ["..",[]],
        ["boot",[
          ["..",[]],
          ["systemCommands.js",readDisk("javascript/systemCommands.js")],
          ["initializePaperOS.js",readDisk("javascript/initializePaperOS.js")]
        ]],
        ["installPaperOS.js",readDisk("javascript/installPaperOS.js")]
      ]]
    ] 
]
      
    ]
    sortNestedLists(window.computator)
  
    localStorage.setItem("computator",JSON.stringify(computator));
  }else{
    var bootloader = localStorage.getItem("computator");
    var computator = sortNestedLists(JSON.parse(bootloader));
    
  }
  var pathElements = "p/sys/boot/systemCommands.js".replace(/\\$|\/$/, "").split(/\\|\//);
  var currentLocation = window.computator;

  for (const element of pathElements) {
    if (element === "..") {
      currentLocation = currentLocation[0][1]; // Go back one level
    } else {
      const item = currentLocation.find((item) => item[0] === element);

      if (!item) {

      }

      if (Array.isArray(item[1])) {
        // If it's a folder, update the current location
        currentLocation = item[1];
      } else {
        // It's a file, check if it's the last element in the path
        if (element === pathElements[pathElements.length - 1]) {
          var systemCommands = item[1]; // Return the file data
        } else {

        }
      }
    }
  }
  console.log(systemCommands);
eval(systemCommands)
 var pathElements = "p/sys/boot/systemCommands.js".replace(/\\$|\/$/, "").split(/\\|\//);
  var currentLocation = window.computator;

  for (const element of pathElements) {
    if (element === "..") {
      currentLocation = currentLocation[0][1]; // Go back one level
    } else {
      const item = currentLocation.find((item) => item[0] === element);

      if (!item) {

      }

      if (Array.isArray(item[1])) {
        // If it's a folder, update the current location
        currentLocation = item[1];
      } else {
        // It's a file, check if it's the last element in the path
        if (element === pathElements[pathElements.length - 1]) {
          var systemCommands = item[1]; // Return the file data
        } else {

        }
      }
    }
  }
  console.log(systemCommands);
eval(systemCommands)
