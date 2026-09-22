/* ==========================================
   LegalEase Header JavaScript
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
       Elements
       ========================================== */

    const mobileToggle =
        document.getElementById("legalease-mobile-toggle");

    const navigation =
        document.getElementById("legalease-navigation");

    const dropdown =
        document.querySelector(".legalease-dropdown");

    const dropdownToggle =
        document.querySelector(".legalease-dropdown-toggle");


    /* ==========================================
       Mobile Menu Toggle
       ========================================== */

    if (mobileToggle && navigation) {

        mobileToggle.addEventListener("click", function () {

            navigation.classList.toggle("active");

            mobileToggle.classList.toggle("active");


            const isOpen =
                navigation.classList.contains("active");


            mobileToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            mobileToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        });

    }


    /* ==========================================
       Home Dropdown
       ========================================== */

    if (dropdownToggle && dropdown) {

        /* Responsive view-la Home dropdown default-ah open aaga koodathu */
        if (window.innerWidth <= 1100) {
            dropdown.classList.remove("active");
        }


        dropdownToggle.addEventListener("click", function (event) {

            /*
             * Desktop-la normal hover dropdown.
             * Tablet/mobile-la click dropdown.
             */

            if (window.innerWidth <= 1100) {

                event.preventDefault();

                dropdown.classList.toggle("active");

            }

        });

    }


    /* ==========================================
       Close Mobile Menu After Link Click
       ========================================== */

    const navigationLinks = navigation
        ? navigation.querySelectorAll(
            ".legalease-menu-item:not(.legalease-dropdown) a"
        )
        : [];


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1100) {

                navigation.classList.remove("active");

                mobileToggle.classList.remove("active");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* ==========================================
       Close Menu When Clicking Outside
       ========================================== */

    document.addEventListener("click", function (event) {

        if (
            navigation &&
            mobileToggle &&
            window.innerWidth <= 1100 &&
            navigation.classList.contains("active") &&
            !navigation.contains(event.target) &&
            !mobileToggle.contains(event.target)
        ) {

            navigation.classList.remove("active");

            mobileToggle.classList.remove("active");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* ==========================================
       Dark Mode
       ========================================== */

    const themeButtons = [
        document.getElementById("legalease-theme-toggle"),
        document.getElementById("legalease-theme-toggle-desktop")
    ].filter(Boolean);


    function applyTheme(theme) {

        const isDark = theme === "dark";

        document.documentElement.classList.toggle("dark-mode", isDark);

        themeButtons.forEach(function (button) {
            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-moon", !isDark);
                icon.classList.toggle("fa-sun", isDark);
            }
        });

    }


    const savedTheme =
        localStorage.getItem("legalease-theme");


    applyTheme(savedTheme === "dark" ? "dark" : "light");


    themeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const isDark =
                document.documentElement.classList.contains(
                    "dark-mode"
                );


            const newTheme =
                isDark ? "light" : "dark";


            applyTheme(newTheme);


            localStorage.setItem(
                "legalease-theme",
                newTheme
            );

        });

    });


    /* ==========================================
       RTL Mode
       ========================================== */

    const rtlButtons = [
        document.getElementById("legalease-rtl-toggle"),
        document.getElementById("legalease-rtl-toggle-desktop")
    ].filter(Boolean);


    function applyDirection(direction) {

        document.documentElement.setAttribute(
            "dir",
            direction
        );

        syncLoginControls(direction);

    }


    function syncLoginControls(direction) {

        const loginControls = document.querySelector(
            ".legalease-login-controls"
        );

        if (!loginControls) return;

        const isRtl = direction === "rtl";

        loginControls.style.left = isRtl
            ? (window.innerWidth <= 560 ? "16px" : "28px")
            : "";

        loginControls.style.right = isRtl ? "auto" : "";

        /* The page's RTL direction places RTL on the left and Dark Mode on its right. */
        loginControls.style.flexDirection = "";

    }


    const savedDirection =
        localStorage.getItem("legalease-direction");


    applyDirection(savedDirection === "rtl" ? "rtl" : "ltr");


    rtlButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const currentDirection =
                document.documentElement.getAttribute("dir");


            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";


            applyDirection(newDirection);


            localStorage.setItem(
                "legalease-direction",
                newDirection
            );

        });

    });


    /* ==========================================
       Reset Mobile Menu On Desktop Resize
       ========================================== */
    window.addEventListener("resize", function () {

        syncLoginControls(
            document.documentElement.getAttribute("dir")
        );

        if (window.innerWidth <= 1100 && dropdown) {
            dropdown.classList.remove("active");
        }

        if (window.innerWidth > 1100 && navigation && mobileToggle) {

            navigation.classList.remove("active");

            mobileToggle.classList.remove("active");

            if (dropdown) {
                dropdown.classList.remove("active");
            }

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});

/* ==========================================
   SCROLL TO TOP
   ========================================== */

const scrollTopButton = document.getElementById("legalease-scroll-top");

if (scrollTopButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            scrollTopButton.classList.add("active");
        } else {
            scrollTopButton.classList.remove("active");
        }

    });

    scrollTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* ==========================================
   LEGALEASE LOGIN PASSWORD TOGGLE
========================================== */

const passwordToggle = document.getElementById(
    "legalease-password-toggle"
);

const passwordInput = document.getElementById(
    "legalease-login-password"
);

if (passwordToggle && passwordInput) {

    passwordToggle.addEventListener("click", function () {

        const isPassword =
            passwordInput.getAttribute("type") === "password";

        passwordInput.setAttribute(
            "type",
            isPassword ? "text" : "password"
        );

        const icon = passwordToggle.querySelector("i");

        if (isPassword) {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );
        } else {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );
        }

    });

}

/* ==========================================
   REGISTER PASSWORD TOGGLES
========================================== */

const registerPasswordToggle = document.getElementById(
    "legalease-register-password-toggle"
);

const registerPasswordInput = document.getElementById(
    "legalease-register-password"
);

if (registerPasswordToggle && registerPasswordInput) {

    registerPasswordToggle.addEventListener("click", function () {

        const isPassword =
            registerPasswordInput.getAttribute("type") === "password";

        registerPasswordInput.setAttribute(
            "type",
            isPassword ? "text" : "password"
        );

        const icon = registerPasswordToggle.querySelector("i");

        if (isPassword) {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

            registerPasswordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );
        } else {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

            registerPasswordToggle.setAttribute(
                "aria-label",
                "Show password"
            );
        }

    });

}


const registerConfirmToggle = document.getElementById(
    "legalease-register-confirm-toggle"
);

const registerConfirmInput = document.getElementById(
    "legalease-register-confirm-password"
);

if (registerConfirmToggle && registerConfirmInput) {

    registerConfirmToggle.addEventListener("click", function () {

        const isPassword =
            registerConfirmInput.getAttribute("type") === "password";

        registerConfirmInput.setAttribute(
            "type",
            isPassword ? "text" : "password"
        );

        const icon = registerConfirmToggle.querySelector("i");

        if (isPassword) {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

            registerConfirmToggle.setAttribute(
                "aria-label",
                "Hide password"
            );
        } else {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

            registerConfirmToggle.setAttribute(
                "aria-label",
                "Show password"
            );
        }

    });

}
