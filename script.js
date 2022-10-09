const container = document.getElementById("paper_container");
const paperType = document.getElementById("paper_type");
const paperWidth = document.getElementById("paper_width");
const paperHeight = document.getElementById("paper_height");

const buttonResetSettings = document.getElementById("button_reset_settings");
const buttonGenerate = document.getElementById("button_generate");

let settings = {}
const cookie = document.cookie.split(";").find(c => c.includes("settings"));
if (cookie) {
    settings = JSON.parse(cookie.split("=")[1]);
}

const standardPaperSize = {
    CUSTOM: undefined,
    A4: [793.701, 1122.520],
    A5: [559.37007874, 793.7007874],
    FOLIO: [816, 1248],
}

for (let type of Object.keys(standardPaperSize)) {
    const option = document.createElement("option");
    option.value = type;
    option.innerText = type;
    paperType.appendChild(option);
}

function updateSettings(settings) {
    console.log(settings);
    document.cookie = `settings=${JSON.stringify(settings)}`;
}

function updateElementStyle(input, fromSetting = false, isReset = false) {
    const property = input.classList[0];
    const unit = input.classList[1];

    if (isReset) {
        input.value = input.defaultValue
        input.checked = input.defaultChecked
    }

    if (fromSetting && !isReset) {
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

    if (property === '--paper-width' || property === '--paper-height') {
        updatePaperSize(settings);
        return;
    }

    document.documentElement.style.setProperty(property, `${value}`);
}

function updatePaperSize(settings, type = "CUSTOM") {
    if (settings['paper_width']) {
        container.style.width = settings['paper_width'] + 'px';
    } else {
        container.style.width = '100%';
    }

    if (settings['paper_height']) {
        container.style.height = settings['paper_height'] + 'px';
    } else {
        container.style.height = '100%';
    }

    paperType.value = type;
    paperWidth.value = settings['paper_width'];
    paperHeight.value = settings['paper_height'];
}

function updateStyles(settings, isReset = false) {
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

paperType.addEventListener("input", function () {
    const paperSize = standardPaperSize[paperType.value];
    if (!paperSize) {
        updatePaperSize(settings);
        return;
    }

    settings['paper_width'] = paperSize[0];
    settings['paper_height'] = paperSize[1];

    updatePaperSize(settings, paperType.value);
    updateSettings(settings);
});

buttonResetSettings.addEventListener("click", () => {
    settings = {};
    updatePaperSize(settings);
    updateStyles(settings, true);
    updateSettings(settings);
});

buttonGenerate.addEventListener("click", () => {
    html2canvas(container, {scale: 5}).then(canvas => {
        document.body.appendChild(canvas);
    });
});

updatePaperSize(settings);
updateStyles(settings, false);