window.addEventListener('DOMContentLoaded', () => {
    const downloadablePage = document.querySelector('.downloadablePage')
    const filenameInput = document.getElementById('fileName');
    const vidInput = document.getElementById('GrammarVideoLink');
    const vidLink = document.getElementById('vidLink');
    const imageInput = document.getElementById('vocab');
    const previewDiv = document.getElementById('preview');
    const grammarInput = document.getElementById('grammarInput');
    const grammarBook = document.getElementById('grammarBook');
    const essayInput = document.getElementById('essay');
    const essayPrev = document.getElementById('essayPrev');
    const lisInput = document.getElementById('listeningLink');
    const lisLink = document.getElementById('lisLink');
    const listeningSection = document.getElementById('listeningSection');
    const essaySection = document.getElementById('essaySection');
    const listeningCheck = document.getElementById('listeningCheck');
    const essayCheck = document.getElementById('matnCheck');
    const downloadButton = document.querySelector(".downloadBtn");
    const theoryInput = document.getElementById('theory')
    const theoryPrag = document.getElementById('theoryPrag')

    if (!listeningCheck.checked) {
        listeningSection.remove(); 
    }

    if (!essayCheck.checked) {
        essaySection.remove(); 
    }

    listeningCheck.addEventListener('change', () => {
        if (listeningCheck.checked) {
            const newSection = document.createElement('div');
            newSection.id = 'listeningSection';
            newSection.innerHTML = `
                <h3>Eshitish mashqi:</h3>
                <a id="lisLink" href="" target="_blank">video linki</a>
            `;
            downloadablePage.appendChild(newSection); 
        } else {
            document.getElementById('listeningSection')?.remove();
        }
    });

    essayCheck.addEventListener('change', () => {
        if (essayCheck.checked) {
            const newSection = document.createElement('div');
            newSection.id = 'essaySection';
            newSection.innerHTML = `
                <h3>Matn tuzish:</h3>
                <p id="essayPrev"></p>
            `;
            downloadablePage.appendChild(newSection); 
        } else {
            document.getElementById('essaySection')?.remove();
        }
    });

    vidInput.addEventListener('input', (event) => {
        vidLink.href = event.target.value;
    });

    imageInput.addEventListener('change', (event) => {
        const files = event.target.files;

        previewDiv.innerHTML = '';

        if (files.length > 0) {
            Array.from(files).forEach((file) => {
                const imageUrl = URL.createObjectURL(file);
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = "Uploaded Image";
                imgElement.style.maxWidth = "100%";
                imgElement.style.height = "auto";
                imgElement.style.marginBottom = "10px";

                previewDiv.appendChild(imgElement);
            });
        } else {
            previewDiv.innerHTML = '<p>No images uploaded yet.</p>';
        }
    });

    grammarInput.addEventListener('input', (event) => {
        grammarBook.textContent = event.target.value;
    });

    theoryInput.addEventListener('change', (e) => {
        theoryPrag.textContent = e.target.value
    })

    essayInput.addEventListener('input', (event) => {
        essayPrev.textContent = event.target.value;
    });

    lisInput.addEventListener('input', (event) => {
        lisLink.href = event.target.value;
    });

    downloadButton.addEventListener('click', () => {
        const pageToDownload = document.querySelector(".downloadablePage");
        const options = {
            filename: `${filenameInput.value}.pdf`,
            image: { type: "jpeg", quality: 0.85 },
            html2canvas: {
                scale: 5,
                logging: true,
                letterRendering: true,
                useCORS: true,
            },
            jsPDF: {
                unit: "in",
                format: "letter",
                orientation: "portrait",
            },
        };

        html2pdf()
            .set(options)
            .from(pageToDownload)
            .toPdf()
            .save();
    });
});
