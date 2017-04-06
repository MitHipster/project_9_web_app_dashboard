/*jslint esversion: 6, browser: true*/
/*global window, $, jQuery, alert*/

$(document).ready( () => {
  $('#arrow').on('click', () => {
    $('main').toggleClass('slide-right');
    $('#arrow').toggleClass('rotate');
  });
});