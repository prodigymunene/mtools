import React, { useState, useMemo } from "react";
import { Calculator, Calendar, Receipt, TrendingDown, RotateCcw, Car, Info, Target, Link2, ExternalLink, Search, ChevronDown, BookOpen, Check, ArrowRight, Wrench, Globe, MessageCircle, Database } from "lucide-react";

const FSV_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>FSV Calculator</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&family=Dancing+Script:wght@600&display=swap\" rel=\"stylesheet\" media=\"print\" onload=\"this.media='all'\">\n<noscript><link href=\"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&family=Dancing+Script:wght@600&display=swap\" rel=\"stylesheet\"></noscript>\n<style>\n  :root{\n    --ink:#12203a;\n    --ink-2:#1e3357;\n    --paper:#f6f4ee;\n    --panel:#ffffff;\n    --line:#dcd6c6;\n    --gold:#b8862c;\n    --gold-deep:#8f6a1f;\n    --good:#2f6b4f;\n    --warn:#a13d2e;\n    --muted:#6c7182;\n  }\n  *{box-sizing:border-box;}\n  html,body{margin:0;padding:0;}\n  body{\n    background:var(--paper);\n    color:var(--ink);\n    font-family:'IBM Plex Sans', sans-serif;\n    font-size:15px;\n    line-height:1.5;\n    -webkit-font-smoothing:antialiased;\n  }\n  .wrap{max-width:960px;margin:0 auto;padding:40px 24px 80px;}\n\n  /* header */\n  .masthead{\n    display:flex;\n    align-items:flex-end;\n    justify-content:space-between;\n    border-bottom:2px solid var(--ink);\n    padding-bottom:18px;\n    margin-bottom:8px;\n    gap:16px;\n    flex-wrap:wrap;\n  }\n  .brand{display:flex;align-items:center;gap:12px;}\n  .brand-text h1{\n    font-family:'Fraunces', serif;\n    font-weight:500;\n    font-size:22px;\n    margin:0;\n    letter-spacing:0.2px;\n    display:flex;\n    align-items:center;\n    gap:8px;\n  }\n  .brand-text h1 img{\n    height:1em;\n    width:auto;\n    flex:none;\n  }\n  .brand-text p{margin:2px 0 0; font-size:12.5px; color:var(--muted);}\n  .doc-tag{\n    text-align:right;\n    font-size:12px;\n    color:var(--muted);\n    font-family:'IBM Plex Mono', monospace;\n  }\n  .doc-tag span{display:block;}\n\n  .intro{\n    font-family:'Fraunces', serif;\n    font-size:19px;\n    font-weight:400;\n    max-width:60ch;\n    margin:22px 0 30px;\n    color:var(--ink-2);\n  }\n\n  /* layout */\n  .grid{display:grid; grid-template-columns: 1.05fr 0.95fr; gap:28px;}\n  @media (max-width: 780px){ .grid{grid-template-columns:1fr;} }\n\n  .panel{\n    background:var(--panel);\n    border:1px solid var(--line);\n    padding:26px;\n  }\n  .panel h2{\n    font-family:'Fraunces', serif;\n    font-weight:500;\n    font-size:15.5px;\n    margin:0 0 18px;\n    padding-bottom:10px;\n    border-bottom:1px solid var(--line);\n    color:var(--ink);\n  }\n\n  .field{margin-bottom:18px;}\n  .field:last-child{margin-bottom:0;}\n  label{\n    display:block;\n    font-size:12.5px;\n    color:var(--muted);\n    margin-bottom:6px;\n  }\n  select, input[type=number], input[type=text]{\n    width:100%;\n    font:inherit;\n    padding:10px 12px;\n    border:1px solid #c9c3ae;\n    background:#fff;\n    color:var(--ink);\n    border-radius:2px;\n  }\n  select:focus, input:focus{\n    outline:2px solid var(--gold);\n    outline-offset:1px;\n    border-color:var(--gold-deep);\n  }\n  .sub-toggle{\n    display:flex;\n    gap:0;\n    border:1px solid #c9c3ae;\n    width:fit-content;\n    border-radius:2px;\n    overflow:hidden;\n  }\n  .sub-toggle button{\n    font:inherit;\n    font-size:13px;\n    padding:8px 16px;\n    border:none;\n    background:#fff;\n    cursor:pointer;\n    color:var(--ink);\n  }\n  .sub-toggle button + button{border-left:1px solid #c9c3ae;}\n  .sub-toggle button[aria-pressed=\"true\"]{\n    background:var(--ink);\n    color:#fff;\n  }\n  .checkline{\n    display:flex;\n    align-items:center;\n    gap:9px;\n    font-size:13.5px;\n    color:var(--ink-2);\n  }\n  .checkline input{width:16px;height:16px;accent-color:var(--gold-deep);}\n  .hint{font-size:12px; color:var(--muted); margin-top:6px;}\n  label.emph{color:#0b5cad; font-weight:700; font-size:13.5px;}\n  .hint.emph{color:#0b5cad; font-weight:700; font-size:13px;}\n  .signature{\n    font-family:'Dancing Script', cursive;\n    font-size:14px;\n    color:var(--gold-deep);\n    margin-top:2px;\n  }\n\n  #search-box{position:relative;}\n  #matches{\n    position:absolute;\n    left:0;right:0;top:100%;\n    background:var(--ink);\n    border:1px solid var(--ink);\n    border-top:none;\n    max-height:260px;\n    overflow-y:auto;\n    z-index:5;\n    display:none;\n    box-shadow:0 8px 18px rgba(18,32,58,0.25);\n  }\n  #matches div{\n    padding:12px 14px;\n    font-size:15px;\n    cursor:pointer;\n    color:#fff;\n    border-bottom:1px solid rgba(255,255,255,0.12);\n  }\n  #matches div strong{color:#fff;}\n  #matches div:hover{background:var(--ink-2);}\n  #matches div.no-match{background:#3a2f14;}\n  #matches div.no-match:hover{background:#4a3b1a;}\n  #matches div.no-match strong{color:var(--gold);}\n  #matches div .term-hit{color:#aab6c9; font-size:13.5px;}\n  #matches div.no-match .term-hit{color:#d9c48f; font-size:13.5px;}\n  #matches div .match-confirm{color:#7fd99a; font-weight:700;}\n\n\n  .detected-box{\n    display:flex;\n    align-items:center;\n    justify-content:space-between;\n    gap:10px;\n    background:#eef4ef;\n    border:1px solid #cfe1d3;\n    padding:12px 14px;\n    font-size:14px;\n  }\n  .detected-box.ambiguous{background:#f7f1e2; border-color:#e4d6ac;}\n  .detected-box strong{display:block; font-size:15.5px; color:var(--ink);}\n  .detected-box span.tag{font-size:12px; color:var(--good); font-family:'IBM Plex Mono', monospace;}\n  .detected-box.ambiguous span.tag{color:var(--gold-deep);}\n  .detected-box button{\n    font:inherit; font-size:12px; border:none; background:none;\n    color:var(--gold-deep); text-decoration:underline; cursor:pointer; flex:none;\n  }\n\n  /* results */\n  .result-status{\n    display:inline-block;\n    font-size:12px;\n    padding:4px 10px;\n    border-radius:2px;\n    font-family:'IBM Plex Mono', monospace;\n    margin-bottom:16px;\n  }\n  .status-ok{background:#e7f0e9; color:var(--good);}\n  .status-warn{background:#f6e7e2; color:var(--warn);}\n  .status-idle{background:#efece2; color:var(--muted);}\n\n  .line-row{\n    display:flex;\n    justify-content:space-between;\n    align-items:baseline;\n    padding:10px 0;\n    border-bottom:1px solid #ece7d8;\n    gap:12px;\n  }\n  .line-row:last-of-type{border-bottom:none;}\n  .line-label{font-size:13.5px; color:var(--ink-2);}\n  .line-label small{display:block; font-size:11px; color:var(--muted); margin-top:2px;}\n  .line-value{\n    font-family:'IBM Plex Mono', monospace;\n    font-size:14.5px;\n    white-space:nowrap;\n    text-align:right;\n  }\n  .line-amount{\n    font-size:11.5px;\n    color:var(--good);\n    margin-top:3px;\n    font-weight:500;\n  }\n\n  .total-block{\n    margin-top:18px;\n    padding-top:18px;\n    border-top:2px solid var(--ink);\n  }\n  .total-block .line-label{font-size:14.5px; font-weight:600;}\n  .total-block .line-value{font-size:22px; font-weight:600; color:var(--ink);}\n  .total-amount{\n    font-size:15px;\n    color:var(--good);\n    margin-top:4px;\n    font-weight:600;\n  }\n  .disclaimer-bubble{\n    margin-top:14px;\n    padding:10px 14px;\n    background:#eef1f6;\n    border:1px solid #d6dce6;\n    border-radius:14px;\n    font-size:12px;\n    line-height:1.55;\n    color:var(--ink-2);\n  }\n  .disclaimer-bubble strong{\n    color:var(--gold-deep);\n    font-weight:700;\n  }\n\n  .note{\n    margin-top:18px;\n    font-size:12.5px;\n    color:var(--warn);\n    background:#f6e7e2;\n    border-left:3px solid var(--warn);\n    padding:10px 12px;\n  }\n  .note.neutral{\n    color:var(--ink-2);\n    background:#eef1f6;\n    border-left-color:var(--ink-2);\n  }\n\n  .placeholder{\n    color:var(--muted);\n    font-size:13.5px;\n    padding:30px 4px;\n    text-align:center;\n  }\n\n  footer{\n    margin-top:36px;\n    padding-top:16px;\n    border-top:1px solid var(--line);\n    font-size:11.5px;\n    color:var(--muted);\n    display:flex;\n    justify-content:space-between;\n    flex-wrap:wrap;\n    gap:8px;\n  }\n  a.link-btn{\n    color:var(--gold-deep);\n    text-decoration:none;\n    border-bottom:1px solid var(--gold-deep);\n    cursor:pointer;\n    font-size:12.5px;\n  }\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n\n  <div class=\"masthead\">\n    <div class=\"brand\">\n      <div class=\"brand-text\">\n        <h1><img src=\"data:image/png;base64,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\" alt=\"\" />FSV Calculator</h1>\n      </div>\n    </div>\n    <div class=\"doc-tag\">\n      <span>FSV Policy \u2014 Forced Sale Value</span>\n      <span id=\"year-of-use\"></span>\n    </div>\n  </div>\n\n  <p class=\"intro\">Work out the base rate and premier advantage for a logbook\u2011financed vehicle, straight from the current FSV table.</p>\n\n  <div class=\"grid\">\n\n    <!-- INPUT PANEL -->\n    <div class=\"panel\">\n      <h2>1 \u2014 Describe the vehicle</h2>\n\n      <div class=\"field\" id=\"search-box\">\n        <label for=\"model-search\">Vehicle model</label>\n        <input type=\"text\" id=\"model-search\" placeholder=\"e.g. Probox, Lancer, Civic, X-trail, Scania\u2026\" autocomplete=\"off\">\n        <div id=\"matches\"></div>\n        <p class=\"hint emph\">Input car model, then pick category on the dropdown.</p>\n      </div>\n\n      <div class=\"field\">\n        <label class=\"checkline\">\n          <input type=\"checkbox\" id=\"psv-toggle\">\n          This is a PSV \u2014 please confirm with insurance\n        </label>\n      </div>\n\n      <div class=\"field\" id=\"detected-field\" style=\"display:none;\">\n        <div id=\"detected-category\"></div>\n      </div>\n\n      <div class=\"field\" id=\"origin-field\" style=\"display:none;\">\n        <label>Origin</label>\n        <div class=\"sub-toggle\" id=\"origin-toggle\">\n          <button type=\"button\" data-origin=\"local\" aria-pressed=\"true\">Local</button>\n          <button type=\"button\" data-origin=\"imported\" aria-pressed=\"false\">Imported</button>\n        </div>\n      </div>\n\n      <div class=\"field\">\n        <label for=\"yom-input\">Year of manufacture</label>\n        <input type=\"number\" id=\"yom-input\" placeholder=\"e.g. 2016\" min=\"2000\" max=\"2026\">\n      </div>\n\n      <div class=\"field\">\n        <label>CRB status</label>\n        <div class=\"sub-toggle\" id=\"crb-toggle\">\n          <button type=\"button\" data-crb=\"clear\" aria-pressed=\"true\">Not listed in CRB</button>\n          <button type=\"button\" data-crb=\"listed\" aria-pressed=\"false\">Listed in CRB</button>\n          <button type=\"button\" data-crb=\"unsure\" aria-pressed=\"false\">Not sure</button>\n        </div>\n        <p class=\"hint\">Premier advantage of +5% applies where the vehicle age is under 15 years, or the client is not listed in CRB. \"Not sure\" is treated the same as \"Listed in CRB\" until confirmed.</p>\n      </div>\n\n      <div class=\"field\">\n        <label class=\"emph\" for=\"fsv-value-input\">Vehicle FSV (KES) \u2014 if a valuation report is available</label>\n        <input type=\"text\" inputmode=\"numeric\" id=\"fsv-value-input\" placeholder=\"e.g. 1,800,000\">\n        <p class=\"hint\">Optional. If entered, the maximum loan amount is calculated using the rate below.</p>\n        <p class=\"signature\">Created by Lewis</p>\n      </div>\n\n    </div>\n\n    <!-- RESULTS PANEL -->\n    <div class=\"panel\">\n      <h2>2 \u2014 Result</h2>\n      <div id=\"results\">\n        <p class=\"placeholder\">Select a category and enter the year of manufacture to see the applicable rate.</p>\n      </div>\n    </div>\n\n  </div>\n\n  <footer>\n    <span>Reference: Momentum FSV Policy. Figures reflect the base and premier\u2011advantage table only \u2014 always confirm against the signed policy document for edge cases.</span>\n    <a class=\"link-btn\" id=\"toggle-appendix\">View luxury model appendix \u25be</a>\n  </footer>\n\n  <div class=\"panel\" id=\"appendix-panel\" style=\"display:none; margin-top:20px;\">\n    <h2>Appendix \u2014 Luxury models</h2>\n    <div class=\"grid\" style=\"grid-template-columns:1fr 1fr; gap:20px;\">\n      <div>\n        <p class=\"line-label\" style=\"margin-bottom:8px;\">Accepted as LBF collateral</p>\n        <p style=\"font-size:13.5px; color:var(--ink-2); line-height:1.9;\" id=\"luxury-ok\"></p>\n      </div>\n      <div>\n        <p class=\"line-label\" style=\"margin-bottom:8px;\">Not accepted as LBF collateral</p>\n        <p style=\"font-size:13.5px; color:var(--warn); line-height:1.9;\" id=\"luxury-no\"></p>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<script>\nconst CURRENT_YEAR = new Date().getFullYear();\ndocument.getElementById('year-of-use').textContent = 'Calculated against ' + CURRENT_YEAR;\n\n// ---------- DATA ----------\n// minYear/maxYear are inclusive. 9999 = \"and above\". 0 = \"and below\" (paired with maxYear given).\nconst CATEGORIES = [\n  { name:\"Toyota, Lexus\", short:\"Toyota, Lexus\", group:\"Saloon & family cars\", rows:[\n    {min:2006,max:9999,maxAge:19,base:65},\n    {min:2004,max:2005,maxAge:21,base:45},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"Toyota saloon 2000cc+ (Mark X, Crown, Majesta, Athlete etc.)\", short:\"Toyota Saloon 2000cc+\", group:\"Saloon & family cars\", rows:[\n    {min:2006,max:9999,maxAge:19,base:65},\n    {min:2004,max:2005,maxAge:21,base:45},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"Mazda\", short:\"Mazda\", group:\"Saloon & family cars\", rows:[\n    {min:2011,max:9999,maxAge:14,base:65},\n    {min:2006,max:2010,maxAge:19,base:60},\n    {min:2004,max:2005,maxAge:21,base:40},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"T1 \u2014 Mitsubishi, Suzuki, Honda, Ford, Isuzu Dmax, Nissan\", short:\"T1\", group:\"Saloon & family cars\", rows:[\n    {min:2006,max:9999,maxAge:19,base:65},\n    {min:2004,max:2005,maxAge:21,base:40},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"T2 \u2014 VW, Voxy, Succeed, Ractis, Probox, Liberty, Lafesta, Advan, Sienta, Prius, Porte, Passo & 900\u20131000cc models\", short:\"T2\", group:\"Saloon & family cars\", rows:[\n    {min:2012,max:9999,maxAge:13,base:60},\n    {min:2011,max:2011,maxAge:14,base:50},\n    {min:2006,max:2010,maxAge:19,base:45},\n    {min:2004,max:2005,maxAge:21,base:35},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"T3 \u2014 BMW, Mercedes, Volvo, Peugeot, Audi, Passat, Range Rover, Teana, Tiida, Discovery, KIA, Hyundai, Chevrolet, Daihatsu, Toyota Camry, Avensis, Mark II Blitz\", short:\"T3\", group:\"Saloon & family cars\", rows:[\n    {min:2011,max:9999,maxAge:14,base:50},\n    {min:2006,max:2010,maxAge:19,base:45},\n    {min:2000,max:2005,maxAge:25,base:30},\n  ]},\n  { name:\"Subaru \u2014 Forester\", short:\"Subaru Forester\", group:\"Saloon & family cars\", rows:[\n    {min:2008,max:9999,maxAge:17,base:60},\n    {min:2004,max:2007,maxAge:21,base:55},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"Subaru \u2014 Outback & Legacy hatchback\", short:\"Subaru Outback / Legacy\", group:\"Saloon & family cars\", rows:[\n    {min:2008,max:9999,maxAge:17,base:60},\n    {min:2006,max:2007,maxAge:19,base:55},\n    {min:2004,max:2005,maxAge:21,base:35},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"Subaru \u2014 other models\", short:\"Subaru (other models)\", group:\"Saloon & family cars\", rows:[\n    {min:2011,max:9999,maxAge:14,base:60},\n    {min:2006,max:2010,maxAge:19,base:55},\n    {min:2004,max:2005,maxAge:21,base:35},\n    {min:2000,max:2003,maxAge:25,base:30},\n  ]},\n  { name:\"Chrysler, Jeep, Porsche, Hammer, Freelander, Verosa, Citroen, Renault, Duster, Minicooper, Kwid & other rare models\", short:\"Rare / Other Models\", group:\"Saloon & family cars\", rows:[\n    {min:2011,max:9999,maxAge:14,base:35},\n    {min:2002,max:2010,maxAge:23,base:30},\n  ]},\n  { name:\"Luxurious models (<15 yrs) & personal cars >2500cc (not listed elsewhere)\", short:\"Luxury Models\", group:\"Saloon & family cars\", rows:[\n    {min:CURRENT_YEAR-14,max:9999,maxAge:15,base:40},\n  ]},\n\n  { name:\"Nissan X-Trail\", short:\"Nissan X-Trail\", group:\"SUVs & light commercial\", rows:[\n    {min:2013,max:9999,maxAge:12,base:60},\n    {min:2011,max:2012,maxAge:14,base:50},\n    {min:2000,max:2010,maxAge:15,base:45},\n  ]},\n  { name:\"Nissan Navara\", short:\"Nissan Navara\", group:\"SUVs & light commercial\", rows:[\n    {min:2011,max:9999,maxAge:14,base:30},\n  ]},\n  { name:\"Nissan Caravan (private), Nissan Serena, Vanette NV200 & 300\", short:\"Nissan Caravan / Serena / NV200-300\", group:\"SUVs & light commercial\", rows:[\n    {min:2009,max:9999,maxAge:16,base:50},\n    {min:2004,max:2008,maxAge:21,base:25},\n  ]},\n  { name:\"Nissan Vanette\", short:\"Nissan Vanette\", group:\"SUVs & light commercial\", rows:[\n    {min:2010,max:9999,maxAge:15,base:30},\n  ]},\n  { name:\"Toyota Hiace (private), school bus, institution bus/van\", short:\"Toyota Hiace / School Bus\", group:\"SUVs & light commercial\", rows:[\n    {min:2012,max:9999,maxAge:13,base:40},\n    {min:2007,max:2011,maxAge:19,base:30},\n    {min:0,max:2006,maxAge:19,base:25},\n  ]},\n  { name:\"Mazda Bongo, Town Ace (new shape), Lite Ace, Toyo Ace\", short:\"Mazda Bongo / Town Ace\", group:\"SUVs & light commercial\", rows:[\n    {min:2011,max:9999,maxAge:14,base:45},\n  ]},\n  { name:\"All vehicles below 900cc (Mira, Alto, Pino, Every etc.)\", short:\"Below 900cc\", group:\"SUVs & light commercial\", rows:[\n    {min:2014,max:9999,maxAge:11,base:45},\n    {min:2009,max:2013,maxAge:16,base:40},\n    {min:0,max:2008,maxAge:17,base:25},\n  ]},\n\n  { name:\"FAW, TATA, Ashok Leyland trucks\", short:\"FAW / TATA / Ashok Leyland Trucks\", group:\"Trucks & heavy commercial\", cap:1000000, rows:[\n    {min:2013,max:9999,maxAge:12,base:30},\n    {min:2004,max:2012,maxAge:21,base:25},\n  ]},\n  { name:\"Trucks T1 \u2014 Tippers, Dyna, Elf, Toyo Ace truck, Tankers\", short:\"Trucks T1\", group:\"Trucks & heavy commercial\", hasOrigin:true, rows:[\n    {min:2012,max:9999,maxAge:13,base:45,origin:'local'},\n    {min:2006,max:2011,maxAge:19,base:40,origin:'local'},\n    {min:2000,max:2005,maxAge:25,base:30,origin:'local'},\n    {min:2012,max:9999,maxAge:13,base:35,origin:'imported'},\n    {min:2006,max:2011,maxAge:19,base:30,origin:'imported'},\n    {min:2000,max:2005,maxAge:25,base:25,origin:'imported'},\n  ]},\n  { name:\"Prime movers T1 \u2014 Scania, Mercedes\", short:\"Prime Movers T1\", group:\"Trucks & heavy commercial\", rows:[\n    {min:2007,max:9999,maxAge:18,base:40},\n  ]},\n  { name:\"Prime movers T2 \u2014 Renault, MAN, Volvo, Sino Trucks, FAW, Shacman, Eicher, TATA, DAF, HINO\", short:\"Prime Movers T2\", group:\"Trucks & heavy commercial\", rows:[\n    {min:2010,max:9999,maxAge:15,base:25},\n  ]},\n\n  { name:\"PSV\", short:\"PSV\", group:\"PSV\", rows:[\n    {min:2014,max:9999,maxAge:11,base:40},\n    {min:2010,max:2013,maxAge:15,base:35},\n    {min:2005,max:2009,maxAge:20,base:30},\n    {min:2000,max:2004,maxAge:25,base:25},\n  ]},\n\n  { name:\"Tractors \u2014 Massey Ferguson, Ford, New Holland, Case\", short:\"Tractors\", group:\"Tractors\", cap:1000000, rows:[\n    {min:2009,max:9999,maxAge:16,base:40},\n  ]},\n  { name:\"Other tractors\", short:\"Other Tractors\", group:\"Tractors\", cap:1000000, rows:[\n    {min:2010,max:9999,maxAge:15,base:30},\n  ]},\n\n  { name:\"All motor vehicles not specified above \u2014 must be escalated\", short:\"Unspecified (Escalate)\", group:\"Other\", escalate:true, rows:[\n    {min:0,max:9999,maxAge:99,base:25},\n  ]},\n];\n\n// Model / keyword -> category name lookup, used to auto-detect the FSV category\n// from a free-typed make/model. Two tiers live in the same list:\n//  1) Models the policy names explicitly (e.g. \"Probox\", \"Mark X\", \"Camry\") \u2014 these\n//     define their own category regardless of brand.\n//  2) Everyday models of a brand the policy only names generically (e.g. \"Mitsubishi\",\n//     \"Nissan\") \u2014 these fall back to that brand's generic band, e.g. \"Lancer\" -> Mitsubishi -> T1.\n// Longer/more specific terms naturally outrank short generic brand words in scoring,\n// so a model listed under its own band (like Camry under T3) still wins over the\n// generic \"Toyota\" fallback.\nconst MODEL_KEYWORDS = [\n  { cat:\"Toyota, Lexus\", terms:[\n    \"corolla\",\"premio\",\"allion\",\"fielder\",\"axio\",\"vitz\",\"vios\",\"ist\",\"rav4\",\"wish\",\"noah\",\"harrier\",\n    \"prado\",\"hilux\",\"land cruiser\",\"landcruiser\",\"yaris\",\"tacoma\",\"tundra\",\"fortuner\",\"innova\",\"corona\",\n    \"starlet\",\"celica\",\"supra\",\"chaser\",\"cresta\",\"aqua\",\"estima\",\"alphard\",\"vellfire\",\"isis\",\"spacio\",\n    \"raum\",\"opa\",\"platz\",\"fun cargo\",\"funcargo\",\"auris\",\"belta\",\"urban cruiser\",\"vanguard\",\"kluger\",\n    \"previa\",\"gaia\",\"ipsum\",\"nadia\",\"verso toyota\",\"yaris cross\",\"c-hr\",\"chr toyota\",\"century toyota\",\n    \"soarer\",\"progres\",\"brevis\",\"windom\",\"esquire\",\"corolla cross\",\n    \"lexus\",\"is250\",\"is300\",\"es300\",\"rx300\",\"rx330\",\"rx350\",\"rx400h\",\"rx450h\",\"gx460\",\"gx470\",\n    \"lx470\",\"lx570\",\"nx200\",\"nx300\",\"ux200\",\"ls400\",\"ls430\",\"gs300\",\"ct200h\",\"rc300\",\"toyota\",\n    \"land cruiser 70\",\"land cruiser 76\",\"land cruiser 79\",\"land cruiser 80\",\"land cruiser 100\",\n    \"land cruiser 200\",\"land cruiser 300\",\"sequoia\",\"4runner\",\n    \"g touring\",\"g touring selection\",\"g package\",\"x package\",\n    \"bb toyota\",\"raize\",\"rush toyota\",\"allex\",\"avanza toyota\",\"hilux surf\",\"surf toyota\",\n    \"hilux vigo\",\"hilux revo\",\"land cruiser v8\",\"land cruiser prado\",\"noah si\",\"passo sette\",\n    \"corolla altis\",\"spade toyota\",\"mark ii toyota\",\"land cruiser tx\",\"tx-l\",\"txl\",\"prado tx\",\n    \"land cruiser gx\",\"land cruiser gxl\",\"land cruiser vx\",\"land cruiser vx-r\",\"land cruiser vxr\",\n    \"land cruiser zx\",\"land cruiser sahara\",\"land cruiser tz\",\"land cruiser tzg\",\n    \"prado tx-l\",\"prado tz\",\"prado vx\",\"prado vx-l\",\"prado gx\",\"prado gxl\",\"prado kakadu\",\"prado sahara\",\n    \"hilux sr\",\"hilux sr5\",\"hilux invincible\",\"hilux gr sport\",\n    \"rav4 gx\",\"rav4 gxl\",\"rav4 xle\",\"rav4 adventure\",\"rav4 limited\",\n    \"corolla gli\",\"corolla xli\",\"corolla se\",\"corolla le\",\"corolla g\",\"corolla x\",\n    \"harrier premium\",\"harrier g\",\"fielder g\",\"fielder x\",\"premio g\",\"premio x\",\"allion a15\",\"allion a18\"\n  ]},\n  { cat:\"Toyota saloon 2000cc+ (Mark X, Crown, Majesta, Athlete etc.)\", terms:[\"mark x\",\"markx\",\"crown\",\"majesta\",\"athlete\"] },\n  { cat:\"Mazda\", terms:[\n    \"mazda\",\"demio\",\"axela\",\"atenza\",\"cx-5\",\"cx5\",\"cx-3\",\"cx3\",\"cx-7\",\"cx7\",\"cx-9\",\"cx9\",\"mazda2\",\n    \"mazda3\",\"mazda6\",\"mazda5\",\"bt-50\",\"bt50\",\"premacy\",\"verisa\",\"familia\",\"tribute\",\"mpv mazda\",\"biante\",\n    \"cx-5 touring\",\"cx5 touring\",\"cx-5 grand touring\",\"cx5 grand touring\",\"demio xd\",\"demio 13c\",\n    \"axela sport\",\"mazda3 skyactiv\",\"mazda6 skyactiv\"\n  ]},\n  { cat:\"T1 \u2014 Mitsubishi, Suzuki, Honda, Ford, Isuzu Dmax, Nissan\", terms:[\n    \"mitsubishi\",\"lancer\",\"lancer evolution\",\"lancer ex\",\"outlander\",\"pajero\",\"pajero sport\",\"shogun\",\n    \"montero\",\"asx\",\"eclipse cross\",\"attrage\",\"mirage\",\"galant\",\"colt\",\"delica\",\"triton\",\"l200\",\"strada\",\"chariot\",\"legnum\",\"diamante\",\"rvr\",\"town box\",\"minica\",\"space star\",\n    \"grandis\",\"pajero io\",\"pajero junior\",\"pajero mini\",\n    \"suzuki\",\"escudo\",\"swift\",\"vitara\",\"grand vitara\",\"jimny\",\"baleno\",\"ertiga\",\"wagon r\",\"celerio\",\n    \"solio\",\"spacia\",\"hustler\",\"carry\",\"kizashi\",\"ignis\",\"sx4\",\"s-presso\",\"xl7\",\"across suzuki\",\n    \"swift sport\",\"alto suzuki\",\"every wagon\",\"apv suzuki\",\"carry truck\",\n    \"honda\",\"civic\",\"accord\",\"fit\",\"fit shuttle\",\"vezel\",\"cr-v\",\"crv\",\"hr-v\",\"hrv\",\"br-v\",\"brv\",\n    \"odyssey\",\"stream\",\"stepwgn\",\"freed\",\"insight\",\"jazz\",\"pilot\",\"ridgeline\",\"elysion\",\"mobilio\",\n    \"city honda\",\"legend honda\",\"integra\",\"prelude\",\"n-box\",\"nbox\",\"shuttle honda\",\"life honda\",\n    \"grace honda\",\"airwave\",\"airways\",\"element honda\",\"passport honda\",\"s2000\",\n    \"vamos honda\",\"domani\",\"capa honda\",\"partner honda\",\"beat honda\",\"s660\",\"that's honda\",\"thats honda\",\n    \"zest honda\",\"edix honda\",\"stepwagon\",\"step wagon\",\n    \"ford\",\"focus\",\"fiesta\",\"escape\",\"ranger\",\"everest\",\"explorer\",\"edge\",\"ecosport\",\"mustang\",\n    \"expedition\",\"transit\",\"territory ford\",\"kuga\",\"galaxy ford\",\"fusion ford\",\"raptor ford\",\"mondeo\",\n    \"bronco\",\"maverick ford\",\"f-150\",\"f150\",\n    \"isuzu\",\"dmax\",\"d-max\",\"mu-x\",\"mux\",\"trooper\",\"bighorn\",\"wizard isuzu\",\n    \"rodeo isuzu\",\"kb isuzu\",\"amigo isuzu\",\"ascender\",\n    \"nissan\",\"march\",\"juke\",\"qashqai\",\"patrol\",\"altima\",\"versa\",\"sentra\",\"murano\",\"pathfinder\",\n    \"terrano\",\"primera\",\"bluebird\",\"sunny\",\"note\",\"wingroad\",\"almera\",\"cefiro\",\"laurel\",\"skyline\",\n    \"370z\",\"gtr\",\"leaf\",\"ad van\",\"elgrand\",\"presage\",\"largo\",\"rogue nissan\",\"kicks\",\"magnite\",\n    \"cube nissan\",\"figaro\",\"pao\",\"pulsar nissan\",\"dualis\",\"sylphy\",\"bluebird sylphy\",\"xterra\",\"frontier nissan\",\"armada\",\"civilian nissan\",\"clipper nissan\",\"note e-power\",\n    \"pajero gls\",\"pajero exceed\",\"pajero vr-x\",\"pajero vrx\",\"pajero glx\",\n    \"outlander gls\",\"outlander exceed\",\"outlander gt\",\"lancer glx\",\"lancer gls\",\n    \"cr-v ex\",\"crv ex\",\"cr-v ex-l\",\"crv exl\",\"cr-v touring\",\"crv touring\",\"cr-v lx\",\"crv lx\",\n    \"vezel z\",\"vezel x\",\"vezel hybrid\",\"fit rs\",\"fit hybrid\",\n    \"d-max ls\",\"dmax ls\",\"d-max lx\",\"dmax lx\",\"d-max x-terrain\",\"dmax xterrain\",\n    \"ranger xlt\",\"ranger wildtrak\",\"ranger raptor\"\n  ]},\n  { cat:\"T2 \u2014 VW, Voxy, Succeed, Ractis, Probox, Liberty, Lafesta, Advan, Sienta, Prius, Porte, Passo & 900\u20131000cc models\", terms:[\n    \"probox\",\"succeed\",\"voxy\",\"ractis\",\"liberty\",\"lafesta\",\"advan\",\"sienta\",\"prius\",\"porte\",\"passo\",\n    \"corolla runx\",\"corolla spacio\",\"funcargo\",\n    \"volkswagen\",\"vw\",\"golf\",\"polo\",\"tiguan\",\"jetta\",\"touareg\",\"beetle\",\"caddy\",\"amarok\",\"atlas vw\",\n    \"t-cross\",\"tcross\",\"sharan\",\"scirocco\",\"vw up\",\"fox vw\",\"lupo vw\",\"arteon\",\"id.4\",\"id4\",\"taos vw\",\"touran\",\n    \"golf comfortline\",\"golf highline\",\"golf trendline\",\"polo comfortline\",\"polo highline\",\n    \"tiguan comfortline\",\"tiguan highline\",\"tiguan trendline\",\n    \"probox van\",\"succeed van\",\"probox wagon\",\"succeed wagon\",\"probox gl\",\"probox dx\",\"probox dx comfort\",\"probox gl comfort\",\"probox hybrid\",\"probox cargo\",\"succeed ux\",\"succeed tx\",\"succeed tx-g\",\"succeed ux-g\",\"succeed hybrid\",\"succeed cargo\",\"toyota probox\",\"toyota succeed\"\n  ]},\n  { cat:\"T3 \u2014 BMW, Mercedes, Volvo, Peugeot, Audi, Passat, Range Rover, Teana, Tiida, Discovery, KIA, Hyundai, Chevrolet, Daihatsu, Toyota Camry, Avensis, Mark II Blitz\", terms:[\n    \"bmw\",\"1 series\",\"2 series\",\"3 series\",\"4 series\",\"5 series\",\"6 series\",\"7 series\",\"8 series\",\n    \"x1 bmw\",\"x2 bmw\",\"x3 bmw\",\"x4 bmw\",\"x5 bmw\",\"x6 bmw\",\"x7 bmw\",\"z3 bmw\",\"z4 bmw\",\n    \"m2 bmw\",\"m3 bmw\",\"m4 bmw\",\"m5 bmw\",\"m6 bmw\",\"i3 bmw\",\"i8 bmw\",\n    \"316i\",\"318i\",\"320i\",\"323i\",\"325i\",\"328i\",\"330i\",\"335i\",\"520i\",\"523i\",\"525i\",\"528i\",\"530i\",\"535i\",\"116i\",\"118i\",\"120i\",\n    \"mercedes\",\"mercedes benz\",\"benz\",\n    \"a-class\",\"a class\",\"b-class\",\"b class\",\"c-class\",\"c class\",\"e-class\",\"e class\",\"s-class\",\"s class\",\n    \"c180\",\"c200\",\"c220\",\"c230\",\"c250\",\"c280\",\"c300\",\"c320\",\"c350\",\n    \"e200\",\"e220\",\"e230\",\"e240\",\"e250\",\"e270\",\"e280\",\"e300\",\"e320\",\"e350\",\n    \"s280\",\"s300\",\"s320\",\"s350\",\"s400\",\"s430\",\"s450\",\"s500\",\"s550\",\"s600\",\n    \"a180\",\"a200\",\"a250\",\"b180\",\"b200\",\n    \"cl-class\",\"cl class\",\"cls\",\"clk\",\"cla mercedes\",\"gla\",\"glb\",\"glc\",\"gle\",\"gls\",\"glk\",\"gl class\",\n    \"g-class\",\"gclass\",\"gwagon\",\"m-class mercedes\",\"ml class\",\"r-class mercedes\",\n    \"sl mercedes\",\"slk\",\"slc mercedes\",\"amg gt\",\"maybach\",\"vito\",\"viano\",\"sprinter\",\"metris\",\"v-class mercedes\",\n    \"volvo\",\"s40\",\"s60\",\"s80\",\"s90 volvo\",\"v40\",\"v50\",\"v60\",\"v70\",\"v90 volvo\",\"xc40\",\"xc60\",\"xc70\",\"xc90\",\n    \"c30 volvo\",\"c70 volvo\",\n    \"peugeot\",\"106 peugeot\",\"205 peugeot\",\"206\",\"207\",\"208\",\"306\",\"307\",\"308\",\"309\",\"405 peugeot\",\"406\",\"407\",\n    \"408 peugeot\",\"508 peugeot\",\"2008 peugeot\",\"3008\",\"4008 peugeot\",\"5008\",\"rcz\",\n    \"audi\",\"a1\",\"a3\",\"a4\",\"a5\",\"a6\",\"a7\",\"a8\",\"q2\",\"q3\",\"q5\",\"q7\",\"q8\",\"tt audi\",\"e-tron audi\",\n    \"passat\",\"range rover\",\"rangerover\",\"range rover sport\",\"range rover evoque\",\"discovery sport\",\n    \"defender\",\"teana\",\"tiida\",\"discovery\",\n    \"kia\",\"sportage\",\"sorento\",\"picanto\",\"rio kia\",\"cerato\",\"optima\",\"seltos\",\"soul kia\",\"carnival\",\n    \"sedona\",\"shuma\",\"pride kia\",\"carens\",\"mohave\",\"stonic\",\"niro\",\"k5 kia\",\"telluride\",\"ev6\",\"venga\",\n    \"hyundai\",\"elantra\",\"tucson\",\"i10\",\"i20\",\"i30\",\"ix35\",\"accent\",\"santa fe\",\"sonata\",\"creta\",\"getz\",\n    \"matrix hyundai\",\"starex\",\"h1 hyundai\",\"veloster\",\"kona\",\"venue\",\"atos\",\"terracan\",\"galloper\",\n    \"grandeur\",\"avante\",\"palisade\",\"ioniq\",\"verna\",\n    \"chevrolet\",\"optra\",\"spark\",\"aveo\",\"cruze\",\"captiva\",\"trailblazer\",\"malibu\",\"tahoe\",\"suburban\",\n    \"colorado chevrolet\",\"trax\",\"orlando chevrolet\",\"equinox\",\"camaro\",\"silverado\",\"blazer chevrolet\",\n    \"daihatsu\",\"terios\",\"be-go\",\"bego\",\"charade\",\"sirion\",\"materia\",\"gran max\",\"xenia\",\"feroza\",\n    \"rocky daihatsu\",\"tanto\",\"cast daihatsu\",\"copen\",\"altis daihatsu\",\"applause\",\n    \"camry\",\"avensis\",\"mark ii\",\"mark2\",\"mark 2 blitz\",\"blitz\",\n    \"sportage ex\",\"sportage lx\",\"tucson gls\",\"tucson limited\",\"sorento ex\",\"elantra gt\",\n    \"santa fe gls\",\"santa fe limited\",\"creta smart\",\"creta luxury\",\"captiva ls\",\"captiva lt\",\n    \"trailblazer lt\",\"trailblazer ltz\"\n  ]},\n  { cat:\"Subaru \u2014 Forester\", terms:[\"forester\",\"forester xt\",\"forester s-edition\",\"forester sedition\",\"forester premium\",\"forester touring\"] },\n  { cat:\"Subaru \u2014 Outback & Legacy hatchback\", terms:[\"outback\",\"legacy\",\"outback premium\",\"outback touring\",\"legacy touring\"] },\n  { cat:\"Subaru \u2014 other models\", terms:[\"subaru\",\"impreza\",\"exiga\",\"levorg\",\"xv subaru\",\"brz\",\"tribeca\",\"baja subaru\",\"ascent subaru\",\"crosstrek\",\"wrx\",\"wrx sti\",\"sti\",\"solterra\",\"sambar\",\"justy\",\"r2 subaru\",\"stella subaru\",\"domingo\"] },\n  { cat:\"Chrysler, Jeep, Porsche, Hammer, Freelander, Verosa, Citroen, Renault, Duster, Minicooper, Kwid & other rare models\", terms:[\n    \"chrysler\",\"300c\",\"chrysler 300\",\"pt cruiser\",\"voyager chrysler\",\"town country\",\"pacifica\",\"grand voyager\",\n    \"jeep\",\"wrangler\",\"cherokee\",\"grand cherokee\",\"compass jeep\",\"patriot\",\"renegade\",\"gladiator jeep\",\n    \"porsche\",\"cayenne\",\"macan\",\"911 porsche\",\"panamera\",\"boxster\",\"cayman porsche\",\"taycan\",\n    \"hammer\",\"freelander\",\"verosa\",\"citroen\",\"c3 citroen\",\"c4 citroen\",\"c5 citroen\",\"ds3\",\"ds4\",\n    \"berlingo\",\n    \"renault\",\"kangoo\",\"clio\",\"megane\",\"koleos\",\"captur\",\"talisman\",\"scenic renault\",\n    \"duster\",\"minicooper\",\"mini cooper\",\"kwid\",\"mini countryman\",\"mini clubman\",\"mini paceman\",\n    \"mahindra\",\"scorpio mahindra\",\"bolero\",\"thar\",\"xuv500\",\n    \"great wall\",\"gwm\",\"haval\",\"haval h6\",\"haval jolion\",\"chery\",\"tiggo\",\"geely\",\"byd\",\"jac motors\"\n  ]},\n  { cat:\"All motor vehicles not specified above \u2014 must be escalated\", terms:[\"iveco\",\"iveco stralis\",\"stralis\",\"iveco trakker\",\"trakker\",\"iveco eurocargo\",\"eurocargo\",\"iveco eurotech\",\"eurotech\",\"iveco eurostar\",\"eurostar\",\"iveco turbostar\",\"turbostar\",\"iveco daily\",\"iveco s-way\",\"s-way\",\"iveco hi-way\",\"iveco x-way\",\"iveco magirus\",\"magirus\",\"iveco tipper\",\"iveco lorry\",\"iveco truck\",\"iveco prime mover\",\"isuzu giga\",\"giga\",\"isuzu exr\",\"isuzu exz\",\"isuzu cyz\",\"isuzu cxz\",\"isuzu cyh\",\"isuzu cxh\",\"isuzu gxz\",\"isuzu prime mover\",\"fuso super great\",\"super great\",\"fuso fp\",\"fuso fv\",\"fuso fu\",\"fuso shogun truck\",\"fuso prime mover\",\"ud quon\",\"quon\",\"big thumb\",\"ud big thumb\",\"ud trucks\",\"nissan diesel\",\"ud lorry\",\"ud truck\",\"mahindra loadking\",\"loadking\",\"mahindra maxitruck\",\"maxitruck\",\"mahindra blazo\",\"blazo\",\"mahindra furio\",\"furio\",\"bolero pickup\",\"bolero maxitruck\",\"mahindra truck\",\"mahindra lorry\",\"dongfeng\",\"dongfeng truck\",\"dongfeng lorry\",\"dongfeng captain\",\"dongfeng kingrun\",\"dongfeng tianlong\",\"dongfeng duolika\",\"dongfeng cummins\",\"dfac\",\"dfm truck\",\"jac truck\",\"jac lorry\",\"jac n56\",\"jac n75\",\"jac n80\",\"jac x200\",\"jac x250\",\"jac hfc\",\"jac gallop\",\"jac tipper\",\"jmc\",\"jmc truck\",\"jmc carrying\",\"jmc vigus\",\"jmc conquer\",\"jmc kaiyun\",\"beiben\",\"north benz\",\"beiben ng80\",\"beiben v3\",\"hongyan\",\"saic hongyan\",\"genlyon\",\"camc\",\"hanma\",\"sany truck\",\"sany heavy truck\",\"kamaz\",\"kamaz truck\",\"ural truck\",\"freightliner\",\"kenworth\",\"peterbilt\",\"mack truck\",\"international prostar\",\"western star\",\"ford cargo\",\"ford f-max\",\"ford trucks\",\"ford cargo 815\",\"ford cargo 1722\",\"ford cargo 2533\",\"ford cargo 3532\",\"bedford\",\"bedford truck\",\"bedford tk\",\"bedford tipper\",\"leyland daf\",\n    \"fiat ducato\",\"ducato\",\"opel vivaro\",\"vivaro\",\"foton view\",\"view foton\",\"foton toano\",\"toano\",\"jac sunray\",\"sunray\",\"jac refine\",\"refine\"] },\n  { cat:\"Luxurious models (<15 yrs) & personal cars >2500cc (not listed elsewhere)\", terms:[\"luxury\",\"luxurious\"] },\n  { cat:\"Nissan X-Trail\", terms:[\"x-trail\",\"xtrail\",\"x trail\",\"x-trail st\",\"xtrail st\",\"x-trail ti\",\"xtrail ti\",\"x-trail tl\",\"xtrail tl\",\"x-trail acenta\",\"xtrail acenta\",\"x-trail n-connecta\",\"xtrail nconnecta\"] },\n  { cat:\"Nissan Navara\", terms:[\"navara\",\"navara np300\",\"navara st\",\"navara st-x\",\"navara stx\",\"navara pro-4x\",\"navara pro4x\",\"navara dx\",\"navara rx\"] },\n  { cat:\"Nissan Caravan (private), Nissan Serena, Vanette NV200 & 300\", terms:[\"caravan\",\"serena\",\"nv200\",\"nv300\",\"vanette nv200\",\"vanette nv300\",\n    \"nissan caravan\",\"caravan e25\",\"caravan e26\",\"caravan e24\",\"caravan nv350\",\"nv350\",\"nv350 caravan\",\"nissan nv350\",\"nv350 urvan\",\"urvan\",\"nissan urvan\",\"urvan nv350\",\"urvan e25\",\"urvan e26\",\"caravan van\",\"caravan dx\",\"caravan gx\",\"caravan premium gx\",\"caravan long\",\"caravan wide\",\"caravan micro bus\",\"caravan microbus\",\"caravan diesel\",\"nv350 premium gx\",\"nv350 dx\",\"nv350 gx\",\"nv350 long\",\"nv350 wide\",\"nissan serena\",\"serena c24\",\"serena c25\",\"serena c26\",\"serena c27\",\"serena highway star\",\"serena hwy star\",\"serena s-hybrid\",\"serena e-power\",\"serena rider\",\"serena luxion\",\"nissan nv200\",\"nv200 van\",\"nv200 vanette\",\"nv200 wagon\",\"nv300 van\",\"nissan nv300\",\"vanette nv200 van\"] },\n  { cat:\"Nissan Vanette\", terms:[\"vanette\",\n    \"nissan vanette\",\"vanette van\",\"vanette truck\",\"vanette cargo\",\"vanette c22\",\"vanette lc22\",\"vanette largo\",\"vanette wagon\",\"vanette panel\"] },\n  { cat:\"Toyota Hiace (private), school bus, institution bus/van\", terms:[\"hiace\",\"school bus\",\"institution bus\",\"institution van\",\n    \"shark\",\"toyota shark\",\"shark nose\",\"hiace shark\",\"shark hiace\",\"hiace 200\",\"hiace 100\",\"hiace 14 seater\",\"hiace 15 seater\",\"hiace commuter\",\"hiace grand cabin\",\"hiace super gl\",\"hiace super custom\",\"hiace dx\",\"hiace gl\",\"hiace van\",\"hiace wagon\",\"hiace minibus\",\"hiace mini bus\",\"hiace diesel\",\"hiace petrol\",\"hiace 3l\",\"hiace 2kd\",\"hiace 1kd\",\"hiace 2tr\",\"hiace 1tr\",\"hiace kdh\",\"hiace trh\",\"hiace lh\",\"hiace automatic\",\"hiace manual\",\"hiace high roof\",\"hiace long\",\"hiace narrow\",\"hiace wide\",\"hiace dolphin\",\"hiace nose\",\"toyota hiace\",\"hiace ambulance\",\"hiace 4wd\",\"hiace 4x4\",\"regius\",\"regius ace\",\"toyota regius\",\"granvia\",\"grand hiace\",\"touring hiace\",\"quantum\",\"toyota quantum\",\"coaster\",\"toyota coaster\",\"coaster bus\",\"civilian\",\"nissan civilian\",\"school van\",\"staff bus\",\"staff van\",\"church bus\",\"14 seater van\",\"15 seater van\",\"commuter van\",\"kdh200\",\"kdh201\",\"kdh202\",\"kdh205\",\"kdh206\",\"kdh211\",\"kdh212\",\"kdh221\",\"kdh222\",\"kdh223\",\"trh200\",\"trh201\",\"trh211\",\"trh213\",\"trh221\",\"trh223\",\"lh178\",\"lh184\",\"lh102\",\"lh113\",\"lh125\",\"lh172\",\"gdh201\",\"gdh211\",\"gdh221\",\"gdh223\"] },\n  { cat:\"Mazda Bongo, Town Ace (new shape), Lite Ace, Toyo Ace\", terms:[\"bongo\",\"town ace\",\"toyoace\",\"toyo ace\",\"lite ace\",\"liteace\",\n    \"mazda bongo\",\"bongo van\",\"bongo friendee\",\"bongo brawny\",\"bongo wagon\",\"bongo diesel\",\"bongo dx\",\"bongo gl\",\"bongo gl-super\",\"bongo 4wd\",\"townace\",\"town ace noah\",\"townace noah\",\"town ace van\",\"townace van\",\"town ace wagon\",\"toyota townace\",\"toyota town ace\",\"town ace gl\",\"town ace dx\",\"lite ace noah\",\"liteace noah\",\"lite ace van\",\"liteace van\",\"lite ace wagon\",\"toyota lite ace\",\"toyota liteace\",\"lite ace gl\",\"lite ace dx\",\"town ace 4wd\",\"lite ace 4wd\"] },\n  { cat:\"All vehicles below 900cc (Mira, Alto, Pino, Every etc.)\", terms:[\"mira\",\"alto\",\"pino\",\"every\",\"hijet\",\"move daihatsu\"] },\n  { cat:\"FAW, TATA, Ashok Leyland trucks\", terms:[\"faw truck\",\"tata truck\",\"ashok leyland\",\"faw\",\"tata\",\"tata ace\",\"tata prima\",\"ashok leyland dost\",\n    \"faw j5\",\"faw j6\",\"faw j6p\",\"faw j6l\",\"faw j7\",\"faw jh6\",\"faw ca1040\",\"faw ca1041\",\"faw ca1083\",\"faw ca3250\",\"faw ca4250\",\"faw ca4180\",\"faw ca4258\",\"faw ca3310\",\"faw ca3252\",\"faw ca1160\",\"faw ca1169\",\"faw tiger v\",\"faw tigerv\",\"faw xichai\",\"faw 1040\",\"faw 6x4\",\"faw 8x4\",\"faw tipper\",\"faw lorry\",\"faw prime mover\",\"jiefang\",\"faw jiefang\",\"tata lpt\",\"tata lpk\",\"tata lpta\",\"tata 207\",\"tata 407\",\"tata 709\",\"tata 909\",\"tata 1109\",\"tata 1212\",\"tata 1613\",\"tata 1623\",\"tata lpt 407\",\"tata lpt 1613\",\"tata 2518\",\"tata lpk 2518\",\"tata 3118\",\"tata 3516\",\"tata 3518\",\"tata 3718\",\"tata 4018\",\"tata 4923\",\"tata prima 4028\",\"tata prima 3530\",\"tata prima 4938\",\"tata signa\",\"tata signa 4825\",\"tata signa 3118\",\"tata ultra\",\"tata ultra 1014\",\"tata ultra 1518\",\"tata ultra 1918\",\"tata ultra 1923\",\"tata intra\",\"tata intra v10\",\"tata intra v30\",\"tata yodha\",\"tata xenon\",\"tata super ace\",\"tata ace zip\",\"tata ace mega\",\"tata telcoline\",\"tata novus\",\"tata tipper\",\"tata lorry\",\"tata dump\",\"ashok leyland boss\",\"ashok leyland captain\",\"ashok leyland partner\",\"ashok leyland ecomet\",\"ashok leyland comet\",\"ashok leyland avtr\",\"ashok leyland u-truck\",\"ashok leyland bada dost\",\"ashok leyland mitr\",\"ashok leyland tipper\",\"ashok leyland truck\",\"ashok leyland lorry\"] },\n  { cat:\"Trucks T1 \u2014 Tippers, Dyna, Elf, Toyo Ace truck, Tankers\", terms:[\"tipper\",\"dyna\",\"elf\",\"toyo ace truck\",\"tanker\",\"lorry\",\"mazda titan\",\"titan\",\"mazda truck\",\"mazda lorry\",\"mazda t3500\",\"mazda t4000\",\"t3500\",\"t4000\",\"canter\",\"fuso canter\",\"fuso\",\"mitsubishi canter\",\"mitsubishi fuso\",\"isuzu forward\",\"isuzu npr\",\"isuzu nkr\",\"isuzu elf\",\"isuzu truck\",\"isuzu lorry\",\"forward\",\"npr\",\"nkr\",\"lorry truck\",\"pickup lorry\",\n    \"toyota dyna\",\"dyna 100\",\"dyna 150\",\"dyna 200\",\"dyna 250\",\"dyna 1 ton\",\"dyna 2 ton\",\"dyna 3 ton\",\"dyna 3.5 ton\",\"dyna 4 ton\",\"dyna 5 ton\",\"dyna flatbed\",\"dyna flat bed\",\"dyna box\",\"dyna dropside\",\"dyna tipper\",\"dyna crane\",\"dyna wide cab\",\"dyna double cab\",\"dyna refrigerated\",\"dyna curtain\",\"dyna truck\",\"dyna lorry\",\"dyna lh\",\"dyna ly\",\"dyna xzu\",\"dyna bu\",\"dyna ru\",\"dyna kdy\",\"dyna trh\",\"toyoace truck\",\"toyoace lorry\",\"toyo ace lorry\",\"toyoace dump\",\"toyoace flatbed\",\"toyoace box\",\"toyoace tipper\",\"toyoace dropside\",\"isuzu elf truck\",\"elf truck\",\"elf lorry\",\"elf 2 ton\",\"elf 3 ton\",\"elf 3.5 ton\",\"elf 4 ton\",\"elf 5 ton\",\"elf dropside\",\"elf flatbed\",\"elf box\",\"elf tipper\",\"elf 4hf1\",\"elf 4hg1\",\"elf 4hk1\",\"elf 4jb1\",\"elf 4jj1\",\"elf 4he1\",\"elf 6hk1\",\"elf 4bd1\",\"nhr\",\"nhr55\",\"nhr69\",\"nhr71\",\"nkr55\",\"nkr58\",\"nkr66\",\"nkr69\",\"nkr71\",\"nkr77\",\"nkr81\",\"nlr\",\"nlr85\",\"nmr\",\"nmr81\",\"nmr85\",\"npr59\",\"npr66\",\"npr71\",\"npr75\",\"npr81\",\"npr85\",\"nqr\",\"nqr66\",\"nqr71\",\"nqr75\",\"nqr90\",\"nrr\",\"nrr85\",\"frr\",\"frr33\",\"frr34\",\"frr90\",\"fsr\",\"fsr33\",\"fsr34\",\"fsr90\",\"fss\",\"ftr\",\"ftr32\",\"ftr33\",\"ftr34\",\"fts\",\"fvr\",\"fvr33\",\"fvr34\",\"fvm\",\"fvm34\",\"fvz\",\"fvz34\",\"isuzu n series\",\"isuzu n-series\",\"isuzu f series\",\"isuzu f-series\",\"isuzu forward 4\",\"isuzu forward 6\",\"isuzu fvz\",\"isuzu fvr\",\"isuzu ftr\",\"isuzu fsr\",\"isuzu frr\",\"isuzu nqr\",\"isuzu nmr\",\"isuzu nlr\",\"isuzu nhr\",\"isuzu tipper\",\"isuzu tanker\",\"isuzu box body\",\"isuzu dropside\",\"isuzu flatbed\",\"canter 3 ton\",\"canter 3.5 ton\",\"canter 4 ton\",\"canter 4.5 ton\",\"canter 5 ton\",\"canter flatbed\",\"canter box\",\"canter tipper\",\"canter dropside\",\"canter fe\",\"canter fb\",\"canter fg\",\"canter fe71\",\"canter fe72\",\"canter fe73\",\"canter fe74\",\"canter fe75\",\"canter fe82\",\"canter fe83\",\"canter fe84\",\"canter fe85\",\"fe70\",\"fe71\",\"fe72\",\"fe73\",\"fe74\",\"fe75\",\"fe82\",\"fe83\",\"fe84\",\"fe85\",\"fb70\",\"fb71\",\"fb73\",\"fg70\",\"fg71\",\"fk61\",\"fk71\",\"fuso fighter\",\"fighter fk\",\"fighter fm\",\"fuso fighter mignon\",\"fuso fk\",\"fuso fm\",\"fuso fj\",\"fuso fi\",\"fuso fh\",\"fuso fj tipper\",\"fuso tipper\",\"fuso lorry\",\"fuso truck\",\"mitsubishi lorry\",\"mitsubishi truck\",\"mitsubishi tipper\",\"nissan atlas\",\"atlas h41\",\"atlas f24\",\"atlas truck\",\"nissan caball\",\"caball\",\"nissan cabstar\",\"cabstar\",\"nissan condor\",\"condor\",\"ud condor\",\"ud croner\",\"croner\",\"ud kazet\",\"kazet\",\"nissan truck\",\"nissan lorry\",\"nissan tipper\",\"nissan tanker\",\"nissan diesel condor\",\"mazda titan 2 ton\",\"mazda titan 3 ton\",\"mazda titan wh\",\"mazda titan wg\",\"mazda t2500\",\"mazda t3000\",\"t2500\",\"t3000\",\"daihatsu delta\",\"delta truck\",\"delta lorry\",\"hyundai mighty\",\"mighty\",\"mighty ii\",\"hyundai hd65\",\"hd65\",\"hyundai hd72\",\"hd72\",\"hyundai hd78\",\"hd78\",\"hyundai hd120\",\"hyundai porter\",\"porter\",\"porter ii\",\"porter h100\",\"hyundai h100 truck\",\"h100 truck\",\"hyundai truck\",\"hyundai lorry\",\"kia bongo\",\"kia bongo iii\",\"bongo iii\",\"kia k2500\",\"k2500\",\"kia k2700\",\"k2700\",\"kia k3000\",\"k3000\",\"kia frontier\",\"kia truck\",\"kia lorry\",\"tipper truck\",\"tipper lorry\",\"tanker truck\",\"fuel tanker\",\"water tanker\",\"water bowser\",\"bowser\",\"box body\",\"box body truck\",\"flatbed\",\"flat bed\",\"dropside\",\"drop side\",\"refrigerated truck\",\"reefer truck\",\"cargo truck\",\"crane truck\",\"garbage truck\",\"concrete mixer\",\"mixer truck\",\"cement truck\",\"dump truck\",\"dumper\",\"light truck\",\"medium truck\",\"small lorry\",\"canter lorry\",\"4 ton lorry\",\"3 ton lorry\",\"5 ton lorry\"] },\n  { cat:\"Prime movers T1 \u2014 Scania, Mercedes\", terms:[\"scania\",\"actros\",\"axor\",\"atego\",\n    \"mercedes lorry\",\"mercedes truck\",\"mercedes tipper\",\"mercedes prime mover\",\"mercedes benz actros\",\"mercedes-benz actros\",\"mercedes benz atego\",\"mercedes benz axor\",\"mercedes actros\",\"mercedes axor\",\"mercedes atego\",\"mercedes arocs\",\"mercedes zetros\",\"mercedes unimog\",\"unimog\",\"zetros\",\"arocs\",\"econic\",\"mercedes sk\",\"mercedes 1418\",\"mercedes 1517\",\"mercedes 1519\",\"mercedes 1924\",\"mercedes 2624\",\"mercedes 2631\",\"mercedes 1844\",\"mercedes 2644\",\"mercedes 3340\",\"actros 1835\",\"actros 1840\",\"actros 1843\",\"actros 1844\",\"actros 1845\",\"actros 1846\",\"actros 2535\",\"actros 2540\",\"actros 2543\",\"actros 2544\",\"actros 2545\",\"actros 2640\",\"actros 2643\",\"actros 2644\",\"actros 2645\",\"actros 3240\",\"actros 3243\",\"actros 3244\",\"actros 3245\",\"actros 3340\",\"actros 3341\",\"actros 3343\",\"actros 3344\",\"actros 3345\",\"actros 4140\",\"actros 4144\",\"actros 1848\",\"actros 1851\",\"actros 2548\",\"actros 2551\",\"actros 2651\",\"axor 1829\",\"axor 1835\",\"axor 1840\",\"axor 1843\",\"axor 2528\",\"axor 2533\",\"axor 2540\",\"axor 2635\",\"axor 2640\",\"axor 3335\",\"axor 3340\",\"axor 3344\",\"atego 814\",\"atego 815\",\"atego 817\",\"atego 818\",\"atego 917\",\"atego 1017\",\"atego 1018\",\"atego 1218\",\"atego 1222\",\"atego 1317\",\"atego 1318\",\"atego 1418\",\"atego 1517\",\"atego 1518\",\"atego 1524\",\"atego 1623\",\"atego 1725\",\"atego 2425\",\"atego 2428\",\"axor tipper\",\"actros tipper\",\"atego tipper\",\"axor 3340 tipper\",\"scania lorry\",\"scania truck\",\"scania tipper\",\"scania prime mover\",\"scania p-series\",\"scania g-series\",\"scania r-series\",\"scania s-series\",\"scania streamline\",\"scania highline\",\"scania topline\",\"scania next gen\",\"scania nextgen\",\"scania 3 series\",\"scania 4 series\",\"scania 94\",\"scania 93\",\"scania 113\",\"scania t113\",\"scania 114\",\"scania p114\",\"scania 124\",\"scania p124\",\"scania 143\",\"scania t143\",\"scania 144\",\"scania 164\",\"scania p94\",\"scania p280\",\"scania p310\",\"scania p320\",\"scania p340\",\"scania p360\",\"scania p370\",\"scania p380\",\"scania p400\",\"scania p410\",\"scania p420\",\"scania p440\",\"scania p450\",\"scania g340\",\"scania g360\",\"scania g380\",\"scania g400\",\"scania g410\",\"scania g420\",\"scania g440\",\"scania g450\",\"scania g460\",\"scania r360\",\"scania r380\",\"scania r400\",\"scania r410\",\"scania r420\",\"scania r440\",\"scania r450\",\"scania r460\",\"scania r480\",\"scania r500\",\"scania r520\",\"scania r560\",\"scania r580\",\"scania r620\",\"scania s450\",\"scania s500\",\"scania s520\",\"scania s540\",\"scania s580\",\"scania s650\",\"p340\",\"p360\",\"p380\",\"p410\",\"p420\",\"p440\",\"p450\",\"r380\",\"r410\",\"r420\",\"r440\",\"r450\",\"r480\",\"r500\",\"r560\",\"prime mover\",\"trailer head\",\"truck head\",\"prime mover truck\"] },\n  { cat:\"Prime movers T2 \u2014 Renault, MAN, Volvo, Sino Trucks, FAW, Shacman, Eicher, TATA, DAF, HINO\", terms:[\n    \"man truck\",\"man tgs\",\"man tgx\",\"sino truck\",\"shacman\",\"eicher\",\"daf\",\"daf xf\",\"daf lf\",\n    \"hino\",\"hino 500\",\"hino 700\",\"volvo fh\",\"volvo fm\",\"volvo fmx\",\"volvo fh12\",\"volvo fh16\",\n    \"renault premium\",\"renault magnum\",\"foton\",\n    \"man lorry\",\"man tipper\",\"man prime mover\",\"man hocl\",\"man f90\",\"man f2000\",\"man tga\",\"man tgm\",\"man tgl\",\"man tge\",\"man tgs 26.440\",\"man tgx 18.440\",\"man tgx 18.480\",\"man tgx 26.480\",\"man tgs 33.400\",\"man tgs 33.440\",\"man tgs 26.400\",\"man tgs 28.400\",\"man tgs 35.440\",\"man 26.364\",\"man 26.403\",\"man 26.440\",\"man 33.403\",\"man 33.440\",\"man 19.403\",\"man 19.464\",\"volvo truck\",\"volvo tipper\",\"volvo lorry\",\"volvo prime mover\",\"volvo fh13\",\"volvo fm12\",\"volvo fm9\",\"volvo fm440\",\"volvo fmx 460\",\"volvo fl\",\"volvo fe\",\"volvo fh 400\",\"volvo fh 420\",\"volvo fh 460\",\"volvo fh 480\",\"volvo fh 500\",\"volvo fh 540\",\"volvo fh 750\",\"volvo fh460\",\"volvo fh500\",\"volvo fh540\",\"volvo f12\",\"volvo f10\",\"volvo nh12\",\"volvo nh\",\"volvo vnl\",\"volvo vnr\",\"daf truck\",\"daf lorry\",\"daf tipper\",\"daf prime mover\",\"daf 95 xf\",\"daf 95\",\"daf 105\",\"daf xf 105\",\"daf xf 106\",\"daf cf\",\"daf cf 65\",\"daf cf 75\",\"daf cf 85\",\"daf cf 460\",\"daf lf 45\",\"daf lf 55\",\"daf 75cf\",\"daf 85cf\",\"daf xg\",\"daf xg+\",\"daf xd\",\"renault trucks\",\"renault truck\",\"renault lorry\",\"renault tipper\",\"renault prime mover\",\"renault kerax\",\"renault midlum\",\"renault range t\",\"renault premium 380\",\"renault premium 400\",\"renault premium 420\",\"renault premium 440\",\"renault premium 450\",\"renault premium 460\",\"renault premium 480\",\"renault magnum 440\",\"renault magnum 480\",\"renault magnum 500\",\"renault kerax 370\",\"renault kerax 380\",\"renault kerax 410\",\"renault kerax 440\",\"renault kerax 450\",\"renault midlum 220\",\"renault midlum 270\",\"renault midlum 300\",\"renault t430\",\"renault t480\",\"renault c440\",\"renault k440\",\"kerax\",\"midlum\",\"sinotruk\",\"sinotruk howo\",\"howo\",\"howo a7\",\"howo t5g\",\"howo t7h\",\"howo t7\",\"howo 336\",\"howo 371\",\"howo 375\",\"howo 420\",\"howo 371hp\",\"howo 375hp\",\"howo 6x4\",\"howo 8x4\",\"howo tipper\",\"howo dump\",\"howo truck\",\"howo lorry\",\"howo mixer\",\"howo 12 wheel\",\"sino tipper\",\"sitrak\",\"sinotruk sitrak\",\"golden prince\",\"sinotruk golden prince\",\"steyr truck\",\"sinotruk steyr\",\"shacman x3000\",\"x3000\",\"shacman f3000\",\"f3000\",\"shacman m3000\",\"m3000\",\"shacman h3000\",\"h3000\",\"shacman l3000\",\"shacman x6000\",\"shacman delong\",\"delong x3000\",\"delong f3000\",\"delong m3000\",\"shaanxi\",\"shaanxi auto\",\"shacman tipper\",\"shacman truck\",\"shacman lorry\",\"shacman 6x4\",\"shacman 8x4\",\"shacman 6x2\",\"shacman 4x2\",\"eicher pro\",\"eicher pro 1049\",\"eicher pro 1059\",\"eicher pro 1110\",\"eicher pro 2049\",\"eicher pro 2059\",\"eicher pro 3015\",\"eicher pro 3019\",\"eicher pro 6016\",\"eicher pro 6025\",\"eicher pro 6031\",\"eicher pro 6037\",\"eicher pro 8025\",\"eicher 10.59\",\"eicher 11.10\",\"eicher 10.80\",\"eicher terra\",\"eicher tipper\",\"eicher truck\",\"eicher lorry\",\"hino ranger\",\"ranger hino\",\"hino dutro\",\"dutro\",\"hino 300\",\"hino 300 series\",\"hino 500 series\",\"hino 700 series\",\"hino profia\",\"profia\",\"hino 145\",\"hino 155\",\"hino 185\",\"hino 195\",\"hino 258\",\"hino 268\",\"hino 338\",\"hino 616\",\"hino 716\",\"hino 917\",\"hino fc\",\"hino fd\",\"hino fg\",\"hino fl\",\"hino fm\",\"hino gd\",\"hino gh\",\"hino ft\",\"hino sh\",\"hino fs\",\"hino zs\",\"hino fc9j\",\"hino fd8j\",\"hino gh8j\",\"hino sh1e\",\"hino ss1e\",\"hino truck\",\"hino lorry\",\"hino tipper\",\"hino tanker\",\"hino prime mover\",\"foton auman\",\"auman\",\"auman etx\",\"auman gtl\",\"auman est\",\"foton ollin\",\"ollin\",\"foton forland\",\"forland\",\"foton aumark\",\"aumark\",\"foton truck\",\"foton lorry\",\"foton tipper\",\"foton etx\",\"foton gtl\",\"foton bj1043\",\"foton bj1093\",\"foton bj1069\",\"foton 1043\",\"foton 1093\",\"foton 1069\",\"foton 1049\",\"prime mover\",\"trailer head\",\"truck head\",\"prime mover truck\"\n  ]},\n  { cat:\"PSV\", terms:[\"psv\",\"psv local\",\"psv imported\",\"matatu local\",\"matatu imported\",\"matatu\",\n    \"mini bus\",\"minibus\",\"14 seater\",\"14-seater\",\"14 seater matatu\",\"small matatu\",\"toyota matatu\",\"nissan matatu\",\"shark matatu\",\"hiace matatu\",\"urvan matatu\",\"caravan matatu\",\"journey\",\"isuzu journey\",\"isuzu journey j\",\"isuzu journey k\",\"isuzu journey l\",\"rosa\",\"mitsubishi rosa\",\"fuso rosa\",\"rosa bus\",\"public service vehicle\"] },\n  { cat:\"Tractors \u2014 Massey Ferguson, Ford, New Holland, Case\", terms:[\"massey ferguson\",\"new holland\",\"case ih\",\"ford tractor\",\n    \"massey\",\"mf tractor\",\"massey ferguson 240\",\"massey ferguson 260\",\"massey ferguson 290\",\"massey ferguson 375\",\"massey ferguson 385\",\"massey ferguson 399\",\"massey ferguson 440\",\"massey ferguson 5400\",\"massey ferguson 5700\",\"massey ferguson 6400\",\"massey ferguson 7400\",\"massey ferguson 8000\",\"mf 240\",\"mf 260\",\"mf 290\",\"mf 360\",\"mf 375\",\"mf 385\",\"mf 399\",\"mf 440\",\"mf 445\",\"mf 455\",\"mf 465\",\"mf 4707\",\"mf 4708\",\"mf 4709\",\"mf 5612\",\"mf 5710\",\"mf 6713\",\"ford 3000\",\"ford 4000\",\"ford 5000\",\"ford 5610\",\"ford 6600\",\"ford 6610\",\"ford 7600\",\"ford 7610\",\"ford 7810\",\"ford 8210\",\"ford tw\",\"new holland tt\",\"new holland tt55\",\"new holland tt75\",\"new holland t4\",\"new holland t5\",\"new holland t6\",\"new holland t7\",\"new holland td\",\"new holland tl\",\"new holland tn\",\"new holland tm\",\"new holland ts\",\"new holland 3230\",\"new holland 3630\",\"new holland 7840\",\"nh tractor\",\"case ih farmall\",\"case farmall\",\"case maxxum\",\"case puma\",\"case magnum\",\"case jx\",\"case jxt\",\"case 585\",\"case 695\",\"case 5120\"] },\n  { cat:\"Other tractors\", terms:[\"tractor\",\"john deere\",\"kubota\",\"landini\",\"same tractor\",\"fendt\",\n    \"john deere 5045\",\"john deere 5050\",\"john deere 5075\",\"john deere 5105\",\"john deere 5310\",\"john deere 5405\",\"john deere 5503\",\"john deere 6068\",\"john deere 6110\",\"john deere 6130\",\"john deere 6155\",\"john deere 7230\",\"john deere 5e\",\"jd tractor\",\"kubota m\",\"kubota l\",\"kubota b\",\"kubota m5000\",\"kubota m7040\",\"kubota m8540\",\"kubota m9540\",\"kubota l3408\",\"kubota l4508\",\"kubota b2420\",\"kubota mu5501\",\"kubota tractor\",\"landini rex\",\"landini powerfarm\",\"landini globus\",\"landini legend\",\"landini 6-110\",\"same explorer\",\"same dorado\",\"same deutz-fahr\",\"deutz fahr\",\"deutz-fahr\",\"deutz\",\"agrotron\",\"agrofarm\",\"fendt 300\",\"fendt 500\",\"fendt 700\",\"fendt 800\",\"fendt vario\",\"mahindra tractor\",\"mahindra 275\",\"mahindra 475\",\"mahindra 575\",\"mahindra 585\",\"mahindra arjun\",\"mahindra novo\",\"mahindra yuvo\",\"swaraj\",\"swaraj 744\",\"swaraj 855\",\"sonalika\",\"sonalika di\",\"sonalika rx\",\"tafe\",\"tafe 45\",\"eicher tractor\",\"eicher 380\",\"eicher 485\",\"farmtrac\",\"farmtrac 45\",\"farmtrac 60\",\"escorts tractor\",\"valtra\",\"valtra a\",\"valtra n\",\"valtra t\",\"belarus\",\"mtz\",\"mtz 80\",\"mtz 82\",\"mtz 892\",\"belarus 892\",\"belarus 82\",\"claas\",\"claas arion\",\"claas axion\",\"claas nectis\",\"zetor\",\"zetor forterra\",\"zetor proxima\",\"zetor major\",\"zetor crystal\",\"jinma\",\"jinma 704\",\"lovol\",\"lovol tractor\",\"foton lovol\",\"foton tractor\",\"yto\",\"yto tractor\",\"tractor 4wd\",\"tractor 2wd\"] },\n];\n\nconst LUXURY_OK = [\"Mercedes-Benz\",\"Audi\",\"BMW\",\"Lexus\",\"Land Rover\",\"Range Rover\",\"Jaguar\",\"Volvo\",\"Jeep\",\"Chevrolet\",\"Porsche\"];\nconst LUXURY_NO = [\"Tesla\",\"Lamborghini\",\"Cadillac\",\"Infiniti\",\"Lincoln\",\"Chrysler\",\"Genesis\",\"Lotus\",\"Pagani\",\"Acura\",\"Pontiac\",\"Maserati\",\"Koenigsegg\",\"McLaren\",\"ESV Escalade\",\"Aston Martin\",\"Bugatti\",\"Rolls Royce\",\"Hummer\",\"Ferrari\",\"Bentley\"];\n\ndocument.getElementById('luxury-ok').textContent = LUXURY_OK.join(' \u00b7 ');\ndocument.getElementById('luxury-no').textContent = LUXURY_NO.join(' \u00b7 ');\n\n// resolve each keyword entry's category name to its index in CATEGORIES once, up front\nconst KEYWORD_INDEX = MODEL_KEYWORDS.map(k => ({\n  idx: CATEGORIES.findIndex(c => c.name === k.cat),\n  terms: k.terms\n})).filter(k => k.idx !== -1);\n\n// ---------- MODEL -> CATEGORY AUTO-DETECT ----------\nconst searchInput = document.getElementById('model-search');\nconst matchesBox = document.getElementById('matches');\nconst detectedField = document.getElementById('detected-field');\nconst detectedBox = document.getElementById('detected-category');\nconst originField = document.getElementById('origin-field');\nlet selectedCatIdx = '';\n\n// lowercase, trim, collapse whitespace, and drop punctuation (hyphens, commas, dots)\n// so \"CR-V\", \"cr v\", \"crv\" and \"Cr.V\" all match the same term.\nfunction normalize(s){\n  return s.toLowerCase().trim().replace(/[-_,.']/g,' ').replace(/\\s+/g,' ').trim();\n}\n\nfunction findCategoryMatches(query){\n  const q = normalize(query);\n  if(q.length < 2) return [];\n\n  // PSV override: if \"psv\" appears anywhere in the typed text, ignore whatever car\n  // model was also typed (e.g. \"Probox PSV\") and route straight to the PSV band.\n  if(/\\bpsv\\b/.test(q)){\n    const idx = CATEGORIES.findIndex(c => c.name === 'PSV');\n    if(idx !== -1) return [{ idx, term: 'psv', score: 999 }];\n  }\n\n  // Lorry/truck override: \"<model> lorry\" or \"<model> truck\" uses the truck bands.\n  // A specific truck category found in the text (e.g. \"FAW truck\", \"Scania\") wins;\n  // otherwise it goes to Trucks T1.\n  if(/\\b(lorry|lorries|truck|trucks)\\b/.test(q)){\n    const isTruckCat = i => CATEGORIES[i].group === 'Trucks & heavy commercial' || CATEGORIES[i].escalate;\n    const t1 = CATEGORIES.findIndex(c => c.short === 'Trucks T1');\n    const specific = [];\n    KEYWORD_INDEX.forEach(entry => {\n      if(!isTruckCat(entry.idx)) return;\n      let best = 0;\n      entry.terms.forEach(raw => {\n        const term = normalize(raw);\n        if(term.length > 3 && q.includes(term) && !/^(lorry|truck)/.test(term)) best = Math.max(best, term.length + (term === q ? 50 : 0));\n      });\n      if(best) specific.push({ idx: entry.idx, term: 'truck', score: best });\n    });\n    if(specific.length) return specific.sort((a,b) => b.score - a.score);\n    if(t1 !== -1) return [{ idx: t1, term: 'truck', score: 999 }];\n  }\n\n  const scored = [];\n  KEYWORD_INDEX.forEach(entry => {\n    entry.terms.forEach(rawTerm => {\n      const term = normalize(rawTerm);\n      if(q.includes(term) || term.includes(q)){\n        // exact matches rank highest. When the query contains the term (e.g. \"toyota probox gl\"),\n        // the more specific term wins. When the term only contains the query (partial typing,\n        // e.g. \"prob\"), the simplest, closest term wins so \"Probox\" shows, not \"Probox DX Comfort\".\n        let score;\n        if(term === q) score = term.length + 50;\n        else if(q.includes(term)) score = term.length;\n        else score = Math.max(1, 40 - (term.length - q.length)) + (term.startsWith(q) ? 10 : 0);\n        scored.push({ idx: entry.idx, term, score });\n      }\n    });\n  });\n  // keep best score per category, dedupe\n  const byCat = new Map();\n  scored.forEach(s => {\n    if(!byCat.has(s.idx) || byCat.get(s.idx).score < s.score) byCat.set(s.idx, s);\n  });\n  return [...byCat.values()].sort((a,b)=>b.score - a.score);\n}\n\n// Standard Levenshtein edit-distance, used only as a typo-tolerant fallback\n// when strict substring matching finds nothing.\nfunction levenshtein(a, b){\n  const m = a.length, n = b.length;\n  if(m === 0) return n;\n  if(n === 0) return m;\n  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));\n  for(let i=0;i<=m;i++) dp[i][0]=i;\n  for(let j=0;j<=n;j++) dp[0][j]=j;\n  for(let i=1;i<=m;i++){\n    for(let j=1;j<=n;j++){\n      const cost = a[i-1]===b[j-1] ? 0 : 1;\n      dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);\n    }\n  }\n  return dp[m][n];\n}\n\n// Catches typos like \"premeo\", \"landcruser\", \"corola\", \"harier\" \u2014 anything\n// strict matching missed. Only offered as a suggestion, never auto-applied,\n// so a genuinely unrecognized model never gets silently mis-filed. Tuned and\n// tested against the full term list: distance must be 1 for anything up to\n// 8 characters (2 only for longer compound names), which catches the vast\n// majority of realistic typos while avoiding false matches between distinct\n// short model names (e.g. \"Vitz\" vs \"Vito\"). Alphanumeric trim codes (S300,\n// L200, NX200 etc.) are excluded from fuzzy matching \u2014 those short codes are\n// too easily confused across brands, and exact typing already finds them.\nfunction isCodeLike(s){ return /^[a-z]{0,3}\\d{2,4}[a-z]?$/.test(s.replace(/\\s+/g,'')); }\nfunction findFuzzyMatches(query){\n  const q = normalize(query);\n  if(q.length < 3) return [];\n  const results = [];\n  KEYWORD_INDEX.forEach(entry => {\n    entry.terms.forEach(rawTerm => {\n      const term = normalize(rawTerm);\n      if(term.length < 4 || isCodeLike(term)) return;\n      if(Math.abs(q.length - term.length) > 1) return;\n      const dist = levenshtein(q, term);\n      const threshold = term.length <= 8 ? 1 : 2;\n      if(dist > 0 && dist <= threshold){\n        results.push({ idx: entry.idx, term, dist });\n      }\n    });\n  });\n  const byCat = new Map();\n  results.forEach(r => {\n    if(!byCat.has(r.idx) || byCat.get(r.idx).dist > r.dist) byCat.set(r.idx, r);\n  });\n  return [...byCat.values()].sort((a,b)=>a.dist-b.dist);\n}\n\n\nfunction showDetected(idx, sourceLabel, term){\n  const cat = CATEGORIES[idx];\n  originField.style.display = cat.hasOrigin ? '' : 'none';\n  detectedField.style.display = '';\n  detectedBox.className = 'detected-box';\n  const displayTerm = term ? titleCase(term) : '';\n  const heading = (displayTerm && displayTerm.toLowerCase() !== cat.short.toLowerCase())\n    ? displayTerm + ' - ' + cat.short\n    : cat.short;\n  detectedBox.innerHTML =\n    '<div><span class=\"tag\">Category detected</span><strong>' + heading + '</strong>' +\n    '<small style=\"display:block; color:var(--muted); font-size:11px; margin-top:2px;\">' + sourceLabel + ' \u00b7 ' + cat.name + '</small></div>';\n}\n\nfunction applyCategory(idx, term){\n  const psvIdx = CATEGORIES.findIndex(c => c.name === 'PSV');\n  if(psvToggle.checked && psvIdx !== -1) idx = psvIdx;\n  selectedCatIdx = String(idx);\n  showDetected(idx, 'From model lookup', term);\n  compute();\n}\n\nfunction titleCase(s){\n  if(s === 'psv') return 'PSV';\n  return s.replace(/\\b\\w/g, c => c.toUpperCase());\n}\n\nsearchInput.addEventListener('input', ()=>{\n  if(psvToggle.checked){ matchesBox.style.display='none'; applyPsv(); return; }\n  const q = searchInput.value.trim();\n  const hits = findCategoryMatches(q);\n  if(!hits.length){\n    if(q.length >= 3){\n      const fuzzy = findFuzzyMatches(q);\n      if(fuzzy.length){\n        matchesBox.innerHTML =\n          '<div class=\"no-match\" style=\"border-bottom:1px dashed var(--rule, #ccc); padding-bottom:8px; margin-bottom:4px;\">' +\n            '<strong>No exact match for \"'+ titleCase(normalize(q)) +'\"</strong>' +\n            '<span class=\"term-hit\" style=\"display:block;\">Did you mean one of these?</span>' +\n          '</div>' +\n          fuzzy.slice(0,4).map(h=>{\n            const cat = CATEGORIES[h.idx];\n            return '<div data-i=\"'+h.idx+'\" data-term=\"'+titleCase(h.term).replace(/\"/g,'&quot;')+'\" title=\"'+cat.name.replace(/\"/g,'&quot;')+'\">' +\n              '<strong>'+titleCase(h.term)+'</strong>' +\n              '<span class=\"term-hit\" style=\"display:block;\">Category: '+cat.short+'</span>' +\n            '</div>';\n          }).join('');\n        matchesBox.style.display='block';\n        return;\n      }\n      matchesBox.innerHTML =\n        '<div class=\"no-match\">' +\n          '<strong>No match for \"'+ titleCase(normalize(q)) +'\"</strong>' +\n          '<span class=\"term-hit\" style=\"display:block;\">Try the make (e.g. \"Toyota\"), a body type, or a slightly different spelling.</span>' +\n        '</div>';\n      matchesBox.style.display='block';\n    } else {\n      matchesBox.style.display='none';\n    }\n    return;\n  }\n  matchesBox.innerHTML = hits.slice(0,6).map(h=>{\n    const cat = CATEGORIES[h.idx];\n    return '<div data-i=\"'+h.idx+'\" data-term=\"'+titleCase(h.term).replace(/\"/g,'&quot;')+'\" title=\"'+cat.name.replace(/\"/g,'&quot;')+'\">' +\n      '<strong><span class=\"match-confirm\">&#10003;</span> '+titleCase(h.term)+' found</strong>' +\n      '<span class=\"term-hit\" style=\"display:block;\">Category: '+cat.short+'</span>' +\n    '</div>';\n  }).join('');\n  matchesBox.style.display='block';\n});\nsearchInput.addEventListener('keydown', (e)=>{\n  if(e.key === 'Enter'){\n    const hits = findCategoryMatches(searchInput.value);\n    if(hits.length){ applyCategory(hits[0].idx, hits[0].term); matchesBox.style.display='none'; }\n  }\n});\nmatchesBox.addEventListener('click', (e)=>{\n  const div = e.target.closest('div[data-i]');\n  if(!div) return;\n  applyCategory(Number(div.dataset.i), div.dataset.term);\n  matchesBox.style.display='none';\n});\ndocument.addEventListener('click', (e)=>{\n  if(!document.getElementById('search-box').contains(e.target)) matchesBox.style.display='none';\n});\n\n// ---------- ORIGIN TOGGLE ----------\nlet currentOrigin = 'local';\ndocument.getElementById('origin-toggle').addEventListener('click', (e)=>{\n  const btn = e.target.closest('button');\n  if(!btn) return;\n  currentOrigin = btn.dataset.origin;\n  document.querySelectorAll('#origin-toggle button').forEach(b=>b.setAttribute('aria-pressed', b===btn));\n  compute();\n});\n\n// ---------- PSV SELECTOR ----------\nconst psvToggle = document.getElementById('psv-toggle');\n\nfunction applyPsv(){\n  const idx = CATEGORIES.findIndex(c => c.name === 'PSV');\n  if(idx === -1) return;\n  const typed = normalize(searchInput.value).replace(/\\bpsv\\b/g,'').trim();\n  applyCategory(idx, typed ? typed : 'PSV');\n}\n\npsvToggle.addEventListener('change', ()=>{\n  matchesBox.style.display = 'none';\n  if(psvToggle.checked){\n    applyPsv();\n  } else {\n    selectedCatIdx = '';\n    detectedField.style.display = 'none';\n    originField.style.display = 'none';\n    compute();\n    if(searchInput.value.trim()) searchInput.dispatchEvent(new Event('input'));\n  }\n});\n\n// ---------- CRB TOGGLE ----------\nlet crbCleared = true; // default: not listed in CRB\ndocument.getElementById('crb-toggle').addEventListener('click', (e)=>{\n  const btn = e.target.closest('button');\n  if(!btn) return;\n  crbCleared = btn.dataset.crb === 'clear';\n  document.querySelectorAll('#crb-toggle button').forEach(b=>b.setAttribute('aria-pressed', b===btn));\n  compute();\n});\n\n// ---------- FSV VALUE (optional) ----------\nconst fsvValueInput = document.getElementById('fsv-value-input');\nfsvValueInput.addEventListener('input', ()=>{\n  const raw = fsvValueInput.value.replace(/[^0-9]/g,'');\n  fsvValueInput.value = raw ? Number(raw).toLocaleString('en-US') : '';\n  compute();\n});\nfunction numFromField(el){ return Number((el.value||'').replace(/[^0-9]/g,'')) || 0; }\nfunction kes(n){ return 'KES ' + Math.round(n).toLocaleString('en-US'); }\n\ndocument.getElementById('yom-input').addEventListener('input', compute);\n\nfunction compute(){\n  const results = document.getElementById('results');\n  const catIdx = selectedCatIdx;\n  const yom = Number(document.getElementById('yom-input').value);\n\n  if(catIdx === ''){\n    results.innerHTML = '<p class=\"placeholder\">Type a vehicle model above to detect its FSV category, then enter the year of manufacture.</p>';\n    return;\n  }\n  const cat = CATEGORIES[catIdx];\n\n  if(cat.escalate){\n    results.innerHTML =\n      '<div class=\"result-status status-warn\">Escalation required</div>' +\n      '<p style=\"font-size:13.5px; color:var(--ink-2);\">This vehicle isn\\'t classified under any named FSV category. The policy sets an indicative base of 25%, but the application must be forwarded to the Credit Committee for review before any rate is applied.</p>';\n    return;\n  }\n\n  if(!yom || yom > CURRENT_YEAR + 1){\n    results.innerHTML = '<p class=\"placeholder\">Enter a valid year of manufacture to continue.</p>';\n    return;\n  }\n\n  if(yom < 2000){\n    results.innerHTML = '<p class=\"placeholder\">Momentum accepts vehicles manufactured in year 2000 or later.</p>';\n    return;\n  }\n\n  const age = CURRENT_YEAR - yom;\n  const rowsForOrigin = cat.hasOrigin ? cat.rows.filter(r=>r.origin===currentOrigin) : cat.rows;\n  const row = rowsForOrigin.find(r => yom >= r.min && yom <= r.max);\n\n  if(!row){\n    results.innerHTML =\n      '<div class=\"result-status status-warn\">No matching band</div>' +\n      '<p style=\"font-size:13.5px; color:var(--ink-2);\">Year of manufacture ' + yom + ' falls outside every band defined for this category. Treat as older than the policy\\'s oldest accepted year and route to the Appeals Committee in place of Credit Risk CA1.</p>';\n    return;\n  }\n\n  const premierEligible = crbCleared && age < 15;\n\n  let premierReason;\n  if (premierEligible) {\n    premierReason = 'Under 15 yrs and not listed in CRB';\n  } else if (age >= 15 && !crbCleared) {\n    premierReason = 'Car older than 15 yrs and listed in CRB \u2014 not eligible';\n  } else if (age >= 15) {\n    premierReason = 'Car older than 15 yrs \u2014 not eligible';\n  } else {\n    premierReason = 'Listed in CRB \u2014 not eligible';\n  }\n\n  const totalPct = row.base + (premierEligible ? 5 : 0);\n\n  const fsvValue = numFromField(fsvValueInput);\n\n  const MIN_FSV = 250000;\n  if(fsvValue && fsvValue < MIN_FSV){\n    results.innerHTML =\n      '<div class=\"result-status status-warn\">Below minimum financing value</div>' +\n      '<p style=\"font-size:13.5px; color:var(--ink-2);\">This vehicle\\'s FSV (' + kes(fsvValue) + ') is below Momentum\\'s minimum financing threshold of ' + kes(MIN_FSV) + '. Please inform the client that we are unable to finance vehicles valued below this amount.</p>';\n    return;\n  }\n\n  const baseAmount = fsvValue * (row.base / 100);\n  const premierAmount = fsvValue * (premierEligible ? 5 / 100 : 0);\n  let totalAmount = fsvValue * (totalPct / 100);\n  let cappedNote = '';\n  if(fsvValue && cat.cap && totalAmount > cat.cap){\n    cappedNote = '<div class=\"note neutral\">Calculated amount exceeds this category\\'s cap of ' + kes(cat.cap) + ' \u2014 the cap applies instead.</div>';\n    totalAmount = cat.cap;\n  }\n\n  const MAX_FINANCE = 3000000;\n  if(fsvValue && totalAmount > MAX_FINANCE){\n    results.innerHTML =\n      '<div class=\"result-status status-warn\">Above maximum financing amount</div>' +\n      '<p style=\"font-size:13.5px; color:var(--ink-2);\">This vehicle\\'s calculated financing amount (' + kes(totalAmount) + ') exceeds Momentum\\'s maximum of ' + kes(MAX_FINANCE) + ' for a single client. Please let the client know we are unable to finance above this limit.</p>';\n    return;\n  }\n\n  const amountLine = amt => fsvValue ? '<div class=\"line-amount\">' + kes(amt) + '</div>' : '';\n\n  const capNote = (cat.cap && !fsvValue)\n    ? '<div class=\"note neutral\">This category\\'s approved FSV amount is capped at KES ' + cat.cap.toLocaleString('en-US') + ', regardless of the percentage below.</div>'\n    : '';\n\n  results.innerHTML =\n    '<div class=\"result-status status-ok\">Category matched</div>' +\n\n    '<div class=\"line-row\"><div class=\"line-label\">Vehicle age<small>' + yom + ' \u2192 ' + CURRENT_YEAR + '</small></div><div class=\"line-value\">' + age + ' yrs</div></div>' +\n    '<div class=\"line-row\"><div class=\"line-label\">Max MV age for this band</div><div class=\"line-value\">' + row.maxAge + ' yrs</div></div>' +\n    '<div class=\"line-row\"><div class=\"line-label\">Base rate</div><div class=\"line-value\">' + row.base + '%' + amountLine(baseAmount) + '</div></div>' +\n    '<div class=\"line-row\"><div class=\"line-label\">Premier advantage<small>' + premierReason + '</small></div><div class=\"line-value\">' + (premierEligible ? '+5%' + amountLine(premierAmount) : '\u2014') + '</div></div>' +\n\n    '<div class=\"total-block\">' +\n      '<div class=\"line-row\"><div class=\"line-label\">Total FSV rate</div><div class=\"line-value\">' + totalPct + '%' + (fsvValue ? '<div class=\"total-amount\">' + kes(totalAmount) + '</div>' : '') + '</div></div>' +\n      (fsvValue ? '<div class=\"disclaimer-bubble\">This is the <strong>maximum</strong> amount the client may qualify for \u2014 the final figure is subject to change following a cashflow review by Credit Risk, or through exceptional approval.</div>' : '') +\n    '</div>' +\n    cappedNote;\n}\n\n// ---------- APPENDIX TOGGLE ----------\nconst appendixPanel = document.getElementById('appendix-panel');\ndocument.getElementById('toggle-appendix').addEventListener('click', (e)=>{\n  e.preventDefault();\n  const open = appendixPanel.style.display !== 'none';\n  appendixPanel.style.display = open ? 'none' : '';\n  e.target.textContent = open ? 'View luxury model appendix \u25be' : 'Hide luxury model appendix \u25b4';\n});\n</script>\n</body>\n</html>\n";


const FONT_IMPORT = "";

const LOGO_DATA_URI = "data:image/png;base64,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";

const TOKENS = {
  paper: "#EFEDE1",
  paperAlt: "#E5E1CE",
  ink: "#1E2B27",
  inkSoft: "#5B675F",
  rule: "#C3BB9B",
  teal: "#2E6F5C",
  tealDeep: "#204A3E",
  red: "#B0473A",
  gold: "#AD8A31",
};

const MAX_LOAN_AMOUNT = 3000000;

// Lets people type a shorthand like "1.2" and have it understood as 1.2 million,
// instead of forcing them to type "1200000" in full. Rules:
//  - A number from 1 up to (but not including) 1000 is read as millions, so the
//    smallest usable shorthand entry is "1" (= KSh 1,000,000).
//  - A number below 1 (e.g. "0.5") is NOT accepted as shorthand — there is no way
//    to tell "0.5" (meant as 500k) from someone genuinely typing a fraction, so we
//    require the full figure to be typed out instead.
//  - 1000 and above is treated as a literal amount already in shillings.
//  - Anything resolving above the KSh3,000,000 single-client maximum is capped at
//    3,000,000 and flagged so the person knows it was capped.
function resolveLoanAmount(raw) {
  const n = Number(raw);
  if (!isFinite(n) || n <= 0) {
    return { value: 0, status: "empty" };
  }
  if (n < 1) {
    return { value: 0, status: "below_min_shorthand" };
  }
  const resolved = n < 1000 ? n * 1000000 : n;
  if (resolved > MAX_LOAN_AMOUNT) {
    return { value: MAX_LOAN_AMOUNT, status: "capped" };
  }
  return { value: resolved, status: n < 1000 ? "shorthand" : "literal" };
}

function fmtKSh(n) {
  if (!isFinite(n)) return "KSh0.00";
  const neg = n < 0;
  const v = Math.abs(n).toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${neg ? "-" : ""}KSh${v}`;
}

function addMonthsClamped(date, months) {
  const d = new Date(date.getTime());
  const targetMonth = d.getMonth() + months;
  const targetDate = new Date(d.getFullYear(), targetMonth, 1);
  const daysInTarget = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
  targetDate.setDate(Math.min(d.getDate(), daysInTarget));
  return targetDate;
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// The lender's reducing-balance monthly rate for each term is the rate whose
// level installment equals a 4% FLAT monthly rate: P * (1/n + 0.04).
// Computed at full precision (rounding it to 4 decimals caused 1-2 shilling
// errors). Checked row-by-row against 10 real schedules (12/18/24/36 months,
// 200k-1M): every installment matches; one row of one 36-month schedule
// differs by 1 shilling in the principal/interest split.
const LENDER_FLAT_RATE = 0.04;
function flatEquivalentRatePct(n, flat = LENDER_FLAT_RATE) {
  let lo = 1e-9, hi = 0.5;
  for (let k = 0; k < 200; k++) {
    const m = (lo + hi) / 2;
    if (m / (1 - Math.pow(1 + m, -n)) > 1 / n + flat) hi = m; else lo = m;
  }
  return ((lo + hi) / 2) * 100;
}
const RATE_TABLE = [12, 18, 24, 36, 48, 60].map((term) => ({ term, rate: flatEquivalentRatePct(term), verified: term <= 36 }));

// Capitalized fee formula, confirmed EXACTLY (zero deviation) against 11
// reference loans: 150k->18,055, 200k->20,230, 250k->22,405, 300k->24,580,
// 350k->26,755, 400k->28,930, 450k->31,105, 500k->33,280, 800k->46,330,
// 1,000,000->55,030.
// fee = 4.35% of the net amount requested + a KSh11,530 fixed component.
// The 4.35% = 4% Processing Fee + 0.35% Credit Life Insurance (both % of
// principal, per the lender's published fee schedule). The 11,530 fixed
// component approximately matches the sum of the lender's listed flat fees
// (Tracking Installation 5,000 + Tracking De-installation 2,500 + NTSA
// In-charge 1,175 + NTSA Discharge 1,175 + Chattel Registration 580 +
// NTSA Search 520 + Chattel Search 550 = 11,500), plus an unidentified
// ~30 shillings not itemized on the form. Processing Fee Excise Duty (20%
// of the processing fee) does NOT appear in this formula — it is either
// waived, bundled elsewhere, or not capitalized in practice.
// Verified range: 150,000 - 1,000,000. Treat as a confirmed formula within
// that range; linear extrapolation outside it is untested.
const FEE_SLOPE = 0.0435;
const FEE_INTERCEPT = 11530;

function estimateCapitalizedFee(netAmount) {
  if (!netAmount || netAmount <= 0) return 0;
  return Math.round(netAmount * FEE_SLOPE + FEE_INTERCEPT);
}


function fmtDate(d) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function buildSchedule({ loanAmount, ratePct, termMonths, monthlyFee, startDateStr, alignMonthEnd, method = "reducing" }) {
  // loanAmount is the total principal, inclusive of any capitalized fee.
  const principal = loanAmount;
  const r = ratePct / 100;
  const n = termMonths;

  const startDate = startDateStr ? new Date(startDateStr + "T00:00:00") : new Date();
  const rows = [{ i: 0, date: null, principal: 0, interest: 0, fees: 0, paymentDue: 0, balance: principal }];
  let totalPrincipal = 0, totalInterest = 0, totalFees = 0, totalPayment = 0;
  let closureDate = startDate;
  let pmtPI;

  if (method === "flat") {
    // Flat rate: interest is a fixed % of the ORIGINAL principal, charged every
    // period regardless of how much has already been repaid. Principal is repaid
    // in equal straight-line installments. This is a different (and typically
    // more expensive) method than reducing balance at the same headline rate.
    const interestPerPeriod = Math.round(principal * r);
    const principalPerPeriod = Math.round(principal / n);
    pmtPI = principalPerPeriod + interestPerPeriod;
    let balance = principal;

    for (let i = 1; i <= n; i++) {
      let principalPaid = i === n ? balance : principalPerPeriod;
      let dueDate = addMonthsClamped(startDate, i);
      if (alignMonthEnd) dueDate = endOfMonth(dueDate);

      const paymentDue = principalPaid + interestPerPeriod + monthlyFee;
      balance = Math.max(Math.round(balance - principalPaid), 0);

      totalPrincipal += principalPaid;
      totalInterest += interestPerPeriod;
      totalFees += monthlyFee;
      totalPayment += paymentDue;
      closureDate = dueDate;

      rows.push({ i, date: dueDate, principal: principalPaid, interest: interestPerPeriod, fees: monthlyFee, paymentDue, balance });
    }
  } else {
    // Reducing balance: interest is charged on the outstanding balance each
    // period, so it shrinks as principal is repaid. Installment (P+I) is level.
    pmtPI = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
    let balance = principal;

    for (let i = 1; i <= n; i++) {
      const interest = Math.round(balance * r);
      let principalPaid = Math.round(pmtPI - interest);
      if (i === n) principalPaid = Math.round(balance);
      let dueDate = addMonthsClamped(startDate, i);
      if (alignMonthEnd) dueDate = endOfMonth(dueDate);

      const paymentDue = principalPaid + interest + monthlyFee;
      balance = Math.max(Math.round(balance - principalPaid), 0);

      totalPrincipal += principalPaid;
      totalInterest += interest;
      totalFees += monthlyFee;
      totalPayment += paymentDue;
      closureDate = dueDate;

      rows.push({ i, date: dueDate, principal: principalPaid, interest, fees: monthlyFee, paymentDue, balance });
    }
  }

  return {
    principal,
    pmtPI,
    rows,
    totals: { totalPrincipal, totalInterest, totalFees, totalPayment },
    closureDate,
  };
}

const FIELD_LABEL = {
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: TOKENS.inkSoft,
};

function Field({ label, icon: Icon, children }) {
  return (
    <label style={{ display: "block", marginBottom: "18px" }}>
      <span style={{ ...FIELD_LABEL, display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
        {Icon ? <Icon size={12} strokeWidth={2.4} /> : null}
        {label}
      </span>
      {children}
    </label>
  );
}

const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  background: "#FBFAF4",
  border: `1px solid ${TOKENS.rule}`,
  borderRadius: "10px",
  padding: "9px 11px",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "14px",
  color: TOKENS.ink,
  outline: "none",
};

function LoanCalculator() {
  const [method, setMethod] = useState("reducing"); // "reducing" | "flat"
  const [netAmount, setNetAmount] = useState(200000); // amount the borrower requests
  const [termChoice, setTermChoice] = useState("12");
  const [ratePct, setRatePct] = useState(RATE_TABLE[0].rate);
  const [flatRatePct, setFlatRatePct] = useState(4);
  const [termMonths, setTermMonths] = useState(12);
  const [monthlyFee, setMonthlyFee] = useState(2000);
  const startDate = "2026-01-01"; // all schedules are anchored to January 2026
  const [alignMonthEnd, setAlignMonthEnd] = useState(true);

  const amountResult = resolveLoanAmount(netAmount);
  const resolvedAmount = amountResult.value;
  const shorthandApplied = amountResult.status === "shorthand";
  const isCapped = amountResult.status === "capped";
  const isBelowMinShorthand = amountResult.status === "below_min_shorthand";
  const capitalizedFee = useMemo(() => estimateCapitalizedFee(resolvedAmount), [resolvedAmount]);
  const totalPrincipal = resolvedAmount + capitalizedFee;

  const EXCISE_DUTY_RATE = 0.008; // 0.8%
  const exciseDuty = Math.round(resolvedAmount * EXCISE_DUTY_RATE * 100) / 100;
  const clientTakeHome = resolvedAmount - exciseDuty;

  const result = useMemo(
    () =>
      buildSchedule({
        loanAmount: totalPrincipal,
        ratePct: Number(method === "flat" ? flatRatePct : ratePct) || 0,
        termMonths: Math.max(1, Number(termMonths) || 1),
        monthlyFee: Number(monthlyFee) || 0,
        startDateStr: startDate,
        alignMonthEnd,
        method,
      }),
    [method, totalPrincipal, ratePct, flatRatePct, termMonths, monthlyFee, startDate, alignMonthEnd]
  );

  const handleTermChoice = (val) => {
    setTermChoice(val);
    if (val === "custom") return;
    const entry = RATE_TABLE.find((r) => String(r.term) === val);
    if (entry) {
      setTermMonths(entry.term);
      setRatePct(entry.rate);
    }
  };

  const resetDefaults = () => {
    setMethod("reducing");
    setNetAmount(200000);
    setTermChoice("12");
    setRatePct(RATE_TABLE[0].rate);
    setFlatRatePct(4);
    setTermMonths(12);
    setMonthlyFee(2000);
    setStartDate("2026-08-31");
    setAlignMonthEnd(true);
  };


  return (
    <div
      style={{
        background: TOKENS.paper,
        minHeight: "100%",
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: TOKENS.ink,
        padding: "0",
      }}
    >
      <style>{FONT_IMPORT}</style>

      {/* Header */}
      <div
        style={{
          borderBottom: `2px solid ${TOKENS.ink}`,
          padding: "28px 28px 20px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: "34px",
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img src={LOGO_DATA_URI} alt="" style={{ height: "1em", width: "auto", flexShrink: 0 }} />
            Installment Calculator
          </h1>
          <div
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 700,
              fontSize: "23px",
              marginTop: "2px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: `linear-gradient(90deg, ${TOKENS.teal}, ${TOKENS.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.01em",
              filter: "drop-shadow(0 1px 1px rgba(32,74,62,0.15))",
            }}
          >
            ✨ good luck on your sale
          </div>
        </div>
        <button
          onClick={resetDefaults}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: `1px solid ${TOKENS.ink}`,
            color: TOKENS.ink,
            borderRadius: "10px",
            padding: "8px 14px",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div style={{ display: "flex", gap: "0", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Input panel */}
        <div
          style={{
            width: "300px",
            flexShrink: 0,
            borderRight: `1px solid ${TOKENS.rule}`,
            padding: "26px 24px",
            minHeight: "100%",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <span style={{ ...FIELD_LABEL, display: "block", marginBottom: "8px" }}>Interest method</span>
            <div style={{ display: "flex", border: `1px solid ${TOKENS.ink}`, borderRadius: "10px", overflow: "hidden" }}>
              {[
                { key: "reducing", label: "Reducing balance" },
                { key: "flat", label: "Flat rate" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setMethod(opt.key)}
                  style={{
                    flex: 1,
                    padding: "8px 6px",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    background: method === opt.key ? TOKENS.ink : "transparent",
                    color: method === opt.key ? TOKENS.paper : TOKENS.ink,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Field label="Loan amount requested" icon={Calculator}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "11px", top: "9px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: TOKENS.inkSoft }}>KSh</span>
              <input
                type="number"
                value={netAmount}
                onChange={(e) => setNetAmount(e.target.value)}
                style={{ ...inputBase, paddingLeft: "38px" }}
              />
            </div>
            {shorthandApplied && (
              <div style={{ marginTop: "6px", fontSize: "11px", color: TOKENS.teal, fontFamily: "'IBM Plex Mono', monospace" }}>
                Read as {fmtKSh(resolvedAmount)}
              </div>
            )}
            {isCapped && (
              <div style={{ marginTop: "6px", fontSize: "11.5px", color: TOKENS.red, lineHeight: 1.5 }}>
                This is above the maximum we can offer a single client. Capped at {fmtKSh(MAX_LOAN_AMOUNT)}.
              </div>
            )}
            {isBelowMinShorthand && (
              <div style={{ marginTop: "6px", fontSize: "11.5px", color: TOKENS.red, lineHeight: 1.5 }}>
                Shorthand entries below 1 aren't accepted — the smallest shorthand amount is 1 (KSh 1,000,000). Type the full figure instead if you need less than that.
              </div>
            )}
            <div
              style={{
                marginTop: "8px",
                padding: "8px 10px",
                background: TOKENS.paperAlt,
                border: `1px dashed ${TOKENS.rule}`,
                borderRadius: "10px",
                fontSize: "11.5px",
                lineHeight: 1.6,
                color: TOKENS.inkSoft,
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              + Capitalized fee (auto): {fmtKSh(capitalizedFee)}
              <br />
              = Total loan used below: <strong style={{ color: TOKENS.tealDeep }}>{fmtKSh(totalPrincipal)}</strong>
            </div>
            <div style={{ marginTop: "6px", fontSize: "10.5px", color: TOKENS.inkSoft, lineHeight: 1.4 }}>
              This amount shows the cumulative loan amount after capitalised fees are added, these include NTSA fees, chattel fees plus tracking fees.
            </div>
          </Field>

          {method === "reducing" && (
            <Field label="Loan term" icon={Calendar}>
              <select
                value={termChoice}
                onChange={(e) => handleTermChoice(e.target.value)}
                style={{ ...inputBase, cursor: "pointer" }}
              >
                {RATE_TABLE.map((r) => (
                  <option key={r.term} value={r.term}>
                    {r.term} months
                  </option>
                ))}
                <option value="custom">Custom term / rate…</option>
              </select>
            </Field>
          )}

          {method === "reducing" && termChoice === "custom" && (
            <>
              <Field label="Loan term (months)" icon={Calendar}>
                <input
                  type="number"
                  value={termMonths}
                  onChange={(e) => setTermMonths(e.target.value)}
                  style={inputBase}
                />
              </Field>
              <Field label="Monthly interest rate" icon={TrendingDown}>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    step="0.001"
                    value={ratePct}
                    onChange={(e) => setRatePct(e.target.value)}
                    style={{ ...inputBase, paddingRight: "30px" }}
                  />
                  <span style={{ position: "absolute", right: "11px", top: "9px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: TOKENS.inkSoft }}>%</span>
                </div>
                <div style={{ marginTop: "6px", fontSize: "11px", color: TOKENS.inkSoft }}>
                  No confirmed rate for this term yet — enter it manually.
                </div>
              </Field>
            </>
          )}

          {method === "flat" && (
            <>
              <Field label="Loan term (months)" icon={Calendar}>
                <input
                  type="number"
                  value={termMonths}
                  onChange={(e) => setTermMonths(e.target.value)}
                  style={inputBase}
                />
              </Field>
              <Field label="Flat interest rate (monthly)" icon={TrendingDown}>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    step="0.001"
                    value={flatRatePct}
                    disabled
                    readOnly
                    style={{ ...inputBase, paddingRight: "30px", background: TOKENS.paperAlt, color: TOKENS.inkSoft, cursor: "not-allowed" }}
                  />
                  <span style={{ position: "absolute", right: "11px", top: "9px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", color: TOKENS.inkSoft }}>%</span>
                </div>
                <div style={{ marginTop: "6px", fontSize: "11px", color: TOKENS.inkSoft, lineHeight: 1.5 }}>
                  Fixed at 4% — charged on the original loan amount every period, so it does not shrink as you repay.
                </div>
              </Field>
            </>
          )}

          <Field label="Client's take home" icon={Receipt}>
            <div
              style={{
                padding: "10px 12px",
                background: TOKENS.paperAlt,
                border: `1px solid ${TOKENS.rule}`,
                borderLeft: `4px solid ${TOKENS.teal}`,
                borderRadius: "10px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "13.5px",
                lineHeight: 1.7,
                color: TOKENS.ink,
              }}
            >
              {fmtKSh(resolvedAmount)} − Excise Duty 0.8% ({fmtKSh(exciseDuty)})
              <br />
              = <strong style={{ color: TOKENS.tealDeep }}>{fmtKSh(clientTakeHome)}</strong>
            </div>
          </Field>

          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={alignMonthEnd}
              onChange={(e) => setAlignMonthEnd(e.target.checked)}
              style={{ accentColor: TOKENS.teal, width: "14px", height: "14px" }}
            />
            <span style={{ fontSize: "12.5px", color: TOKENS.inkSoft }}>Align installments to month-end</span>
          </label>

          <div style={{ marginTop: "10px", fontSize: "12.5px", color: TOKENS.ink }}>
            Monthly installment:{" "}
            <strong style={{ color: TOKENS.tealDeep, fontFamily: "'IBM Plex Mono', monospace" }}>
              {fmtKSh(result.pmtPI + (Number(monthlyFee) || 0))}
            </strong>
          </div>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "18px",
              borderTop: `1px dashed ${TOKENS.rule}`,
              fontSize: "12px",
              color: TOKENS.inkSoft,
              lineHeight: 1.5,
            }}
          >
            <strong>
              You can use both reducing balance or flat rate to get the installment amount as they will give
              you identical installment amounts.
            </strong>
            <div
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "15px",
                fontWeight: 600,
                color: TOKENS.teal,
                marginTop: "6px",
              }}
            >
              created by lewis
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div style={{ flex: 1, minWidth: "320px", padding: "26px 28px" }}>
          {/* Summary cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1px",
              background: TOKENS.rule,
              border: `1px solid ${TOKENS.rule}`,
              marginBottom: "22px",
            }}
          >
            {[
              { label: "Principal disbursed", value: fmtKSh(result.principal) },
              { label: "Installment (P + I + Fee)", value: fmtKSh(result.pmtPI + (Number(monthlyFee) || 0)) },
              { label: "Total paid back", value: fmtKSh((result.pmtPI + (Number(monthlyFee) || 0)) * Math.max(1, Number(termMonths) || 1)) },
              { label: "Expected closure", value: fmtDate(result.closureDate) },
            ].map((card, idx) => (
              <div key={idx} style={{ background: TOKENS.paperAlt, padding: "14px 16px" }}>
                <div style={{ ...FIELD_LABEL, marginBottom: "8px", fontSize: "10px" }}>{card.label}</div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: idx === 3 ? TOKENS.tealDeep : TOKENS.ink,
                  }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          {/* Schedule table */}
          <div style={{ position: "relative", border: `1px solid ${TOKENS.rule}`, background: "#FBFAF4" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "4px",
                background: `repeating-linear-gradient(to bottom, ${TOKENS.red} 0 6px, transparent 6px 12px)`,
              }}
            />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "620px" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${TOKENS.ink}` }}>
                    {["#", "Date", "Principal", "Interest", "Fees", "Payment Due", "Balance"].map((h, idx) => (
                      <th
                        key={h}
                        style={{
                          ...FIELD_LABEL,
                          textAlign: idx === 0 ? "center" : idx === 1 ? "left" : "right",
                          padding: "10px 14px",
                          fontSize: "10.5px",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr
                      key={row.i}
                      style={{
                        borderBottom: `1px solid ${TOKENS.rule}`,
                        background: row.i === 0 ? TOKENS.paperAlt : "transparent",
                      }}
                    >
                      <td style={{ padding: "8px 14px", textAlign: "center" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            color: TOKENS.red,
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "11px",
                            fontWeight: 600,
                            border: `1px solid ${TOKENS.red}55`,
                          }}
                        >
                          {row.i}
                        </span>
                      </td>
                      <td style={{ padding: "8px 14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px" }}>
                        {row.date ? fmtDate(row.date) : "—"}
                      </td>
                      <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px" }}>
                        {row.i === 0 ? "—" : fmtKSh(row.principal)}
                      </td>
                      <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px" }}>
                        {row.i === 0 ? "—" : fmtKSh(row.interest)}
                      </td>
                      <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px" }}>
                        {row.i === 0 ? "—" : fmtKSh(row.fees)}
                      </td>
                      <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: 600 }}>
                        {row.i === 0 ? "—" : fmtKSh(row.paymentDue)}
                      </td>
                      <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", color: TOKENS.tealDeep }}>
                        {fmtKSh(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: `2px solid ${TOKENS.ink}` }}>
                    <td colSpan={2} style={{ padding: "10px 14px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: 700, color: TOKENS.tealDeep }}>
                      Totals
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: 700, color: TOKENS.tealDeep }}>
                      {fmtKSh(result.totals.totalPrincipal)}
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: 700, color: TOKENS.tealDeep }}>
                      {fmtKSh(result.totals.totalInterest)}
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: 700, color: TOKENS.tealDeep }}>
                      {fmtKSh(result.totals.totalFees)}
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "12.5px", fontWeight: 700, color: TOKENS.tealDeep }}>
                      {fmtKSh(result.totals.totalPayment)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}



function BackBar({ onBack }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        background: `linear-gradient(90deg, ${TOKENS.tealDeep}, #2B4C7E 55%, #5E4A7A)`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <button
        onClick={onBack}
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          background: "transparent",
          border: `1px solid ${TOKENS.paper}`,
          color: TOKENS.paper,
          borderRadius: "8px",
          padding: "6px 14px",
          cursor: "pointer",
        }}
      >
        ← Back to tools
      </button>
    </div>
  );
}

// Same logic as the Installment Calculator, run backwards.
const FINDER_MAX_LOAN = 3000000;
const FINDER_FEE_SLOPE = 0.0435;
const FINDER_FEE_INTERCEPT = 11530;
const FINDER_TRACKING_FEE = 2000;
const FINDER_EXCISE_RATE = 0.008;
const FINDER_COLORS = ["#2E6F5C", "#2B4C7E", "#5E4A7A", "#8E3B4F", "#9A7B3C", "#A04A3B"];
const FINDER_RATES = RATE_TABLE.map(({ term, rate }) => ({ term, rate }));

const finderMoney = (n) => "KSh " + Math.round(n).toLocaleString("en-US");
const finderMoney2 = (n) => "KSh " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// forward: loan amount -> installment (identical to the Installment Calculator)
function forwardInstallment(loan, ratePct, n) {
  const fee = Math.round(loan * FINDER_FEE_SLOPE + FINDER_FEE_INTERCEPT);
  const principal = loan + fee;
  const r = ratePct / 100;
  return (principal * r) / (1 - Math.pow(1 + r, -n)) + FINDER_TRACKING_FEE;
}

// backward: installment -> maximum loan amount
function solveLoan(installment, ratePct, n) {
  const r = ratePct / 100;
  const pmtPI = installment - FINDER_TRACKING_FEE;
  if (pmtPI <= 0) return null;
  const total = (pmtPI * (1 - Math.pow(1 + r, -n))) / r; // loan + capitalised fee
  const exact = (total - FINDER_FEE_INTERCEPT) / (1 + FINDER_FEE_SLOPE);
  if (exact <= 0) return null;
  // step down to the largest whole-shilling loan whose installment does not exceed the target
  let loan = Math.floor(exact) + 2;
  while (loan > 0 && Math.round(forwardInstallment(loan, ratePct, n) * 100) / 100 > installment + 1e-9) loan--;
  return loan;
}

function parseInstallment(raw) {
  const s = String(raw).trim().toLowerCase().replace(/,/g, "");
  if (!s) return null;
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(k)?$/);
  if (!m) return NaN;
  return parseFloat(m[1]) * (m[2] ? 1000 : 1);
}

function LoanAmountFinder() {
  const [raw, setRaw] = useState("");
  const installment = parseInstallment(raw);
  const valid = installment !== null && !Number.isNaN(installment);

  const rows = useMemo(() => {
    if (!valid) return [];
    return FINDER_RATES.map(({ term, rate }) => {
      const loan = solveLoan(installment, rate, term);
      if (loan === null) return { term, rate, loan: null };
      const capped = loan > FINDER_MAX_LOAN;
      const used = capped ? FINDER_MAX_LOAN : loan;
      return { term, rate, loan: used, capped, actual: forwardInstallment(used, rate, term),
        fee: Math.round(used * FINDER_FEE_SLOPE + FINDER_FEE_INTERCEPT) };
    });
  }, [installment, valid]);

  const card = { background: "#fff", border: `1px solid ${TOKENS.rule}`, borderRadius: "14px", padding: "20px", boxShadow: "0 2px 6px rgba(32,74,62,0.08)" };

  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(circle at 8% 6%, #D5E3DA 0%, transparent 34%), radial-gradient(circle at 94% 10%, #EADFC2 0%, transparent 32%), radial-gradient(circle at 90% 94%, #DDD6E6 0%, transparent 34%), radial-gradient(circle at 6% 92%, #D3DDE8 0%, transparent 32%), ${TOKENS.paper}`, color: TOKENS.ink, fontFamily: "'IBM Plex Sans', sans-serif", padding: "24px" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "30px", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={LOGO_DATA_URI} alt="" style={{ height: "1em", width: "auto" }} />
          Loan Amount Finder
        </h1>
        <p style={{ color: TOKENS.inkSoft, fontSize: "14px", margin: "0 0 22px" }}>
          Enter the monthly installment the client can afford and see the largest loan amount that fits, for each term.
        </p>

        <div style={{ ...card, borderLeft: `5px solid ${TOKENS.teal}`, marginBottom: "20px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Monthly installment (KSh)</label>
          <input
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="e.g. 29,000 or 29k"
            style={{ width: "100%", boxSizing: "border-box", fontSize: "20px", padding: "12px 14px", border: `1px solid ${TOKENS.rule}`, borderRadius: "10px", fontFamily: "'IBM Plex Mono', monospace", background: TOKENS.paper }}
          />
          <div style={{ fontSize: "12px", color: TOKENS.inkSoft, marginTop: "8px" }}>
            Weka the installment amount client amesema anaeza afford.
          </div>
          {installment !== null && Number.isNaN(installment) && (
            <div style={{ color: TOKENS.rust, fontSize: "13px", marginTop: "8px" }}>Enter a valid number, e.g. 29000 or 29k.</div>
          )}
        </div>

        {valid && (
          <div style={{ display: "grid", gap: "14px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {rows.map((r, idx) => (
              <div key={r.term} style={{ ...card, background: `linear-gradient(160deg, ${FINDER_COLORS[idx % 6]}1F, #fff 60%)`, borderTop: `5px solid ${r.loan === null ? TOKENS.rust : FINDER_COLORS[idx % 6]}` }}>
                <div style={{ display: "inline-block", fontSize: "12.5px", color: "#fff", background: FINDER_COLORS[idx % 6], fontWeight: 700, padding: "3px 10px", borderRadius: "999px" }}>{r.term} months</div>
                {r.loan === null ? (
                  <div style={{ marginTop: "10px", color: TOKENS.rust, fontSize: "14px" }}>
                    Installment too low to cover the tracking fee and fixed charges.
                  </div>
                ) : (
                  <>
                    <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "28px", color: FINDER_COLORS[idx % 6], margin: "6px 0" }}>
                      {finderMoney(r.loan)}
                    </div>
                    <div style={{ background: TOKENS.paper, borderLeft: `4px solid ${TOKENS.teal}`, borderRadius: "8px", padding: "8px 10px", margin: "4px 0 10px" }}>
                      <div style={{ fontSize: "11.5px", color: TOKENS.inkSoft, fontWeight: 600 }}>Client's take home</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "19px", color: TOKENS.teal }}>
                        {finderMoney(r.loan * (1 - FINDER_EXCISE_RATE))}
                      </div>
                    </div>
                    <div style={{ fontSize: "12.5px", color: TOKENS.inkSoft, lineHeight: 1.6 }}>
                      Capitalised fees: {finderMoney(r.fee)}<br />
                      Total loan: {finderMoney(r.loan + r.fee)}<br />
                      Installment: <b style={{ color: TOKENS.ink }}>{finderMoney2(r.actual)}</b>
                    </div>
                    {r.capped && (
                      <div style={{ marginTop: "8px", fontSize: "12.5px", color: TOKENS.rust, fontWeight: 600 }}>
                        Capped at KSh 3,000,000 — the maximum we can offer a single client.
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// To add or change a link, edit this list.
const M_LINKS = [
  { name: "Leave Management", tag: "D365 · ESS", url: "https://ess.momentumcredit.co.ke/", accent: "#2E6F5C" },
  { name: "CRM – Digital Onboarding", tag: "CRM", url: "https://crm.momentumcredit.co.ke/sales/leads/digital-onboarding/wizard/cbe999cf-487a-4d4b-818e-481734db711b/66eed487-743b-4385-bee1-642729682b37", accent: "#AD8A31" },
  { name: "Mambu", tag: "Loan system", url: "https://momentumcreditltd.mambu.com/", accent: "#B0473A" },
  { name: "Valuations", tag: "Eezy Valuers", url: "https://ke.valuers.eezygroup.net/", accent: "#2B4C7E" },
  { name: "Intranet", tag: "Company intranet", url: "https://sites.google.com/view/momentumintranet1/home", accent: "#5E4A7A" },
  { name: "Outlook", tag: "Email", url: "https://outlook.cloud.microsoft/", accent: "#3F7A82" },
  { name: "Yeastar", tag: "Phone system", url: "https://momentum-ke.ras.yeastar.com/", accent: "#8E3B4F" },
];

function MLinkCard({ item }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: "none",
        background: hover ? item.accent : `linear-gradient(160deg, ${item.accent}22, #fff 62%)`,
        color: hover ? "#fff" : TOKENS.ink,
        border: `1px solid ${hover ? item.accent : item.accent + "66"}`,
        borderLeft: `6px solid ${item.accent}`,
        borderRadius: "14px",
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        transform: hover ? "translateY(-3px)" : "none",
        boxShadow: hover ? `0 12px 24px ${item.accent}55` : `0 2px 8px ${item.accent}26`,
        transition: "all 0.2s ease",
      }}
    >
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "19px" }}>{item.name}</div>
        <div style={{ fontSize: "12.5px", marginTop: "3px", color: hover ? "rgba(255,255,255,0.9)" : TOKENS.inkSoft }}>{item.tag}</div>
      </div>
      <ExternalLink size={20} color={hover ? "#fff" : item.accent} />
    </a>
  );
}

function MLinks() {
  const [q, setQ] = useState("");
  const shown = M_LINKS.filter((l) => (l.name + " " + l.tag).toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(circle at 8% 6%, #D5E3DA 0%, transparent 34%), radial-gradient(circle at 94% 10%, #EADFC2 0%, transparent 32%), radial-gradient(circle at 90% 94%, #DDD6E6 0%, transparent 34%), radial-gradient(circle at 6% 92%, #D3DDE8 0%, transparent 32%), ${TOKENS.paper}`, color: TOKENS.ink, fontFamily: "'IBM Plex Sans', sans-serif", padding: "24px" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "30px", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={LOGO_DATA_URI} alt="" style={{ height: "1em", width: "auto" }} />
          M Links
        </h1>
        <p style={{ color: TOKENS.inkSoft, fontSize: "14px", margin: "0 0 18px" }}>Quick access to Momentum's work systems. Links open in a new tab.</p>
        <div style={{ position: "relative", marginBottom: "18px" }}>
          <Search size={16} color={TOKENS.inkSoft} style={{ position: "absolute", left: "12px", top: "13px" }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search links…"
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 34px", fontSize: "15px", border: `1px solid ${TOKENS.rule}`, borderRadius: "10px", background: "#fff", fontFamily: "inherit" }}
          />
        </div>
        <div style={{ display: "grid", gap: "14px", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {shown.map((l) => <MLinkCard key={l.url} item={l} />)}
        </div>
        {shown.length === 0 && <div style={{ color: TOKENS.inkSoft, fontSize: "14px" }}>No links match.</div>}
      </div>
    </div>
  );
}

const KB_ENTRIES = [
  {
    category: "Loan basics",
    title: "How the monthly installment is calculated",
    body: [
      "Interest is charged on the reducing balance of (loan + capitalised fee) only.",
      "Installment = repayment on (loan + fee) + KSh 2,000 monthly tracking fee.",
      "• The tracking fee is a flat add-on to each installment and does not earn interest.",
      "• Reducing balance and flat rate give identical installment amounts.",
    ],
    tags: ["installment", "reducing balance", "flat rate", "tracking fee"],
    updated: "2026-10-18",
  },
  {
    category: "Loan basics",
    title: "Maximum loan and client take-home",
    body: [
      "• The most we can offer a single client is KSh 3,000,000.",
      "• Client take-home = loan amount − 0.8% excise duty. Example: KSh 200,000 → KSh 198,400.",
      "• Loan amounts in the calculators: typing 1.2 is read as KSh 1,200,000. Decimals below 1 are not accepted.",
    ],
    tags: ["maximum", "cap", "3m", "excise", "disbursement", "take home"],
    updated: "2026-10-18",
  },
  {
    category: "Repayment",
    title: "Grace period before the first installment",
    body: [
      "Clients get a 30–35 day grace period before they start paying their first installment.",
      "• The tools line schedules up from January 2026 for simplicity.",
    ],
    tags: ["grace", "first installment", "start"],
    updated: "2026-10-18",
  },
  {
    category: "Repayment",
    title: "Early settlement (paying off before the term ends)",
    body: [
      "The tracking fee for the whole term is charged up front.",
      "Payoff = ledger balance − (remaining months × KSh 2,000 tracking fee).",
      "• The Early Settlement tool assumes no arrears and no late fees, so it works as a bargaining guide.",
      "• The official payoff statement is the final figure; always confirm with it.",
    ],
    tags: ["payoff", "offset", "settle", "clear loan", "balance"],
    updated: "2026-10-18",
  },
  {
    category: "FSV",
    title: "How to use the FSV tool",
    body: [
      "• 1. Enter the car name and year.",
      "• 2. Look at the result on the other side.",
      "• 3. Check whether the car is a PSV. If it is, tick the PSV box.",
      "• 4. If a valuation is available, enter the valuation amount.",
      "• 5. See the maximum amount a client can qualify for as per our FSV policy.",
    ],
    tags: ["fsv", "search", "psv", "valuation", "model", "year", "maximum", "policy", "how to"],
    updated: "2026-10-20",
  },
  {
    category: "Logbook loan",
    title: "Logbook loan (LBL): who qualifies, size and term",
    body: [
      "• Car made in the year 2000 or later.",
      "• Client younger than 70.",
      "• Low or no CRB score is accepted.",
      "• Up to KES 3M. Corporate clients up to KES 5M.",
      "• Up to 60 months.",
    ],
    tags: ["logbook", "lbl", "qualify", "eligibility", "crb", "age", "term"],
    updated: "2026-10-20",
  },
  {
    category: "Logbook loan",
    title: "Logbook loan: documents the client brings",
    body: [
      "Individual client:",
      "• M-Pesa statement: 1 year.",
      "• Bank statement: 6 months, with bank trail email. Loans below KES 300,000: an ATM card picture or bank app dashboard is enough.",
      "• Original logbook. Logbook printed in the last 6 months: affidavit required.",
      "• ID copy, KRA PIN certificate, passport photo.",
      "• Evidence of contact (EOC): client photo in front of the Momentum banner, client and agent together in a photo, agent and client ID side by side.",
      "• Matatus: RSL and SACCO letter.",
      "• Loans above KES 301,000: comprehensive insurance and system-generated endorsement letter.",
      "Business: add business certificate. Company: add certificate of incorporation, CR-12 and sealed board resolution.",
    ],
    tags: ["logbook", "documents", "kyc", "eoc", "evidence of contact", "statement", "affidavit", "insurance", "matatu"],
    updated: "2026-10-20",
  },
  {
    category: "Logbook loan",
    title: "Logbook loan: onboarding steps and costs",
    body: [
      "Onboarding steps:",
      "• 1. Valuation of the car.",
      "• 2. CA1: loan amount approved.",
      "• 3. Loan account created.",
      "• 4. In-charge: joint registration.",
      "• 5. Tracker installed.",
      "• 6. CA2: final checks and approval.",
      "• 7. Disbursement.",
      "Costs:",
      "• Interest 4% flat a month (about 6.46% reducing). Processing fee 4%.",
      "• Added to the loan: tracker KES 5,000, NTSA KES 5,050, chattel KES 2,450. Valuation from KES 2,900 is deducted.",
      "• Monthly: tracking KES 2,000 plus credit life (confirm rate). Bounced cheque KES 1,050.",
    ],
    tags: ["logbook", "onboarding", "steps", "ca1", "ca2", "valuation", "tracker", "ntsa", "chattel", "interest", "processing", "costs", "fees"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "SME loan: how it differs from Logbook",
    body: [
      "Same onboarding steps, same default steps and most documents as Logbook. The differences:",
      "• Business loan for working capital and growth. Decided on business cash flow, and the car still secures it.",
      "• KES 50,000 to 3M (up to 5M). Up to 36 months.",
      "• Interest 4% a month on the balance, charged daily (one deck table says 5%: confirm).",
      "• No chattel fee. NTSA: in-charge KES 1,748, discharge KES 1,189.",
      "• Tracking KES 900 a month. Credit life 0.35% of the balance.",
      "• Statements: 6 months for new clients, 3 months for repeat clients.",
      "• Extra documents: trading licence, CRB report, business photos and home visit, guarantor photos, spouse consent (recommended).",
    ],
    tags: ["sme", "business", "working capital", "cash flow", "guarantor", "trading licence", "spouse consent"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "Ezua Chapaa (revolving credit line)",
    body: [
      "Documents, onboarding steps and car security are the same as Logbook.",
      "• A revolving credit line on the client's car, like Fuliza. The client borrows up to the limit, repays, and borrows again.",
      "• Money goes to M-Pesa or a bank account through the card, USSD or the app.",
      "• Limit KES 50,000 to 100,000. It is activated at the end of onboarding.",
      "• Interest 5% a month on the balance, charged daily.",
      "• Fees are added to the limit. Example: KES 100,000 limit plus KES 14,100 fees means KES 114,100 owed from day one.",
      "• Monthly: tracking KES 1,100, credit life 0.04% of the balance. Card KES 1,200 (replacement KES 1,000).",
      "• Minimum monthly payment 10% (confirm: of principal or of total due).",
      "• Momentum can change or cancel the limit at any time.",
      "• No insurance or tracker tampering is a default.",
      "• Cancelling before the limit is active costs KES 2,500 (tracker removal).",
      "• Installment: KES 10,000 for 20 to 21 months.",
    ],
    tags: ["ezua", "chapaa", "revolving", "limit", "fuliza", "card", "minimum payment", "credit line"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "Quick Cash (Logbook top-up)",
    body: [
      "A short top-up on a running Logbook loan, like an advance equal to the client's instalment amount.",
      "• Requested on the app or USSD. No new documents or collateral: the same car secures it.",
      "• Up to 100% of the monthly Logbook instalment, maximum KES 100,000.",
      "• Maximum 30 days. Not available in the last month of the Logbook term.",
      "• Interest 10% a month, charged daily. Other fees are not listed: get them in writing.",
      "• The car must stay insured, in Kenya, with the tracker intact.",
      "• A request sent from the client's phone counts as the client's own.",
    ],
    tags: ["quick cash", "top-up", "topup", "advance", "instalment", "ussd"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "Sahih (Shariah) loan",
    body: [
      "Shariah-compliant finance: no interest, a profit rate instead. Do not describe Sahih as a normal interest loan.",
      "• Sahih car finance uses Ijarah: Momentum buys the client's car, leases it back, and gifts it to the client at the end (Hibah).",
      "• Takaful premium finance lets the client pay a Takaful insurance premium in instalments.",
      "• KES 100,000 to 3M. 3 to 24 months. 30-day grace period. Profit rate 4% a month.",
      "• Client signs: product disclosure sheet and application form, Ijarah offer letter, security agreement and motor vehicle sales agreement, maintenance agreement, letter of Hibah and certificate of acceptance.",
      "• Takaful only: Commodity Murabaha, Commodity Sales and Wakala agreements.",
      "• Client KYC documents are not listed in the training deck: confirm with the Sahih lead.",
      "Takaful premium finance (Tawarruq):",
      "• 1. Client and Momentum sign the offer letter and the Master Murabaha agreement.",
      "• 2. Momentum buys commodities from BSAS worth the amount the client needs.",
      "• 3. Momentum sells the commodities to the client at a marked-up price. Profit amount, date and time must be written in the sale agreement.",
      "• 4. The client appoints Momentum as agent (Wakala) to sell the commodities back to BSAS. The client receives the cash.",
      "Business that is not allowed (haram): interest, gambling, deals with unclear terms, fraud, alcohol, pork, adult content and related services.",
      "The Shariah Supervisory Board approves products and reviews marketing material.",
      "Default steps are not in the training text. Ask the Sahih lead before explaining default to a client.",
    ],
    tags: ["sahih", "shariah", "islamic", "ijarah", "hibah", "takaful", "murabaha", "tawarruq", "wakala", "halal", "haram", "profit rate"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "Maintain (repair financing)",
    body: [
      "Lets a client repair a car now and repay over time, through partner garages (IF and approved AA garages). Figures come from a May 2023 deck, so confirm current rates before quoting.",
      "• The car is jointly registered and tracked, same as Logbook. Documents are the same as Logbook.",
      "• Insurance must be active, and comprehensive above KES 150,000.",
      "Three options:",
      "• Ezua Chapaa: up to KES 100,000 limit, revolving.",
      "• Logbook repair product: KES 50,000 to 100,000, 24 months.",
      "• Logbook 24-month product: KES 100,000 to 2,000,000, 24 months.",
      "Logbook options costs:",
      "• Interest 4% flat a month (about 6.27% reducing).",
      "• Processing 4% plus 0.8% excise duty. Credit life 0.35%.",
      "• Chattel KES 2,450, NTSA KES 5,050.",
      "• Tracker install KES 5,000, removal KES 2,500.",
      "• Tracking KES 900 a month (repair product) or KES 1,700 (24-month product).",
      "• Late payment 0.33% a day.",
      "Ezua option: same costs as Ezua Chapaa.",
      "Default: Logbook options follow the Logbook steps. The Ezua option follows the Ezua steps.",
    ],
    tags: ["maintain", "repair", "garage", "aa", "partner garage", "24 month"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "Check-Off (civil servant loan)",
    body: [
      "Repaid by the client's employer deducting the instalment from salary. Described as unsecured, but the client assigns final dues to Momentum.",
      "• For civil servants: TSC teachers, county staff, police, other public sector employees.",
      "• KES 2,500 to 1,250,000. Up to 120 months. Approval target: within 6 hours.",
      "Client brings:",
      "• Signed loan application form.",
      "• 2 months pay slips (screenshots from the payroll portal, no downloads).",
      "• 12 months M-Pesa statement.",
      "• Clear current photo taken on a smartphone (no social media photos).",
      "• Salary ATM debit card for EFT payments.",
      "• Certified clear copy of the ID (lost ID: waiting card plus police abstract).",
      "• Signed: employer check-off authority, statutory declaration (with advocate witness), data consent form.",
      "Onboarding: apply on the Momentum app or USSD, upload documents, Momentum calls back to verify (approval within 6 hours), money is sent to the client's bank account.",
      "Costs (training deck):",
      "• Appraisal fee 12.5% of the loan (12.5% of take-home for refinance).",
      "• Agency fee 6% of the loan, paid before disbursement.",
      "• Monthly collection fee KES 200 (KES 90 for Chap Chap). Statement fee KES 360 each request.",
      "• Excise duty 20% of the fees.",
      "• Interest: the deck says 3.5%. The T&Cs say it depends on the term: 1 to 3 months 7.5%, 6 to 12 months 5.30%, 18 to 24 months 4.43%, 36 months 3.69%, 48 months 2.88%, 54 to 120 months 2.75%. Confirm before quoting.",
      "• Paying early does not reduce the processing fee.",
      "Key terms:",
      "• If the client leaves the job, Momentum can recover from unpaid wages and pay.",
      "• While any loan is outstanding, the client assigns final and terminal dues (not pension) to Momentum.",
      "• If the client dies or becomes permanently disabled, the debt is not owed.",
      "• Momentum can change the interest rate with one month's notice, contact the employer and next of kin, and sell the debt.",
      "• Never pay cash to staff or agents. Offer stays open at least 1 month.",
      "Default: missing one instalment is a default. Late interest 0.33% a day from day 4. The whole loan becomes due. Payments go to costs first, then interest, then principal. Debt collectors, legal costs and CRB listing can follow. A default on another Momentum loan can trigger action here.",
    ],
    tags: ["check-off", "checkoff", "check off", "civil servant", "tsc", "teacher", "payroll", "salary", "appraisal", "agency fee", "final dues"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "IPF (Insurance Premium Finance)",
    body: [
      "Momentum pays the client's whole insurance premium to the insurer, and the client repays in monthly instalments. The policy is the security.",
      "• KES 7,574 to 2,000,000. 1 to 10 months.",
      "• Covers motor (private, commercial, PSV, boda boda, tuk tuk) and other general policies.",
      "Client brings:",
      "• Logbook copy and valuation report (or sales agreement).",
      "• KRA PIN, passport photos, ID or passport.",
      "• Insurance quotation from a Momentum panel insurer.",
      "• Signed forms: application, signature page, broker consent (Viva 365), data consent.",
      "• Premium above KES 100,000: post-dated cheques. Otherwise pay by M-Pesa Paybill.",
      "Onboarding: client picks an insurer from the panel and gets a quotation, pays the upfront deposit, documents and forms are signed, Momentum pays the full premium to the insurer, client receives the policy by email or hard copy.",
      "Costs:",
      "• Upfront deposit 30% of the premium (current booklet). The renewal form says 20%: confirm.",
      "• The client can ask in writing to put the deposit towards the last instalment.",
      "• Processing fee 4%. Interest 2% flat a month (the deck also quotes 3.7845% on reducing balance).",
      "• Credit life 0.35% (deck). Valuation is free in the booklet but paid by the client in the deck: confirm.",
      "• Late payment 0.1% a day. Bounced cheque KES 1,020. No penalty for paying off early.",
      "Key terms:",
      "• Momentum gets power of attorney over the policy, including the right to cancel it.",
      "• Viva 365 is the broker. If the cover is not enough, Viva 365 can buy suitable cover and the client pays.",
      "• Pay only through Paybill 4025241, with the client's ID number as the account. The Ezua T&Cs show a different Paybill (801480): confirm.",
      "• Renewal: dial *674#. A 20% contribution applies.",
      "• If an IPF runs with a Logbook loan, settle the IPF when the Logbook loan is cleared.",
      "Claims:",
      "• Repairable damage: call 0709 434 000 or email portfolio@momentumcredit.co.ke.",
      "• Total loss: call 0709 434 434 or email the same address. The insurer pays Momentum first, which clears the IPF. Any balance goes to the client. The client keeps paying instalments until the claim is settled.",
      "• Claim documents: ID, logbook copy, driving licence, police abstract, scene photos, claim form, insurance sticker, other party's insurance details, witness statement.",
      "Default: Momentum gives 7 days' written notice. If not fixed, the policy is cancelled and not reinstated, and the car is then uninsured. Late interest 0.1% a day. Legal action and CRB listing can follow.",
    ],
    tags: ["ipf", "insurance", "premium", "finance", "viva 365", "paybill", "deposit", "claims", "total loss", "policy", "panel insurer"],
    updated: "2026-10-20",
  },
  {
    category: "Products",
    title: "MIF (Motor Import Finance)",
    body: [
      "A loan to import a car from abroad. Covers the car cost, insurance and freight (CIF), import duty, port and clearing charges, and delivery.",
      "Product types:",
      "• Short term: up to 60 days. The client commits at least 30%. On arrival the client pays the balance, converts to long term, or moves to another lender.",
      "• Long term: Momentum finances up to 70% once the car arrives. Up to 36 months.",
      "• Import duty financing: for a car already at the port. Momentum finances 100% of duty, port charges and demurrage. Target time 30 days.",
      "• Discharge voucher: an insurer's write-off letter used as the deposit for a replacement car.",
      "• Zero financing: the client pays in full, and Momentum imports the car for a 3.5% fee.",
      "Costs: interest 4%, processing fee 4%. Demurrage is a daily port charge if the car stays too long at the port. Loan size follows the FSV policy for the car model.",
      "Client brings:",
      "• Car specs: make, model, colour, drive type, mileage under 100,000 km, budget.",
      "• ID, KRA PIN, 12 months M-Pesa, 6 months bank statements.",
      "• Import documents: export certificate, bill of lading, inspection certificate, supplier invoice.",
      "• Application form on the Momentum app.",
      "• Bank financing route: employed clients bring 3 months pay slips and a letter of appointment. Self-employed clients bring business registration and business bank statements. Momentum charges a processing fee only.",
      "Approval: partial-deposit clients must be prequalified by the MIF product leader and give a written commitment to pay the deposit before handover. Financing is approved by the Risk and Compliance Manager or the Managing Director.",
      "Do not promise savings. The deck mentions up to 25% below market, but this depends on the car.",
      "Default steps are not in the training text. Ask the MIF lead before explaining them to a client.",
    ],
    tags: ["mif", "motor import", "import", "duty", "demurrage", "cif", "discharge voucher", "zero financing", "short term", "long term", "fsv"],
    updated: "2026-10-20",
  },
  {
    category: "Defaults",
    title: "Logbook default timeline",
    body: [
      "A missed instalment is the first step to default.",
      "• Day 1 to 2: call.",
      "• Day 3: demand notice. Penalty starts: 0.33% a day on the instalment.",
      "• Day 10: proclamation notice. Client is charged KES 5,000. The 0.33% penalty continues.",
      "• Day 18: repossession by auctioneers. Client is charged KES 27,000.",
      "• Day 19: disposition notice. Day 27: auction advertisement.",
      "The client may still owe any shortfall after the sale. CRB listing and legal action can follow.",
      "SME follows the same steps. Maintain Logbook options follow them too.",
    ],
    tags: ["default", "logbook", "demand notice", "proclamation", "repossession", "auction", "auctioneers", "disposition", "penalty", "sme"],
    updated: "2026-10-20",
  },
  {
    category: "Defaults",
    title: "Ezua Chapaa default timeline",
    body: [
      "One missed payment is a default. The T&Cs allow repossession without notice.",
      "• Day 1 to 7: calls.",
      "• Day 8: written reminder. Unused funds frozen.",
      "• Day 22: demand notice. Day 30: relationship officer engagement.",
      "• Day 35: proclamation. Day 42: repossession.",
      "Interest keeps running. Maintain's Ezua option follows these steps.",
    ],
    tags: ["default", "ezua", "chapaa", "frozen", "funds frozen", "repossession", "proclamation", "demand notice"],
    updated: "2026-10-20",
  },
  {
    category: "Defaults",
    title: "Default cheat sheet: all products",
    body: [
      "A missed payment is the first step to default on every product. What happens next depends on the product.",
      "• Logbook: first step call (day 1 to 2) then demand notice (day 3). Worst outcome: repossession day 18 (auctioneers KES 27,000), then auction. Late charge 0.33% a day on the instalment; proclamation KES 5,000.",
      "• SME: same as Logbook.",
      "• Ezua Chapaa: missed payment, no insurance or tracker tampering. Funds frozen day 8. Worst outcome: repossession day 42 (T&Cs allow it without notice). Interest keeps running.",
      "• Quick Cash: amount added to the Logbook instalment. Worst outcome: Logbook loan due immediately. Interest keeps running.",
      "• Check-Off: late interest from day 4. Worst outcome: whole loan due, final dues taken. 0.33% a day.",
      "• IPF: 7 days' notice. Worst outcome: policy cancelled, not reinstated. 0.1% a day.",
      "• Maintain: as Logbook or Ezua. 0.33% a day.",
      "• Sahih, MIF: ask the product lead.",
    ],
    tags: ["default", "cheat sheet", "all products", "late charge", "penalty", "worst outcome", "quick cash", "check-off", "ipf", "maintain"],
    updated: "2026-10-20",
  },
  {
    category: "Defaults",
    title: "General collection steps",
    body: [
      "Use the product timeline when it differs.",
      "• Day 1 to 3: friendly calls and SMS. Grace can be offered.",
      "• Day 4 to 7: firm calls, penalties start, promises to pay recorded.",
      "• Day 8 to 14: formal emails, tracking checks, broken promises reported.",
      "• Day 15 to 30: daily contact, field visit alerts, watchlist.",
      "• Day 31 and above: legal letters, repossession starts, CRB listing.",
    ],
    tags: ["collections", "collection steps", "arrears", "calls", "watchlist", "legal letters", "grace"],
    updated: "2026-10-20",
  },
  {
    category: "Defaults",
    title: "Tell every client before they sign",
    body: [
      "• A missed payment can mean extra charges, CRB listing and legal costs.",
      "• On car-secured loans the car can be repossessed and sold. The client may still owe any shortfall.",
      "• A default on one Momentum product can affect the others.",
      "• If the client cannot pay, they should call early: 0709 434 000 or cx@momentumcredit.co.ke.",
    ],
    tags: ["disclosure", "before signing", "crb", "repossession", "shortfall", "call early", "contact"],
    updated: "2026-10-20",
  },
  {
    category: "Agent rules",
    title: "Do and don't",
    body: [
      "Do:",
      "• Explain the total cost, including fees added to the loan.",
      "• Read out the default, insurance and tracker rules before the client signs.",
      "• Check every document is complete and clear before submitting.",
      "• Let the client read the T&Cs. They may get independent advice.",
      "• Use official channels only: 0709 434 000 and cx@momentumcredit.co.ke.",
      "• Get consent before capturing a client's data or lead details.",
      "• Declare any gift worth more than USD 100.",
      "Don't:",
      "• Promise approval, a limit or a rate.",
      "• Say there are no hidden charges or that valuation is free, until you have confirmed it.",
      "• Take cash from a client.",
      "• Rush a client to sign.",
      "• Share client data outside Momentum's processes.",
      "• Accept gifts or favours that could influence a decision.",
    ],
    tags: ["do", "dont", "don't", "rules", "conduct", "consent", "gift", "cash", "official channels", "hidden charges"],
    updated: "2026-10-20",
  },
  {
    category: "Agent rules",
    title: "Confirm with your manager before quoting",
    body: [
      "These figures conflict between documents. Check before quoting:",
      "• Check-Off interest rate: 3.5% in the deck, 2.75% to 7.5% by term in the T&Cs.",
      "• Ezua minimum payment (10% of principal or 10% of total due) and how interest is charged.",
      "• IPF deposit (20% or 30%), Paybill number (801480 or 4025241), and whether valuation is free.",
      "• Credit life rate on each product.",
      "• Tracker fees and tracker install fee.",
      "• SME interest: 4% or 5%.",
      "• Quick Cash fees.",
      "• Default steps for Sahih and MIF.",
    ],
    tags: ["confirm", "manager", "conflict", "check", "quoting", "paybill", "deposit", "credit life", "tracker fee", "sme interest"],
    updated: "2026-10-20",
  },
  {
    category: "Momentum Credit paybill",
    title: "Momentum Credit paybill and USSD",
    body: [
      "• Paybill number: 801480",
      "• Account number: the client's ID number",
      "• Momentum USSD: *674#",
    ],
    tags: ["paybill", "801480", "account number", "id number", "ussd", "*674#", "674", "pay", "m-pesa", "momentum credit"],
    updated: "2026-10-20",
  },
];

const KB_ACCENTS = ["#2E6F5C", "#2B4C7E", "#5E4A7A", "#8E3B4F", "#9A7B3C", "#A04A3B"];
const kbChipColor = (c, cats) => (c === "All" ? "#204A3E" : KB_ACCENTS[(cats.indexOf(c) - 1) % KB_ACCENTS.length]);

function kbMatches(entry, q) {
  if (!q) return true;
  const hay = [entry.title, entry.category, ...(entry.tags || []), ...entry.body].join(" ").toLowerCase();
  return q.split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
}

function KbNote({ entry, accent, open, onToggle }) {
  return (
    <div style={{ background: `linear-gradient(100deg, ${accent}1C, #fff 55%)`, border: `1px solid ${accent}55`, borderLeft: `6px solid ${accent}`, borderRadius: "14px", boxShadow: "0 2px 6px rgba(32,74,62,0.08)", overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", fontFamily: "inherit", color: TOKENS.ink }}
      >
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "18px" }}>{entry.title}</div>
          <div style={{ fontSize: "12px", color: TOKENS.inkSoft, marginTop: "3px" }}>{entry.category}</div>
        </div>
        <ChevronDown size={20} color={accent} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ padding: "0 18px 16px", fontSize: "14.5px", lineHeight: 1.6 }}>
          {entry.body.map((line, i) =>
            line.startsWith("• ") ? (
              <div key={i} style={{ display: "flex", gap: "8px", margin: "4px 0" }}>
                <span style={{ color: accent }}>•</span><span>{line.slice(2)}</span>
              </div>
            ) : (
              <p key={i} style={{ margin: "6px 0" }}>{line}</p>
            )
          )}
          {entry.updated && <div style={{ fontSize: "11.5px", color: TOKENS.inkSoft, marginTop: "10px" }}>Updated {entry.updated}</div>}
        </div>
      )}
    </div>
  );
}

function KnowledgeBank() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [openKey, setOpenKey] = useState(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(KB_ENTRIES.map((e) => e.category)))], []);
  const query = q.trim().toLowerCase();
  const shown = KB_ENTRIES.filter((e) => (cat === "All" || e.category === cat) && kbMatches(e, query));

  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(circle at 8% 6%, #D5E3DA 0%, transparent 34%), radial-gradient(circle at 94% 10%, #EADFC2 0%, transparent 32%), radial-gradient(circle at 90% 94%, #DDD6E6 0%, transparent 34%), radial-gradient(circle at 6% 92%, #D3DDE8 0%, transparent 32%), ${TOKENS.paper}`, color: TOKENS.ink, fontFamily: "'IBM Plex Sans', sans-serif", padding: "24px" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "30px", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={LOGO_DATA_URI} alt="" style={{ height: "1em", width: "auto" }} />
          Knowledge Bank
        </h1>
        <p style={{ color: TOKENS.inkSoft, fontSize: "14px", margin: "0 0 18px" }}>Quick answers and company know-how. Search, or pick a topic.</p>

        <div style={{ position: "relative", marginBottom: "14px" }}>
          <Search size={16} color={TOKENS.inkSoft} style={{ position: "absolute", left: "12px", top: "14px" }} />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpenKey(null); }}
            placeholder="Search notes… e.g. grace period, payoff, excise"
            style={{ width: "100%", boxSizing: "border-box", padding: "11px 12px 11px 34px", fontSize: "15px", border: `1px solid ${TOKENS.rule}`, borderRadius: "10px", background: "#fff", fontFamily: "inherit" }}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setOpenKey(null); }}
              style={{ fontFamily: "inherit", fontSize: "13px", fontWeight: 600, padding: "6px 14px", borderRadius: "999px", cursor: "pointer", border: `1.5px solid ${kbChipColor(c, categories)}`, background: cat === c ? kbChipColor(c, categories) : `${kbChipColor(c, categories)}14`, color: cat === c ? "#fff" : kbChipColor(c, categories) }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          {shown.map((e) => {
            const key = e.category + "|" + e.title;
            const accent = kbChipColor(e.category, categories);
            return <KbNote key={key} entry={e} accent={accent} open={openKey === key || (query && shown.length === 1)} onToggle={() => setOpenKey(openKey === key ? null : key)} />;
          })}
        </div>
        {shown.length === 0 && (
          <div style={{ color: TOKENS.inkSoft, fontSize: "14px", display: "flex", gap: "8px", alignItems: "center" }}>
            <BookOpen size={16} /> No notes match. Try a different word.
          </div>
        )}
      </div>
    </div>
  );
}



const MENU_FONTS = "";
const MENU = {
  navy: "#0A2342",
  green: "#12926F",
  greenSoft: "#DDF3EA",
  cream: "#F5F8FA",
  slate: "#4A5B73",
  dark: "#06293A",
  darkMid: "#0A3D4E",
  gold: "#E8B020",
};

// Edit the ad text or phone number here.
const AD_ITEMS = [
  "KRA, Passport, NTSA & SHA Services",
  "eTIMS Invoice Raising for Commission",
  "All eCitizen Services",
  "CV Writing",
  "Graphic Design",
  "Website Design",
  "Pimple Patches Available",
];
const AD_PHONE_DISPLAY = "0790107835";
const AD_PHONE_INTL = "254790107835";

const SCRIPT = { fontFamily: "'Dancing Script', cursive", color: MENU.green, fontWeight: 600 };

function Dots({ style, color }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "64px",
        height: "48px",
        backgroundImage: `radial-gradient(${color || "#C3D3D0"} 2px, transparent 2.5px)`,
        backgroundSize: "16px 16px",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

function Corner({ style, flip, gold }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 220" style={{ position: "absolute", width: "210px", height: "154px", pointerEvents: "none", transform: flip, ...style }}>
      <defs>
        <linearGradient id="menuGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B6B4E" />
          <stop offset="1" stopColor="#2DB58A" />
        </linearGradient>
      </defs>
      <path d="M0 0 H250 C225 38 175 60 125 98 C80 130 38 142 0 158 Z" fill="url(#menuGreen)" />
      <path d="M0 0 H175 C150 26 105 42 60 66 C32 82 14 88 0 94 Z" fill="#0B5A44" fillOpacity="0.55" />
      {gold && <path d="M0 108 C60 100 120 60 150 0" fill="none" stroke={MENU.gold} strokeWidth="2.5" />}
    </svg>
  );
}

function ToolCard({ icon: Icon, title, description, onClick, accent, dark }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
        background: "#fff",
        border: "none",
        borderRadius: "22px",
        padding: "26px 26px 24px",
        cursor: "pointer",
        flex: "1 1 260px",
        maxWidth: "340px",
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        fontFamily: "'IBM Plex Sans', sans-serif",
        boxShadow: hover ? `0 16px 34px ${accent}40` : "0 6px 22px rgba(10,35,66,0.08)",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 140 110" style={{ position: "absolute", top: 0, right: 0, width: "112px", height: "88px", pointerEvents: "none" }}>
        <defs>
          <linearGradient id={"fold" + title.replace(/\W/g, "")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.04" />
            <stop offset="1" stopColor={accent} stopOpacity="0.28" />
          </linearGradient>
        </defs>
        <path d="M20 0 H140 V110 C128 62 80 22 20 0 Z" fill={`url(#fold${title.replace(/\W/g, "")})`} />
      </svg>
      <div style={{ width: "46px", height: "46px", borderRadius: "13px", background: `linear-gradient(145deg, ${accent}, ${dark || accent})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 14px ${accent}55`, position: "relative" }}>
        <Icon size={23} color="#fff" strokeWidth={2} />
      </div>
      <div style={{ fontWeight: 700, fontSize: "21px", lineHeight: 1.2, color: MENU.navy, marginTop: "2px" }}>{title}</div>
      <div style={{ fontSize: "13.5px", lineHeight: 1.5, color: MENU.slate, paddingRight: "40px" }}>{description}</div>
      <div
        style={{
          position: "absolute",
          right: "18px",
          bottom: "18px",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: hover ? accent : `${accent}24`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s ease",
        }}
      >
        <ArrowRight size={17} color={hover ? "#fff" : accent} strokeWidth={2.4} />
      </div>
    </button>
  );
}

function DigitalServicesAd() {
  return (
    <div style={{ position: "relative", margin: "34px auto 0", maxWidth: "780px", textAlign: "left", borderRadius: "22px", overflow: "hidden", background: `linear-gradient(120deg, ${MENU.dark} 0%, ${MENU.darkMid} 100%)`, color: "#fff", padding: "20px 24px 22px", boxShadow: "0 10px 26px rgba(6,41,58,0.28)" }}>
      <Dots color="rgba(255,255,255,0.7)" style={{ right: "20px", top: "16px" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <Globe size={34} color="#fff" strokeWidth={1.5} style={{ flexShrink: 0 }} />
        <div style={{ width: "1px", alignSelf: "stretch", background: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: "11.5px", letterSpacing: "0.2em", fontWeight: 700, color: "#3FD6A5" }}>DIGITAL SERVICES</div>
          <div style={{ fontWeight: 700, fontSize: "clamp(19px, 3vw, 24px)", lineHeight: 1.25, marginTop: "2px" }}>
            Digital services at <span style={{ color: "#3FD6A5" }}>affordable</span> rates!
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "stretch", gap: "20px", flexWrap: "wrap", marginTop: "16px" }}>
        <div style={{ flex: "1 1 420px", columnWidth: "200px", columnGap: "28px", columnRule: "1px solid rgba(255,255,255,0.18)" }}>
          {AD_ITEMS.map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14.5px", padding: "6px 0", breakInside: "avoid" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1FB586", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={13} color="#fff" strokeWidth={3.2} />
              </span>
              {s}
            </div>
          ))}
        </div>
        <a
          href={"https://wa.me/" + AD_PHONE_INTL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: "0 0 auto", alignSelf: "center", minWidth: "190px", background: "#0F7A5C", color: "#fff", textDecoration: "none", borderRadius: "18px", padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <MessageCircle size={30} color="#fff" strokeWidth={1.8} />
            <div>
              <div style={{ fontSize: "13px", opacity: 0.9 }}>WhatsApp</div>
              <div style={{ fontWeight: 700, fontSize: "18px", letterSpacing: "0.02em" }}>{AD_PHONE_DISPLAY}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.5)" }} />
            <ArrowRight size={16} color="#fff" />
          </div>
        </a>
      </div>
    </div>
  );
}

function MainMenu({ onPick }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "100vh", background: `radial-gradient(circle at 95% 4%, #E9EEF7 0%, transparent 18%), radial-gradient(circle at 2% 70%, #E8F1F0 0%, transparent 22%), ${MENU.cream}`, color: MENU.navy, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{MENU_FONTS + "@media (max-width: 760px){.menu-deco{display:none !important}.menu-rule{display:none !important}}"}</style>
      <div className="menu-deco">
        <Corner style={{ top: 0, left: 0 }} gold />
        <Corner style={{ bottom: 0, left: 0, width: "150px", height: "110px" }} flip="scaleY(-1)" gold />
        <Corner style={{ bottom: 0, right: 0, width: "150px", height: "110px" }} flip="scale(-1, -1)" gold />
        <Dots style={{ top: "56px", left: "30px" }} />
        <Dots style={{ top: "56%", right: "34px" }} />
        <div style={{ ...SCRIPT, position: "absolute", top: "22px", right: "44px", fontSize: "21px", lineHeight: 1.05, textAlign: "left", transform: "rotate(-8deg)", pointerEvents: "none" }}>
          Fast<br />Reliable<br />Secure
          <div style={{ height: "3px", background: MENU.green, borderRadius: "2px", marginTop: "2px", transform: "rotate(-6deg)" }} />
        </div>
      </div>

      <div style={{ position: "relative", maxWidth: "1120px", margin: "0 auto", padding: "24px 24px 40px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
          <span className="menu-rule" style={{ width: "70px", height: "1px", background: "#8FCDB7" }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: MENU.greenSoft, borderRadius: "999px", padding: "4px 18px 4px 4px" }}>
            <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: MENU.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={16} color="#fff" strokeWidth={2.2} />
            </span>
            <span style={{ fontWeight: 700, letterSpacing: "0.2em", fontSize: "13px", color: MENU.navy }}>QUICK TOOLS</span>
          </span>
          <span className="menu-rule" style={{ width: "70px", height: "1px", background: "#8FCDB7" }} />
        </div>
        <h1 style={{ fontWeight: 700, fontSize: "36px", letterSpacing: "-0.02em", margin: "10px 0 28px", color: MENU.navy }}>
          Choose your <span style={{ color: MENU.green }}>tool</span>
        </h1>

        <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", justifyContent: "center" }}>
          <ToolCard icon={Calculator} title="Installment Calculator" description="Work out capitalized fees, monthly installments, and the full reducing-balance or flat-rate repayment schedule." onClick={() => onPick("loan")} accent="#1F9D6A" dark="#0F6E49" />
          <ToolCard icon={Car} title="FSV Calculator" description="Look up a vehicle's Forced Sale Value category and financing rate based on model, year of manufacture, and origin." onClick={() => onPick("fsv")} accent="#F0B400" dark="#C98A00" />
          <ToolCard icon={Database} title="Loan Amount Finder" description="Enter the monthly installment a client can afford and see the largest loan amount that fits, for every term." onClick={() => onPick("finder")} accent="#1F63D1" dark="#1245A0" />
        </div>
        <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", justifyContent: "center", marginTop: "22px" }}>
          <ToolCard icon={Link2} title="M Links" description="One place for Momentum's work links: leave management, CRM, Mambu, valuations, intranet and Yeastar." onClick={() => onPick("mlinks")} accent="#7B44C8" dark="#5527A0" />
          <ToolCard icon={BookOpen} title="Knowledge Bank" description="Searchable notes on fees, rates, repayment rules and tool tips. Quick answers without asking around." onClick={() => onPick("kb")} accent="#B3173C" dark="#820E2A" />
        </div>

        <DigitalServicesAd />
      </div>
    </div>
  );
}

// Loads web fonts without blocking the first paint (text shows in a fallback font, then swaps).
function loadFonts() {
  if (typeof document === "undefined" || document.getElementById("app-fonts")) return;
  const pre = document.createElement("link");
  pre.rel = "preconnect";
  pre.href = "https://fonts.gstatic.com";
  pre.crossOrigin = "anonymous";
  document.head.appendChild(pre);
  const l = document.createElement("link");
  l.id = "app-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Dancing+Script:wght@500;600;700&display=swap";
  l.media = "print";
  l.onload = () => { l.media = "all"; };
  document.head.appendChild(l);
}
loadFonts();

export default function App() {
  const [tool, setTool] = useState(null); // null | "loan" | "fsv" | "settlement"

  if (tool === "loan") {
    return (
      <div>
        <style>{FONT_IMPORT}</style>
        <BackBar onBack={() => setTool(null)} />
        <LoanCalculator />
      </div>
    );
  }

  if (tool === "fsv") {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <BackBar onBack={() => setTool(null)} />
        <iframe
          title="FSV Calculator"
          srcDoc={FSV_HTML}
          style={{ flex: 1, border: "none", width: "100%" }}
        />
      </div>
    );
  }

  if (tool === "finder") {
    return (
      <div>
        <style>{FONT_IMPORT}</style>
        <BackBar onBack={() => setTool(null)} />
        <LoanAmountFinder />
      </div>
    );
  }

  if (tool === "mlinks") {
    return (
      <div>
        <style>{FONT_IMPORT}</style>
        <BackBar onBack={() => setTool(null)} />
        <MLinks />
      </div>
    );
  }

  if (tool === "kb") {
    return (
      <div>
        <style>{FONT_IMPORT}</style>
        <BackBar onBack={() => setTool(null)} />
        <KnowledgeBank />
      </div>
    );
  }

  return <MainMenu onPick={setTool} />;
}
