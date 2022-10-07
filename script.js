function updateSettings(settings) {
    document.cookie = `settings=${JSON.stringify(settings)}`;
}

let settings = {}
const cookie = document.cookie.split(";").find(c => c.includes("settings"));

if (cookie) {
    settings = JSON.parse(cookie.split("=")[1]);
}

function updateElementStyle(input, fromSetting = false, isReset = false) {
    const property = input.classList[0];
    const unit = input.classList[1];

    if (isReset) {
        input.value = input.defaultValue
        input.checked = input.defaultChecked
    }

    if (fromSetting) {
        input.value = settings[input.id] ? settings[input.id] : input.value;

        if (input.type === 'checkbox') {
            input.checked = settings[input.id] ? settings[input.id] : input.checked;
        }
    } else {
        settings[input.id] = input.value;

        if (input.type === 'checkbox') {
            settings[input.id] = input.checked;
        }
    }

    let value = input.value + (unit ? unit : '');

    if (input.type === 'checkbox') {
        value = input.checked ? 'bold' : 'normal';
    }

    document.documentElement.style.setProperty(property, `${value}`);
}

function updateStyles(isReset = false) {
    for (let input of document.getElementsByTagName("input")) {
        updateElementStyle(input, true, isReset);

        if (!isReset) {
            input.addEventListener("input", function () {
                updateElementStyle(input, false);
                updateSettings(settings);
            });
        }
    }
}

updateStyles(false);

const buttonResetSettings = document.getElementById("button_reset_settings");
buttonResetSettings.addEventListener("click",  () => {
    settings = {};
    updateSettings(settings);
    updateStyles(true);
});

const buttonGenerate = document.getElementById("button_generate");
buttonGenerate.addEventListener("click", () => {
    const container = document.getElementById("paper_container");
    html2canvas(container, {
        scale: 5,
    }).then(canvas => {
        document.body.appendChild(canvas);
    });
});