const checklistKey = "sohwa-action-checklist";
const demandCheckboxes = [...document.querySelectorAll(".demands input[type='checkbox']")];

let savedChecks = [];
try {
  savedChecks = JSON.parse(localStorage.getItem(checklistKey) || "[]");
} catch {
  savedChecks = [];
}

demandCheckboxes.forEach((checkbox, index) => {
  checkbox.checked = savedChecks.includes(index);
  checkbox.addEventListener("change", () => {
    const checked = demandCheckboxes
      .map((item, itemIndex) => (item.checked ? itemIndex : null))
      .filter((itemIndex) => itemIndex !== null);
    localStorage.setItem(checklistKey, JSON.stringify(checked));
  });
});

const copyStatus = document.createElement("div");
copyStatus.className = "copy-status";
copyStatus.setAttribute("role", "status");
copyStatus.setAttribute("aria-live", "polite");
document.body.append(copyStatus);

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    const text = target.innerText.trim().replace(/\s+/g, " ");

    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = "문안을 복사했습니다.";
    } catch {
      copyStatus.textContent = "복사하지 못했습니다. 문장을 길게 눌러 복사해 주세요.";
    }

    copyStatus.classList.add("is-visible");
    window.setTimeout(() => copyStatus.classList.remove("is-visible"), 2200);
  });
});
