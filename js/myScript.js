/*
File: myScript.js
GUI HW4 Part I: Use our HW3 submission of a dynamic multiplication table and add in the jquery validation
plugin to validate all input.  
Cornelius (C.J.) Sheehan, UMass Lowell Computer Science, cornelius_sheehan@student.uml.edu

Copyright (c) 2022 by C.J. 
All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated on November 25th, 2022 at 11:00AM

sources: https://jqueryvalidation.org/validate/
            https://jqueryvalidation.org/jQuery.validator.addMethod/
            https://jqueryvalidation.org/category/methods/
*/
function getInputValues(){
  var minColElement = document.getElementById("minc");
  var minColVal = parseInt(document.getElementById("minc").value);
  var maxColElement = document.getElementById("maxc");
  var maxColVal = parseInt(document.getElementById("maxc").value);
  var minRowElement = document.getElementById("minr");
  var minRowVal = parseInt(document.getElementById("minr").value);
  var maxRowElement = document.getElementById("maxr");
  var maxRowVal = parseInt(document.getElementById("maxr").value);
  var input = {minCol: [minColVal, minColElement], 
              maxCol: [maxColVal, maxColElement],
              minRow: [minRowVal, minRowElement],
              maxRow: [maxRowVal, maxRowElement]};
  return input;
  }
function generateTable(input){
  var table = document.getElementById("table");
  table.remove();
  // creates new HTML table
  var tableParentDiv = document.getElementById("coltable");
  var newTable = document.createElement("table");
  newTable.id = "table";
  tableParentDiv.appendChild(newTable);
  var newThead = document.createElement("thead");
  var newTbody = document.createElement("tbody");
  newTable.appendChild(newThead);
  newTable.appendChild(newTbody);
  var newTr = document.createElement("tr");
  newThead.appendChild(newTr);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var tHeadtBodyPair = document.getElementById("table").children;
  var tHead = tHeadtBodyPair[0];
  var trCollection = tHead.children;
  console.log(trCollection);
  var tableColHeaders = trCollection[0].children;
  console.log(tableColHeaders);
  tableColHeaders[1].innerHTML = input.minCol[0];
  console.log(tableColHeaders[1]);
  // populating the top row/column headers
  for(var i = input.minCol[0] + 1; i <= input.maxCol[0]; i++) {
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(i);
    newTh.appendChild(textNode);
    trCollection[0].appendChild(newTh);
  }
  console.log("input.maxCol[0]: " + input.maxCol[0] + ", " + typeof(input.maxCol[0]));
  //populating each row after the top row
  // this for loop creates a new row element
  // and then the inner for-loop populates the rest of that row 
  for(var j = input.minRow[0]; j <= input.maxRow[0]; j++) {
    var newTr = document.createElement("tr");
    tHeadtBodyPair[1].appendChild(newTr);
    var lastTr = tHeadtBodyPair[1].lastElementChild;
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(j);
    newTh.appendChild(textNode);
    lastTr.appendChild(newTh);
    for(var x = input.minCol[0]; x <= input.maxCol[0]; x++) {
      var newTd = document.createElement("td");
      var textNode = document.createTextNode(x * j);
      newTd.appendChild(textNode);
      lastTr.appendChild(newTd);
    }
  }
}
/*main*/ 
//$('#table').hide();
$(document).ready(function(){
  $("#form").validate({
    errorClass: "error",
    //focusCleanup: true,
    rules: {
      minc: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        //mincIsSmallest: true
      },
      maxc: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        maxcIsLargest: true
      },
      minr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50]
      },
      maxr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        maxrIsLargest: true
      }
    },
    submitHandler: function(){
      var input = getInputValues();
      console.log(input);
      generateTable(input);
    }
  });
});
$.validator.addMethod("maxcIsLargest", function(value){
  var input = getInputValues();
  return input.minCol[0] < value;
}, "minimum column must be less than maximum column");
$.validator.addMethod("maxrIsLargest", function(value){
  var input = getInputValues();
  return input.minRow[0] < value;
}, "minimum row must be less than maximum row");


/*
either reject or round for floats
maybe take away focus
*/