let plans = document.querySelectorAll(".about .plans .plan");
window.onscroll = function () {
  plans.forEach(function (plan) {
    let rect = plan.getBoundingClientRect();

    if (rect.top >= 0 && rect.bottom <= window.innerHeight + 50) {
      plan.classList.add("active");
    }
  });
};
let book = document.querySelector(".book");
book.addEventListener("click", () => {
  book.classList.toggle("active");
});
let planDisabled = document.querySelectorAll(".about .plans .plan.disabled");
planDisabled.forEach((e) => {
  let btn = e.querySelector(".reward .medium.btn");
  btn.innerHTML = "Out of stock";
});
let backers = document.getElementById("backers");
let days = document.getElementById("days");
let consumed = document.getElementById("consumed");
let total = document.getElementById("total");
let progressSpan = document.querySelector(".progress span");

window.onload = function () {
  let consumedVal = parseInt(consumed.dataset.consumed);
  let totalVal = parseInt(total.dataset.total);

  let percentage = Math.trunc((consumedVal / totalVal) * 100);
  progressSpan.style.width = `${percentage}%`;
};
function animateNumberCounter({ element, dataAttr, duration = 2000 }) {
  let end = parseInt(element.dataset[dataAttr]);
  let startTime = null;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;

    let progress = timestamp - startTime;
    let current = Math.min(Math.floor((progress / duration) * end), end);
    if (element == consumed) {
      element.innerHTML = `$${current.toLocaleString()}`;
    } else {
      element.innerHTML = current.toLocaleString();
    }

    if (current < end) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
animateNumberCounter({ element: backers, dataAttr: "backers", duration: 1500 });
animateNumberCounter({ element: days, dataAttr: "days", duration: 1500 });
animateNumberCounter({
  element: consumed,
  dataAttr: "consumed",
  duration: 1500,
});

let pledgePrice = document.querySelectorAll(
  ".pledge .continue .input-wrapper input[type='text']"
);
pledgePrice.forEach((e) => {
  e.addEventListener("keydown", (event) => {
    let allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Delete",
      ".",
    ];

    if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  });
});
let backedPlans = document.querySelectorAll(".backed .plans .plan");

backedPlans.forEach((plan) => {
  plan.addEventListener("click", (e) => {
    if (e.target.closest(".pledge")) return;
    let isActive = plan.classList.contains("active");

    backedPlans.forEach((p) => p.classList.remove("active"));

    if (!isActive) {
      plan.classList.add("active");
    }
  });
});
let back = document.getElementById("back");
let backed = document.getElementById("backed");
let layer = document.getElementById("layer");
let pledge = document.querySelector(".pledge");
back.addEventListener("click", () => {
  backed.classList.remove("hidden");
  layer.classList.remove("hidden");
  backedPlans.forEach((p) => p.classList.remove("active"));
  backedPlans[0].classList.add("active");
});
let closeBtn = document.querySelector("span.close");
closeBtn.addEventListener("click", () => {
  backed.classList.add("hidden");
  layer.classList.add("hidden");
  setTimeout(() => {
    backedPlans.forEach((p) => p.classList.remove("active"));
  }, 500);
});
let continueBtn = document.querySelectorAll("p.continue");
let thanks = document.querySelector(".thanks");
continueBtn.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.previousElementSibling.querySelector("input").value) {
      setTimeout(() => {
        e.previousElementSibling.querySelector("input").value = "";
      }, 600);
      thanks.classList.remove("hidden");
      backed.classList.add("hidden");
    }
  });
});
let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  thanks.classList.add("hidden");
  layer.classList.add("hidden");
  backedPlans.forEach((p) => p.classList.remove("active"));
});
handleClicks();

function handleClicks() {
  document.addEventListener("click", (e) => {
    if (thanks.classList.contains("hidden")) return;

    const isInsideThanks = thanks.contains(e.target);
    const isInsideClear = clear.contains(e.target);
    const isContinueBtn = Array.from(continueBtn).some((btn) =>
      btn.contains(e.target)
    );

    if (!isInsideThanks && !isInsideClear && !isContinueBtn) {
      thanks.classList.add("hidden");
      layer.classList.add("hidden");
    }
  });
}
let rewardBtn = document.querySelectorAll(
  ".about .plans .plan .reward p.medium.btn"
);
rewardBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    backed.classList.remove("hidden");
    layer.classList.remove("hidden");
    backedPlans.forEach((p) => p.classList.remove("active"));

    const parentPlan = btn.closest(".plan");
    const planId = parentPlan.getAttribute("id");
    document.querySelector(`.backed .plan#${planId}`).classList.add("active");
  });
});
let burgerMenu = document.querySelector(".burger-menu");
let headerLinks = document.querySelector(".header__links");
burgerMenu.addEventListener("click", () => {
  if (headerLinks.style.display == "block") {
    headerLinks.style.display = "none";
    layer.classList.add("hidden");
    burgerMenu.querySelector("img:nth-child(2)").style.display = "none";
    burgerMenu.querySelector("img:nth-child(1)").style.display = "block";
  } else {
    headerLinks.style.display = "block";
    layer.classList.remove("hidden");
    burgerMenu.querySelector("img:nth-child(2)").style.display = "block";
    burgerMenu.querySelector("img:nth-child(1)").style.display = "none";
  }
});
