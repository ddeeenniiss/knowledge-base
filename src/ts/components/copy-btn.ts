// filepath: /Users/bonna/entwicklung/knowledge-base/src/ts/components/copy-btn.ts
document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('copy-btn')) {
        const card = target.closest('.card');
        const codeEl = card?.querySelector('pre code');

        if (!codeEl) return;

        const code = codeEl.textContent?.trim();
        if (!code) return;

        navigator.clipboard.writeText(code).then(() => {
            target.textContent = 'Copied!';
            setTimeout(() => {
                target.textContent = 'Copy';
            }, 1200);
        });
    }
});