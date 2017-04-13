/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, Chart, alert*/

// Make sure document is loaded and in the ready state before js executes
$(document).ready( () => {
  // On click event that toggles the classes below to show/hide nav menu and rotate menu icon on smaller screens
  $('#arrow').on('click', () => {
    $('main').toggleClass('slide-right');
    $('#arrow').toggleClass('rotate');
  });

  // Fade out alert message with close button is clicked
  $('#alert-btn').on('click', () => {
    $('.alert-container').fadeOut(500);
  });
  
  // On click event for line chart buttons to switch labels and datasets based timescale selected
  $('.line-chart-timescale').on('click', 'button', function () {
    lineTimescale = $(this).attr('value');
    $('.line-chart-timescale button').each( function (i) {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
    lineChart.data.labels = lineLabels[lineTimescale];
    lineChart.data.datasets[0].data = lineData[lineTimescale];
    lineChart.options.scales.yAxes[0].ticks.max = lineTicksMax[lineTimescale];
    lineChart.options.scales.yAxes[0].ticks.stepSize = lineTicksStepSize[lineTimescale];
    lineChart.update();
  });
});

// Global chart defaults
const colorMain = '#3e5c76';
const colorAccent = '#f5f5f5';
const colorFill = 'rgba(62, 92, 118, 0.4)'; // $deep-space (#3e5c76)
const fontStack = "'Open Sans', sans-serif";
const fontColor = '#696969';
const fontSize = 13;

console.log(Chart.defaults);
Chart.defaults.global.defaultFontColor = fontColor;
Chart.defaults.global.defaultFontFamily = fontStack;
Chart.defaults.global.defaultFontSize = fontSize;

Chart.defaults.global.maintainAspectRatio = false;

Chart.defaults.global.tooltips.backgroundColor = 'rgba(29, 45, 68, 0.8)'; // $yankees-blue
Chart.defaults.global.tooltips.bodyFontColor = colorAccent; //
Chart.defaults.global.tooltips.titleFontColor = colorAccent; //
Chart.defaults.global.tooltips.cornerRadius = 4; //

Chart.defaults.global.legend.display = false;
Chart.defaults.global.title.display = true;

Chart.defaults.scale.ticks.beginAtZero = true;

// Line chart data and variables
const lineLabels = {
  hourly: ["10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"],
  daily: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekly: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  monthly: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"]
};
const lineData = {
  hourly: [25, 30, 15, 35, 20, 45, 20, 15, 35, 15, 20],
  daily: [225, 350, 300, 150, 250, 450, 300, 250, 400, 350, 200],
  weekly: [500, 1000, 750, 1250, 1750, 1250, 1000, 1500, 2000, 1500, 2000],
  monthly: [6000, 7250, 6000, 6500, 5750, 4250, 4000, 3500, 4500, 7250, 8000]
};
const lineTicksMax = {
  hourly: 50,
  daily: 500,
  weekly: 2500,
  monthly: 8750
};
const lineTicksStepSize = {
  hourly: 10,
  daily: 100,
  weekly: 500,
  monthly: 1750
};

var lineTimescale = 'weekly';

// Line chart constructor
const LINE_CHART = $('.line-chart');
let lineChart = new Chart(LINE_CHART, {
  type: 'line',
  data: {
    labels: lineLabels[lineTimescale],
    datasets: [
      {
        data: lineData[lineTimescale],
        fill: true,
        lineTension: 0.1,
        backgroundColor: colorFill,
        borderWidth: 1,
        borderColor: colorMain,
        pointBackgroundColor: colorAccent,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHitRadius: 12,
        pointHoverBackgroundColor: colorMain,
        pointHoverBorderColor: colorAccent,
        pointHoverBorderWidth: 2,
      }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          max: lineTicksMax[lineTimescale],
          stepSize: lineTicksStepSize[lineTimescale],
        }
      }]
    }
  }
});

// Line chart data and variables
const barLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const barData = [250, 450, 300, 250, 400, 350, 200];
const barTicksMax = 500;
const barTicksStepSize = 100;

// Bar chart constructor
const BAR_CHART = $('.bar-chart');
let barChart = new Chart(BAR_CHART, {
  type: 'bar',
  data: {
    labels: barLabels,
    datasets: [
      {
        data: barData,
        backgroundColor: colorMain,
        borderColor: colorMain,
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{
        barPercentage: 0.7,
      }],
      yAxes: [{
        ticks: {
          max: barTicksMax,
          stepSize: barTicksStepSize,
        }
      }]
    }
  }
});

