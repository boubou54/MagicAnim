# MagicAnim
## Simple JS controller to play css animations

![MagicAnim logo](https://www.optimages.fr/MagicAnim/MagicAnim.png)

## ** What does MagicAnim do ?**
I wrote magicanim to overcome some difficulty when we use css animations with browsers.
MagicAnim allows you to animate one or more elements at the same time, with the same or several (animation, delay, toggle) 
and allows you to call a callback which returns all the elements to animate as arguments.

Absolute position, container in flex, or even boostrap in your project, 
no problem I wrote MagicAnim so that it is compatible with all these constraints which are boring in the long run.

You can animate several elements with different delay, animation ect at once but only one instance of magicanim is allowed, 
so that if the user switches on several animations, 
magicanim smoothly stops the first instance and correctly calls your callback then starts the new instance. Useful during several scroll animation for example.

I wrote it in pure javascript, so MagicAnim works with jquery as well. Then I made sure that its use is quick to use. 
I will put examples of use below to show the possibilities of MagicAnim. It can of course be improved as you wish :smiley:

## **Demo to see some possible possibilities with MagicAnim**
Some online tests: [Demo MagicAnim](https://www.optimages.fr/MagicAnim/index.html)

```js
//Include the magicanim js file in your html then assign it classically like this. and include a CSS file with your animation classes in it
var animax = magickAnim();

/*
@Method:
hide(tabElem, callback=null) tabElem = One element to select or several elements, callback = optional callback function
show(tabElem, callback=null) tabElem = One element to select or several elements, callback = optional callback function
set(tabElem=[], tabName=[], tabToggle=[], callback=null, tabDelay=[]) 
tabElem = One element to select or several elements, 

tabName = optional string className or array of className different for each element,
if you want to use optional for this argument, make sure that the format function line 82 of magickanim js that the className enter exists in your css library file

callback = optional callback function who will be called after the animation ends,

tabToggle = optional boolean true false or array of boolean for each element default is false,

tabDelay = optional delay for element int or array of int,

for tabToggle tabName or tabDelay,
if you fill in this argument for several elements to animate you must either fill in a table if each element receives a different value, otherwise you can directly fill in a single value for all, magickanim formats and understands that it must apply this value to all the elements
*/

//exemple hide: set undisplayed element without anim
animax.hide($('.element'));
//with callback
animax.hide(document.getElementById(parent_elem).getElementsByClassName('square'), funk);

//exemple show: set displayed element without anim
animax.show($('.elements'));
//callback system is same of hide

//animax.set: animation of single or many elements
//anim all elements with className fadeInRight
animax.set($('.elements'), 'fadeInRight');
//animation with different className for each
animax.set($('.elements'), ['fadeInRight', 'fadeInLeft']);

//toggle
animax.set($('.elements'), 'backOutDown', true);
animax.set($('.elements'), 'backOutDown', [true,false]);

//Chain to multiple instance of animation
animax.set($('.elements'), 'backOutDown', true, function(){
  animax.set($('.other_element'), 'backInDown', true);
});

//set delay
animax.set($('.elements'), 'backOutDown', true, function(){
  animax.set($('.other_elements), 'backInDown', true, null, [100, 250, 300]);
}, 150);

```
Format of your css
In your css file you just have to put the animations of your choice and create a class that magicanim will call
```css
@-webkit-keyframes backInDown {
  0% {
    -webkit-transform: translateY(-1200px) scale(0.7);
    transform: translateY(-1200px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateY(0px) scale(0.7);
    transform: translateY(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes backInDown {
  0% {
    -webkit-transform: translateY(-1200px) scale(0.7);
    transform: translateY(-1200px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateY(0px) scale(0.7);
    transform: translateY(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

.backInDown {
  -webkit-animation: 1s backInDown 1;
  animation: 1s backInDown 1;
}
```
