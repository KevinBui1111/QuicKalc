"use strict";

let out_e = 'time'
  , inp_e = ['dis','pace']
  ;

$(document).ready(function () {

});

function format_pace(control){
  control.value = control.value.replace(/[^0-9.]/g, '');
  // document.getElementById("txt-sec").focus(); 
  // document.getElementById("txt-sec").select();
}

function format_pace_2(control, val){
  val = val.replace(/[^0-9.]/g, '')
  if (val.length == 3)
    val = val.substr(1);
  control.value = val;
}

function dis_change(e){
  console.log(e.value);
}

function change_input(e){
  inp_e.push(e);
  if (e == out_e)
    out_e = inp_e.shift();
  else
    inp_e.splice(inp_e.indexOf(e), 1);
}

function calc(){
  
}