window.addEventListener('DOMContentLoaded', () => {
    const downloadablePage = document.querySelector('.downloadablePage');
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
    const theoryInput = document.getElementById('theory');
    const theoryPrag = document.getElementById('theoryPrag');
    const headerTitle = document.getElementById('header');

    const taskInputs = [
        { tasks: 'section1Tasks', links: 'section1Links', taskList: 'section1task', linkList: 'section1links' },
        { tasks: 'section2Tasks', links: 'section2Links', taskList: 'section2task', linkList: 'section2links' },
        { tasks: 'section3Tasks', links: 'section3Links', taskList: 'section3task', linkList: 'section3links' },
        { tasks: 'section4Tasks', links: 'section4Links', taskList: 'section4task', linkList: 'section4links' },
        { tasks: 'section5Tasks', links: 'section5Links', taskList: 'section5task', linkList: 'section5links' },
        { tasks: 'section6Tasks', links: 'section6Links', taskList: 'section6task', linkList: 'section6links' },
    ];

    // Update tasks and links dynamically
    taskInputs.forEach(({ tasks, links, taskList, linkList }) => {
        const taskInput = document.getElementById(tasks);
        const linkInput = document.getElementById(links);
        const taskListElement = document.getElementById(taskList);
        const linkListElement = document.getElementById(linkList);

        taskInput.addEventListener('input', (event) => {
            const tasksArray = event.target.value.split('<>');
            taskListElement.innerHTML = tasksArray.map(task => `<li>${task}</li>`).join('');
        });

        linkInput.addEventListener('input', (event) => {
            const linksArray = event.target.value.split('<>');
            linkListElement.innerHTML = linksArray.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('');
        });
    });

    // Update header title dynamically
    filenameInput.addEventListener('input', (event) => {
        headerTitle.innerHTML = event.target.value || 'Day 1';
    });

    // Handle listening and essay sections dynamically
    if (!listeningCheck.checked) {
        listeningSection.remove();
    }

    if (!essayCheck.checked) {
        essaySection.remove();
    }

    listeningCheck.addEventListener('change', () => {
        if (listeningCheck.checked) {
            downloadablePage.innerHTML += `<div id="listeningSection">
                <h3>Eshitish mashqi:</h3>
                <h4>Linklar</h4>
                <ul id="section6links"></ul>
                <h4>Vazifalar:</h4>
                <ol id="section6task"></ol>
            </div>`
        } else {
            listeningSection.remove();
        }
    });

    essayCheck.addEventListener('change', () => {
        if (essayCheck.checked) {
            downloadablePage.innerHTML += `<div id="essaySection">
                <h3>Matn tuzish:</h3>
                <p id="essayPrev"></p>
                <h4>Linklar</h4>
                <ul id="section5links"></ul>
                <h4>Vazifalar:</h4>
                <ol id="section5task"></ol>
            </div>`
        } else {
            essaySection.remove()
        }
    });

    // Update grammar and theory sections
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

    theoryInput.addEventListener('input', (event) => {
        theoryPrag.textContent = event.target.value;
    });

    essayInput.addEventListener('input', (event) => {
        essayPrev.textContent = event.target.value;
    });

    lisInput.addEventListener('input', (event) => {
        lisLink.href = event.target.value;
    });

    function getCurrentDateTime() {
        const now = new Date();
      
        // Get hours and minutes (0-23, 0-59)
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const fullTime = `${hours}:${minutes}`; 
      
        // Get day, month, and year (2-digit day, 2-digit month, 4-digit year)
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const year = now.getFullYear();
        const fullDate = `${day}:${month}:${year}`;
      
        return {
          fullTime: fullTime,
          fullDate: fullDate
        };
      }

    // Download page as PDF
    downloadButton.addEventListener('click', () => {
        const dateTime = getCurrentDateTime()
        document.querySelector(".stamp").textContent = `Ulugbek Norbutaev -  ${dateTime.fullTime} ,  ${dateTime.fullDate}`
        const options = {
            filename: `${filenameInput.value || 'Day_1'}.pdf`,
            image: { type: "jpeg", quality: 0.85 },
            html2canvas: { scale: 5, useCORS: true },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf().set(options).from(downloadablePage).save();
    });
});
