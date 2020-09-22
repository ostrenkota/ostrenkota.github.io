import InputData from "../../resources/InputData.js";

/**
 * Class is intended to describe the logic of interaction with the table
 */
class Table {

    /**
     *
     * @param {number} rowsInPage Number of rows in table page
     */
    constructor(rowsInPage) {
        this.rowsInPage = rowsInPage;
        this._generateTable();
        this._loadDataFromJSON(InputData);
        this.tbodyHTML = document.querySelector(".table__body tbody");
        this._splitToPages();
        this.currentPage = 0;
        this.selectedRow = null;
        this._setPencilsHandler();

    }

    /**
     * Displays the desired table page on the screen
     * @param {number} pageNumber Number of page to render
     */
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

    /**
     * Initializes buttons for editing entries
     * @private
     */
    _setPencilsHandler() {
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

    /**
     * External interface for changing a record
     * @param {Array} rowData Array of data to insert
     */
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

    /**
     * Hides column by number
     * @param columnNumber Number of column to hide
     */
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

    /**
     * Show hidden column by number
     * @param columnNumber Number of column to show
     */
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

    /**
     * Splits input data to pages
     * @private
     */
    _splitToPages() {
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

    /**
     * Loads data from Object gotten from incoming JSON
     * @param {Object} inputJSONObject
     * @private
     */
    _loadDataFromJSON(inputJSONObject) {
        this.dataRows = inputJSONObject.map(elem => ({
                firstName: elem.name.firstName,
                lastName: elem.name.lastName,
                about: elem.about,
                eyeColor: elem.eyeColor
            })
        );
    }

    /**
     * Sorts data by key
     * @param {string} key Name of column to sort
     * @param {boolean} isDecrease
     */
    sort(key, isDecrease) {
        isDecrease = isDecrease ? -1 : 1;
        this.dataRows.sort((elem1, elem2) => {
            return elem1[key] > elem2[key] ? isDecrease : -1 * isDecrease;
        })
        this._splitToPages();
        this.renderPage();
    }

    /**
     * Creates html markup for a table
     * @private
     */
    _generateTable() {
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