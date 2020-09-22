import Table from "./components/table/table.js";
import Slider from "./components/slider/slider.js";
import FormSetUp from "./components/form/form.js";
import ToggleSetUp from "./components/toggle/toggle.js"
import IconsSetUp from "./components/table/icons.js";

const table = new Table(10);
table.renderPage(0);
const slider = new Slider(table);
const form = new FormSetUp();
form.setSubmitHandler(table);
table.form = form;
ToggleSetUp(table);
IconsSetUp(table);