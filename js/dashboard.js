/* =========================================================
   LEGALEASE DASHBOARD SIDEBAR
========================================================= */

const dashboardSidebar =
    document.getElementById("legalease-dashboard-sidebar");

const dashboardMenuToggle =
    document.getElementById("legalease-dashboard-menu-toggle");

const dashboardSidebarOverlay =
    document.getElementById("legalease-dashboard-sidebar-overlay");

const dashboardSidebarClose =
    document.getElementById("legalease-dashboard-sidebar-close");

/* =========================================================
   DASHBOARD DARK MODE AND RTL MODE
========================================================= */

const dashboardThemeToggle =
    document.getElementById("legalease-dashboard-theme-toggle");

const dashboardRtlToggle =
    document.getElementById("legalease-dashboard-rtl-toggle");


function applyDashboardTheme(theme) {

    const isDark = theme === "dark";

    document.documentElement.classList.toggle("dark-mode", isDark);

    if (dashboardThemeToggle) {
        const icon = dashboardThemeToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-moon", !isDark);
            icon.classList.toggle("fa-sun", isDark);
        }
    }

}


function applyDashboardDirection(direction) {

    document.documentElement.setAttribute("dir", direction);

}


const savedDashboardTheme = localStorage.getItem("legalease-theme");
const savedDashboardDirection = localStorage.getItem("legalease-direction");

applyDashboardTheme(savedDashboardTheme === "dark" ? "dark" : "light");
applyDashboardDirection(savedDashboardDirection === "rtl" ? "rtl" : "ltr");


if (dashboardThemeToggle) {

    dashboardThemeToggle.addEventListener("click", function () {

        const newTheme = document.documentElement.classList.contains("dark-mode")
            ? "light"
            : "dark";

        applyDashboardTheme(newTheme);
        localStorage.setItem("legalease-theme", newTheme);

    });

}


if (dashboardRtlToggle) {

    dashboardRtlToggle.addEventListener("click", function () {

        const newDirection = document.documentElement.getAttribute("dir") === "rtl"
            ? "ltr"
            : "rtl";

        applyDashboardDirection(newDirection);
        localStorage.setItem("legalease-direction", newDirection);

    });

}


function openDashboardSidebar() {

    if (!dashboardSidebar) return;

    dashboardSidebar.classList.add("active");

    if (dashboardSidebarOverlay) {
        dashboardSidebarOverlay.classList.add("active");
    }

    if (dashboardMenuToggle) {
        dashboardMenuToggle.setAttribute("aria-expanded", "true");

        const icon =
            dashboardMenuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }

}


function closeDashboardSidebar() {

    if (!dashboardSidebar) return;

    dashboardSidebar.classList.remove("active");

    if (dashboardSidebarOverlay) {
        dashboardSidebarOverlay.classList.remove("active");
    }

    if (dashboardMenuToggle) {
        dashboardMenuToggle.setAttribute("aria-expanded", "false");

        const icon =
            dashboardMenuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

}


if (dashboardMenuToggle) {

    dashboardMenuToggle.addEventListener("click", function () {

        if (dashboardSidebar.classList.contains("active")) {
            closeDashboardSidebar();
        } else {
            openDashboardSidebar();
        }

    });

}


if (dashboardSidebarOverlay) {

    dashboardSidebarOverlay.addEventListener(
        "click",
        closeDashboardSidebar
    );

}


if (dashboardSidebarClose) {

    dashboardSidebarClose.addEventListener(
        "click",
        closeDashboardSidebar
    );

}


/* Close sidebar after clicking a menu item */

const dashboardNavLinks =
    document.querySelectorAll(
        ".legalease-dashboard-nav-link"
    );

dashboardNavLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 1100) {
            closeDashboardSidebar();
        }

    });

});


/* =========================================================
   LOGOUT CONFIRMATION
========================================================= */

const dashboardLogout =
    document.getElementById("legalease-dashboard-logout");

const dashboardLogoutModal =
    document.getElementById("legalease-dashboard-logout-modal");

const dashboardLogoutNo =
    document.getElementById("legalease-dashboard-logout-no");

const dashboardLogoutYes =
    document.getElementById("legalease-dashboard-logout-yes");

const dashboardModalOverlay =
    document.getElementById(
        "legalease-dashboard-modal-overlay"
    );


function openLogoutModal() {

    if (!dashboardLogoutModal) return;

    dashboardLogoutModal.classList.add("active");

    dashboardLogoutModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeLogoutModal() {

    if (!dashboardLogoutModal) return;

    dashboardLogoutModal.classList.remove("active");

    dashboardLogoutModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (dashboardLogout) {

    dashboardLogout.addEventListener("click", function () {
        openLogoutModal();
    });

}


if (dashboardLogoutNo) {

    dashboardLogoutNo.addEventListener(
        "click",
        closeLogoutModal
    );

}


if (dashboardModalOverlay) {

    dashboardModalOverlay.addEventListener(
        "click",
        closeLogoutModal
    );

}


if (dashboardLogoutYes) {

    dashboardLogoutYes.addEventListener(
        "click",
        function () {

            /*
             * Add your actual logout action here.
             * For now, redirecting to the login page.
             */

            window.location.href = "login.html";

        }
    );

}


/* ESC key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeDashboardSidebar();
        closeLogoutModal();

    }

});
