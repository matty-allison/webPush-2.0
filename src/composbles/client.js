const publicVapidKey =
  "BGR8YGWFet7GchJyDNrGp_1jNEKb-f7XK3etO3qmLfM4B1hAXFk8_JVCcQp42WiWRbISl2RGkQGE4GdNZyRtxJU";

//check if the serveice worker can work in the current browser
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

//register the service worker, register our push api, sedn the notifation
async function send() {
  //register service worker
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "./",
  });

  //register push
  console.log("Registering push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log(subscription);

  //Send push notification
  // https://push-notifications-node-js.herokuapp.com/subscribe
  await fetch("https://push-notifications-node-js.herokuapp.com/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const sendMessage = () => {
  return send();
};
