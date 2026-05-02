const seed = {
  marketplace: {
    creditsName: "minutes",
    startingBalance: 240,
    categories: ["All", "Design", "Engineering", "Language", "Career", "Care", "Admin", "Fitness", "Creative"],
    featuredOffers: [
      {
        id: "offer-ux-review",
        name: "Mira Chen",
        title: "UX teardown for early products",
        category: "Design",
        minutes: 45,
        rate: 45,
        rating: 4.9,
        completed: 128,
        availability: "Today, 7:30 PM",
        trust: "Verified mentor",
        description: "Screen-share review of flows, friction, copy, and conversion risks for MVPs."
      },
      {
        id: "offer-debug",
        name: "Arjun Rao",
        title: "Pair debugging for JavaScript apps",
        category: "Engineering",
        minutes: 60,
        rate: 60,
        rating: 4.8,
        completed: 94,
        availability: "Tomorrow, 10:00 AM",
        trust: "Top responder",
        description: "Focused bug hunt with a written fix summary and suggested tests."
      },
      {
        id: "offer-spanish",
        name: "Lucia Torres",
        title: "Conversational Spanish practice",
        category: "Language",
        minutes: 30,
        rate: 25,
        rating: 5,
        completed: 211,
        availability: "Weekdays",
        trust: "Community steward",
        description: "Natural conversation, pronunciation notes, and a short vocabulary recap."
      },
      {
        id: "offer-career",
        name: "Nadia Okafor",
        title: "Career narrative and interview prep",
        category: "Career",
        minutes: 50,
        rate: 55,
        rating: 4.9,
        completed: 76,
        availability: "Friday, 6:00 PM",
        trust: "Background checked",
        description: "Clarify your story, practice answers, and leave with a stronger positioning note."
      }
    ],
    requests: [
      { id: "request-tax", title: "Need help organizing freelance invoices", category: "Admin", budget: 40, urgency: "This week" },
      { id: "request-logo", title: "Need a second pair of eyes on logo sketches", category: "Creative", budget: 30, urgency: "Today" },
      { id: "request-walk", title: "Accountability call before morning workout", category: "Fitness", budget: 15, urgency: "Daily" }
    ]
  }
};

const state = {
  activeCategory: "All",
  query: "",
  spendable: seed.marketplace.startingBalance,
  held: 0,
  earned: 0,
  requests: [...seed.marketplace.requests]
};

const storageKey = "timefoundry.mvp.state";

const elements = {
  balanceHero: document.querySelector("#balanceHero"),
  filters: document.querySelector("#filters"),
  offerGrid: document.querySelector("#offerGrid"),
  requestList: document.querySelector("#requestList"),
  searchInput: document.querySelector("#searchInput"),
  spendable: document.querySelector("#spendable"),
  held: document.querySelector("#held"),
  earned: document.querySelector("#earned"),
  requestForm: document.querySelector("#requestForm"),
  toast: document.querySelector("#toast"),
  runAgent: document.querySelector("#runAgent"),
  agentOutput: document.querySelector("#agentOutput"),
  themeToggle: document.querySelector("#themeToggle")
};

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function loadState() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "null");
    if (!saved) return;
    state.spendable = Number.isFinite(saved.spendable) ? saved.spendable : state.spendable;
    state.held = Number.isFinite(saved.held) ? saved.held : state.held;
    state.earned = Number.isFinite(saved.earned) ? saved.earned : state.earned;
    state.requests = Array.isArray(saved.requests) ? saved.requests : state.requests;
  } catch {
    window.localStorage.removeItem(storageKey);
  }
}

function saveState() {
  const persisted = {
    spendable: state.spendable,
    held: state.held,
    earned: state.earned,
    requests: state.requests
  };
  window.localStorage.setItem(storageKey, JSON.stringify(persisted));
}

function updateLedger() {
  elements.spendable.textContent = state.spendable;
  elements.held.textContent = state.held;
  elements.earned.textContent = state.earned;
  elements.balanceHero.textContent = `${state.spendable} min`;
}

function renderFilters() {
  elements.filters.innerHTML = "";
  seed.marketplace.categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-chip${state.activeCategory === category ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      state.activeCategory = category;
      renderFilters();
      renderOffers();
    });
    elements.filters.appendChild(button);
  });
}

function offerMatches(offer) {
  const inCategory = state.activeCategory === "All" || offer.category === state.activeCategory;
  const haystack = `${offer.name} ${offer.title} ${offer.category} ${offer.description}`.toLowerCase();
  return inCategory && haystack.includes(state.query.toLowerCase());
}

function renderOffers() {
  elements.offerGrid.innerHTML = "";
  const offers = seed.marketplace.featuredOffers.filter(offerMatches);
  offers.forEach((offer) => {
    const article = document.createElement("article");
    article.className = "offer-card";
    article.innerHTML = `
      <div class="offer-top">
        <span class="avatar">${initials(offer.name)}</span>
        <span class="pill">${offer.category}</span>
      </div>
      <div>
        <h3>${offer.title}</h3>
        <p>${offer.name}</p>
      </div>
      <p>${offer.description}</p>
      <div class="offer-meta">
        <span>${offer.minutes} min block</span>
        <span>${offer.rate} min rate</span>
        <span>${offer.rating} rating</span>
        <span>${offer.completed} trades</span>
        <span>${offer.availability}</span>
        <span>${offer.trust}</span>
      </div>
      <button class="button primary" type="button" data-book="${offer.id}">Book with credits</button>
    `;
    elements.offerGrid.appendChild(article);
  });

  elements.offerGrid.querySelectorAll("[data-book]").forEach((button) => {
    button.addEventListener("click", () => bookOffer(button.dataset.book));
  });

  if (!offers.length) {
    elements.offerGrid.innerHTML = `<p class="body-copy">No matching time blocks yet. Try another category or post a request.</p>`;
  }
}

function bookOffer(id) {
  const offer = seed.marketplace.featuredOffers.find((item) => item.id === id);
  if (!offer) return;
  if (state.spendable < offer.rate) {
    showToast("Not enough spendable minutes for this booking.");
    return;
  }
  state.spendable -= offer.rate;
  state.held += offer.rate;
  updateLedger();
  saveState();
  showToast(`${offer.rate} minutes held for ${offer.name}.`);
}

function renderRequests() {
  elements.requestList.innerHTML = "";
  state.requests.forEach((request) => {
    const article = document.createElement("article");
    article.className = "request-item";
    article.innerHTML = `
      <strong>${request.title}</strong>
      <div><span>${request.category}</span><span>${request.budget} min</span><span>${request.urgency}</span></div>
    `;
    elements.requestList.appendChild(article);
  });
}

function runPlanningLoop() {
  const backlog = [
    "TF-001 Define ledger settlement and dispute rules",
    "TF-003 Create agent registry with budgets",
    "TF-005 Prepare GitHub Pages deployment path"
  ];
  const now = new Date().toLocaleString();
  elements.agentOutput.textContent = [
    `Planning loop run: ${now}`,
    "Cost guardrail: pass, no paid services requested.",
    "Selected next tasks:",
    ...backlog.map((item, index) => `${index + 1}. ${item}`),
    "Stop condition: waiting for implementation agent capacity."
  ].join("\n");
}

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderOffers();
});

elements.requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const request = {
    id: `request-${Date.now()}`,
    title: formData.get("title").toString(),
    category: formData.get("category").toString(),
    budget: Number(formData.get("budget")),
    urgency: "Open"
  };
  state.requests.unshift(request);
  state.spendable = Math.max(0, state.spendable - request.budget);
  state.held += request.budget;
  updateLedger();
  renderRequests();
  saveState();
  event.currentTarget.reset();
  showToast("Request posted and minutes placed on hold.");
});

elements.runAgent.addEventListener("click", runPlanningLoop);

elements.themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

loadState();
renderFilters();
renderOffers();
renderRequests();
updateLedger();
