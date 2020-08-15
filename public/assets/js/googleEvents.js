function triggerGoogleLoaded() {
  console.log("google event loaded");
  window.dispatchEvent(new Event("google-loaded"));
}
