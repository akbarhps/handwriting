function updateSettings(settings) {
    document.cookie = `settings=${JSON.stringify(settings)}`;
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

    if (property === '--paper-width' || property === '--paper-height') {
        updatePaperSize(settings);
        return;
    }

    document.documentElement.style.setProperty(property, `${value}`);
}

function updatePaperSize(settings) {
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

    document.getElementById('paper_width').value = settings['paper_width'];
    document.getElementById('paper_height').value = settings['paper_height'];
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

let settings = {}
const cookie = document.cookie.split(";").find(c => c.includes("settings"));

if (cookie) {
    settings = JSON.parse(cookie.split("=")[1]);
}

const container = document.getElementById("paper_container");
new ResizeObserver((e) => {
    settings['paper_width'] = e[0].contentRect.width;
    settings['paper_height'] = e[0].contentRect.height;
    updatePaperSize(settings);
    updateSettings(settings);
}).observe(container);

updatePaperSize(settings);
updateStyles(settings, false);

const buttonResetSettings = document.getElementById("button_reset_settings");
buttonResetSettings.addEventListener("click", () => {
    settings = {};
    updateStyles(settings, true);
    updatePaperSize(settings);
    updateSettings(settings);
});

const buttonGenerate = document.getElementById("button_generate");
buttonGenerate.addEventListener("click", () => {
    html2canvas(container, {scale: 5}).then(canvas => {
        document.body.appendChild(canvas);
    });
});