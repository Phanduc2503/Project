/* ===== NOTIFICATION SYSTEM - Woofy ===== */

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const bellBtn = document.getElementById("bellBtn");
  const bellBadge = document.getElementById("bellBadge");
  const dropdown = document.getElementById("notificationDropdown");
  const notificationList = document.getElementById("notificationList");
  const markAllReadBtn = document.getElementById("markAllRead");
  const clearAllBtn = document.getElementById("clearAll");

  if (!bellBtn) return; // Not admin, no bell

  let isOpen = false;
  let pollInterval = null;

  // Helper: time ago
  function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + "m ago";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + "h ago";
    const days = Math.floor(hours / 24);
    if (days < 7) return days + "d ago";
    return date.toLocaleDateString();
  }

  // Fetch notifications
  function fetchNotifications() {
    fetch("/notifications")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;
        updateBadge(data.unreadCount);
        renderNotifications(data.notifications);
      })
      .catch((err) => console.error("Failed to fetch notifications:", err));
  }

  // Fetch unread count only (lightweight poll)
  function fetchUnreadCount() {
    fetch("/notifications/unread-count")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) updateBadge(data.count);
      })
      .catch(() => {});
  }

  // Update badge
  function updateBadge(count) {
    if (count > 0) {
      bellBadge.textContent = count > 99 ? "99+" : count;
      bellBadge.style.display = "flex";
    } else {
      bellBadge.style.display = "none";
    }
  }

  // Render notifications list
  function renderNotifications(notifications) {
    if (!notifications || notifications.length === 0) {
      notificationList.innerHTML =
        '<div class="notif-empty">No notifications yet</div>';
      return;
    }

    let html = "";
    notifications.forEach((notif) => {
      const unreadClass = notif.read ? "" : "unread";
      const dotHtml = notif.read
        ? ""
        : '<div class="notif-unread-dot"></div>';
      html += `
        <div class="notif-item ${unreadClass}" data-id="${notif._id}">
          <div class="notif-icon">${notif.icon}</div>
          <div class="notif-body">
            <div class="notif-title">${escapeHtml(notif.title)}</div>
            <div class="notif-desc">${escapeHtml(notif.description)}</div>
            <div class="notif-time">${timeAgo(notif.createdAt)}</div>
          </div>
          ${dotHtml}
        </div>
      `;
    });
    notificationList.innerHTML = html;

    // Attach click handlers to each notification
    document.querySelectorAll(".notif-item").forEach((item) => {
      item.addEventListener("click", function () {
        const id = this.dataset.id;
        markAsRead(id, this);
      });
    });
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Mark single notification as read
  function markAsRead(id, element) {
    fetch("/notifications/" + id + "/read", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          element.classList.remove("unread");
          const dot = element.querySelector(".notif-unread-dot");
          if (dot) dot.remove();
          fetchUnreadCount();
        }
      })
      .catch((err) => console.error(err));
  }

  // Toggle dropdown
  function toggleDropdown(open) {
    isOpen = open !== undefined ? open : !isOpen;
    if (isOpen) {
      dropdown.classList.add("open");
      fetchNotifications();
      // Start polling every 10 seconds while open
      if (pollInterval) clearInterval(pollInterval);
      pollInterval = setInterval(fetchNotifications, 10000);
    } else {
      dropdown.classList.remove("open");
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
    }
  }

  // Bell click
  bellBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown();
  });

  // Mark all as read
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      fetch("/notifications/read-all", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            document.querySelectorAll(".notif-item.unread").forEach((el) => {
              el.classList.remove("unread");
              const dot = el.querySelector(".notif-unread-dot");
              if (dot) dot.remove();
            });
            updateBadge(0);
          }
        })
        .catch((err) => console.error(err));
    });
  }

  // Clear all
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!confirm("Clear all notifications?")) return;
      fetch("/notifications/clear-all", { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            notificationList.innerHTML =
              '<div class="notif-empty">No notifications yet</div>';
            updateBadge(0);
          }
        })
        .catch((err) => console.error(err));
    });
  }

  // Close dropdown on outside click
  document.addEventListener("click", function (e) {
    if (isOpen && !dropdown.contains(e.target) && e.target !== bellBtn && !bellBtn.contains(e.target)) {
      toggleDropdown(false);
    }
  });

  // Poll unread count every 30 seconds
  fetchUnreadCount();
  setInterval(fetchUnreadCount, 30000);
});