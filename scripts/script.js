// import { stuData } from './data.js';

// Helper to fetch JSON with CORS fallback via a proxy when the origin blocks it.
const API_URL = "https://dev-foxtrot-fullstacklab.onrender.com/api/classData";
const CORS_PROXY_RAW = "https://api.allorigins.win/raw?url="; // Public demo proxy

async function fetchJsonWithCors(url) {
  try {
    const res = await fetch(url, {
      mode: "cors", // Browser will use CORS preflight if needed
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Fallback through a CORS proxy for demo/dev environments only.
    const proxiedUrl = CORS_PROXY_RAW + encodeURIComponent(url);
    const res = await fetch(proxiedUrl, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw err;
    return await res.json();
  }
}

fetchJsonWithCors(API_URL)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error loading JSON:", error));

// const grid = document.getElementById('cardsGrid');
// const sortSelect = document.getElementById('sortSelect');

// // Default sort: A → Z
// let sortOrder = 'asc';

// function sortData(data) {
//   return data.slice().sort((a, b) => {
//     if (sortOrder === 'asc') {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name.localeCompare(a.name);
//     }
//   });
// }



// function renderCards() {
//   const sorted = sortData(stuData);
//   grid.innerHTML = '';

//   sorted.forEach(item => {
//     const col = document.createElement('div');
//     col.className = 'col-12 col-sm-6 col-lg-4';

//     col.innerHTML = `
//       <div class="card h-100">
//         <img class="card-img-top" src="${item.img}" alt="${item.name}">
//         <div class="card-body">
//           <h5 class="card-title">${item.name}</h5>
//           <div class="d-grid gap-2">
//             <a class="btn btn-primary" href="${item.app}" target="_blank">Play</a>
//             <a class="btn btn-outline-secondary" href="${item.repo}" target="_blank">Repo</a>
//           </div>
//         </div>
//       </div>
//     `;

//     grid.appendChild(col);
//   });
// }

// sortSelect?.addEventListener('change', (e) => {
//   sortOrder = e.target.value;
//   renderCards();
// });

// renderCards();
