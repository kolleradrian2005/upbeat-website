const submit = document.querySelector(".submit");
const label = document.querySelector(".title");
const input = document.querySelector(".addressinput");
const progressIndicator = document.querySelector(".progress")
const descriptionLabel = document.querySelector(".description")

/* Shine and type effect */

const text = "Type your e-mail address"

async function shineTypeEffect() {
    await sleep(300);
    for await (let c of text.split('')) {
        label.textContent += c
        await sleep(100);
    }
    await sleep(100)
    submit.classList.add('glow')
    await sleep(1500)
    submit.classList.remove('glow')
}

// Sleep function

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

window.onload = shineTypeEffect();

/* Connection with backend */

async function get(url) {
    let response = await window.fetch(url, {
        headers: {
            'Authorization': 'Basic VXBCZWF0Om5oYTNaSHB6'
        }
    }).catch(() =>{
        return null
    })
    return response
}

// Listen for clicking on submit button

submit.addEventListener('click', async () => {
    let address = input.value

    onLoading()

    if (!address)
        return onError('Please provide an address above!')
    
    const checkUrl = `http://localhost:666/check?address=${address}`
    let checkResponse = await get(checkUrl);

    if (!checkResponse)
        return onError('Cannot reach server.')

    if (checkResponse.status != 200)
        return onError('You have provided an invalid e-mail address!')
    
    const sendUrl = `http://localhost:666/send?address=${address}`
    let sendResponse = await get(sendUrl);

    if (!sendResponse)
        return onError('Cannot reach server.')

    if (sendResponse.status == 403)
        return onError('You have reached your request limit. Try again later!')

    if (sendResponse.status != 200)
        return onError('Internal server error...')
    
    
    return onCorrect('We have sent an e-mail to you!')
})

input.addEventListener('input', () => {
    removeError()
    removeCorrect()
})

function onError(msg) {
    removeLoading()
    descriptionLabel.textContent = msg
    descriptionLabel.classList.add('error')
    progressIndicator.classList.add('error')
}

function removeError() {
    descriptionLabel.text = ''
    descriptionLabel.classList.remove('error')
    progressIndicator.classList.remove('error')
}

function onLoading() {
    removeError()
    removeCorrect()
    progressIndicator.classList.add('load')
}

function removeLoading() {
    progressIndicator.classList.remove('load')
}

function onCorrect(msg) {
    removeLoading()
    descriptionLabel.textContent = msg
    descriptionLabel.classList.add('correct')
    progressIndicator.classList.add('correct')
}

function removeCorrect() {
    descriptionLabel.textContent = ''
    descriptionLabel.classList.remove('correct')
    progressIndicator.classList.remove('correct')
}