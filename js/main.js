"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
}); //event

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  } //if
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
}); //event

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
}); //click

const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
}); //btn-click

// Make home slowly fade to transparent as the window scolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
}); //scroll

const arrowUp = document.querySelector(".arrow-up");
//  SHow "arrow up" button when scolling down
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
}); //

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const porjectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter === null) {
    return;
  } //if
  // Remvoe select from the pervoius item and select the Button
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");
  porjectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    porjectContainer.classList.remove("anim-out");
  }, 300); //settimeout
}); //click



//intersection

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const overserverOption = {
  root: null,
  threshold: 0.3,
};

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
} //fun scollFunction

const observerCallback = (enters, observer) => {
  enters.forEach((entry) => {
    if( !entry.isIntersecting && entry.intersectionRatio >0 ){ //나가는요소
      const index = sectionIds.indexOf(`#${entry.target.id}`);// << 요소게 맞는 위치를 확인함 음수 일 경우는 배열에 없는 값임      
      //스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0){//<< intersectionObserver 내장 함수
        selectedNavIndex = index + 1; //요소가 위로감
      }else{        
        selectedNavIndex = index - 1; //요소가 아래로감
      }//if~else
    }//if
  }); //forEach
};

const observer = new IntersectionObserver(observerCallback, overserverOption);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel',()=>{
  
  if(window.scrollY === 0){
    //최상단 일때
    selectedNavIndex = 0;
  } else if (  Math.ceil( window.scrollY + window.innerHeight ) === document.body.clientHeight){
    selectedNavIndex = navItems.length-1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});//scroll
