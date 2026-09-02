<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mohamed Ramadan - PS4 Hub</title>

    <style>
        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            min-height: 100%;
            background: #080d1d;
            color: #dce5f5;
            font-family: "Segoe UI", Tahoma, Arial, sans-serif;
        }

        body {
            min-height: 100vh;
        }

        .page {
            min-height: 100vh;
            padding: 30px 15px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }

        .panel {
            width: min(100%, 950px);
            background: #0d1426;
            border: 1px solid #19365f;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 0 35px rgba(0, 150, 255, 0.12);
        }

        .header {
            text-align: center;
            padding: 22px 15px;
            background: #0a1120;
            border-bottom: 1px solid #19365f;
        }

        .logo {
            width: 70px;
            height: 70px;
            object-fit: contain;
            border-radius: 50%;
            display: block;
            margin: 0 auto 10px;
        }

        .brand {
            margin: 0;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #00cfff;
            text-shadow: 0 0 10px rgba(0, 207, 255, 0.25);
        }

        .subtitle {
            margin: 5px 0 0;
            color: #8193b2;
            font-size: 14px;
        }

        .content {
            padding: 20px;
        }

        #state {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        #out {
            width: 100%;
            min-height: 350px;
            max-height: 65vh;
            overflow: auto;

            white-space: pre-wrap;
            word-break: break-word;

            padding: 15px;

            background: #080c15;
            border: 1px solid #1c2b43;
            border-radius: 10px;

            color: #c8d2e3;
            font: 13px/1.6 Consolas, "Courier New", monospace;
        }

        .ok {
            color: #70e0a0;
        }

        .bad {
            color: #ff817d;
        }

        .warn {
            color: #e5c56e;
        }

        .back {
            display: block;
            width: 100%;
            margin-top: 15px;
            padding: 13px;

            border: 1px solid #087ac1;
            border-radius: 9px;

            background: #101c31;
            color: #00cfff;

            text-decoration: none;
            text-align: center;
            font-weight: 700;

            transition: 0.2s ease;
        }

        .back:hover {
            background: #142640;
        }

        .footer {
            text-align: center;
            padding: 15px;
            color: #63738d;
            font-size: 12px;
            border-top: 1px solid #19365f;
        }

        @media (max-width: 600px) {
            .page {
                padding: 15px 8px;
            }

            .content {
                padding: 12px;
            }

            .brand {
                font-size: 19px;
            }

            #state {
                font-size: 19px;
            }

            #out {
                font-size: 12px;
                min-height: 300px;
            }
        }
    </style>
</head>

<body>

<div class="page">

    <main class="panel">

        <header class="header">

            <img
                src="./logo.png"
                alt="Mohamed Ramadan"
                class="logo"
            >

            <h1 class="brand">
                MOHAMED RAMADAN
            </h1>

            <p class="subtitle">
                PlayStation 4 Hub &amp; Tools
            </p>

        </header>

        <section class="content">

            <div id="state" class="warn">
                جاري تشغيل الصفحة...
            </div>

            <div id="out"></div>

            <a href="./index.html" class="back">
                العودة إلى الصفحة الرئيسية
            </a>

        </section>

        <footer class="footer">
            © 2026 Mohamed Ramadan
        </footer>

    </main>

</div>

<!-- تحميل الملف مرة واحدة فقط -->
<script type="module" src="./chain_lapse.js"></script>

</body>
</html>
