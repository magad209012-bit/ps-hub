// chain_lapse.js
// Loader / Diagnostic فقط

(() => {
    "use strict";

    const state = document.getElementById("state");
    const out = document.getElementById("out");

    function log(text) {
        if (!out) return;

        out.textContent += String(text) + "\n";
        out.scrollTop = out.scrollHeight;
    }

    function setState(text, type = "warn") {
        if (!state) return;

        state.textContent = text;
        state.className = type;
    }

    async function checkFile(file) {
        try {
            log("[CHECK] " + file);

            const response = await fetch("./" + file, {
                method: "GET",
                cache: "no-store"
            });

            if (!response.ok) {
                log(
                    "[FAIL] " +
                    file +
                    " -> HTTP " +
                    response.status
                );

                return false;
            }

            const contentType =
                response.headers.get("content-type") || "";

            if (
                file.endsWith(".html") &&
                contentType.includes("text/html")
            ) {
                log("[OK] " + file);
                return true;
            }

            if (
                file.endsWith(".js") &&
                contentType.includes("text/html")
            ) {
                log(
                    "[FAIL] " +
                    file +
                    " -> HTML returned instead of JavaScript"
                );

                return false;
            }

            log("[OK] " + file);

            return true;

        } catch (error) {

            log(
                "[FAIL] " +
                file +
                " -> " +
                (error.message || error)
            );

            return false;
        }
    }

    async function start() {

        setState("جاري فحص الملفات...", "warn");

        log("");
        log("================================");
        log("MOHAMED RAMADAN - PS4 HUB");
        log("CHAIN LOADER");
        log("================================");
        log("");
        log("URL: " + location.href);
        log("");

        const files = [
            "core.js",
            "mem.js",
            "int64.js",
            "ps4_offsets.js",
            "payload.bin"
        ];

        let failed = false;

        for (const file of files) {

            const result = await checkFile(file);

            if (!result) {
                failed = true;
            }
        }

        log("");
        log("================================");

        if (failed) {

            setState(
                "تم إيقاف الفحص بسبب خطأ في الملفات",
                "bad"
            );

            log(
                "لم يتم العثور على جميع الملفات المطلوبة بشكل صحيح."
            );

        } else {

            setState(
                "تم فحص الملفات بنجاح",
                "ok"
            );

            log(
                "جميع الملفات المطلوبة متاحة."
            );
        }

        log("================================");
    }

    window.addEventListener("error", function (event) {

        log(
            "[JS ERROR] " +
            (event.message || "Unknown error")
        );

    });

    window.addEventListener(
        "unhandledrejection",
        function (event) {

            log(
                "[PROMISE ERROR] " +
                (
                    event.reason?.message ||
                    event.reason ||
                    "Unknown rejection"
                )
            );

        }
    );

    start();

})();
