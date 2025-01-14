function createToast(type, title, message) {
  const alertStyles = {
    info: {
      class: "alert-info",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>`,
    },
    error: {
      class: "alert-error",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`,
    },
    warning: {
      class: "alert-warning",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>`,
    },
    success: {
      class: "alert-success",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>`,
    },
  };

  const alertConfig = alertStyles[type] || alertStyles.info;

  return `
        <div class="alert ${alertConfig.class} shadow-lg flex justify-between items-start p-4 rounded-lg">
            <div class="flex flex-col w-full">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        ${alertConfig.icon}
                        <h3 class="font-bold text-lg ml-2">${title}</h3>
                    </div>
                    <button class="btn btn-circle btn-sm" onclick="removeWindToast(event)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="text-md mb-2">${message}</div>
                <div class="w-full">
                    <progress class="progress progress-primary w-full h-2 rounded-full" value="50" max="100"></progress>
                </div>
            </div>
        </div>
    `;
}

const info = (title, message) => createToast("info", title, message);
const error = (title, message) => createToast("error", title, message);
const warning = (title, message) => createToast("warning", title, message);
const success = (title, message) => createToast("success", title, message);

function startWindToast(
  title,
  message,
  alertType,
  duration = 10,
  position = "right",
  zIndex = 10000
) {
  const body = document.querySelector("body");
  const containerId = "wind-notify-" + position;
  let toastyContainer = document.getElementById(containerId);

  if (!toastyContainer) {
    toastyContainer = document.createElement("div");
    toastyContainer.id = containerId;
    body.appendChild(toastyContainer);
  }

  toastDefaultStyle(toastyContainer, position, zIndex);

  const toastyMessage = document.createElement("div");
  toastyMessage.className =
    "block p-3 transition-all duration-150 ease-out transform scale-0";
  toastyContainer.appendChild(toastyMessage);
  toastsAnimation(toastyMessage);

  switch (alertType) {
    case "info":
      toastyMessage.innerHTML = info(title, message);
      break;
    case "error":
      toastyMessage.innerHTML = error(title, message);
      break;
    case "success":
      toastyMessage.innerHTML = success(title, message);
      break;
    default:
      toastyMessage.innerHTML = warning(title, message);
      break;
  }

  moveProgressBar(toastyMessage, duration);
}

function toastDefaultStyle(toastyContainer, position, zIndex = 10000) {
  toastyContainer.style.position = "fixed";
  toastyContainer.style.zIndex = zIndex;
  toastyContainer.style.width = "300px";

  switch (position) {
    case "left":
      toastyContainer.style.top = "50%";
      toastyContainer.style.transform = "translateY(-50%)";
      toastyContainer.style.left = "1rem";
      break;
    case "right":
      toastyContainer.style.top = "50%";
      toastyContainer.style.transform = "translateY(-50%)";
      toastyContainer.style.right = "1rem";
      break;
    case "top":
      toastyContainer.style.top = "1rem";
      toastyContainer.style.left = "50%";
      toastyContainer.style.transform = "translateX(-50%)";
      break;
    case "bottom":
      toastyContainer.style.bottom = "1rem";
      toastyContainer.style.left = "50%";
      toastyContainer.style.transform = "translateX(-50%)";
      break;
    case "middle":
      toastyContainer.style.top = "50%";
      toastyContainer.style.left = "50%";
      toastyContainer.style.transform = "translate(-50%, -50%)";
      break;
    default:
      toastyContainer.style.bottom = "1rem";
      toastyContainer.style.right = "1rem";
      break;
  }

  toastyContainer.style.maxHeight = "calc(100vh - 2rem)";
  toastyContainer.style.overflowY = "auto";
}

function toastsAnimation(element) {
  setTimeout(() => {
    element.classList.remove("scale-0");
    element.classList.add("scale-100");
  }, 200);
}

function moveProgressBar(element, duration) {
  const progressBar = element.querySelector(".progress");
  if (!progressBar) return;

  const totalFrames = duration * 60;
  let frameCount = 0;

  const increment = () => {
    const progress = Math.min((frameCount / totalFrames) ** 0.5 * 100, 100);

    progressBar.value = progress;

    if (frameCount >= totalFrames) {
      element.classList.add("scale-0");
      setTimeout(() => {
        element.remove();
      }, 200);
    } else {
      frameCount++;
      requestAnimationFrame(increment);
    }
  };

  increment();
}

function removeWindToast(event) {
  const target = event.target;
  const parent = target.closest(".alert");
  if (parent) {
    parent.remove();
  }
}

window.removeWindToast = removeWindToast;
