/**
 * Initializes a form for editing records
 */
class FormSetUp {
    constructor() {
        this.inputs = Array.from(document.querySelector(".edit__form").querySelectorAll("input"));
        const textArea = document.querySelector(".edit__form").querySelector("textarea");
        this.submit = this.inputs[3];
        this.inputs[3] = this.inputs[2];
        this.inputs[2] = textArea;

        document.querySelector(".edit__title i").onclick = () => {
            document.querySelector(".edit").style.visibility = "hidden";
        }
    }

    /**
     *
     * @param {Table} table instance of Table class
     */
    setSubmitHandler(table) {
        this.submit.onclick = () => {
            table.editRow(this.inputs.map(elem => elem.value))
            document.querySelector(".edit").style.visibility = "hidden";
        }
    }

}

export default FormSetUp;