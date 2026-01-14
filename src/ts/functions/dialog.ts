document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target?.id === "openDialog") {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog");
    console.log("🖱 openDialog click → dialog:", dialog);
    dialog?.showModal();
  }

  if (target?.id === "closeDialog") {
    const dialog = document.querySelector<HTMLDialogElement>("#dialog");
    console.log("🖱 closeDialog click → dialog:", dialog);
    dialog?.close();
  }
});
