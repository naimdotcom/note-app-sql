const editor = document.querySelector("#editor");
const quill = new Quill("#editor", {
  modules: {
    syntax: true,
    toolbar: "#toolbar-container",
  },
  placeholder: "Compose an epic...",
  theme: "snow",
});

quill.on(Quill.events.TEXT_CHANGE, update);
const playground = document.querySelector("#playground");
console.log(playground);

update();

function formatDelta(delta) {
  return JSON.stringify(delta.ops, null, 2);
}

function update(delta) {
  const contents = quill.root.innerHTML;
  let html = `<h3>contents</h3>${contents}`;
  console.log(contents);

  if (delta) {
    html = `${html}<h3>change</h3>${formatDelta(delta)}`;
  }
  playground.innerHTML = html;
}

document.getElementById("noteForm").onsubmit = async function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = quill.root.innerHTML;

  // Send content to the server
  const response = await fetch("/note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.ok) {
    alert("Note saved successfully!");
  } else {
    alert("Error saving note.");
  }
};
