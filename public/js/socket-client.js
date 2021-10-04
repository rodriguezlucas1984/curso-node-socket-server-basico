//Referencias del HTML
const lblConect = document.getElementById("lblConect");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();

socket.on("connect", () => {
  console.log("Conectado");
  lblConect.textContent = "Online";
  lblConect.classList.remove("text-danger");
  lblConect.classList.add("text-success");
});
socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
  lblConect.textContent = "Offline";
  lblConect.classList.remove("text-success");
  lblConect.classList.add("text-danger");
});

socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: "123ABC",
    fecha: new Date().getTime(),
  };
  socket.emit("enviar-mensaje", payload, (id) => {
    console.log(`Desde el servidor ${id}`);
  });
});
