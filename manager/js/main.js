// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});




// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });



// Calendar JS
const calendar = document.getElementById('calendar');
const newEventModal = document.querySelector('.newEventModal');
const deleteEventModal = document.querySelector('.deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.querySelector('.eventTitleInput');
const eventTitleInput02 = document.querySelector('.eventTitleInput02');
const eventText = document.querySelector(".eventText");
const weekdays = document.getElementById("weekdays");

const content = document.querySelector("#content");
const monthDisplay = document.getElementById("monthDisplay");

let nav = 0;
let clicked = null;
let events = [];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

content.onclick = toggle;

(function get_days() {
  for(let i =0;i<days.length;i++) {
    const div = document.createElement("div");
    div.innerHTML = days[i].substring(0,3);
    weekdays.appendChild(div);
  }
})();

function toggle(e) {
  const t = e.target;
  const date = t.dataset.date;
  if(t.closest('.day')) {
    openModal(date);
  } else if(t.closest(".closeBtn")) {
    closeModal();
  } else if(t.closest(".addBtn")) {
    addEvent(e);
  } else if(t.closest(".updateBtn")) {
    updateEvent(e);
  } else if(t.closest(".removeBtn")) {
    removeEvent();
  } else if(t.closest(".previousBtn")) {
    initPreviousBtn();
  } else if(t.closest(".nextBtn")) {
    initNextBtn();
  } else if(t.closest("#daySquare"))
    openModal();
}

function openModal(date) {
  clicked = date;
  const ref = localStorage.getItem("events");
  if(ref) {
    events = JSON.parse(ref);
    for(let i=0;i<events.length;i++) {
      if (events[i].date == date) {
        eventText.innerHTML = ` 
          <ul>
            <li>Date : <strong>${events[i].date}/</strong></li>
            <li>Event : ${events[i].title}</li>
          </ul>`;
        eventTitleInput02.value = events[i].title;
        deleteEventModal.style.display = 'block';
        newEventModal.style.display = 'none';
      } 
    }
  } 
  newEventModal.style.display = 'block';
  backDrop.style.display = 'block';
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = "none";
  backDrop.style.display = 'none';
  eventTitleInput.value = "";
  clicked = null;
}

function addEvent(e) {
  e.preventDefault();
  if(eventTitleInput.value.length > 3 && eventTitleInput.value.length <= 10) {
    eventTitleInput.classList.remove('error');
    const event = {
      id:Date.now().toString().slice(8),
      date:clicked,
      title:eventTitleInput.value
    };
    events.push(event);
    localStorage.setItem('events',JSON.stringify(events));
    loadCalendar();
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function updateEvent(e) {
  e.preventDefault();
  const ref = localStorage.getItem("events");
  if(ref) {
    const events = JSON.parse(ref);
    for(let i=0;i<events.length;i++) {
      if(events[i].date === clicked) {
        if(eventTitleInput02.value.length > 3 && eventTitleInput02.value.length <= 10 ) {
          eventTitleInput02.classList.remove('error');
          events[i].title = eventTitleInput02.value;
          const event = events[i];
          events.splice(i,1,event);
          localStorage.setItem('events', JSON.stringify(events)); 
          eventText.innerHTML = `
          <ul>
            <li>Date : <strong>${events[i].date}</strong></li>
            <li>Event : ${events[i].title}</li>
          </ul>`;
          eventTitleInput02.value = events[i].title;
          loadCalendar();
        } else {
          eventTitleInput02.classList.add('error');
        }
      }
    }
  }
}

function removeEvent() {
  const ref = localStorage.getItem("events");
  if(ref) {
    const events = JSON.parse(ref);
    for(let i=0;i<events.length;i++) {
      if(events[i].date === clicked) {
        events.splice(i,1);
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
        loadCalendar();
      }
    }
  }
}

function initPreviousBtn() {
  console.log('previousBtn');
  nav--;
  loadCalendar();
}

function initNextBtn() {
  console.log('nextBtn');
  nav++;
  loadCalendar();
}
  
function loadCalendar() {

  calendar.innerHTML = ""; 
  
  const dt = new Date();
  console.log('-- dt : '+dt);
  
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
    console.log("-- nav : "+nav);
    console.log('-- dt.setMonth(new Date().getMonth() + nav) : '+dt.setMonth(new Date().getMonth() + nav));
  }
  
  const year = dt.getFullYear();
  console.log("-- year : "+year);
  
  const month = dt.getMonth();
  console.log("-- month : "+month);
  
  const day = dt.getDate();
  console.log('-- day : '+day);

  const monthString = dt.toLocaleDateString("en-US",{ month:"long"});
  console.log('-- monthString : '+monthString);
  
  monthDisplay.innerHTML = (monthString).substring(0,3)+" "+year;
  
  const firstDayOfMonth = new Date(year,month,1);
  console.log('-- firstDayOfMonth : '+firstDayOfMonth);
  
  const options = {
    weekday:'long',
    year:"numeric",
    month:"numeric",
    day:"numeric"
  }
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-US', options);
  console.log("-- dateString : "+dateString);
  
  const firstDayWeek = dateString.split(',')[0];
  console.log('-- firstDayWeek : '+firstDayWeek);
  
  const paddingDays = days.indexOf(firstDayWeek);
  console.log("-- paddingDays : "+paddingDays);

  const daysInMonth = new Date(year,month + 1,0).getDate();
  console.log("-- daysInMonth : "+ daysInMonth);

  const currentDay00 = nav == 0 ? dt.toLocaleDateString('en-US', options) : "";
  const currentDay = nav == 0 ? currentDay00.split(',')[1] : "";
  console.log('-- currentDay : '+currentDay);
  
  const countDays = paddingDays+daysInMonth;
  console.log('-- countDays : '+countDays);
    
  let days01 = [];
  
  for(let i=1;i<=countDays;i++) {
    const day01 = {
      day:i-paddingDays,
      month:month+1,
      year:year,
      currentDay: i-paddingDays == day && nav == 0 ? true : false
    }
    days01.push(day01);
    localStorage.setItem("calendar",JSON.stringify(days01));
  }
  
  const ref = localStorage.getItem("events");
  
  for(let i=0;i<days01.length;i++) {
    const id = days01[i].id;
    const day01 = days01[i].day;
    console.log('day01 : '+day01);
    const dayString = days01[i].month+"/"+days01[i].day+"/"+days01[i].year;
    let currentDay = days01[i].currentDay;

    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if(day01 > 0) {

      daySquare.setAttribute('data-date',dayString);
      daySquare.textContent = day01;

      if(ref) {
        events = JSON.parse(ref);
        for(let i=0;i<events.length;i++) {
          if(events[i].date == dayString) {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add('event');
            eventDiv.textContent = events[i].title;
            daySquare.appendChild(eventDiv);                 
          }
        }
      }

    } else {
      daySquare.style.visibility = 'hidden';
    } if(currentDay) {
      daySquare.setAttribute("id","currentDay");
    } 
    const test = currentDay == true ? "-- currentDay" : "";
    console.log(`dayString[${i}] : ${dayString} ${test}`);
    calendar.appendChild(daySquare);
  } 

}

loadCalendar();

//  https://github.com/portexe/VanillaCalendar/blob/master/script


