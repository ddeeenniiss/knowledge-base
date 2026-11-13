// Info-Zeilen in .code-annotated: Erklärung nur per Klick auf das Icon (linke Spalte)
document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const line = target.closest<HTMLElement>('.code-annotated [data-info]');

    let clickedIcon = false;
    if (line) {
        const gutter = parseFloat(getComputedStyle(line).paddingLeft);
        clickedIcon = e.clientX - line.getBoundingClientRect().left < gutter;
    }

    document.querySelectorAll('.code-annotated .is-open').forEach((el) => {
        if (el !== line || !clickedIcon) el.classList.remove('is-open');
    });

    if (line && clickedIcon) line.classList.toggle('is-open');
});
