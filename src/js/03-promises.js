function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;

        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const firstDelay = parseInt(formData.get('delay'));
    const delayStep = parseInt(formData.get('step'));
    const amount = parseInt(formData.get('amount'));

    if (firstDelay < 0 || delayStep < 0 || amount <= 0) {
        alert('Please fill the areas with valid numbers!');
        return
    }

    for (let i = 0; i < amount; i += 1) {
        const delay = firstDelay + i * delayStep;

        createPromise(i + 1, delay)
            .then(({ position, delay }) => {
                console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    }
});
