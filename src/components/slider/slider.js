/**
 * Initializes buttons for selecting a page
 */
class Slider {
    constructor(table) {
        this.table = table;
        const buttonsHTML = Array.from(document.querySelectorAll(".table__slider_clickable"));
        this.buttons = buttonsHTML.map((elem, index) => {
            return index === buttonsHTML.length - 1 ?
                {
                    html: elem,
                    value: this.table.pagesCount
                } :
                {
                    html: elem,
                    value: index + 1
                }
            }
        )
        this.render(0);
        this._setUp();
    }

    /**
     *
     * @private
     */
    _setUp() {
        this.buttons.forEach((elem, index) => {
            elem.html.onclick = () => {
                this.render(index);
                this.table.renderPage(elem.value - 1);
                this.table.currentPage = elem.value - 1;
            }
        })
    }

    /**
     *
     * @param {number} selectedButton Index of selected button
     */
    render(selectedButton) {
        this.buttons.forEach(elem => {
            elem.html.textContent = elem.value;
        })

        document.querySelector(".selected_page").classList.remove("selected_page");
        this.buttons[selectedButton].html.classList.add("selected_page");
    }
}

export default Slider;