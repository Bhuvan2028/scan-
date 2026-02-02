const Scan = require("../models/Scan");
const reconftwService = require("./reconftwServices");

let workerRunning = false;
const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runQueueWorker() {
  if (workerRunning) return;
  workerRunning = true;

  while (true) {
    // 🔒 Check if any scan is already running
    const running = await Scan.findOne({ status: "running" });
    if (running) {
      await sleep(5000);
      continue;
    }

    // 📥 Get next queued scan
    const next = await Scan.findOne({ status: "pending" }).sort({ createdAt: 1 });
    if (!next) {
      await sleep(5000);
      continue;
    }

    // ▶️ Start scan
    await reconftwService.scanDomain(
      next.domain,
      next._id,
      next.mode
    );

    // ⏳ Wait until scan finishes
    while (true) {
      const updated = await Scan.findById(next._id);
      if (!updated || updated.status !== "running") break;
      await sleep(10000);
    }

    // 🧊 Cool-down (VERY IMPORTANT)
    await sleep(COOLDOWN_MS);
  }
}

module.exports = { runQueueWorker };
