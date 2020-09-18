import InputData from "/infotecs/src/resources/InputData.js";

class Table {
    constructor(rowsInPage) {
        this.tbodyHTML = document.querySelector(".table__body").querySelector("tbody");
        const dataRows = InputData.map(elem => ({
                firstName: elem.name.firstName,
                lastName: elem.name.lastName,
                about: elem.about,
                eyeColor: elem.eyeColor
            })
        );

        this.pages = [];
        dataRows.forEach((elem, index) => {
            if (index % rowsInPage === 0) {
                this.pages.push([elem]);
            } else {
                this.pages[this.pages.length - 1].push(elem);
            }
        })

        this.pagesCount = this.pages.length;
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
                    Object.values(row).forEach((value , valIndex) => {
                        tdsHTML[valIndex].innerHTML = valIndex === 2 ?
                            "<div>" + value + "</div><div>...</div><div>" :
                            "<div>" + value + "</div>";
                    })
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
            row[key] = rowData[index];
            index++;
        }
        this.renderPage();
    }
}

export default Table;