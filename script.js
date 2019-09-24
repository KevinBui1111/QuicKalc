"use strict";

let out_e = 'time'
  , inp_e = ['dis','pace']
  ;
let ctl_dis
  , ctl_pa_m, ctl_pa_s, ctl_spd
  , ctl_ti_h, ctl_ti_m, ctl_ti_s
  , ctl_unit_dis, ctl_unit_speed

  , [v_dis, v_pace, v_spd] = [0, 0, 0]
  , v_time
  , v_h, v_m, v_s
  ;

$(document).ready(function () {
  [ctl_dis
    , ctl_pa_m, ctl_pa_s, ctl_spd
    , ctl_ti_h, ctl_ti_m, ctl_ti_s
    , ctl_unit_dis, ctl_unit_speed] =
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

  calc();
}

function calc(){
    // , ti_h = +ctl_ti_h.value || 0, ti_m = +ctl_ti_m.value || 0, ti_s = +ctl_ti_s.value || 0

  if (out_e == 'time'){
    let time_total = v_dis * v_pace;
    ctl_ti_h.value = ~~(time_total / 3600);
    ctl_ti_m.value = ~~(time_total % 3600 / 60);
    ctl_ti_s.value = time_total % 60;
  }
  else if (out_e == 'pace'){
    let pace_total = v_time / v_dis;
    ctl_pa_m.value = ~~(pace_total / 60);
    ctl_pa_s.value = ~~pace_total % 60;
    v_spd = 3600 / pace_total;
    onchange_sel_spd();
  }
  else if (out_e == 'dis'){
    v_dis = v_time / v_pace;
    onchange_sel_dis();
  }
}

function onchange_dis(control) {
  v_dis = +ctl_dis.value || 0;
  if (ctl_unit_dis.value == 'm')
    v_dis /= 1000;
  else if (ctl_unit_dis.value == 'mi')
    v_dis *= 1.60934;

  change_input('dis');
}
function onchange_pa(control) {
  v_pace = (+ctl_pa_m.value || 0) * 60 + (+ctl_pa_s.value || 0);
  v_spd = 3600 / v_pace;
  onchange_sel_spd();

  change_input('pace');
}
function onchange_sp(control) {
  v_spd = (+ctl_spd.value || 0);
  if (ctl_unit_speed.value == 'm/min')
    v_spd *= .06;
  else if (ctl_unit_speed.value == 'mi/h')
    v_spd *= 1.60934;

  ctl_pa_m.value = ~~(60 / v_spd);
  ctl_pa_s.value = ~~(3600 / v_spd % 60);
  change_input('pace');
}
function onchange_time(control) {
  v_time = (+ctl_ti_h.value || 0) * 3600 + (+ctl_ti_m.value || 0) * 60 + (+ctl_ti_s.value || 0);
  change_input('time');
}

function onchange_sel_spd() {
  if (ctl_unit_speed.value == 'm/min')
    ctl_spd.value = +(v_spd / .06).toFixed(3);
  else if (ctl_unit_speed.value == 'mi/h')
    ctl_spd.value = +(v_spd / 1.60934).toFixed(3);
  else
    ctl_spd.value = +v_spd.toFixed(3);
}
function onchange_sel_dis() {
  if (ctl_unit_dis.value == 'm')
    ctl_dis.value = +(v_dis * 1000).toFixed(3);
  else if (ctl_unit_dis.value == 'mi')
    ctl_dis.value = +(v_dis / 1.60934).toFixed(3);
  else
    ctl_dis.value = +v_dis.toFixed(3);
}