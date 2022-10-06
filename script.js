const paperContainer = document.getElementById("paper_container");
const paperText = document.getElementById("paper_text");

const inputCustomFontUrl = document.getElementById("input_custom_font_url");
const inputFontSize = document.getElementById("input_font_size");
const inputFontBold = document.getElementById("input_font_bold");
const inputLineSpacing = document.getElementById("input_line_spacing");
const inputTextMarginLeft = document.getElementById("input_text_margin_left");
const inputPaddingLeftWidth = document.getElementById("input_padding_left_width");
const inputPaddingTopHeight = document.getElementById("input_padding_top_height");
const inputPaddingLineColor = document.getElementById("input_padding_line_color");
const inputPaddingLineWidth = document.getElementById("input_padding_line_width");
const inputBackgroundLineSpacing = document.getElementById("input_background_line_spacing");
const inputBackgroundLineColor = document.getElementById("input_background_line_color");
const inputBackgroundLineWidth = document.getElementById("input_background_line_width");

const fontButton = document.getElementById("button_change_font");
const generateButton = document.getElementById("button_generate");

class Settings {
    constructor() {
        this.fontUrl = "";
        this.fontSize = '14';
        this.fontBold = false;
        this.lineSpacing = '20.15';
        this.textMarginLeft = '8';
        this.paddingLeftWidth = '-10';
        this.paddingTopHeight = '58';
        this.paddingLineColor = '#E00025';
        this.paddingLineWidth = '2';
        this.backgroundLineSpacing = '20';
        this.backgroundLineColor = '#999999';
        this.backgroundLineWidth = '1';

        this.load();

        inputCustomFontUrl.value = this.fontUrl;
        inputFontSize.value = this.fontSize;
        inputFontBold.checked = this.fontBold;
        inputLineSpacing.value = this.lineSpacing;
        inputTextMarginLeft.value = this.textMarginLeft;
        inputBackgroundLineSpacing.value = this.backgroundLineSpacing;
        inputPaddingLeftWidth.value = this.paddingLeftWidth;
        inputPaddingTopHeight.value = this.paddingTopHeight;
        inputPaddingLineColor.value = this.paddingLineColor;
        inputPaddingLineWidth.value = this.paddingLineWidth;
        inputBackgroundLineColor.value = this.backgroundLineColor;
        inputBackgroundLineWidth.value = this.backgroundLineWidth;
    }

    fromObject(obj) {
        if(obj.fontUrl)
            this.fontUrl = obj.fontUrl;

        if(obj.fontSize)
            this.fontSize = obj.fontSize;

        if(obj.fontBold)
            this.fontBold = obj.fontBold;

        if(obj.lineSpacing)
            this.lineSpacing = obj.lineSpacing;

        if(obj.textMarginLeft)
            this.textMarginLeft = obj.textMarginLeft;

        if(obj.paddingLeftWidth)
            this.paddingLeftWidth = obj.paddingLeftWidth;

        if(obj.paddingTopHeight)
            this.paddingTopHeight = obj.paddingTopHeight;

        if(obj.paddingLineColor)
            this.paddingLineColor = obj.paddingLineColor;

        if(obj.paddingLineWidth)
            this.paddingLineWidth = obj.paddingLineWidth;

        if(obj.backgroundLineSpacing)
            this.backgroundLineSpacing = obj.backgroundLineSpacing;

        if(obj.backgroundLineColor)
            this.backgroundLineColor = obj.backgroundLineColor;

        if(obj.backgroundLineWidth)
            this.backgroundLineWidth = obj.backgroundLineWidth;
    }

    update() {
        console.log(settings.textMarginLeft)
        document.cookie = `settings=${JSON.stringify(this)}`;
    }

    load() {
        const cookie = document.cookie.split(";").find(c => c.includes("settings"));
        if (cookie) {
            this.fromObject(JSON.parse(cookie.split("=")[1]));
        }
    }
}

const loadCustomFont = async (fontUrl) => {
    if (!fontUrl) {
        return;
    }
    const customFont = new FontFace('CustomFont', `url(${fontUrl})`);

    try {
        await customFont.load();
        document.fonts.add(customFont);
        paperText.style.fontFamily = "CustomFont";
        settings.fontUrl = inputCustomFontUrl.value;
        settings.update()
    } catch (e) {
        console.error(e);
    }
}

const updateFontSize = (fontSize) => {
    inputFontSize.value = fontSize;
    paperText.style.fontSize = `${fontSize}px`;
    if (paperText.children[0]) {
        paperText.children[0].style.fontSize = `${fontSize}px`;
    }
    settings.fontSize = fontSize;
    settings.update();
}

const updateFontBold = (fontBold) => {
    inputFontBold.checked = fontBold;
    paperText.style.fontWeight = fontBold ? "bold" : "normal";
    settings.fontBold = fontBold;
    settings.update();
}

const updateLineSpacing = (lineSpacing) => {
    paperText.style.lineHeight = `${lineSpacing}px`;
    settings.lineSpacing = lineSpacing;
    settings.update();
}

const updateTextMarginLeft = (textMarginLeft) => {
    document.documentElement.style.setProperty('--text-left-margin', `${textMarginLeft}px`);
    settings.textMarginLeft = textMarginLeft;
    settings.update();
}

const updateBackgroundLineSpacing = (backgroundLineSpacing) => {
    paperContainer.style.backgroundSize = `100% ${backgroundLineSpacing}px`;
    settings.backgroundLineSpacing = backgroundLineSpacing;
    settings.update();
}

const updatePaddingLeftWidth = (paddingLeftWidth) => {
    document.getElementById("padding_left").style.width = `calc(100% - ${-paddingLeftWidth}px)`;
    settings.paddingLeftWidth = paddingLeftWidth;
    settings.update();
}

const updatePaddingTopHeight = (paddingTopHeight) => {
    document.getElementById("padding_top").style.height = `calc(${paddingTopHeight}px - 8px)`;
    settings.paddingTopHeight = paddingTopHeight;
    settings.update();
}

const updatePaddingLineColor = (paddingLineColor) => {
    document.documentElement.style.setProperty('--padding-line-color', paddingLineColor);
    settings.paddingLineColor = paddingLineColor;
    settings.update();
}

const updatePaddingLineWidth = (paddingLineWidth) => {
    document.documentElement.style.setProperty('--padding-line-width', paddingLineWidth + "px");
    settings.paddingLineWidth = paddingLineWidth;
    settings.update();
}

const updateBackgroundLineColor = (backgroundLineColor) => {
    document.documentElement.style.setProperty('--background-line-color', backgroundLineColor);
    settings.backgroundLineColor = backgroundLineColor;
    settings.update();
}

const updateBackgroundLineWidth = (backgroundLineWidth) => {
    document.documentElement.style.setProperty('--background-line-width', backgroundLineWidth + "px");
    settings.backgroundLineWidth = backgroundLineWidth;
    settings.update();
}

fontButton.addEventListener("click", async () => {
    await loadCustomFont(inputCustomFontUrl.value);
});

inputFontSize.addEventListener("change", () => {
    updateFontSize(inputFontSize.value);
});

inputFontBold.addEventListener("change", () => {
    updateFontBold(inputFontBold.checked);
});

inputLineSpacing.addEventListener("change", () => {
    updateLineSpacing(inputLineSpacing.value);
});

inputBackgroundLineSpacing.addEventListener("change", () => {
    updateBackgroundLineSpacing(inputBackgroundLineSpacing.value);
});

inputTextMarginLeft.addEventListener("change", () => {
    updateTextMarginLeft(inputTextMarginLeft.value);
});

inputPaddingLeftWidth.addEventListener("change", () => {
    updatePaddingLeftWidth(inputPaddingLeftWidth.value);
});

inputPaddingTopHeight.addEventListener("change", () => {
    updatePaddingTopHeight(inputPaddingTopHeight.value);
});

inputPaddingLineColor.addEventListener("change", () => {
    updatePaddingLineColor(inputPaddingLineColor.value);
});

inputPaddingLineWidth.addEventListener("change", () => {
    updatePaddingLineWidth(inputPaddingLineWidth.value);
});

inputBackgroundLineColor.addEventListener("change", () => {
    updateBackgroundLineColor(inputBackgroundLineColor.value);
});

inputBackgroundLineWidth.addEventListener("change", () => {
    updateBackgroundLineWidth(inputBackgroundLineWidth.value);
});

generateButton.addEventListener("click", () => {
    html2canvas(paperContainer).then(canvas => {
        canvas.id = "paper_canvas";
        document.body.appendChild(canvas);
    });
});

const settings = new Settings();

(async () => {
    await loadCustomFont(settings.fontUrl);
})();

updateFontSize(settings.fontSize);
updateFontBold(settings.fontBold);
updateLineSpacing(settings.lineSpacing);
updateTextMarginLeft(settings.textMarginLeft);
updateBackgroundLineSpacing(settings.backgroundLineSpacing);
updatePaddingLeftWidth(settings.paddingLeftWidth);
updatePaddingTopHeight(settings.paddingTopHeight);
updatePaddingLineColor(settings.paddingLineColor);
updatePaddingLineWidth(settings.paddingLineWidth);
updateBackgroundLineColor(settings.backgroundLineColor);
updateBackgroundLineWidth(settings.backgroundLineWidth);