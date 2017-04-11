/*jslint esversion: 6, browser: true*/
/*global window, $, jQuery, Chart, alert*/

// Make sure document is loaded and in the ready state before js executes
$(document).ready( () => {
  // On click event that toggles the classes below to show/hide nav menu and rotate menu icon on smaller screens
  $('#arrow').on('click', () => {
    $('main').toggleClass('slide-right');
    $('#arrow').toggleClass('rotate');
  });
});

// Global chart defaults
const colorMain = '#3e5c76';
const colorAccent = '#f5f5f5';
const fontStack = "'Open Sans', sans-serif";
const fontColor = '#696969';
const fontSize = 13;

console.log(Chart.defaults);
Chart.defaults.global.defaultFontFamily = fontStack;
Chart.defaults.global.defaultFontColor = fontColor;
Chart.defaults.global.defaultFontSize = fontSize;

Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.scale.ticks.beginAtZero = true;

Chart.defaults.global.title.display = true;
Chart.defaults.global.legend.display = false;
//Chart.defaults.global.tooltips.backgroundColor = '#fff';

//                         
const LINE_CHART = $('#line-chart');
const lineFill = 'rgba(62, 92, 118, 0.4)'; // $deep-space (#3e5c76)
const lineBorder = colorMain;

let lineChart = new Chart(LINE_CHART, {
  type: 'line',
  data: {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets: [
      {
        data: [500, 1000, 750, 1250, 1750, 1250, 1000, 1500, 2000, 1500, 2000],
        fill: true,
        lineTension: 0,
        backgroundColor: lineFill,
        borderWidth: 1,
        borderColor: lineBorder,
        pointBackgroundColor: colorAccent,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHitRadius: 12,
        pointHoverBackgroundColor: colorMain,
        pointHoverBorderColor: colorAccent,
        pointHoverBorderWidth: 2,
        spanGaps: true,
      }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          max: 2500,
          stepSize: 500,
        }
      }]
    }
  }
});
