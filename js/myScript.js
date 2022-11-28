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
//This function gets all input from the input boxes and returns 
// an objects with key values pairs that are arrays
// of the corresponding value and its actual element
function getInputValues(){
  var minColElement = document.getElementById("minc");
  var minColVal = document.getElementById("minc").value;
  var maxColElement = document.getElementById("maxc");
  var maxColVal = document.getElementById("maxc").value;
  var minRowElement = document.getElementById("minr");
  var minRowVal = document.getElementById("minr").value;
  var maxRowElement = document.getElementById("maxr");
  var maxRowVal = document.getElementById("maxr").value;
  var input = {minCol: [minColVal, minColElement], 
              maxCol: [maxColVal, maxColElement],
              minRow: [minRowVal, minRowElement],
              maxRow: [maxRowVal, maxRowElement]};
  return input;
  }
  //generates the table the same as in HW3
function generateTable(input){
  var table = document.getElementById("table");
  table.remove();
  input.minCol[0] = parseInt(input.minCol[0]);
  input.maxCol[0] = parseInt(input.maxCol[0]);
  input.minRow[0] = parseInt(input.minRow[0]);
  input.maxRow[0] = parseInt(input.maxRow[0]);
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
  var tableColHeaders = trCollection[0].children;
  tableColHeaders[1].innerHTML = input.minCol[0];
  // populating the top row/column headers
  for(var i = input.minCol[0] + 1; i <= input.maxCol[0]; i++) {
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(i);
    newTh.appendChild(textNode);
    trCollection[0].appendChild(newTh);
  }
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
$('#table').hide();
$(document).ready(function(){
  // validation for the form using jquery validation
  $("#form").validate({
    // declaring the error class so elements appear red
    errorClass: "error",
    // set of rules for each of my four input elements
    // All four look the same except for max column and max row have an added method
    rules: {
      // minimum column 
      minc: {
        // the field is required to have input
        required: true,
        // the entered text cannot have whitespace
        nowhitespace: true,
        // the field must be a number, opposed to entering characters
        number: true,
        // the range of the input entered must be between -50 and 50
        range: [-50,50],
        onlyIntegers: true
      },
      // maximum column 
      maxc: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        // this is a defined method at the bottom of script to prevent the 
        // max column being smaller than the min column
        maxcIsLargest: true,
        onlyIntegers: true
      },
      minr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        onlyIntegers: true
      },
      maxr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        maxrIsLargest: true,
        onlyIntegers: true
      }
    },
    // the submitHander gets all the input from the input element and generates the tables with it
    submitHandler: function(){
      var input = getInputValues();
      generateTable(input);
    }
  });
});
// defined method to to ensure that the max column is larger than the min column
// the value passed is the value from the max column, which is then compared 
// to the input that is in the min column. It returns false if max column is >= to min column
// which will then display that error message string that is the third parameter of the addMethod function. 
$.validator.addMethod("maxcIsLargest", function(value){
  var input = getInputValues();
  return parseInt(input.minCol[0]) <= parseInt(value);
}, "minimum column must be less than maximum column");
// defined method to to ensure that the max row is larger than the min row
$.validator.addMethod("maxrIsLargest", function(value){
  var input = getInputValues();
  return parseInt(input.minRow[0]) <= parseInt(value);
}, "minimum row must be less than maximum row");
// method to ensure that only integers are entered as a value
$.validator.addMethod("onlyIntegers", function(value){
  return !(value.includes('.'));
}, "only integer values allowed");