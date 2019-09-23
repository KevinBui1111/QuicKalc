"use strict";

let out_e = 'time'
  , inp_e = ['dis','pace']
  ;
let ctl_dis
  , ctl_pa_m, ctl_pa_s, ctl_spd
  , ctl_ti_h, ctl_ti_m, ctl_ti_s
  , clt_unit_dis, clt_unit_speed
$(document).ready(function () {
  [ctl_dis
    , ctl_pa_m, ctl_pa_s, ctl_spd
    , ctl_ti_h, ctl_ti_m, ctl_ti_s
    , clt_unit_dis, clt_unit_speed] =
  [document.getElementById('txt-distance')
    , document.getElementById('txt-p-min'), document.getElementById('txt-p-sec'), document.getElementById('txt-spd')
    , document.getElementById('txt-t-hh'), document.getElementById('txt-t-mm'), document.getElementById('txt-t-ss')
    , document.getElementById('sel-dis'), document.getElementById('sel-spd')];
});

function format_decimal(val) {
  return val.replace(/[^0-9.]/g, '');
}
function format_pace(control){
  control.value = format_decimal(control.value);
  control.checkValidity();

  $('[type="submit"]').click();
  // document.getElementById("txt-sec").focus(); 
  // document.getElementById("txt-sec").select();
}

function format_pace_2(control){
  let val = control.value.replace(/[^0-9.]/g, '')
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

  console.log(out_e);
  calc();
}

function calc(){
  let dis = +ctl_dis.value || 0
    , pa_m = +ctl_pa_m.value || 0
    , pa_s = +ctl_pa_s.value || 0
    , ti_h = +ctl_ti_h.value || 0, ti_m = +ctl_ti_m.value || 0, ti_s = +ctl_ti_s.value || 0

  if (out_e == 'time'){
    let pace_total = pa_m * 60 + pa_s;
    let time_total = dis * pace_total;
    ctl_ti_h.value = ~~(time_total / 3600);
    ctl_ti_m.value = ~~(time_total % 3600 / 60);
    ctl_ti_s.value = time_total % 60;
  }
  else if (out_e == 'pace'){
    let pace_total = (ti_h * 3600 + ti_m * 60 + ti_s) / dis;
    ctl_pa_m.value = ~~(pace_total / 60);
    ctl_pa_s.value = ~~pace_total % 60;
  }
}

function onchange_dis(control) {
  change_input('dis');
}
function onchange_pa(control) {
  change_input('pace');
}
function onchange_sp(control) {
  change_input('pace');
}
function onchange_time(control) {
  change_input('time');
}