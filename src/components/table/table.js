import InputData from "../../resources/InputData.js";

/**
 *
 */
class Table {

    /**
     *
     * @param {number} rowsInPage Number of rows in table page
     */
    constructor(rowsInPage) {
        this.rowsInPage = rowsInPage;
        this.generateTable();
        this.loadDataFromJSON(InputData);
        this.tbodyHTML = document.querySelector(".table__body tbody");
        this.splitToPages();
        this.currentPage = 0;
        this.selectedRow = null;
        this.setPencilsHandler();

    }
    renderPage(pageNumber = this.currentPage) {
        pageNumber = Number(pageNumber);
        const page = this.pages[pageNumber];
        if (pageNumber < this.pagesCount) {
            Array.from(this.tbodyHTML
                .querySelectorAll("tr"))
                .forEach((trHTML, index) => {
                    const row = page[index];
                    const tdsHTML = Array.from(trHTML.querySelectorAll("td"));
                    const values = Object.values(row);
                    const approvedColors = ["red", "blue", "brown", "green", "gray"];

                    tdsHTML[0].innerHTML = "<div>" + values[0] + "</div>";
                    tdsHTML[1].innerHTML = "<div>" + values[1] + "</div>";
                    tdsHTML[2].innerHTML = "<div>" + values[2] + "</div><div>...</div><div>";
                    tdsHTML[3].style.background = Object.values(row)[3];
                })
        }
        else {
            return null;
        }
    }

    setPencilsHandler() {
        Array.from(document.querySelectorAll(".fa-pencil-alt")).forEach((elem, index) => {
            elem.onclick = () => {
                this.selectedRow = index;
                this.form.inputs.forEach((elem, input_index) => {
                    elem.value = this.pages[this.currentPage][this.selectedRow][elem.name];
                })

                document.querySelector(".edit").style.visibility  = "visible";
            }
        })
    }

    editRow(rowData) {
        const row = this.pages[this.currentPage][this.selectedRow];
        let index = 0;
        for (let key in row) {
            if (key === "eyeColor") {
                row[key] = checkColor(rowData[index]) ? rowData[index] : row[key];
                index++;
                continue;
            }
            row[key] = rowData[index];
            index++;
        }
        this.renderPage();

        function checkColor(color) {
            const correctColors = ["red", "blue", "brown", "green", "gray"];
            if (correctColors.includes(color)) {
                return true;
            }
            alert("Некорректный цвет");
            return false;
        }
    }

    hideColumn(columnNumber) {
        columnNumber = Number(columnNumber);
        if (columnNumber > 3 || columnNumber < 0)
        {
            return null;
        }
        Array.from(document.querySelectorAll(".table__body th"))[columnNumber].style.display = "none";
        Array.from(this.tbodyHTML.querySelectorAll('tr')).forEach(tr => {
            tr.querySelectorAll("td")[columnNumber].style.display = "none";
        })
    }

    showColumn(columnNumber) {
        columnNumber = Number(columnNumber);
        if (columnNumber > 3 || columnNumber < 0)
        {
            return null;
        }
        Array.from(document.querySelectorAll(".table__body th"))[columnNumber].style.display = "";
        Array.from(this.tbodyHTML.querySelectorAll('tr')).forEach(tr => {
            tr.querySelectorAll("td")[columnNumber].style.display = "";
        })
    }

    splitToPages() {
        this.pages = [];
        this.dataRows.forEach((elem, index) => {
            if (index % this.rowsInPage === 0) {
                this.pages.push([elem]);
            } else {
                this.pages[this.pages.length - 1].push(elem);
            }
        })

        this.pagesCount = this.pages.length;
    }

    loadDataFromJSON(inputJSONObject) {
        this.dataRows = inputJSONObject.map(elem => ({
                firstName: elem.name.firstName,
                lastName: elem.name.lastName,
                about: elem.about,
                eyeColor: elem.eyeColor
            })
        );
    }

    sort(key, isDecrease) {
        isDecrease = isDecrease ? -1 : 1;
        this.dataRows.sort((elem1, elem2) => {
            return elem1[key] > elem2[key] ? isDecrease : -1 * isDecrease;
        })
        this.splitToPages();
        this.renderPage();
    }

    generateTable() {
        let HTML = "";
        for (let i = 0; i < this.rowsInPage; i++) {
            HTML += `
                <tr>
                    <td><div></div></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><i class="fas fa-pencil-alt"></i></td>
                </tr>
            `;
        }
        document.querySelector(".table__body tbody").innerHTML = HTML;
    }
}

export default Table;