/**
 * Initializes checkboxes for hiding and showing columns
 * @param {Table} table instance of Table class
 */
function ToggleSetUp(table) {
    Array.from(document.querySelectorAll(".table__editor input")).forEach((input, index) => {
        input.onchange = () => {
            if (input.checked) {
                input.parentNode.classList.remove("table__editor_deactivated");
                table.showColumn(index);
            } else {
                input.parentNode.classList.add("table__editor_deactivated");
                table.hideColumn(index);
            }
        }
    })
}

export default ToggleSetUp;