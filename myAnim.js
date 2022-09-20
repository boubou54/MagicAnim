window.getComputedStyle = window.getComputedStyle || function( element ) {
  return element.currentStyle;
}


function newAnim_single(refDisplay)
{
    var myAnim = new Object();
    myAnim.callback = null;
    myAnim.element = null;
    myAnim.getDisplay = refDisplay;
    myAnim.display_start = null;
    myAnim.display_end = null;
    myAnim.animName = null;
    myAnim.testFlex = ['flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'align-items', 'align-content', 'flex', 'gap', 'row-gap', 'column-gap'];
    
    myAnim.togglify = function()
    {
      var test = myAnim.getDisplay(myAnim.element);
      var retour = window.getComputedStyle(myAnim.element,null).getPropertyValue('display') != 'none'?'none': test;
      return retour;
    }
    
    myAnim.set = function(element, animName, toggle, callback)
    {
      myAnim.element = element;
      myAnim.callback = callback;
      myAnim.display_start = myAnim.getDisplay(myAnim.element);
      myAnim.display_end = toggle == false? myAnim.display_start: myAnim.togglify();
      myAnim.animName = animName;
    };
    
    myAnim.anim = function()
    {
      myAnim.element.addEventListener('animationend', myAnim.ended);
      myAnim.element.classList.add(myAnim.animName);
      myAnim.element.setAttribute('style', 'display:'+myAnim.display_start+' !important');
    };
    
    myAnim.ended = function()
    {
        myAnim.element.setAttribute('style', 'display:'+myAnim.display_end+' !important');
        console.log('ended');
        myAnim.callback();
    };
    
    myAnim.clean = function()
    {
      myAnim.element.classList.remove(myAnim.animName);
      myAnim.element.removeEventListener('animationend', myAnim.ended);
      myAnim.callback = null;
      myAnim.element = null;
      myAnim.display_start = null;
      myAnim.display_end = null;
      myAnim.animName = null;
    };
    
    return myAnim;
}

function magickAnim()
{
  var multi = new Object();
  multi.tools = extendMultiple();
  multi.animes = [];
  multi.elem = [];
  multi.delay = [];
  multi.inter = [];
  multi.enCours = false;
  multi.counter = 0;
  multi.numbActive = 0;
  multi.callback = null;
  
  multi.set = function(tabElem=[], tabName=[], tabToggle=[], callback=null, tabDelay=[])
  {
    if(multi.enCours == false)
    {
      multi.counter = tabElem.length;
      multi.enCours = true;
      //prepare homogene data for algorithm
      tabElem = multi.tools.formate(tabElem, multi.counter, document.body);
      tabName = multi.tools.formate(tabName, multi.counter, 'fadeInLeft');
      tabToggle = multi.tools.formate(tabToggle, multi.counter, false);
      delay = multi.tools.formate(tabDelay, multi.counter, 0);
      tabCallback = multi.tools.formate([], multi.counter, multi.finish);
      
      multi.callback = callback;
      for(var i=0;i<tabElem.length;i++)
      {
        multi.animes.push(newAnim_single(multi.tools.getOriginalDisplay));
        multi.animes[multi.animes.length-1].id = String(i)+'_animation';
        multi.animes[multi.animes.length-1].set(tabElem[i], tabName[i], tabToggle[i], tabCallback[i]);
      }
      multi.elem = tabElem;
      multi.launch();
    }
    else
    {
      multi.terminate_fast();
      multi.set(tabElem, tabName, tabToggle, callback);
    }
  };
  
  multi.terminate_fast = function()
  {
    for(var g=0;g<multi.counter;g++)
    {
      multi.finish();
    }
  };
  
  multi.launch = function(retab = [])
  {
    for(var t=0;t<multi.counter;t++)
    {
        multi.inter[t] = setTimeout(afterDelay, multi.delay[t], t);
      
    }
    
    function afterDelay(ids)
    {
        clearTimeout(multi.inter[ids]);
        multi.animes[ids].anim();
    };
  };
  
  multi.finish = function()
  {
    multi.numbActive++;
    
    if(multi.numbActive == multi.counter)
    {
      for(var t=0;t<multi.counter;t++)
      {
        multi.animes[t].clean();
      }
      if(multi.callback != null)
      {
        var call = multi.callback;
        var elems = multi.elem;
        multi.clean();
        call(elems);
      }
      else
      {
        var elems = multi.elem;
        multi.clean();
      }
    }
  };
  
  multi.show = function(tabElem, callback=null)
  {
    var dis = '';
    var hh;
    tabElem = multi.tools.formate(tabElem, document.body);
    tabElem.forEach(function(element){
      dis = multi.tools.getOriginalDisplay(element);
      hh = String('display:'+dis+' !important');
      element.setAttribute('style', hh);
    });
    if(callback != null){callback();}
  };
  
  multi.hide = function(tabElem, callback=null)
  {
    tabElem = multi.tools.formate(tabElem, document.body);
    tabElem.forEach(function(element){
       element.setAttribute('style', 'display:none');
    });
    if(callback != null){callback();}
  };
  
  multi.clean = function()
  {
     multi.animes = [], multi.elem = [], multi.delay = [], multi.inter = [], multi.counter = 0, multi.numbActive = 0, multi.callback = null, multi.enCours = false;
  };
  
  return multi;
}

var extendMultiple = function()
{
  var ext = new Object();
  ext.testFlex = ['flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'align-items', 'align-content', 'flex', 'gap', 'row-gap', 'column-gap'];
  //convert all to a array in same length for each param
  
  ext.formate = function(tab, size, defaut=false)
  {
    if(Array.isArray(tab) == false)
    {
      switch(typeof tab)
      {
        case 'string':
          tab = ext.adapteParam(size, tab);
        break;
        case 'boolean':
          tab = ext.adapteParam(size, tab);
        break;
        default:
          if(Array.isArray(Object.keys(tab)) == true && 'length' in tab)
          {
            var tmpTT = [];
            for(var t=0;t<tab.length;t++)
            {
              if(tab[t].length != 0 && tab[t] instanceof Element){tmpTT.push(tab[t]);}
            }
            tab = tmpTT;
          }
          else
          {
            console.log('this function accept single string or tab arg number one index js ligne 274');
          }
        break;
      }
    }
    else
    {
      if(tab.length == 0)
      {
        tab = ext.adapteParam(size, defaut);
      }
    }
    return tab;
  };
  
  ext.adapteParam = function(taille, val)
  {
    var tabOut = [];
    for(var y=0;y<taille;y++)
    {
      tabOut.push(val);
    }
    return tabOut;
  };
  
  ext.getOriginalDisplay = function(elem)
  {
    var retour = 'flex';
    var cStyle = elem.currentStyle || window.getComputedStyle(elem, ""); 
    var detect = cStyle.display != 'none'?cStyle.display:'block';
    var tmpTab = ext.testFlex.filter(attribut_css => window.getComputedStyle(elem,null).getPropertyValue(attribut_css) != '');
    retour = tmpTab.length > 0?'flex':detect;
    return retour;
  };
  
  
  return ext;
}
