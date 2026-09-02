// chain_lapse.js
// Payload Binary Test

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

    async function loadPayload() {
        try {
            setState("جاري تحميل payload.bin...", "warn");

            log("");
            log("================================");
            log("MOHAMED RAMADAN - PS4 HUB");
            log("PAYLOAD TEST");
            log("================================");
            log("");

            const response = await fetch("./payload.bin", {
                method: "GET",
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error(
                    "HTTP " + response.status
                );
            }

            const buffer = await response.arrayBuffer();

            log("[OK] payload.bin loaded");
            log("[SIZE] " + buffer.byteLength + " bytes");

            if (buffer.byteLength === 0) {
                throw new Error("payload.bin is empty");
            }

            const bytes = new Uint8Array(buffer);

            let hex = "";

            for (let i = 0; i < Math.min(32, bytes.length); i++) {
                hex += bytes[i]
                    .toString(16)
                    .padStart(2, "0") + " ";
            }

            log("[HEADER] " + hex.trim());
            log("");
            log("================================");
            log("تم تحميل الـ payload وقراءته بنجاح.");
            log("================================");

            setState(
                "تم تحميل payload.bin بنجاح",
                "ok"
            );

        } catch (error) {

            log("");
            log(
                "[PAYLOAD ERROR] " +
                (error.message || error)
            );

            setState(
                "فشل تحميل الـ payload",
                "bad"
            );
        }
    }

    window.addEventListener("error", event => {
        log(
            "[JS ERROR] " +
            (event.message || "Unknown error")
        );
    });

    window.addEventListener(
        "unhandledrejection",
        event => {
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

    loadPayload();

})();
