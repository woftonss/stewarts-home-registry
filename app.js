const registryItems = [
  {
    name: "Everyday dinnerware set",
    room: "Kitchen",
    price: "$86",
    priority: "High",
    note: "Simple plates and bowls that can handle daily meals and family dinners.",
  },
  {
    name: "Cast iron Dutch oven",
    room: "Kitchen",
    price: "$72",
    priority: "High",
    note: "For soups, roasts, bread, and the kind of meals that make the kitchen smell alive.",
  },
  {
    name: "Linen throw blanket",
    room: "Living",
    price: "$48",
    priority: "Medium",
    note: "A soft layer for movie nights, slow mornings, and company on the couch.",
  },
  {
    name: "Entryway bench",
    room: "Living",
    price: "$145",
    priority: "Medium",
    note: "A landing spot for shoes, bags, and the everyday rhythm of coming home.",
  },
  {
    name: "Cotton sheet set",
    room: "Bedroom",
    price: "$64",
    priority: "High",
    note: "Breathable basics for making the bedroom calm, simple, and ready.",
  },
  {
    name: "Bedside reading lamps",
    room: "Bedroom",
    price: "$92",
    priority: "Medium",
    note: "Warm evening light for reading, winding down, and making the room feel finished.",
  },
  {
    name: "Patio herb planters",
    room: "Outdoor",
    price: "$38",
    priority: "Low",
    note: "A little green space for basil, mint, rosemary, and summer dinners.",
  },
  {
    name: "Garden hose and reel",
    room: "Outdoor",
    price: "$58",
    priority: "Medium",
    note: "Practical and very welcome for keeping the yard and porch plants healthy.",
  },
  {
    name: "Tool starter kit",
    room: "Essentials",
    price: "$79",
    priority: "High",
    note: "The useful basics for hanging shelves, tightening handles, and fixing small surprises.",
  },
];

const mailingAddress = "Stewart Home Registry, 123 New Home Lane, Your City, ST 00000";
const grid = document.querySelector("#registryGrid");
const filters = [...document.querySelectorAll(".filter")];
const searchInput = document.querySelector("#searchInput");
const copyButton = document.querySelector("#copyAddress");
const copyStatus = document.querySelector("#copyStatus");

let activeFilter = "All";
let searchTerm = "";

function renderItems() {
  const visibleItems = registryItems.filter((item) => {
    const matchesRoom = activeFilter === "All" || item.room === activeFilter;
    const haystack = `${item.name} ${item.room} ${item.priority} ${item.note}`.toLowerCase();
    return matchesRoom && haystack.includes(searchTerm.toLowerCase());
  });

  if (!visibleItems.length) {
    grid.innerHTML = '<p class="empty-state">No registry items match that search yet.</p>';
    return;
  }

  grid.innerHTML = visibleItems
    .map(
      (item) => `
        <article class="registry-card">
          <div class="card-top">
            <span class="room-tag">${item.room}</span>
            <span class="priority-tag">${item.priority}</span>
          </div>
          <h3>${item.name}</h3>
          <p>${item.note}</p>
          <div class="price-row">
            <span class="price">${item.price}</span>
            <a class="button primary" href="mailto:hello@example.com?subject=${encodeURIComponent(
              `Registry gift: ${item.name}`,
            )}">Gift this</a>
          </div>
        </article>
      `,
    )
    .join("");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((filter) => filter.classList.toggle("active", filter === button));
    renderItems();
  });
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderItems();
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(mailingAddress);
    copyStatus.textContent = "Mailing address copied.";
  } catch {
    copyStatus.textContent = mailingAddress;
  }
});

renderItems();
