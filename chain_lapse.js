// chain_lapse.js
// Loader / Diagnostic

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
                cache: "no-store"
            });

            if (!response.ok) {
                log("[FAIL] " + file + " -> HTTP " + response.status);
                return false;
            }

            const contentType =
                response.headers.get("content-type") || "";

            log("[OK] " + file);
            log("[TYPE] " + contentType);

            return true;

        } catch (error) {
            log("[FAIL] " + file + " -> " + (error.message || error));
            return false;
        }
    }

    async function loadPayload() {
        try {
            log("");
            log("[LOAD] payload.bin");

            const response = await fetch("./payload.bin", {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            const buffer = await response.arrayBuffer();

            log("[OK] payload.bin loaded");
            log("[SIZE] " + buffer.byteLength + " bytes");

            // عرض أول 16 بايت للتأكد أن الملف تم قراءته
            const bytes = new Uint8Array(buffer);
            const preview = Array.from(bytes.slice(0, 16))
                .map(b => b.toString(16).padStart(2, "0"))
                .join(" ");

            log("[HEX] " + preview);

            setState("تم تحميل payload.bin بنجاح", "ok");

            return buffer;

        } catch (error) {
            log("[FAIL] payload.bin -> " + (error.message || error));
            setState("فشل تحميل payload.bin", "bad");
            return null;
        }
    }

    async function start() {

        setState("جاري فحص الملفات...", "warn");

        log("================================");
        log("MOHAMED RAMADAN - PS4 HUB");
        log("CHAIN LOADER");
        log("================================");
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

            setState("يوجد ملف به مشكلة", "bad");
            log("الفحص لم يكتمل.");

        } else {

            log("جميع الملفات المطلوبة متاحة.");
            log("");
            log("بدء تحميل payload.bin...");

            await loadPayload();
        }

        log("================================");
    }

    window.addEventListener("error", event => {
        log("[JS ERROR] " + (event.message || "Unknown error"));
    });

    window.addEventListener("unhandledrejection", event => {
        log(
            "[PROMISE ERROR] " +
            (event.reason?.message || event.reason || "Unknown rejection")
        );
    });

    start();

})();
