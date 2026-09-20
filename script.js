/* =========================================================
   SAHYOG - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    id: "electrician",
    name: "Switch & socket replacement",
    category: "electrician",
    desc: "Replace faulty switches, sockets and small electrical fittings.",
    price: "₹49+",
    range: "₹49–₹299",
    rating: "4.9",
    worker: "Raj Kumar",
    icon: "⚡",
    tone: "blue"
  },
  {
    id: "fan",
    name: "Fan repair & installation",
    category: "electrician",
    desc: "Ceiling, exhaust and wall fan repair or installation.",
    price: "₹109+",
    range: "₹109–₹499",
    rating: "4.8",
    worker: "Aman Verma",
    icon: "◉",
    tone: "green"
  },
  {
    id: "plumbing",
    name: "Tap & pipe repair",
    category: "plumber",
    desc: "Leaks, taps, pipes and common bathroom plumbing issues.",
    price: "₹149+",
    range: "₹149–₹399",
    rating: "4.8",
    worker: "Mohit Singh",
    icon: "🔧",
    tone: "orange"
  },
  {
    id: "cleaning",
    name: "Deep home cleaning",
    category: "cleaning",
    desc: "Detailed cleaning for rooms, kitchens and bathrooms.",
    price: "₹499+",
    range: "₹499–₹1,499",
    rating: "4.9",
    worker: "Priya Sharma",
    icon: "✦",
    tone: "pink"
  },
  {
    id: "ac",
    name: "AC service & repair",
    category: "ac",
    desc: "Routine service, cooling problems and common AC repairs.",
    price: "₹299+",
    range: "₹299–₹899",
    rating: "4.7",
    worker: "Aman Verma",
    icon: "❄",
    tone: "cyan"
  },
  {
    id: "bathroom",
    name: "Bathroom intensive cleaning",
    category: "cleaning",
    desc: "Deep cleaning for bathroom surfaces, fittings and tiles.",
    price: "₹399+",
    range: "₹399–₹899",
    rating: "4.8",
    worker: "Neha Kaur",
    icon: "✦",
    tone: "purple"
  },
  {
    id: "carpenter",
    name: "Minor wooden door repair",
    category: "carpenter",
    desc: "Door alignment, hinges, handles and minor wood repairs.",
    price: "₹129+",
    range: "₹129–₹499",
    rating: "4.8",
    worker: "Sandeep Kumar",
    icon: "⌘",
    tone: "brown"
  },
  {
    id: "drill",
    name: "Drill & hang wall decor",
    category: "carpenter",
    desc: "Professional drilling and wall-mounting for home items.",
    price: "₹49+",
    range: "₹49–₹199",
    rating: "4.8",
    worker: "Sandeep Kumar",
    icon: "⊙",
    tone: "yellow"
  }
];


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

const grid = document.getElementById("serviceGrid");
const toast = document.getElementById("toast");

let selectedService = null;
let authMode = "login";
let professionalAuthMode = "signup";


const toneClass = {
  blue: "tone-blue",
  green: "tone-green",
  orange: "tone-orange",
  pink: "tone-pink",
  cyan: "tone-cyan",
  purple: "tone-purple",
  brown: "tone-brown",
  yellow: "tone-yellow"
};


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.add("open");
  }
}


function closeModal(id) {

  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("open");
  }
}


/* =========================================================
   RENDER SERVICES
========================================================= */

function renderServices(list = services) {

  if (!grid) return;

  if (!list.length) {

    grid.innerHTML = `
      <div class="empty-state">
        No service found.
        Try “electrician”, “plumber”, “AC” or “cleaning”.
      </div>
    `;

    return;
  }


  grid.innerHTML = list.map(service => `

    <article class="service-card">

      <div class="service-image ${toneClass[service.tone]}">
        <span>${service.icon}</span>
      </div>

      <div class="service-body">

        <h3>${service.name}</h3>

        <p>${service.desc}</p>

        <div class="service-meta">

          <span class="rating">
            <b>★</b>
            ${service.rating} · Verified profile
          </span>

          <span class="price">
            ${service.price}
          </span>

        </div>

        <button
          class="book-btn"
          data-book="${service.id}"
        >
          View & book
        </button>

      </div>

    </article>

  `).join("");
}


/* =========================================================
   BOOKING MODAL
========================================================= */

document.addEventListener("click", event => {

  const bookButton =
    event.target.closest("[data-book]");


  if (bookButton) {

    selectedService =
      services.find(
        service =>
          service.id === bookButton.dataset.book
      );


    if (!selectedService) {
      return;
    }


    const title =
      document.getElementById("bookingTitle");

    const description =
      document.getElementById("bookingDescription");

    const price =
      document.getElementById("bookingPrice");

    const worker =
      document.getElementById("bookingWorker");

    const rating =
      document.getElementById("bookingRating");


    if (title) {
      title.textContent =
        `Book ${selectedService.name}`;
    }


    if (description) {
      description.textContent =
        selectedService.desc;
    }


    if (price) {
      price.textContent =
        selectedService.range;
    }


    if (worker) {
      worker.textContent =
        selectedService.worker;
    }


    if (rating) {
      rating.textContent =
        `★ ${selectedService.rating}`;
    }


    const date = new Date();

    date.setDate(
      date.getDate() + 1
    );


    const bookingDate =
      document.getElementById("bookingDate");


    if (bookingDate) {

      bookingDate.value =
        date.toISOString().split("T")[0];

    }


    openModal("bookingModal");

  }


  const closeButton =
    event.target.closest("[data-close]");


  if (closeButton) {

    closeModal(
      closeButton.dataset.close
    );

  }

});


/* =========================================================
   CATEGORY FILTER
========================================================= */

document
  .querySelectorAll(".category")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".category")
          .forEach(item =>
            item.classList.remove("active")
          );


        button.classList.add("active");


        const category =
          button.dataset.category;


        renderServices(
          category === "all"
            ? services
            : services.filter(
                service =>
                  service.category === category
              )
        );

      }
    );

  });


/* =========================================================
   SEARCH
========================================================= */

function doSearch(term) {

  const value =
    term.trim().toLowerCase();


  const result =
    services.filter(service =>
      `${service.name} ${service.category} ${service.desc}`
        .toLowerCase()
        .includes(value)
    );


  renderServices(
    value ? result : services
  );


  const servicesSection =
    document.getElementById("services");


  if (servicesSection) {

    servicesSection.scrollIntoView({
      behavior: "smooth"
    });

  }


  showToast(
    value
      ? `${result.length} matching service${result.length !== 1 ? "s" : ""} found`
      : "Showing all services"
  );
}


const searchButton =
  document.getElementById("searchBtn");


if (searchButton) {

  searchButton.addEventListener(
    "click",
    () => {

      const input =
        document.getElementById("serviceSearch");


      doSearch(
        input ? input.value : ""
      );

    }
  );

}


const searchInput =
  document.getElementById("serviceSearch");


if (searchInput) {

  searchInput.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        doSearch(event.target.value);
      }

    }
  );

}


document
  .querySelectorAll("[data-search]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        doSearch(
          button.dataset.search
        );

      }
    );

  });


/* =========================================================
   VIEW ALL SERVICES
========================================================= */

const viewAllButton =
  document.getElementById("viewAllBtn");


if (viewAllButton) {

  viewAllButton.addEventListener(
    "click",
    () => {

      document
        .querySelectorAll(".category")
        .forEach(item =>
          item.classList.remove("active")
        );


      const allCategory =
        document.querySelector(
          '[data-category="all"]'
        );


      if (allCategory) {
        allCategory.classList.add("active");
      }


      renderServices(services);


      const servicesSection =
        document.getElementById("services");


      if (servicesSection) {

        servicesSection.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

}


/* =========================================================
   CREATE BOOKING
========================================================= */

const confirmBooking =
  document.getElementById("confirmBooking");


if (confirmBooking) {

  confirmBooking.addEventListener(
    "click",
    async () => {

      if (!selectedService) {
        return;
      }


      const date =
        document.getElementById(
          "bookingDate"
        ).value;


      const time =
        document.getElementById(
          "bookingTime"
        ).value;


      if (!date || !time) {

        showToast(
          "Please select date and time."
        );

        return;
      }


      if (confirmBooking.disabled) {
        return;
      }


      confirmBooking.disabled = true;

      confirmBooking.textContent =
        "Confirming...";


      try {

        const {
          data: {
            session
          }
        } =
          await supabaseClient.auth.getSession();


        if (!session) {

          showToast(
            "Please login before booking."
          );

          return;
        }


        const response =
          await fetch(
            "http://localhost:5000/api/bookings",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                "Authorization":
                  `Bearer ${session.access_token}`
              },

              body: JSON.stringify({

                service:
                  selectedService.name,

                date:
                  date,

                time:
                  time,

                worker:
                  selectedService.worker

              })
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Booking failed"
          );

        }


        closeModal(
          "bookingModal"
        );


        showToast(
          `Booking confirmed for ${date} at ${time}`
        );


        console.log(
          "SAHYOG booking:",
          data.booking
        );


      } catch (error) {

        console.error(
          "Booking error:",
          error
        );


        showToast(
          error.message ||
          "Could not create booking."
        );


      } finally {

        confirmBooking.disabled =
          false;

        confirmBooking.textContent =
          "Confirm Booking";

      }

    }
  );

}


/* =========================================================
   AI SMART MATCH
========================================================= */

const aiRules = [

  {
    keys: [
      "tap",
      "pipe",
      "leak",
      "leaking",
      "water",
      "faucet",
      "sink",
      "drain",
      "toilet",
      "flush",
      "bathroom",
      "water leakage"
    ],

    service:
      "Plumber · Tap & pipe repair",

    price:
      "₹149–₹399",

    priority:
      "Normal priority",

    why:
      "Your description indicates a plumbing-related problem."
  },


  {
    keys: [
      "fan",
      "switch",
      "socket",
      "wire",
      "wiring",
      "light",
      "electric",
      "electricity",
      "plug",
      "short circuit",
      "power",
      "voltage"
    ],

    service:
      "Electrician · Electrical repair",

    price:
      "₹49–₹499",

    priority:
      "Normal priority",

    why:
      "Your description indicates an electrical or wiring-related problem."
  },


  {
    keys: [
      "ac",
      "air conditioner",
      "cooling",
      "split ac",
      "aircon",
      "not cooling",
      "ac service",
      "ac repair"
    ],

    service:
      "AC Service & Repair",

    price:
      "₹299–₹899",

    priority:
      "Normal priority",

    why:
      "Your description indicates an AC service or cooling-related problem."
  },


  {
    keys: [
      "clean",
      "cleaning",
      "dirty",
      "bathroom",
      "kitchen",
      "stain",
      "dust",
      "deep clean",
      "floor",
      "sofa",
      "home cleaning"
    ],

    service:
      "Cleaning · Deep home cleaning",

    price:
      "₹399–₹1,499",

    priority:
      "Normal priority",

    why:
      "Your description indicates a home-cleaning requirement."
  },


  {
    keys: [
      "door",
      "wood",
      "wooden",
      "cupboard",
      "furniture",
      "hinge",
      "carpenter",
      "drawer",
      "table",
      "chair",
      "wardrobe"
    ],

    service:
      "Carpenter · Minor repair",

    price:
      "₹129–₹499",

    priority:
      "Normal priority",

    why:
      "Your description indicates a carpentry or wooden-fixture issue."
  }

];


function smartMatch(text) {

  const lower =
    text.toLowerCase();


  let best = null;
  let score = 0;


  aiRules.forEach(rule => {

    const hits =
      rule.keys.filter(
        key =>
          lower.includes(key)
      ).length;


    if (hits > score) {

      score = hits;
      best = rule;

    }

  });


  if (!best) {

    return {

      service:
        "General home-service assessment",

      price:
        "₹99–₹599",

      priority:
        "Needs clarification",

      why:
        "I couldn't confidently classify the problem from the description."

    };

  }


  return best;
}


const openAiButton =
  document.getElementById("openAiBtn");


if (openAiButton) {

  openAiButton.addEventListener(
    "click",
    () => {

      openModal("aiModal");

    }
  );

}


const aiSubmit =
  document.getElementById("aiSubmit");


if (aiSubmit) {

  aiSubmit.addEventListener(
    "click",
    () => {

      const input =
        document.getElementById(
          "aiInput"
        ).value.trim();


      const resultBox =
        document.getElementById(
          "aiResult"
        );


      if (!resultBox) {
        return;
      }


      if (input.length < 5) {

        resultBox.classList.remove(
          "hidden"
        );


        resultBox.innerHTML = `

          <h3>
            Please describe the problem
            in a little more detail.
          </h3>

          <p>
            Example:
            “My kitchen tap is leaking.”
          </p>

        `;

        return;
      }


      const result =
        smartMatch(input);


      resultBox.classList.remove(
        "hidden"
      );


      resultBox.innerHTML = `

        <h3>
          Suggested: ${result.service}
        </h3>

        <p>
          ${result.why}
        </p>

        <span class="ai-price">
          ${result.price} · ${result.priority}
        </span>

      `;

    }
  );

}


/* =========================================================
   CUSTOMER LOGIN / SIGNUP
========================================================= */

const loginButton =
  document.getElementById("loginBtn");


function prepareCustomerLogin() {

  authMode = "login";


  const eyebrow =
    document.getElementById(
      "simpleEyebrow"
    );

  const title =
    document.getElementById(
      "simpleTitle"
    );

  const text =
    document.getElementById(
      "simpleText"
    );

  const action =
    document.getElementById(
      "simpleAction"
    );

  const toggle =
    document.getElementById(
      "authToggle"
    );


  if (eyebrow) {
    eyebrow.textContent =
      "CUSTOMER LOGIN";
  }


  if (title) {
    title.textContent =
      "Welcome back.";
  }


  if (text) {
    text.textContent =
      "Login to manage your SAHYOG bookings.";
  }


  if (action) {
    action.textContent =
      "Login";
  }


  if (toggle) {
    toggle.textContent =
      "New to SAHYOG? Create account";
  }


  const email =
    document.getElementById(
      "authEmail"
    );

  const password =
    document.getElementById(
      "authPassword"
    );


  if (email) {
    email.value = "";
  }


  if (password) {
    password.value = "";
  }


  openModal("simpleModal");
}


/* =========================================================
   CUSTOMER ACCOUNT BUTTON
========================================================= */

/* =========================================================
   CUSTOMER ACCOUNT BUTTON
========================================================= */

if (loginButton) {

    loginButton.addEventListener(
        "click",
        async () => {

            try {

                const {
                    data: {
                        session
                    }
                } =
                    await supabaseClient.auth.getSession();


                /* -----------------------------------------
                   NO USER LOGGED IN
                ----------------------------------------- */

                if (!session) {

                    prepareCustomerLogin();

                    return;
                }


                /* -----------------------------------------
                   CHECK USER ACCOUNT TYPE
                ----------------------------------------- */

                const user =
                    session.user;

                const accountType =
                    user.user_metadata?.account_type;


                console.log(
                    "SAHYOG account type:",
                    accountType
                );


                /* -----------------------------------------
                   PROFESSIONAL
                ----------------------------------------- */

                if (
                    accountType ===
                    "professional"
                ) {

                    if (
                        typeof openProfessionalDashboard ===
                        "function"
                    ) {

                        await openProfessionalDashboard();

                    } else {

                        console.error(
                            "openProfessionalDashboard() is missing."
                        );

                        showToast(
                            "Professional dashboard is not available."
                        );
                    }

                    return;
                }


                /* -----------------------------------------
                   CUSTOMER
                ----------------------------------------- */

                await openCustomerPortal();

            }

            catch (error) {

                console.error(
                    "Account button error:",
                    error
                );

                showToast(
                    "Unable to open your account."
                );

            }

        }
    );

}


/* =========================================================
   CUSTOMER LOGIN / SIGNUP TOGGLE
========================================================= */

const authToggle =
  document.getElementById(
    "authToggle"
  );


if (authToggle) {

  authToggle.addEventListener(
    "click",
    () => {

      authMode =
        authMode === "login"
          ? "signup"
          : "login";


      const eyebrow =
        document.getElementById(
          "simpleEyebrow"
        );

      const title =
        document.getElementById(
          "simpleTitle"
        );

      const text =
        document.getElementById(
          "simpleText"
        );

      const action =
        document.getElementById(
          "simpleAction"
        );


      if (authMode === "signup") {

        if (eyebrow) {
          eyebrow.textContent =
            "CUSTOMER SIGN UP";
        }


        if (title) {
          title.textContent =
            "Create your account.";
        }


        if (text) {
          text.textContent =
            "Create an account to book and manage services.";
        }


        if (action) {
          action.textContent =
            "Create account";
        }


        authToggle.textContent =
          "Already have an account? Login";


      } else {

        if (eyebrow) {
          eyebrow.textContent =
            "CUSTOMER LOGIN";
        }


        if (title) {
          title.textContent =
            "Welcome back.";
        }


        if (text) {
          text.textContent =
            "Login to manage your SAHYOG bookings.";
        }


        if (action) {
          action.textContent =
            "Login";
        }


        authToggle.textContent =
          "New to SAHYOG? Create account";

      }

    }
  );

}


/* =========================================================
   CUSTOMER SUPABASE AUTHENTICATION
========================================================= */

const simpleAction =
  document.getElementById(
    "simpleAction"
  );


if (simpleAction) {

  simpleAction.addEventListener(
    "click",
    async () => {

      const email =
        document.getElementById(
          "authEmail"
        ).value.trim();


      const password =
        document.getElementById(
          "authPassword"
        ).value;


      if (!email || !password) {

        showToast(
          "Please enter email and password."
        );

        return;
      }


      if (password.length < 6) {

        showToast(
          "Password must be at least 6 characters."
        );

        return;
      }


      simpleAction.disabled =
        true;


      try {

        let result;


        if (authMode === "signup") {

          result =
            await supabaseClient.auth.signUp({

              email:
                email,

              password:
                password

            });

        } else {

          result =
            await supabaseClient.auth.signInWithPassword({

              email:
                email,

              password:
                password

            });

        }


        const {
          data,
          error
        } = result;


        if (error) {

          console.error(
            "Customer authentication error:",
            error
          );

          showToast(
            error.message
          );

          return;
        }


        if (
          authMode === "signup" &&
          !data.session
        ) {

          showToast(
            "Account created. Please check your email to verify your account."
          );

          return;
        }


        closeModal(
          "simpleModal"
        );


        showToast(
          `Welcome to SAHYOG, ${data.user?.email || email}`
        );


        updateAuthUI();


      } catch (error) {

        console.error(
          "Authentication error:",
          error
        );

        showToast(
          error.message ||
          "Something went wrong. Please try again."
        );

      } finally {

        simpleAction.disabled =
          false;

      }

    }
  );

}


/* =========================================================
   PROFESSIONAL REGISTRATION
========================================================= */


const joinBtn =
  document.getElementById("joinBtn") ||
  document.getElementById("professionalJoinBtn");

const professionalAuthAction =
  document.getElementById(
    "professionalAuthAction"
  );


const professionalAuthToggle =
  document.getElementById(
    "professionalAuthToggle"
  );


function showProfessionalSignup() {

  professionalAuthMode =
    "signup";


  const eyebrow =
    document.getElementById(
      "professionalAuthEyebrow"
    );

  const title =
    document.getElementById(
      "professionalAuthTitle"
    );

  const text =
    document.getElementById(
      "professionalAuthText"
    );


  if (eyebrow) {

    eyebrow.textContent =
      "PROFESSIONAL REGISTRATION";

  }


  if (title) {

    title.textContent =
      "Join SAHYOG.";

  }


  if (text) {

    text.textContent =
      "Create your professional account and start receiving service requests.";

  }


  if (professionalAuthAction) {

    professionalAuthAction.textContent =
      "Create Professional Account";

  }


  if (professionalAuthToggle) {

    professionalAuthToggle.textContent =
      "Already have an account? Login";

  }


  const name =
    document.getElementById(
      "professionalName"
    );

  const category =
    document.getElementById(
      "professionalCategory"
    );

  const experience =
    document.getElementById(
      "professionalExperience"
    );


  if (name) {

    name.parentElement.style.display =
      "block";

  }


  if (category) {

    category.parentElement.style.display =
      "block";

  }


  if (experience) {

    experience.parentElement.style.display =
      "block";

  }


  openModal(
    "professionalAuthModal"
  );
}


if (joinBtn) {

  joinBtn.addEventListener(
    "click",
    () => {

      showProfessionalSignup();

    }
  );

}


/* =========================================================
   PROFESSIONAL LOGIN / SIGNUP TOGGLE
========================================================= */

if (professionalAuthToggle) {

  professionalAuthToggle.addEventListener(
    "click",
    () => {

      professionalAuthMode =
        professionalAuthMode === "signup"
          ? "login"
          : "signup";


      const eyebrow =
        document.getElementById(
          "professionalAuthEyebrow"
        );

      const title =
        document.getElementById(
          "professionalAuthTitle"
        );

      const text =
        document.getElementById(
          "professionalAuthText"
        );


      const name =
        document.getElementById(
          "professionalName"
        );

      const category =
        document.getElementById(
          "professionalCategory"
        );

      const experience =
        document.getElementById(
          "professionalExperience"
        );


      if (
        professionalAuthMode ===
        "login"
      ) {

        if (eyebrow) {

          eyebrow.textContent =
            "PROFESSIONAL LOGIN";

        }


        if (title) {

          title.textContent =
            "Welcome back.";

        }


        if (text) {

          text.textContent =
            "Login to manage your SAHYOG service requests.";

        }


        professionalAuthAction.textContent =
          "Login";


        professionalAuthToggle.textContent =
          "New to SAHYOG? Create professional account";


        if (name) {

          name.parentElement.style.display =
            "none";

        }


        if (category) {

          category.parentElement.style.display =
            "none";

        }


        if (experience) {

          experience.parentElement.style.display =
            "none";

        }


      } else {

        showProfessionalSignup();

      }

    }
  );

}


/* =========================================================
   PROFESSIONAL AUTHENTICATION
========================================================= */

if (professionalAuthAction) {

  professionalAuthAction.addEventListener(
    "click",
    async () => {

      const name =
        document.getElementById(
          "professionalName"
        )?.value.trim();


      const email =
        document.getElementById(
          "professionalEmail"
        )?.value.trim();


      const password =
        document.getElementById(
          "professionalPassword"
        )?.value;


      const category =
        document.getElementById(
          "professionalCategory"
        )?.value;


      const experience =
        document.getElementById(
          "professionalExperience"
        )?.value;


      if (!email || !password) {

        showToast(
          "Please enter email and password."
        );

        return;
      }


      if (password.length < 6) {

        showToast(
          "Password must be at least 6 characters."
        );

        return;
      }


      if (
        professionalAuthMode ===
        "signup" &&
        (!name || !category)
      ) {

        showToast(
          "Please complete your professional details."
        );

        return;
      }


      professionalAuthAction.disabled =
        true;


      try {

        let result;


        if (
          professionalAuthMode ===
          "signup"
        ) {

          result =
            await supabaseClient.auth.signUp({

              email:
                email,

              password:
                password,

              options: {

                data: {

                  full_name:
                    name,

                  account_type:
                    "professional",

                  service_category:
                    category,

                  experience_years:
                    experience

                }

              }

            });

        } else {

          result =
            await supabaseClient.auth
              .signInWithPassword({

                email:
                  email,

                password:
                  password

              });

        }


        const {
          data,
          error
        } = result;


        if (error) {

          console.error(
            "Professional authentication error:",
            error
          );

          showToast(
            error.message
          );

          return;
        }


        if (
          professionalAuthMode ===
          "signup" &&
          !data.session
        ) {

          showToast(
            "Professional account created. Please verify your email, then login."
          );

          return;
        }


        closeModal(
          "professionalAuthModal"
        );


        showToast(
          professionalAuthMode ===
          "signup"
            ? "Professional account created successfully!"
            : "Welcome back, professional!"
        );


      } catch (error) {

        console.error(
          "Professional authentication error:",
          error
        );

        showToast(
          error.message ||
          "Something went wrong."
        );

      } finally {

        professionalAuthAction.disabled =
          false;

      }

    }
  );

}


/* =========================================================
   CUSTOMER PORTAL
========================================================= */

async function updateCustomerPortal() {

  const {
    data: {
      session
    }
  } =
    await supabaseClient.auth.getSession();


  if (!session) {

    showToast(
      "Please login first."
    );

    return;
  }


  const emailElement =
    document.getElementById(
      "customerEmail"
    );


  if (emailElement) {

    emailElement.textContent =
      session.user.email;

  }


  const totalElement =
    document.getElementById(
      "totalBookings"
    );


  const pendingElement =
    document.getElementById(
      "pendingBookings"
    );


  const bookingsContainer =
    document.getElementById(
      "customerBookings"
    );


  openModal(
    "customerPortalModal"
  );


  if (bookingsContainer) {

    bookingsContainer.innerHTML = `

      <div class="portal-empty">
        Loading your bookings...
      </div>

    `;

  }


  try {

    const response =
      await fetch(
        "http://localhost:5000/api/bookings",
        {

          method:
            "GET",

          headers: {

            "Authorization":
              `Bearer ${session.access_token}`

          }

        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Could not load bookings."
      );

    }


    const bookings =
      data.bookings || [];


    if (totalElement) {

      totalElement.textContent =
        bookings.length;

    }


    const pendingCount =
      bookings.filter(
        booking =>
          String(
            booking.status
          ).toLowerCase() ===
          "pending"
      ).length;


    if (pendingElement) {

      pendingElement.textContent =
        pendingCount;

    }


    if (!bookingsContainer) {
      return;
    }


    if (!bookings.length) {

      bookingsContainer.innerHTML = `

        <div class="portal-empty">

          <strong>
            No bookings yet.
          </strong>

          <p>
            Your SAHYOG bookings
            will appear here.
          </p>

        </div>

      `;

      return;
    }


    bookingsContainer.innerHTML =
      bookings.map(
        booking => {

          const status =
            String(
              booking.status ||
              "pending"
            ).toLowerCase();


          return `

            <div class="portal-booking">

              <div class="portal-booking-top">

                <div>

                  <h4>
                    ${booking.service_name || "Home service"}
                  </h4>

                  <p class="portal-booking-professional">
                    Professional:
                    ${booking.worker_name || "Assigned professional"}
                  </p>

                </div>


                <span class="status-badge ${status}">
                  ${status}
                </span>

              </div>


              <div class="portal-booking-meta">

                <span>
                  📅
                  ${booking.date || "Date not available"}
                </span>

                <span>
                  🕒
                  ${booking.time || "Time not available"}
                </span>

              </div>

            </div>

          `;

        }
      ).join("");


  } catch (error) {

    console.error(
      "Customer portal error:",
      error
    );


    if (bookingsContainer) {

      bookingsContainer.innerHTML = `

        <div class="portal-empty">

          Could not load your bookings.
          Please try again.

        </div>

      `;

    }

  }

}


async function openCustomerPortal() {

    const {
        data: {
            session
        }
    } = await supabaseClient.auth.getSession();

    if (!session) {
        showToast(
            "Please login to view your account."
        );

        return;
    }

    // User is logged in
    openModal("customerPortalModal");

    await updateCustomerPortal();
}


/* =========================================================
   LOGOUT
========================================================= */

const logoutButton =
  document.getElementById(
    "logoutBtn"
  );


if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    async () => {

      try {

        const {
          error
        } =
          await supabaseClient.auth.signOut();


        if (error) {

          throw error;

        }


        closeModal(
          "customerPortalModal"
        );


        showToast(
          "You have been logged out."
        );


        updateAuthUI();


      } catch (error) {

        console.error(
          "Logout error:",
          error
        );


        showToast(
          "Could not logout. Please try again."
        );

      }

    }
  );

}


/* =========================================================
   AUTH UI STATE
========================================================= */

async function updateAuthUI() {

  const accountButton =
    document.getElementById(
      "loginBtn"
    );


  if (!accountButton) {
    return;
  }


  try {

    const {
      data: {
        session
      }
    } =
      await supabaseClient.auth.getSession();


    if (session) {

      accountButton.textContent =
        session.user.email ||
        "My Account";


      accountButton.classList.add(
        "logged-in"
      );


    } else {

      accountButton.textContent =
        "Login";


      accountButton.classList.remove(
        "logged-in"
      );

    }


  } catch (error) {

    console.error(
      "Auth UI error:",
      error
    );

  }

}


/* =========================================================
   AUTH STATE CHANGE
========================================================= */

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    const accountButton =
      document.getElementById(
        "loginBtn"
      );


    if (!accountButton) {
      return;
    }


    if (session) {

      accountButton.textContent =
        session.user.email ||
        "My Account";


      accountButton.classList.add(
        "logged-in"
      );


    } else {

      accountButton.textContent =
        "Login";


      accountButton.classList.remove(
        "logged-in"
      );

    }

  }
);


/* =========================================================
   LOCATION
========================================================= */

const locationButton =
  document.getElementById(
    "locationBtn"
  );


if (locationButton) {

  locationButton.addEventListener(
    "click",
    () => {

      const location =
        prompt(
          "Enter your city/locality:",
          "Ludhiana"
        );


      if (
        location &&
        location.trim()
      ) {

        const locationText =
          document.getElementById(
            "locationText"
          );


        if (locationText) {

          locationText.textContent =
            location.trim();

        }

      }

    }
  );

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById(
    "menuBtn"
  );


if (menuButton) {

  menuButton.addEventListener(
    "click",
    () => {

      const mobileMenu =
        document.getElementById(
          "mobileMenu"
        );


      if (mobileMenu) {

        mobileMenu.classList.toggle(
          "open"
        );

      }

    }
  );

}


document
  .querySelectorAll(
    ".mobile-menu a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        const mobileMenu =
          document.getElementById(
            "mobileMenu"
          );


        if (mobileMenu) {

          mobileMenu.classList.remove(
            "open"
          );

        }

      }
    );

  });


/* =========================================================
   CLOSE MODAL BY OUTSIDE CLICK
========================================================= */

document
  .querySelectorAll(
    ".modal-overlay"
  )
  .forEach(overlay => {

    overlay.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          overlay
        ) {

          overlay.classList.remove(
            "open"
          );

        }

      }
    );

  });


/* =========================================================
   START WEBSITE
========================================================= */

renderServices();

updateAuthUI();

console.log(
  "SAHYOG JavaScript loaded successfully."
);
/* =========================================================
   PROFESSIONAL DASHBOARD
========================================================= */

async function openProfessionalDashboard() {

    try {

        /* -----------------------------------------
           GET CURRENT SESSION
        ----------------------------------------- */

        const {
            data: {
                session
            }
        } = await supabaseClient.auth.getSession();


        if (!session) {

            showToast("Please login first.");

            return;
        }


        /* -----------------------------------------
           GET PROFESSIONAL DATA
        ----------------------------------------- */

        const user = session.user;

        const metadata =
            user.user_metadata || {};


        const email =
            user.email || "Professional";


        const category =
            metadata.service_category ||
            "Professional Service";


        const experience =
            metadata.experience_years ||
            0;


        /* -----------------------------------------
           UPDATE DASHBOARD INFORMATION
        ----------------------------------------- */

        const emailElement =
            document.getElementById(
                "professionalDashboardEmail"
            );

        const categoryElement =
            document.getElementById(
                "professionalCategoryDisplay"
            );

        const experienceElement =
            document.getElementById(
                "professionalExperienceDisplay"
            );

        const kycElement =
            document.getElementById(
                "professionalKycDisplay"
            );


        if (emailElement) {

            emailElement.textContent =
                email;

        }


        if (categoryElement) {

            categoryElement.textContent =
                category;

        }


        if (experienceElement) {

            experienceElement.textContent =
                experience;

        }


        if (kycElement) {

            kycElement.textContent =
                "Pending";

        }


        /* -----------------------------------------
           AVAILABILITY
        ----------------------------------------- */

        const availabilityToggle =
            document.getElementById(
                "professionalAvailabilityToggle"
            );

        const availabilityText =
            document.getElementById(
                "professionalAvailabilityText"
            );


        const savedAvailability =
            localStorage.getItem(
                "sahyog_professional_available"
            );


        if (availabilityToggle) {

            if (savedAvailability === null) {

                availabilityToggle.checked = true;

            } else {

                availabilityToggle.checked =
                    savedAvailability === "true";

            }

        }


        if (availabilityText) {

            availabilityText.textContent =
                availabilityToggle &&
                availabilityToggle.checked
                    ? "Available"
                    : "Unavailable";

        }


        /* -----------------------------------------
           AVAILABILITY CHANGE
        ----------------------------------------- */

        if (
            availabilityToggle &&
            !availabilityToggle.dataset.listenerAttached
        ) {

            availabilityToggle.addEventListener(
                "change",
                () => {

                    const available =
                        availabilityToggle.checked;


                    localStorage.setItem(
                        "sahyog_professional_available",
                        String(available)
                    );


                    if (availabilityText) {

                        availabilityText.textContent =
                            available
                                ? "Available"
                                : "Unavailable";

                    }


                    showToast(
                        available
                            ? "You are now available."
                            : "You are now unavailable."
                    );

                }
            );


            availabilityToggle.dataset.listenerAttached =
                "true";
        }


        /* -----------------------------------------
           SERVICE REQUESTS
        ----------------------------------------- */

        const bookingsContainer =
            document.getElementById(
                "professionalBookings"
            );


        if (bookingsContainer) {

            bookingsContainer.innerHTML = `
                <div class="portal-empty">
                    <strong>No service requests yet.</strong>
                    <p>
                        New customer requests will appear here.
                    </p>
                </div>
            `;

        }


        /* -----------------------------------------
           OPEN PROFESSIONAL DASHBOARD
        ----------------------------------------- */

        openModal(
            "professionalDashboardModal"
        );

    }

    catch (error) {

        console.error(
            "Professional dashboard error:",
            error
        );


        showToast(
            "Unable to open professional dashboard."
        );

    }

}


/* =========================================================
   PROFESSIONAL LOGOUT
========================================================= */

const professionalLogoutBtn =
    document.getElementById(
        "professionalLogoutBtn"
    );


if (professionalLogoutBtn) {

    professionalLogoutBtn.addEventListener(
        "click",
        async () => {

            try {

                const {
                    error
                } =
                    await supabaseClient.auth.signOut();


                if (error) {

                    console.error(
                        "Professional logout error:",
                        error
                    );

                    showToast(
                        "Logout failed."
                    );

                    return;
                }


                closeModal(
                    "professionalDashboardModal"
                );


                updateAuthUI();


                showToast(
                    "Logged out successfully."
                );

            }

            catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

                showToast(
                    "Logout failed."
                );

            }

        }
    );

}