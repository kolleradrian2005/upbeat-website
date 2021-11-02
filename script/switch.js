
/* Source code for switching between lists */

// Enum for types of commands

const CmdType = {
	DEFAULT : 'Default',
	ADMIN : 'Admin',
}

// Commands

const commands = [
    {name: 'play', description: 'Plays music', type: CmdType.DEFAULT},
    {name: 'skip', description: 'Skips music', type: CmdType.DEFAULT},
    {name: 'pause', description: 'Pauses music', type: CmdType.DEFAULT},
    {name: 'continue', description: 'Continues music', type: CmdType.DEFAULT},
    {name: 'remove', description: 'Removes music', type: CmdType.DEFAULT},
    {name: 'queue', description: 'Queue music', type: CmdType.DEFAULT},
    {name: 'sweep', description: 'Sweeps music', type: CmdType.DEFAULT},
    {name: 'bass', description: 'Applies bass boost', type: CmdType.DEFAULT},
    {name: 'nightcore', description: 'Applies nightcore effect', type: CmdType.DEFAULT},
    {name: 'clear', description: 'Clears effects', type: CmdType.DEFAULT},
    {name: 'disconnect', description: 'Disconnects the bot', type: CmdType.DEFAULT},
    {name: 'shuffle', description: 'Shuffles queue', type: CmdType.DEFAULT},
    {name: 'init', description: 'Initializes music interface', type: CmdType.ADMIN},
    {name: 'disable', description: 'Disables listening on text channel', type: CmdType.ADMIN},
    {name: 'enable', description: 'Enables listening on text channel', type: CmdType.ADMIN},
];

let selected = CmdType.DEFAULT; // Change if default selected index is not 0
let search = ''; // Value of searchbar

// Listen for switching to default commands

const dcmd = document.querySelector("#dcmdslabel");
dcmd.addEventListener('click', () => {
    selected = CmdType.DEFAULT;
    renderList();
})

// Listen for switching to admin commands

const acmd = document.querySelector("#acmdslabel");
acmd.addEventListener('click', () => {
    selected = CmdType.ADMIN;
    renderList();
})

// Get elements for list, this includes checking both search and command type match

function getListElements() {
    let elements = '';
    commands.forEach((cmd)=> {
        if (cmd.type == selected && cmd.name.includes(search)) {
            elements += `
            <div class="element" id="${cmd.name}">
                <div class="title">    
                    ${cmd.name}
                </div>
                <div class="description">
                    ${cmd.description}
                </div>
            </div>`;
        }
    });
    return elements;
}

// Render list

function renderList() {
    const elements = document.querySelector("#elements");
    elements.innerHTML = getListElements();
    var elems = document.getElementsByClassName("element");

    // Start listening for click in order to open
    for (var i = 0; i < elems.length; i++) {
        let elem = elems[i];
        elem.addEventListener('click', () => toggleExpand(elem), false);
    }
}

function toggleExpand(elem) {
    if (elem.classList.contains('expanded'))
        elem.classList.remove('expanded');
    else
        elem.classList.add('expanded');
}

// Call default list render
renderList();

// Search bar, render every time changed

const searchbar = document.querySelector(".searchbar");
searchbar.addEventListener('input', (value) => {
    search = searchbar.value;
    renderList();
})