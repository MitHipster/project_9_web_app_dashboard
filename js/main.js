/*jslint esversion: 6, browser: true*/
/*global window, console, $, jQuery, Chart, alert*/

const alertContainer = $('.alert-container');
const arrowMenu = $('#arrow');
const searchForUser = $('#search-user');
let searchForUserData = [];

// Hide alert notification and show after a short delay
alertContainer.hide();

// Make sure document is loaded and in the ready state before js executes
$(document).ready( () => {
  
  // Fade in to simulate receiving an alert
  alertContainer.delay(1500).fadeIn('slow');
  
  // On click event that toggles the classes below to show/hide nav menu and rotate menu icon on smaller screens
  arrowMenu.on('click', () => {
    $('main').toggleClass('slide-right');
    arrowMenu.toggleClass('rotate');
  });

  // Fade out alert message with close button is clicked
  $('#alert-btn').on('click', () => {
    alertContainer.fadeOut('slow');
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
  
  $('#message-form').on('click', 'button', (e) => {
    e.preventDefault();
    
    const removeIfExists = $('#confirmation');
    if (removeIfExists) {removeIfExists.remove();}
    
    const messageForm = $('#message-form');
    let userName = searchForUser.val();
    const messageForUser = $('#message-user');
    let userMessage = messageForUser.val();
    let systemNotice = '';
    const confirmationId = 'confirmation';
    let noticeCl = '';
    let sentDialogHtml = '';
    const sendBtn = $('#send-btn');
    const messageSent = $('message-sent');
    const messageError = $('message-error');
    
    if (userName.length > 0 && userMessage.length > 0) {
      noticeCl = 'message-sent';
      sentDialogHtml = 
        $(`<div id="${confirmationId}" class="${noticeCl}">Your message to ${userName} has been sent.</div>`);
      messageForm.find("input[type=text], textarea").val("");
    } else {
      noticeCl = 'message-error';
      sentDialogHtml = 
        $(`<div id="${confirmationId}" class="${noticeCl}">Please complete each field before clicking send.</div>`);
    }
    sentDialogHtml.insertBefore(sendBtn);
    systemNotice = $(`#${confirmationId}`);
    systemNotice.delay(3000).fadeOut('slow', () => {
      systemNotice.remove();
    });
    
  });
  
  searchForUser.autocomplete({
    source: searchForUserData,
    autoFocus: true,
    delay: 0,
    minLength: 1,
    position: { my: "left top", at: "left bottom", collision: "flip" }
  });

});

// Global chart defaults
const colorMain = '#3e5c76'; // $deep-space
const colorSecond = '#1fad3b'; // $forest-green
const colorThird = '#327c5e'; // Amazon
const colorAccent = '#f5f5f5';
const colorFill = 'rgba(62, 92, 118, 0.4)'; // $deep-space (#3e5c76)
const fontStack = "'Open Sans', sans-serif";
const fontColor = '#696969';
const fontSize = 13;

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

// Bar chart data and variables
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
        borderColor: colorAccent,
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{
        barPercentage: 0.65,
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

// Donut chart data and variables
const donutLabels = ["Phones", "Tablets", "Desktops"];
const donutData = [2000, 1750, 10000];
const donutBackColor = [colorThird, colorSecond, colorMain];

// Donut chart constructor
const DONUT_CHART = $('.donut-chart');
let donutChart = new Chart(DONUT_CHART, {
  type: 'doughnut',
  data: {
    labels: donutLabels,
    datasets: [
      {
        data: donutData,
        backgroundColor: donutBackColor,
        borderColor: colorAccent,
      }
    ]
  },
  options: {
    cutoutPercentage: 55,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 20,
        padding: 20,
      }
    }
  }
});

let members = {};

const containerClass = 'member-container';
const memberSection = 'new member';
const activitySection = 'recent activity';
const imageClass = 'member-image';
const infoClass = 'member-info';
const nameClass = 'member-name';
const emailClass = 'member-email';
const postedClass = 'member-posted';
const otherClass = 'member-other';
const activityArrowClass = 'activity-arrow';
const arrowRightClass = 'arrow-right';
const arrowSource = 'icons/icon-menu.svg';
const arrowAlt = 'click to view activity history';
const activityInfo = {
  comments: ["commented on WEBanalytics' SEO Tips", "liked the post Facebook's Changes for 2017", "commented on Facebook's Changes for 2017", "posted WEBanalytics' SEO Tips"],
  posted: ["4 hours ago", "5 hours ago", "5 hours ago", "12 hours ago"]
};

const innerMembersContainer = $('.inner-members-container');
const innerActivityContainer = $('.inner-activity-container');

let signupDate = $.format.date($.now(), "M/d/yy");

$.ajax({
  url: 'https://randomuser.me/api/?nat=us&results=50&inc=picture,name,email&noinfo',
  dataType: 'json',
  success: (data) => {
    members = data;
    
    $.each(members.results, (i) => {
      let firstName = properCase(members.results[i].name.first);
      let lastName = properCase(members.results[i].name.last);
      let name = firstName + " " + lastName;
      searchForUserData.push(name);
    });
    
    searchForUserData.sort();
    
    $.each(members.results, (i) => {
      let member = members.results[i];
      innerMembersContainer.append(memberHtml(member, memberSection));
      return (i !== 3);
    });
    
    $.each(members.results, (i) => {
      let activity = members.results[i];
      innerActivityContainer.append(memberHtml(activity, activitySection, i));
      return (i !== 3);
    });
  }
});

let properCase = (text) => {
  text = text.charAt(0).toUpperCase() + text.substr(1);
  return text;
};

let memberHtml = (member, section, i) => {
  let image = member.picture.thumbnail;
  let name = properCase(member.name.first) + ' ' + properCase(member.name.last);
  let email = member.email;
  let infoPrimary = '';
  let infoSecondary = '';
  let other = '';
  
  if (section === memberSection) {
    infoPrimary = `<p class="${nameClass}">${name}</p>`;
    infoSecondary = `<p class="${emailClass}">${email}</p>`;
    other = `<time>${signupDate}</time>`;
  } else {
    infoPrimary = `<p class="${nameClass}">${name} ${activityInfo.comments[i]}</p>`;
    infoSecondary = `<p class="${postedClass}">${activityInfo.posted[i]}</p>`;
    other = `<a href="#" class="${activityArrowClass}"><img class="${arrowRightClass}" src="${arrowSource}" alt="${arrowAlt}"></a>`;
  }
  
  let html = 
      `<li class="${containerClass}">
        <div class="${imageClass}">
          <img src="${image}" alt="Member ${name}'s profile picture">
        </div>
        <div class="${infoClass}">
          ${infoPrimary}
          ${infoSecondary}
        </div>
        <div class="${otherClass}">
          ${other}
        </div>
      </li>`;

  return html;
};