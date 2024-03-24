if(POSH.FileSys.readFile("p/sys/installPaperOS.js")!=null){
eval(POSH.FileSys.readFile("p/sys/installPaperOS.js"));
}else{
  eval(POSH.FileSys.readFile("p/sys/boot/initializePaperOS.js"));
}

