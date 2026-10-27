/* ============================================================
   Smart Internship Verification Portal — Advanced Engine
   CVM University • Faculty of Engineering & Technology
   ============================================================ */

const TRUSTED_COMPANIES = [
  { name:"Tata Consultancy Services", aliases:["tcs","tcs digital","tata consultancy"], domain:"tcs.com", status:"verified", programs:"Yes", risk:"low", notes:"Major IT services company with official internship programs." },
  { name:"Infosys", aliases:["infosys limited","infosys ltd"], domain:"infosys.com", status:"verified", programs:"Yes", risk:"low", notes:"Well-established IT company. Official career portal available." },
  { name:"Wipro", aliases:["wipro limited","wipro ltd"], domain:"wipro.com", status:"verified", programs:"Yes", risk:"low", notes:"Verified company with structured internship programs." },
  { name:"Accenture", aliases:["accenture india"], domain:"accenture.com", status:"verified", programs:"Yes", risk:"low", notes:"Global consulting firm. Internships via official channels." },
  { name:"Cognizant", aliases:["cognizant technology solutions","cts"], domain:"cognizant.com", status:"verified", programs:"Yes", risk:"low", notes:"Reputed IT services company." },
  { name:"Capgemini", aliases:["capgemini india"], domain:"capgemini.com", status:"verified", programs:"Yes", risk:"low", notes:"Verified. Uses official recruitment portals." },
  { name:"IBM", aliases:["ibm india","ibm research"], domain:"ibm.com", status:"verified", programs:"Yes", risk:"low", notes:"Global tech company with official internship programs." },
  { name:"Microsoft", aliases:["microsoft india"], domain:"microsoft.com", status:"verified", programs:"Yes", risk:"low", notes:"Highly trusted. Internships only via official Microsoft careers." },
  { name:"Google", aliases:["google india","alphabet"], domain:"google.com", status:"verified", programs:"Yes", risk:"low", notes:"Extremely selective. Only official Google Careers portal." },
  { name:"Amazon", aliases:["amazon india","aws"], domain:"amazon.com", status:"verified", programs:"Yes", risk:"low", notes:"Verified. Use official Amazon Jobs portal." },
  { name:"Deloitte", aliases:["deloitte india","deloitte usi"], domain:"deloitte.com", status:"verified", programs:"Yes", risk:"low", notes:"Big 4 firm. Official campus and off-campus programs." },
  { name:"HCL Technologies", aliases:["hcl","hcltech"], domain:"hcltech.com", status:"verified", programs:"Yes", risk:"low", notes:"Verified Indian IT major." },
  { name:"Tech Mahindra", aliases:["techm"], domain:"techmahindra.com", status:"verified", programs:"Yes", risk:"low", notes:"Part of Mahindra Group. Official programs exist." },
  { name:"Larsen & Toubro", aliases:["l&t","lt","larsen and toubro"], domain:"larsentoubro.com", status:"verified", programs:"Yes", risk:"low", notes:"Engineering & construction major." },
  { name:"Reliance Industries", aliases:["ril","reliance jio","jio"], domain:"ril.com", status:"verified", programs:"Yes", risk:"low", notes:"Large conglomerate. Verify via official career sites." },
  { name:"Oracle", aliases:["oracle india"], domain:"oracle.com", status:"verified", programs:"Yes", risk:"low", notes:"Global enterprise software company." },
  { name:"SAP", aliases:["sap labs","sap india"], domain:"sap.com", status:"verified", programs:"Yes", risk:"low", notes:"Enterprise software leader with structured internships." },
  { name:"Adobe", aliases:["adobe systems"], domain:"adobe.com", status:"verified", programs:"Yes", risk:"low", notes:"Creative software company. Official university programs." },
  { name:"QuickIntern Solutions", aliases:["quickintern","quick intern"], domain:"quickintern.in", status:"suspicious", programs:"Unverified", risk:"high", notes:"Multiple student reports of payment demands and fake certificates." },
  { name:"GlobalTalent Hub", aliases:["globaltalent","global talent hub"], domain:"globaltalenthub.com", status:"suspicious", programs:"Unverified", risk:"high", notes:"Often requests registration fees. Domain frequently changes." },
  { name:"SkillBoost Academy", aliases:["skillboost","skill boost"], domain:"skillboost.academy", status:"fake", programs:"No", risk:"critical", notes:"Known certificate mill. Certificates have no industry value." },
  { name:"InternWorld Pvt Ltd", aliases:["internworld","intern world"], domain:"internworld.co", status:"suspicious", programs:"Unverified", risk:"high", notes:"Reports of unpaid work and certificate after payment only." },
  { name:"FutureCoders Institute", aliases:["futurecoders","future coders"], domain:"futurecoders.org", status:"fake", programs:"No", risk:"critical", notes:"Fake institute. No real company presence." },
  { name:"EarnWhileLearn Academy", aliases:["earnwhilelearn","earn while learn"], domain:"earnwhilelearn.in", status:"fake", programs:"No", risk:"critical", notes:"Known for charging fees and issuing worthless certificates." },
  { name:"ProIntern Hub", aliases:["prointern","pro intern hub"], domain:"prointernhub.com", status:"suspicious", programs:"Unverified", risk:"high", notes:"Mixed reviews. Several payment-related complaints." }
];

const SCAM_PATTERNS = [
  { pattern:/registration\s*fee|joining\s*fee|security\s*deposit|training\s*fee|processing\s*fee/i, weight:35, reason:"Requests for fees/deposits are major red flags for internship scams." },
  { pattern:/pay\s*(now|immediately|to\s*confirm)|upi|gpay|phonepe|paytm|google\s*pay/i, weight:30, reason:"Asking for payment via UPI/wallets is a classic scam indicator." },
  { pattern:/limited\s*seats|act\s*fast|offer\s*expires|last\s*date\s*today|urgent|hurry/i, weight:15, reason:"High-pressure urgency tactics are commonly used in scams." },
  { pattern:/whatsapp\s*only|contact\s*on\s*whatsapp|no\s*email|telegram\s*only/i, weight:20, reason:"Communication only via WhatsApp/Telegram instead of official email is suspicious." },
  { pattern:/guaranteed\s*placement|100%\s*job|assured\s*certificate|guaranteed\s*certificate/i, weight:25, reason:"Guaranteed outcomes and assured certificates are unrealistic promises." },
  { pattern:/work\s*from\s*home.*\d{4,}|earn\s*₹?\s*\d{4,}.*day|₹\s*\d{4,}.*per\s*day/i, weight:20, reason:"Unrealistic earnings or WFH with high daily pay claims are common bait." },
  { pattern:/certificate\s*after\s*payment|pay\s*for\s*certificate|buy\s*certificate/i, weight:40, reason:"Paying for a certificate is a strong indicator of a certificate mill." },
  { pattern:/send\s*(aadhaar|pan|bank\s*details|passbook)|share\s*your\s*(aadhaar|pan)/i, weight:25, reason:"Requesting sensitive identity/bank documents early is a serious red flag." }
];

const FREE_EMAIL_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","rediffmail.com","protonmail.com","icloud.com","yahoo.co.in"];

const FAQ_DATA = [
  { q:"Is this portal 100% accurate?", a:"No system is perfect. Results depend on the quality of company data and the details you provide. Always double-check important decisions via official company websites or your college placement cell." },
  { q:"What should I do if a company is marked High Risk?", a:"Do not pay any money. Do not share Aadhaar, PAN or bank details. Report the offer to your placement officer and ignore further messages from that source." },
  { q:"Can placement officers use this tool?", a:"Yes. Switch to 'Officer' mode using the toggle in the navbar. You will receive advice tailored for reviewing student claims and flagging suspicious companies." },
  { q:"Why does it ask for domain / email?", a:"Legitimate companies use corporate email domains. Free emails (Gmail, Yahoo etc.) used as official contact are a strong warning signal." },
  { q:"Is my data stored on a server?", a:"No. This demo runs entirely in your browser. History is saved only in your device's localStorage and never leaves your computer." },
  { q:"How can I add a new company to the database?", a:"In a full production version, placement cells and admins would have an interface to add verified companies. This prototype uses a fixed demo database." }
];

// State
let currentRole = "student";
let verificationCount = parseInt(localStorage.getItem("siv_count") || "0", 10);

// DOM
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

document.addEventListener("DOMContentLoaded", () => {
  // Theme
  if (localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }

  animateCounter($("#stat-verified"), verificationCount);
  populateCompanyTable();
  renderHistory();
  renderFAQ();
  setupEventListeners();
  lucide.createIcons();
});

function setupEventListeners() {
  $("#theme-toggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  });

  $("#role-student").addEventListener("click", () => setRole("student"));
  $("#role-officer").addEventListener("click", () => setRole("officer"));
  $("#role-student-m")?.addEventListener("click", () => setRole("student"));
  $("#role-officer-m")?.addEventListener("click", () => setRole("officer"));

  $$('input[name="verify-type"]').forEach(r => {
    r.addEventListener("change", (e) => {
      const fields = $("#certificate-fields");
      if (e.target.value === "certificate") {
        fields.classList.remove("hidden");
        fields.classList.add("grid");
      } else {
        fields.classList.add("hidden");
        fields.classList.remove("grid");
      }
    });
  });

  $("#verify-form").addEventListener("submit", handleVerification);
  $("#clear-history").addEventListener("click", () => {
    if (confirm("Clear all verification history?")) {
      localStorage.removeItem("siv_history");
      renderHistory();
      showToast("History cleared", "info");
    }
  });

  $("#mobile-menu-btn").addEventListener("click", () => {
    $("#mobile-menu").classList.toggle("hidden");
  });
  $("#mobile-menu").querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => $("#mobile-menu").classList.add("hidden"));
  });

  // Autocomplete
  const nameInput = $("#company-name");
  const list = $("#autocomplete-list");
  nameInput.addEventListener("input", () => {
    const q = nameInput.value.trim().toLowerCase();
    if (q.length < 1) { list.classList.add("hidden"); return; }
    const matches = TRUSTED_COMPANIES.filter(c =>
      c.name.toLowerCase().includes(q) || c.aliases.some(a => a.includes(q))
    ).slice(0, 6);
    if (!matches.length) { list.classList.add("hidden"); return; }
    list.innerHTML = matches.map(c => `
      <div class="autocomplete-item px-4 py-2.5 cursor-pointer text-sm flex justify-between items-center" data-name="${c.name}">
        <span>${c.name}</span>
        <span class="text-xs ${c.status==='verified'?'text-emerald-600':c.status==='fake'?'text-red-600':'text-amber-600'}">${c.status}</span>
      </div>
    `).join("");
    list.classList.remove("hidden");
    list.querySelectorAll(".autocomplete-item").forEach(item => {
      item.addEventListener("click", () => {
        nameInput.value = item.dataset.name;
        list.classList.add("hidden");
      });
    });
  });
  document.addEventListener("click", (e) => {
    if (!nameInput.contains(e.target) && !list.contains(e.target)) list.classList.add("hidden");
  });
}

function setRole(role) {
  currentRole = role;
  $("#role-label").textContent = role === "student" ? "Student" : "Placement Officer";

  const active = "bg-primary-600 text-white";
  const inactive = "text-slate-600 dark:text-slate-300";

  ["#role-student", "#role-student-m"].forEach(sel => {
    const el = $(sel);
    if (!el) return;
    el.className = role === "student"
      ? `role-btn px-3 py-1.5 text-xs font-semibold rounded-md ${active} transition`
      : `role-btn px-3 py-1.5 text-xs font-semibold rounded-md ${inactive} hover:bg-slate-200 dark:hover:bg-slate-700 transition`;
    if (sel.includes("-m")) el.className = role === "student"
      ? "flex-1 py-2 text-xs font-semibold rounded-lg bg-primary-600 text-white"
      : "flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800";
  });
  ["#role-officer", "#role-officer-m"].forEach(sel => {
    const el = $(sel);
    if (!el) return;
    el.className = role === "officer"
      ? `role-btn px-3 py-1.5 text-xs font-semibold rounded-md ${active} transition`
      : `role-btn px-3 py-1.5 text-xs font-semibold rounded-md ${inactive} hover:bg-slate-200 dark:hover:bg-slate-700 transition`;
    if (sel.includes("-m")) el.className = role === "officer"
      ? "flex-1 py-2 text-xs font-semibold rounded-lg bg-primary-600 text-white"
      : "flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800";
  });
}

function populateCompanyTable() {
  const tbody = $("#company-table-body");
  tbody.innerHTML = TRUSTED_COMPANIES.map(c => {
    const statusCls = {
      verified: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      suspicious: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      fake: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    }[c.status] || "bg-slate-100 text-slate-700";
    const riskCls = { low:"text-emerald-600", high:"text-amber-600", critical:"text-red-600" }[c.risk] || "text-slate-600";
    return `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
      <td class="px-5 py-3.5 font-medium">${c.name}</td>
      <td class="px-5 py-3.5 text-sm text-slate-500">${c.domain}</td>
      <td class="px-5 py-3.5"><span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusCls}">${c.status.charAt(0).toUpperCase()+c.status.slice(1)}</span></td>
      <td class="px-5 py-3.5 text-sm">${c.programs}</td>
      <td class="px-5 py-3.5 font-medium ${riskCls}">${c.risk.charAt(0).toUpperCase()+c.risk.slice(1)}</td>
    </tr>`;
  }).join("");
}

function renderFAQ() {
  $("#faq-list").innerHTML = FAQ_DATA.map((item, i) => `
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button class="faq-btn w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-700/50 transition" data-index="${i}">
        <span>${item.q}</span>
        <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 transition-transform faq-icon"></i>
      </button>
      <div class="faq-answer hidden px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${item.a}</div>
    </div>
  `).join("");

  $$(".faq-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isOpen = !answer.classList.contains("hidden");
      // close all
      $$(".faq-answer").forEach(a => a.classList.add("hidden"));
      $$(".faq-icon").forEach(i => i.style.transform = "");
      if (!isOpen) {
        answer.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
  lucide.createIcons();
}

async function handleVerification(e) {
  e.preventDefault();

  const data = {
    companyName: $("#company-name").value.trim(),
    companyDomain: $("#company-domain").value.trim(),
    role: $("#internship-role").value.trim(),
    stipend: parseInt($("#stipend").value, 10) || 0,
    certId: $("#cert-id")?.value.trim() || "",
    duration: parseInt($("#duration")?.value, 10) || 0,
    details: $("#offer-details").value.trim(),
    verifyType: document.querySelector('input[name="verify-type"]:checked').value
  };

  $("#result-card").classList.add("hidden");
  $("#loading-state").classList.remove("hidden");

  const steps = [
    "Checking company records...",
    "Analyzing domain & contact patterns...",
    "Scanning for known scam indicators...",
    "Calculating risk score...",
    "Generating detailed report..."
  ];
  for (const step of steps) {
    $("#loading-text").textContent = step;
    await sleep(550 + Math.random() * 350);
  }

  const result = analyzeOffer(data);

  verificationCount++;
  localStorage.setItem("siv_count", String(verificationCount));
  animateCounter($("#stat-verified"), verificationCount);

  saveToHistory({
    company: data.companyName,
    result: result.verdict,
    riskScore: result.riskScore,
    timestamp: new Date().toISOString()
  });

  $("#loading-state").classList.add("hidden");
  renderResult(result);
  $("#result-card").classList.remove("hidden");
  $("#result-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
  lucide.createIcons();
}

function analyzeOffer(data) {
  let riskScore = 0;
  const reasons = [];
  const warnings = [];
  let matchedCompany = null;
  let confidence = 42;

  const nameLower = data.companyName.toLowerCase().trim();
  const domainLower = data.companyDomain.toLowerCase().trim();

  matchedCompany = TRUSTED_COMPANIES.find(c => {
    if (c.name.toLowerCase() === nameLower) return true;
    if (c.aliases.some(a => a === nameLower || nameLower.includes(a))) return true;
    if (domainLower && (c.domain === domainLower || domainLower.includes(c.domain))) return true;
    return false;
  });

  if (matchedCompany) {
    if (matchedCompany.status === "verified") {
      riskScore = Math.max(0, riskScore - 42);
      confidence = 93;
      reasons.push({ type:"positive", text:`Matched trusted company: ${matchedCompany.name}` });
      reasons.push({ type:"info", text: matchedCompany.notes });
    } else if (matchedCompany.status === "suspicious") {
      riskScore += 55;
      confidence = 86;
      reasons.push({ type:"warning", text:`Company flagged as suspicious: ${matchedCompany.name}` });
      reasons.push({ type:"warning", text: matchedCompany.notes });
      warnings.push("This company has previous student complaints.");
    } else if (matchedCompany.status === "fake") {
      riskScore += 88;
      confidence = 96;
      reasons.push({ type:"danger", text:`Known fraudulent entity: ${matchedCompany.name}` });
      reasons.push({ type:"danger", text: matchedCompany.notes });
      warnings.push("Do NOT proceed. This is a known fake / certificate mill.");
    }
  } else {
    riskScore += 25;
    reasons.push({ type:"info", text:"Company not found in trusted database. Extra caution advised." });
    warnings.push("Unknown company — verify independently via LinkedIn, MCA portal, or official website.");
  }

  // Domain analysis
  if (data.companyDomain) {
    let domain = data.companyDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].toLowerCase();
    const emailDomain = domain.includes("@") ? domain.split("@")[1] : domain;

    if (FREE_EMAIL_DOMAINS.some(d => emailDomain.includes(d))) {
      riskScore += 30;
      reasons.push({ type:"warning", text:"Company is using a free email domain (Gmail/Yahoo etc.). Legitimate companies use corporate domains." });
      warnings.push("Contact email is from a free provider — high risk.");
    }
    if (/\.(xyz|top|club|online|site|fun|icu|buzz)$/i.test(domain)) {
      riskScore += 20;
      reasons.push({ type:"warning", text:"Suspicious domain TLD commonly associated with short-lived scam sites." });
    }
  } else {
    riskScore += 10;
    reasons.push({ type:"info", text:"No company website/domain provided. Harder to verify legitimacy." });
  }

  // Stipend
  if (data.stipend > 0) {
    if (data.stipend > 80000) {
      riskScore += 25;
      reasons.push({ type:"warning", text:`Unusually high stipend (₹${data.stipend.toLocaleString("en-IN")}/month) for an internship — possible bait.` });
    } else if (data.stipend < 2000 && data.verifyType === "offer") {
      reasons.push({ type:"info", text:"Very low or unpaid internship. Confirm learning outcomes and certificate policy." });
    }
  }

  // Scam patterns
  if (data.details) {
    SCAM_PATTERNS.forEach(p => {
      if (p.pattern.test(data.details)) {
        riskScore += p.weight;
        reasons.push({ type:"danger", text: p.reason });
        warnings.push(p.reason);
      }
    });
  }

  // Certificate specific
  if (data.verifyType === "certificate" && !data.certId) {
    riskScore += 15;
    reasons.push({ type:"warning", text:"No certificate ID provided. Legitimate certificates usually have unique reference numbers." });
  }

  riskScore = Math.min(100, Math.max(0, riskScore));

  let verdict, verdictClass, verdictIcon, verdictTitle, verdictMessage;
  if (riskScore >= 70) {
    verdict = "high-risk";
    verdictClass = "result-fake";
    verdictIcon = "shield-x";
    verdictTitle = "High Risk / Likely Fake";
    verdictMessage = "Strong indicators of a scam or fraudulent offer. Do not proceed or share personal documents.";
  } else if (riskScore >= 40) {
    verdict = "suspicious";
    verdictClass = "result-suspicious";
    verdictIcon = "alert-triangle";
    verdictTitle = "Suspicious — Proceed with Caution";
    verdictMessage = "Several risk signals detected. Independently verify the company before accepting.";
  } else if (matchedCompany && matchedCompany.status === "verified") {
    verdict = "genuine";
    verdictClass = "result-genuine";
    verdictIcon = "shield-check";
    verdictTitle = "Looks Genuine";
    verdictMessage = "Company is present in trusted records and risk signals are low. Still confirm via official channels.";
  } else {
    verdict = "unknown";
    verdictClass = "result-unknown";
    verdictIcon = "help-circle";
    verdictTitle = "Unknown / Insufficient Data";
    verdictMessage = "Not enough strong signals either way. Manual verification recommended.";
  }

  const roleAdvice = currentRole === "officer"
    ? (verdict === "genuine"
        ? "You may consider accepting this claim for placement records after basic document cross-check."
        : "Recommend students do not proceed. Flag this company for internal review.")
    : (verdict === "genuine"
        ? "You can proceed, but always join via official company career portals or campus placement."
        : "Do not pay any money. Do not share Aadhaar/PAN/bank details until fully verified.");

  return {
    verdict, verdictClass, verdictIcon, verdictTitle, verdictMessage,
    riskScore, confidence, reasons,
    warnings: [...new Set(warnings)],
    matchedCompany, roleAdvice, input: data
  };
}

function renderResult(result) {
  const riskColor = result.riskScore >= 70 ? "text-red-500" : result.riskScore >= 40 ? "text-amber-500" : "text-emerald-500";
  const barColor = result.riskScore >= 70 ? "bg-red-500" : result.riskScore >= 40 ? "bg-amber-500" : "bg-emerald-500";

  $("#result-card").innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-slide-up">
      <div class="${result.verdictClass} px-6 py-8 text-white text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <i data-lucide="${result.verdictIcon}" class="w-8 h-8"></i>
        </div>
        <h3 class="text-2xl font-bold mb-2">${result.verdictTitle}</h3>
        <p class="text-white/90 max-w-lg mx-auto text-sm sm:text-base">${result.verdictMessage}</p>
      </div>
      
      <div class="p-5 sm:p-8 space-y-6">
        <!-- Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
            <p class="text-sm text-slate-500 mb-1">Risk Score</p>
            <p class="text-2xl font-bold ${riskColor}">${result.riskScore}<span class="text-sm font-normal text-slate-400">/100</span></p>
            <div class="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
              <div class="risk-bar h-full ${barColor} rounded-full" style="width:0%" data-width="${result.riskScore}%"></div>
            </div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
            <p class="text-sm text-slate-500 mb-1">Confidence</p>
            <p class="text-2xl font-bold">${result.confidence}%</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center col-span-2 sm:col-span-1">
            <p class="text-sm text-slate-500 mb-1">Company Match</p>
            <p class="text-base font-semibold truncate">${result.matchedCompany ? result.matchedCompany.name : "Not Found"}</p>
          </div>
        </div>

        <!-- Reasons -->
        <div>
          <h4 class="font-semibold mb-3 flex items-center gap-2">
            <i data-lucide="list-checks" class="w-5 h-5"></i> Analysis Breakdown
          </h4>
          <ul class="space-y-2">
            ${result.reasons.map(r => {
              const icon = r.type === "positive" ? "check-circle" : r.type === "danger" ? "x-circle" : r.type === "warning" ? "alert-circle" : "info";
              const color = r.type === "positive" ? "text-emerald-600" : r.type === "danger" ? "text-red-600" : r.type === "warning" ? "text-amber-600" : "text-slate-500";
              return `<li class="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                <i data-lucide="${icon}" class="w-5 h-5 ${color} mt-0.5 shrink-0"></i>
                <span class="text-sm">${r.text}</span>
              </li>`;
            }).join("")}
          </ul>
        </div>

        ${result.warnings.length ? `
          <div class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <h4 class="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <i data-lucide="alert-octagon" class="w-5 h-5"></i> Important Warnings
            </h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
              ${result.warnings.map(w => `<li>${w}</li>`).join("")}
            </ul>
          </div>
        ` : ""}

        <div class="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
          <h4 class="font-semibold text-primary-800 dark:text-primary-200 mb-1 flex items-center gap-2">
            <i data-lucide="user-check" class="w-5 h-5"></i>
            Advice for ${currentRole === "student" ? "Students" : "Placement Officers"}
          </h4>
          <p class="text-sm text-primary-700 dark:text-primary-300">${result.roleAdvice}</p>
        </div>

        <div class="flex flex-wrap gap-3 pt-1">
          <button onclick="document.getElementById('verify-form').reset();document.getElementById('result-card').classList.add('hidden');document.getElementById('certificate-fields').classList.add('hidden');document.getElementById('certificate-fields').classList.remove('grid');"
            class="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium transition">
            Verify Another
          </button>
          <button onclick="window.print()" class="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">
            Print / Save Report
          </button>
        </div>
      </div>
    </div>
  `;

  // Animate risk bar
  setTimeout(() => {
    const bar = document.querySelector(".risk-bar");
    if (bar) bar.style.width = bar.dataset.width;
  }, 80);
}

function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("siv_history") || "[]");
  history.unshift(entry);
  if (history.length > 25) history = history.slice(0, 25);
  localStorage.setItem("siv_history", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("siv_history") || "[]");
  if (!history.length) {
    $("#history-list").innerHTML = `<p class="text-center text-slate-500 py-10">No history yet. Run a verification to see results here.</p>`;
    return;
  }
  $("#history-list").innerHTML = history.map(h => {
    const timeStr = new Date(h.timestamp).toLocaleString("en-IN", {
      day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit"
    });
    const badge = {
      genuine: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      suspicious: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      "high-risk": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      unknown: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
    }[h.result] || "bg-slate-100 text-slate-700";
    const label = { genuine:"Genuine", suspicious:"Suspicious", "high-risk":"High Risk", unknown:"Unknown" }[h.result] || h.result;
    return `<div class="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div>
        <p class="font-medium">${h.company}</p>
        <p class="text-sm text-slate-500">${timeStr}</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-slate-500">Risk: ${h.riskScore}</span>
        <span class="px-2.5 py-1 rounded-full text-xs font-medium ${badge}">${label}</span>
      </div>
    </div>`;
  }).join("");
}

function showToast(msg, type = "info") {
  const colors = {
    info: "bg-primary-600",
    success: "bg-emerald-600",
    error: "bg-red-600"
  };
  const toast = document.createElement("div");
  toast.className = `toast px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[type] || colors.info}`;
  toast.textContent = msg;
  $("#toast-container").appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity .3s";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function animateCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 25));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current.toLocaleString();
  }, 28);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
