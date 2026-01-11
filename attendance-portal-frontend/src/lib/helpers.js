// Extract filename from backend path:
export const extractFileName = (path = "") => {
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1] || "";
};

// Validation helpers
export const isEmpty = (v) => !v || v.trim() === "";

export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
