var anime = null;
//var for value select
var choix_single = 'backInDown';
var choix_multiple = 'backInDown';
var choix_multipleSwitch = ['backInDown', 'rollInleft', 'slideInRight'];

//select for chosse user
var select_single = document.getElementById('anim_single');
var select_multiple = document.getElementById('anim_multiple');

var select_multipleSwitch_0 = document.getElementById('anim_multipleSwitch_0');
var select_multipleSwitch_1 = document.getElementById('anim_multipleSwitch_1');
var select_multipleSwitch_2 = document.getElementById('anim_multipleSwitch_2');

//bt for launch anim
var bt_single = document.getElementById('bt_single');
var bt_multiple = document.getElementById('bt_multiple');
var bt_multipleSwitch = document.getElementById('bt_multipleSwitch');

//bt toogle choose
var toggle_single = document.getElementById('toggle_single');
var toggle_multiple = document.getElementById('toggle_multiple');

var toggle_multipleSwitch_0 = document.getElementById('toggle_multipleSwitch_0');
var toggle_multipleSwitch_1 = document.getElementById('toggle_multipleSwitch_1');
var toggle_multipleSwitch_2 = document.getElementById('toggle_multipleSwitch_2');

//bt callback
var call_single = document.getElementById('call_single');
var call_multiple = document.getElementById('call_multiple');
var call_multipleSwitch = document.getElementById('call_multipleSwitch');

//FOR INTERFACE
var s_multiple = document.getElementById('s_multiple');
var s_multipleSwitch = document.getElementById('s_multipleSwitch');
var s_single = document.getElementById('s_single');
var ss_multiple = document.getElementById('ss_multiple');
var section_active = 'section_single';

function init()
{
  bt_single.addEventListener('click', gereAnim);
  bt_multiple.addEventListener('click', gereAnim);
  bt_multipleSwitch.addEventListener('click', gereAnim);
  
  select_single.addEventListener('change', setChoix);
  select_multiple.addEventListener('change', setChoix);
  
  select_multipleSwitch_0.addEventListener('change', setChoix);
  select_multipleSwitch_1.addEventListener('change', setChoix);
  select_multipleSwitch_2.addEventListener('change', setChoix);
  
  document.querySelectorAll('#toggle_single, #toggle_multiple, #toggle_multipleSwitch_0, #toggle_multipleSwitch_1, #toggle_multipleSwitch_2, #call_single, #call_multiple, #call_multipleSwitch').forEach(function(element)
    {
      element.addEventListener('click', refreshRadio);
    }
  );
  document.querySelectorAll('#s_single, #s_multiple, #s_multipleSwitch, #ss_multiple').forEach(function(element){
    element.addEventListener('click', show_section);
  });
  
  anime = magickAnim();
  initValueStartAllSelect();
  anime.set(document.getElementsByClassName(section_active), 'color-change');
  //console.log(document.getAnimations());
}

function show_section(evt)
{
    var ids = 'section_'+evt.target.id.split("_")[1];
    console.log(ids);
    anime.set(document.getElementsByClassName(section_active), 'backOutDown', true, function(elements){
       anime.set(document.getElementsByClassName(ids), 'backInDown', true, function(){
           section_active = ids;
           //anime.set(document.getElementsByClassName(section_active), 'color-change');
       });
    });
}

function initValueStartAllSelect()
{
  select_single.value = choix_single;
  select_multiple.value = choix_multiple;
  select_multipleSwitch_0.value = choix_multipleSwitch[0];
  select_multipleSwitch_1.value = choix_multipleSwitch[1];
  select_multipleSwitch_2.value = choix_multipleSwitch[2];
  toggle_single.checked = false;  
  toggle_multiple.checked = false;
  toggle_multipleSwitch_0.checked = false;
  toggle_multipleSwitch_1.checked = false;
  toggle_multipleSwitch_2.checked = false;
  call_single.checked = false;  
  call_multiple.checked = false;
  call_multipleSwitch.checked = false;
}

function refreshRadio(evt)
{
  var ids = evt.target.id;
  var elem = document.getElementById(ids);
  document.getElementById(ids).checked = elem.checked;
}






function gereAnim(evt)
{
  var ids = evt.target.id.split("_")[1];
  var elements = document.getElementById(ids).getElementsByClassName('square');
  var callback = null;
  //console.log(element);
  //anim.set(elemen single or list, optional tab or string animClass, optional tab or boolean for toggle each element, optional callback func after finish all anim)
  switch(ids)
  {
    case 'single':
      callback = call_single.checked == true?multi_callback:null;
      anime.set(elements, choix_single, toggle_single.checked, callback);
    break;
    case 'multiple':
      callback = call_multiple.checked == true?multi_callback:null;
      anime.set(elements, choix_multiple, toggle_multiple.checked, callback);
    break;
    case 'multipleSwitch':
      callback = call_multipleSwitch.checked == true?multi_callback:null;
      anime.set(elements, choix_multipleSwitch, [toggle_multipleSwitch_0.checked, toggle_multipleSwitch_1.checked, toggle_multipleSwitch_2.checked], callback);
    break;
    default:
      console.log('problem switch gereAnim line 30');
    break;
  }
}

function multi_callback(elements)
{
  var out = '';
  var serialize = elements.forEach(function(elem)
  {
    out += elem.outerHTML+'\n';
  })
  var str = 'Callback after clean system anim call is true, nbr elements: '+String(elements.length)+'\n'+out;
  alert(str);
}

function setChoix(evt)
{
  var ids = evt.target.id.split("_")[1];
  var index_multipleSwitch = 0;
  
  switch(ids)
  {
    case 'single':
      choix_single = select_single.value;
    break;
    case 'multiple':
      choix_multiple = select_multiple.value;
    break;
    case 'multipleSwitch':
      index_multipleSwitch = parseInt(evt.target.id.split("_")[2]);
      choix_multipleSwitch[index_multipleSwitch] = document.getElementById('multiS').getElementsByTagName('select')[index_multipleSwitch].value;
    break;
    default:
      console.log('switch problem line 62 setChoix');
    break;
  }
}


window.onload = init;