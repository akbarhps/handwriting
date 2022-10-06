const input = document.getElementById("input_text");
const paperContainer = document.getElementById("paper_container");
const paperText = document.getElementById("paper_text");
const generateButton = document.getElementById("generate_button");

const fontInput = document.getElementById("input_custom_font");
const fontButton = document.getElementById("font_button");

// input.addEventListener("input", (e) => {
//     paperText.innerText = e.target.value;
// });

generateButton.addEventListener("click", () => {
    html2canvas(paperContainer).then(canvas => {
        canvas.id = "paper_canvas";
        document.body.appendChild(canvas);
    });
});

fontButton.addEventListener("click", async () => {
    const fontUrl = fontInput.value;
    const customFont = new FontFace('CustomFont', `url(${fontUrl})`);

    try {
        await customFont.load();
        document.fonts.add(customFont);
        paperText.style.fontFamily = "CustomFont";
    } catch (e) {
        console.error(e);
    }
});