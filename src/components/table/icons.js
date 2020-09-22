/**
 * Initializes buttons for sorting
 * @param {Table} table instance of Table class
 */
function IconsSetUp(table) {
    const mapping = ["firstName", "lastName", "about", "eyeColor"];
    Array.from(document.querySelectorAll(".table__body thead i")).forEach((icon, index) => {
        icon.onclick = () => {
            if (icon.classList.contains("fas")) {
                if (icon.classList.contains("fa-caret-square-down")){
                    icon.classList.remove("fa-caret-square-down");
                    icon.classList.add("fa-caret-square-up");
                    table.sort(mapping[index])
                } else {
                    icon.classList.remove("fa-caret-square-up");
                    icon.classList.add("fa-caret-square-down");
                    table.sort(mapping[index], true)
                }
            }
            else {
                const old = document.querySelector(".table__body thead .fas");
                if (old) {
                    old.classList.remove("fas");
                    old.classList.add("far");
                }

                icon.classList.remove("far");
                icon.classList.add("fas");
                icon.classList.contains("fa-caret-square-down") ?
                    table.sort(mapping[index], true) :
                    table.sort(mapping[index])
            }

        }
    })
}

export default IconsSetUp;