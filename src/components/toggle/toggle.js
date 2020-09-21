function ToggleSetUp(table) {
    Array.from(document.querySelectorAll(".table__editor input")).forEach((input, index) => {
        input.onchange = () => {
            input.checked ? table.showColumn(index) : table.hideColumn(index);
        }
    })
}

export default ToggleSetUp;